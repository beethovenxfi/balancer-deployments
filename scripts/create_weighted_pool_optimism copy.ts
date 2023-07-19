// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import YearnLinearPoolFactory from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPoolFactory.json';
import BooLinearPoolFactory from '../tasks/20221205-boo-linear-pool-v2/build-info/BooLinearPoolFactory.json';
import YearnLinearPool from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPool.json';
import WeightedPoolV2Factory from '../tasks/20220908-weighted-pool-v2/artifact/WeightedPoolFactory.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const WSTETH = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';
const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';

const WSTETH_RATE_PROVIDER = '0x9aa3cd420f830E049e2b223D0b07D8c809C94d15';
const USDC_RATE_PROVIDER = '0x0000000000000000000000000000000000000000';

const WEIGHTED_POOL_V2_FACTORY_ADDRESS = '0xad901309d9e9dbc5df19c84f729f429f0189a633';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV2Factory.abi, WEIGHTED_POOL_V2_FACTORY_ADDRESS);

  console.log('Calling create on the WeightedPoolV2Factory...');

  const tx = await factory.create(
    'The Earth Rocket Bomb',
    'BPT-WSTETH-USDC',
    [WSTETH, USDC],
    [fp(0.5), fp(0.5)],
    [WSTETH_RATE_PROVIDER, USDC_RATE_PROVIDER],
    fp(0.0001),
    POOL_OWNER
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the WeightedPoolV2Factory at address ${poolAddress}`);
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
