// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import YearnLinearPoolFactory from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPoolFactory.json';
import BooLinearPoolFactory from '../tasks/20221205-boo-linear-pool-v2/build-info/BooLinearPoolFactory.json';
import YearnLinearPool from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPool.json';
// import WeightedPoolV2Factory from '../tasks/20220908-weighted-pool-v2/artifact/WeightedPoolFactory.json';
import WeightedPoolV3Factory from '../tasks/20230206-weighted-pool-v3/artifact/WeightedPoolFactory.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const IB = '0x00a35fd824c717879bf370e70ac6868b95870dfb';
const WSTETH = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';
const FBOMB = '0x74ccbe53F77b08632ce0CB91D3A545bF6B8E0979';
const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';
const RETH = '0x9bcef72be871e61ed4fbbc7630889bee758eb81d';
const NFTE = '0xc96f4F893286137aC17e07Ae7F217fFca5db3AB6';

const WSTETH_RATE_PROVIDER = '0x9aa3cd420f830E049e2b223D0b07D8c809C94d15';
const RETH_RATE_PROVIDER = '0x658843bb859b7b85ceab5cf77167e3f0a78dfe7f';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const WEIGHTED_POOL_V3_FACTORY_ADDRESS = '0xA0DAbEBAAd1b243BBb243f933013d560819eB66f';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV3Factory.abi, WEIGHTED_POOL_V3_FACTORY_ADDRESS);

  console.log('Calling create on the WeightedPoolV3Factory...');

  const tx = await factory.create(
    'The Earth Rocket Bomb',
    'BPT-TERB',
    [FBOMB, RETH, NFTE],
    [fp(0.2), fp(0.2), fp(0.6)],
    [ZERO_ADDRESS, RETH_RATE_PROVIDER, ZERO_ADDRESS],
    fp(0.02),
    POOL_OWNER
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the WeightedPoolV3Factory at address ${poolAddress}`);
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
