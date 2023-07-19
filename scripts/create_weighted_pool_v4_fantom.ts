// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

// import YearnLinearPoolFactory from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPoolFactory.json';
// import BooLinearPoolFactory from '../tasks/20221205-boo-linear-pool-v2/build-info/BooLinearPoolFactory.json';
// import YearnLinearPool from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPool.json';
import WeightedPoolV4Factory from '../tasks/20230320-weighted-pool-v4/artifact/WeightedPoolFactory.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { toNormalizedWeights } from '@balancer-labs/sdk';
import { fp } from '../src/helpers/numbers';

const WFTM = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83';
const bbrfWBTC = '0x3c1420df122AC809B9d1ba77906F833764D64501';
const bbrfWETH = '0xA0051aB2c3eb7F17758428b02a07cF72eB0EF1a3';
const ROCK_STEADY = '0xc46066ff87b3861ffc5c26ad2e9705190c22aa56';
const LQDR = '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9';
const bbrfWFTM = '0x92502cD8E00f5b8e737b2Ba203FDd7CD27B23c8f';
const bbrfUSDC = '0xC385e76E575b2d71eB877c27DCc1608f77fadA99';

const GRAIN = '0x02838746d9e1413e07ee064fcbada57055417f21';
const MATIC = '0x40df1ae6074c35047bff66675488aa2f9f6384f3';

const ANKR = '0x0615Dbba33Fe61a31c7eD131BDA6655Ed76748B1';

const ANKRWETH = '0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C';

const ANKRFTM_RATE_PROVIDER = '0x7D896Ac06cA45E6a2982E236f3bf6b4C8D7B5705';
const ANKRFTM = '0xCfC785741Dc0e98ad4c9F6394Bb9d43Cd1eF5179';

const WETH = '0x74b23882a30290451a17c44f4f05243b6b58c76d';

const XDEUS = '0x953Cd009a490176FcEB3a26b9753e6F01645ff28';
const DEUS = '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44';

const SFTMX = '0xd7028092c830b5C8FcE061Af2E593413EbbC1fc1';
const SFTMX_RATE_PROVIDER = '0x629D4c27057915e59Dd94Bca8D48c6d80735B521';

const WSTA = '0xCEeBDE49eC95E21F7eE63C5c6f98CaB3519570de';
const BEETS = '0xF24Bcf4d1e507740041C9cFd2DddB29585aDCe1e';

const ANKRETH_RATE_PROVIDER = '0x14725A954Af71CbbdE6F43Cc5e3D34B9DFf64218';

const WEIGHTED_POOL_V4_FACTORY_ADDRESS = '0xb841Df73861E65E6D61a80F503F095a91ce75e15';

const POOL_OWNER_MULTISIG = '0xCd983793ADb846dcE4830c22F30C7Ef0C864a776';
const BALANCER_POOL_MANAGER = '0xD80B7DA84ED8bc3a8f0a9658096b2587BBA9c882';

const BPT_DEUSX = '0x3eb521a33082e471f87df67b82e14e1c760fc861';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const BOO = '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV4Factory.abi, WEIGHTED_POOL_V4_FACTORY_ADDRESS);

  console.log('Calling create on the WeightedPoolV4Factory...');

  const tx = await factory.create(
    `test one`,
    'bpt-tone',
    [WFTM, BOO],
    toNormalizedWeights([fp(0.5), fp(0.5)]),
    [ZERO_ADDRESS, ZERO_ADDRESS],
    fp(0.01),
    POOL_OWNER_MULTISIG,
    '0x65bc691260fff8c7f5a992e95a76602f09c1c02aa87d32b974232662f1db809d'
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the WeightedPoolV4Factory at address ${poolAddress}`);
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
