// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import YearnLinearPoolFactory from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPoolFactory.json';
import BooLinearPoolFactory from '../tasks/20221205-boo-linear-pool-v2/build-info/BooLinearPoolFactory.json';
import YearnLinearPool from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPool.json';
import ComposableStablePoolV4Factory from '../tasks/20230320-composable-stable-pool-v4/artifact/ComposableStablePoolFactory.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';
import { ZERO_ADDRESS } from '@balancer-labs/v2-helpers/src/constants';

const BBRFUSDT = '0x442988091CDC18aCb8912Cd3Fe062CDA9233F9Dc';
const BBRFDAI = '0x685056d3A4E574b163d0fa05A78F1B0b3aa04a80';
const BBRFUSDC = '0xC385e76E575b2d71eB877c27DCc1608f77fadA99';
const bbrfWETH = '0xA0051aB2c3eb7F17758428b02a07cF72eB0EF1a3';
const ANKRWETH = '0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C';

const ANKRFTM_RATE_PROVIDER = '0x7D896Ac06cA45E6a2982E236f3bf6b4C8D7B5705';
const WFTM = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83';
const ANKRFTM = '0xCfC785741Dc0e98ad4c9F6394Bb9d43Cd1eF5179';

const WETH = '0x74b23882a30290451a17c44f4f05243b6b58c76d';

const XDEUS = '0x953Cd009a490176FcEB3a26b9753e6F01645ff28';
const DEUS = '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44';

const SFTMX = '0xd7028092c830b5C8FcE061Af2E593413EbbC1fc1';
const SFTMX_RATE_PROVIDER = '0x629D4c27057915e59Dd94Bca8D48c6d80735B521';

const bbrfWFTM = '0x92502cD8E00f5b8e737b2Ba203FDd7CD27B23c8f';

const ANKRETH_RATE_PROVIDER = '0x14725A954Af71CbbdE6F43Cc5e3D34B9DFf64218';

const COMPOSABLE_STABLE_POOL_V4_FACTORY = '0x5c3094982cF3c97A06b7d62A6f7669F14a199B19';

const BALANCER_POOL_MANAGER = '0xD80B7DA84ED8bc3a8f0a9658096b2587BBA9c882';
const POOL_OWNER_MULTISIG = '0xCd983793ADb846dcE4830c22F30C7Ef0C864a776';

async function create() {
  const factory = await ethers.getContractAt(ComposableStablePoolV4Factory.abi, COMPOSABLE_STABLE_POOL_V4_FACTORY);

  console.log('Calling create on the ComposableStablePoolV4Factory...');

  const tx = await factory.create(
    'Ankr Fantom Liquid Mosaic',
    'bb-rf-ankrFtm',
    [WFTM, ANKRFTM],
    20, //amp
    [ZERO_ADDRESS, ANKRFTM_RATE_PROVIDER], // rate provider
    [30, 30], // cache
    [false, false], //fee exemption
    fp(0.0006), //swap fee
    POOL_OWNER_MULTISIG,
    '0x3dcd0b834d39df42b03c306c71ab0c56842d1667f84e87cdc48fa68c8f6789c9' //random string
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the ComposableStablePoolV4Factory at address ${poolAddress}`);
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
