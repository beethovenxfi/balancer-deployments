// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ComposableStablePoolV5Factory from '../tasks/20230711-composable-stable-pool-v5/artifact/ComposableStablePoolFactory.json';
import { fp } from '../src/helpers/numbers';
import { POOL_OWNER_OP, TOKENS } from './constants';

const COMPOSABLESTABLE_POOL_V5_FACTORY_ADDRESS = '0x043A2daD730d585C44FB79D2614F295D2d625412';

async function create() {
  const factory = await ethers.getContractAt(
    ComposableStablePoolV5Factory.abi,
    COMPOSABLESTABLE_POOL_V5_FACTORY_ADDRESS
  );

  // BEGIN ====== variables ====== BEGIN

  const poolName = 'Dollar Dollar Bills';
  const poolSymbol = 'bb-dolbil';
  const amp = 40;
  const feeExemption = false;
  const swapFee = fp(0.0001);
  const random = '0x5342255c78acbda934a14fbf3c37085a80a36ba6651c6fa0c5d5570b5340330d'; // https://www.browserling.com/tools/random-hex

  const tokens = [TOKENS['OPTIMISM'].ERN, TOKENS['OPTIMISM'].BBRFUSDC, TOKENS['OPTIMISM'].BBRFUSDT];

  // END ====== variables ====== END

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address)); // sort on address case insensitive

  console.log({ sortedTokens });

  console.log('Calling create on the ComposableStableV5Factory...');

  const tx = await factory.create(
    poolName,
    poolSymbol,
    sortedTokens.map((token) => token.address),
    amp, //amp
    sortedTokens.map((token) => token.rateProvider), // rate provider
    sortedTokens.map((token) => token.cache), // cache
    feeExemption, //fee exemption
    swapFee, //swap fee
    POOL_OWNER_OP,
    random //random string
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the ComposableStableV5Factory at address ${poolAddress}`);
  console.log(`Pool deployment block hash: ${blockHash}`);
}

async function getPoolAddressAndBlockHashFromTransaction(
  // eslint-disable-next-line
  tx: any
): Promise<{ poolAddress: string; blockHash: string }> {
  const receipt = await tx.wait();
  const events = receipt.events.filter((e: { event: string }) => e.event === 'PoolCreated');

  return { poolAddress: events[0].args.pool, blockHash: receipt.blockHash };
}

create().catch((e) => {
  console.log('error', e);
});
