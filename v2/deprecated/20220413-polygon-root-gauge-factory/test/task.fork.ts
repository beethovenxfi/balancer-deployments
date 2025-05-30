import hre, { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { range } from 'lodash';

import { BigNumber, FP_ONE } from '@helpers/numbers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import { advanceTime, currentWeekTimestamp, DAY, WEEK } from '@helpers/time';
import * as expectEvent from '@helpers/expectEvent';
import { expectTransferEvent } from '@helpers/expectTransfer';

import { expectEqualWithError } from '@helpers/relativeError';
import { ZERO_ADDRESS } from '@helpers/constants';

import { describeForkTest, getSigner, impersonate, getForkedNetwork, Task, TaskMode } from '@src';

describeForkTest.skip('PolygonRootGaugeFactory', 'mainnet', 14600000, function () {
  let veBALHolder: SignerWithAddress, admin: SignerWithAddress, recipient: SignerWithAddress;
  let factory: Contract, gauge: Contract;
  let vault: Contract,
    authorizer: Contract,
    authorizerAdaptor: Contract,
    BALTokenAdmin: Contract,
    gaugeController: Contract,
    gaugeAdder: Contract;
  let BAL: string;

  let task: Task;

  const VEBAL_HOLDER = '0xCB3593C7c0dFe13129Ff2B6add9bA402f76c797e';
  const GOV_MULTISIG = '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f';

  before('run task', async () => {
    task = new Task('20220413-polygon-root-gauge-factory', TaskMode.TEST, getForkedNetwork(hre));
    await task.run({ force: true });
    factory = await task.deployedInstance('PolygonRootGaugeFactory');
  });

  before('advance time', async () => {
    // This causes all voting cooldowns to expire, letting the veBAL holder vote again
    await advanceTime(DAY * 12);
  });

  before('setup accounts', async () => {
    admin = await getSigner(0);
    recipient = await getSigner(1);

    veBALHolder = await impersonate(VEBAL_HOLDER);
  });

  before('setup contracts', async () => {
    const vaultTask = new Task('20210418-vault', TaskMode.READ_ONLY, getForkedNetwork(hre));
    vault = await vaultTask.instanceAt('Vault', '0xBA12222222228d8Ba445958a75a0704d566BF2C8'); // vaultTask.output({ network: 'mainnet' }).Vault
    authorizer = await vaultTask.instanceAt('Authorizer', await vault.getAuthorizer());

    const authorizerAdaptorTask = new Task('20220325-authorizer-adaptor', TaskMode.READ_ONLY, getForkedNetwork(hre));
    authorizerAdaptor = await authorizerAdaptorTask.instanceAt(
      'AuthorizerAdaptor',
      '0x8f42adbba1b16eaae3bb5754915e0d06059add75' // authorizerAdaptorTask.output({ network: 'mainnet' }).AuthorizerAdaptor
    );

    const gaugeAdderTask = new Task('20220325-gauge-adder', TaskMode.READ_ONLY, getForkedNetwork(hre));
    gaugeAdder = await gaugeAdderTask.instanceAt(
      'GaugeAdder',
      '0xEd5ba579bB5D516263ff6E1C10fcAc1040075Fe2' // gaugeAdderTask.output({ network: 'mainnet' }).GaugeAdder
    );

    const balancerTokenAdminTask = new Task('20220325-balancer-token-admin', TaskMode.READ_ONLY, getForkedNetwork(hre));
    BALTokenAdmin = await balancerTokenAdminTask.instanceAt(
      'BalancerTokenAdmin',
      '0xf302f9F50958c5593770FDf4d4812309fF77414f' // balancerTokenAdminTask.output({ network: 'mainnet' }).BalancerTokenAdmin
    );

    BAL = await BALTokenAdmin.getBalancerToken();

    const gaugeControllerTask = new Task('20220325-gauge-controller', TaskMode.READ_ONLY, getForkedNetwork(hre));
    gaugeController = await gaugeControllerTask.instanceAt(
      'GaugeController',
      '0xC128468b7Ce63eA702C1f104D55A2566b13D3ABD' // gaugeControllerTask.output({ network: 'mainnet' }).GaugeController
    );
  });

  it('create gauge', async () => {
    const tx = await factory.create(recipient.address);
    const event = expectEvent.inReceipt(await tx.wait(), 'PolygonRootGaugeCreated');

    gauge = await task.instanceAt('PolygonRootGauge', event.args.gauge);
    expect(event.args.recipient).to.equal(recipient.address);

    expect(await factory.isGaugeFromFactory(gauge.address)).to.be.true;
    expect(await factory.getRecipientGauge(recipient.address)).to.equal(gauge.address);
    expect(await factory.getGaugeRecipient(gauge.address)).to.equal(recipient.address);
  });

  it('grant permissions', async () => {
    // We need to grant permission to the admin to add the Polygon factory to the GaugeAdder, and also to then add
    // gauges from said factory to the GaugeController.
    const govMultisig = await impersonate(GOV_MULTISIG);

    const selectors = ['addGaugeFactory', 'addPolygonGauge'].map((method) => gaugeAdder.interface.getSighash(method));
    await Promise.all(
      selectors.map(
        async (selector) =>
          await authorizer.connect(govMultisig).grantRole(await gaugeAdder.getActionId(selector), admin.address)
      )
    );

    // We also need to grant permissions to mint in the gauges, which is done via the Authorizer Adaptor
    await authorizer
      .connect(govMultisig)
      .grantRole(await authorizerAdaptor.getActionId(gauge.interface.getSighash('checkpoint')), admin.address);
  });

  it('add gauge to gauge controller', async () => {
    await gaugeAdder.addGaugeFactory(factory.address, 3); // Polygon is Gauge Type 3
    await gaugeAdder.addPolygonGauge(gauge.address);

    expect(await gaugeController.gauge_exists(gauge.address)).to.be.true;
  });

  it('vote for gauge', async () => {
    expect(await gaugeController.get_gauge_weight(gauge.address)).to.equal(0);
    await gaugeController.connect(veBALHolder).vote_for_gauge_weights(gauge.address, 10000); // Max voting power is 10k points

    // We now need to go through an epoch for the votes to be locked in
    await advanceTime(DAY * 8);

    await gaugeController.checkpoint();
    expect(await gaugeController['gauge_relative_weight(address)'](gauge.address)).to.be.gt(0);
  });

  it('mint & bridge tokens', async () => {
    // The gauge has votes for this week, and it will mint the first batch of tokens. We store the current gauge
    // relative weight, as it will change as time goes by due to vote decay.
    const firstMintWeekTimestamp = await currentWeekTimestamp();
    const gaugeRelativeWeight = await gaugeController['gauge_relative_weight(address)'](gauge.address);

    const calldata = gauge.interface.encodeFunctionData('checkpoint');

    // Even though the gauge has relative weight, it cannot mint yet as it needs for the epoch to finish
    const zeroMintTx = await authorizerAdaptor.connect(admin).performAction(gauge.address, calldata);
    expectEvent.inIndirectReceipt(await zeroMintTx.wait(), gauge.interface, 'Checkpoint', {
      periodTime: firstMintWeekTimestamp.sub(WEEK), // Process past week, which had zero votes
      periodEmissions: 0,
    });
    // No token transfers are performed if the emissions are zero, but we can't test for a lack of those

    await advanceTime(WEEK);

    // The gauge should now mint and send all minted tokens to the Polygon bridge
    const mintTx = await authorizerAdaptor.connect(admin).performAction(gauge.address, calldata);
    const event = expectEvent.inIndirectReceipt(await mintTx.wait(), gauge.interface, 'Checkpoint', {
      periodTime: firstMintWeekTimestamp,
    });
    const actualEmissions = event.args.periodEmissions;

    // The amount of tokens minted should equal the weekly emissions rate times the relative weight of the gauge
    const weeklyRate = (await BALTokenAdmin.getInflationRate()).mul(WEEK);

    const expectedEmissions = gaugeRelativeWeight.mul(weeklyRate).div(FP_ONE);
    expectEqualWithError(actualEmissions, expectedEmissions, 0.001);

    // Tokens are minted for the gauge
    expectTransferEvent(
      await mintTx.wait(),
      {
        from: ZERO_ADDRESS,
        to: gauge.address,
        value: actualEmissions,
      },
      BAL
    );

    // And the gauge then deposits those in the predicate via the bridge mechanism
    const bridgeInterface = new ethers.utils.Interface([
      'event LockedERC20(address indexed depositor, address indexed depositReceiver, address indexed rootToken, uint256 amount)',
    ]);

    expectEvent.inIndirectReceipt(await mintTx.wait(), bridgeInterface, 'LockedERC20', {
      depositor: gauge.address,
      depositReceiver: recipient.address,
      rootToken: BAL,
      amount: actualEmissions,
    });
  });

  it('mint multiple weeks', async () => {
    const numberOfWeeks = 5;
    await advanceTime(WEEK * numberOfWeeks);
    await gaugeController.checkpoint_gauge(gauge.address);

    const weekTimestamp = await currentWeekTimestamp();

    // We can query the relative weight of the gauge for each of the weeks that have passed
    const relativeWeights: BigNumber[] = await Promise.all(
      range(1, numberOfWeeks + 1).map(async (weekIndex) =>
        gaugeController['gauge_relative_weight(address,uint256)'](gauge.address, weekTimestamp.sub(WEEK * weekIndex))
      )
    );

    // The amount of tokens minted should equal the sum of the weekly emissions rate times the relative weight of the
    // gauge (this assumes we're not crossing an emissions rate epoch so that the inflation remains constant).
    const weeklyRate = (await BALTokenAdmin.getInflationRate()).mul(WEEK);
    const expectedEmissions = relativeWeights
      .map((weight) => weight.mul(weeklyRate).div(FP_ONE))
      .reduce((sum, value) => sum.add(value));

    const calldata = gauge.interface.encodeFunctionData('checkpoint');
    const tx = await authorizerAdaptor.connect(admin).performAction(gauge.address, calldata);

    await Promise.all(
      range(1, numberOfWeeks + 1).map(async (weekIndex) =>
        expectEvent.inIndirectReceipt(await tx.wait(), gauge.interface, 'Checkpoint', {
          periodTime: weekTimestamp.sub(WEEK * weekIndex),
        })
      )
    );

    // Tokens are minted for the gauge
    expectTransferEvent(
      await tx.wait(),
      {
        from: ZERO_ADDRESS,
        to: gauge.address,
        value: expectedEmissions,
      },
      BAL
    );

    // And the gauge then deposits those in the predicate via the bridge mechanism
    const bridgeInterface = new ethers.utils.Interface([
      'event LockedERC20(address indexed depositor, address indexed depositReceiver, address indexed rootToken, uint256 amount)',
    ]);

    expectEvent.inIndirectReceipt(await tx.wait(), bridgeInterface, 'LockedERC20', {
      depositor: gauge.address,
      depositReceiver: recipient.address,
      rootToken: BAL,
      amount: expectedEmissions,
    });
  });
});
