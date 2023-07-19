// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ReaperLinearFactory from '../tasks/20221007-reaper-linear-pool-v2/abi/ReaperLinearPoolFactory.json';
import ReaperLinear from '../tasks/20221007-reaper-linear-pool-v2/abi/ReaperLinearPool.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { getAddress } from '@ethersproject/address';
import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const WBTC = getAddress('0x68f180fcce6836688e9084f035309e29bf0a2095');
const RFSOWBTC = getAddress('0x73e51b0368Ef8bD0070b12DD992C54aA53BCB5F4'); //reaper crypt

const OP = '0x4200000000000000000000000000000000000042';
const WSTETH = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';
const WETH = '0x4200000000000000000000000000000000000006';
const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';
const USDT = '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
const DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1';
const MAI = '0xdFA46478F9e5EA86d57387849598dbFB2e964b02';

const RFSOWSTETH = getAddress('0x3573De618AE4A740fb24215d93f4483436FbB2b6'); //reaper crypt

const REAPER_LINEAR_FACTORY_V3 = '0xe4B88E745Dce9084B9fc2439F85A9a4C5CD6f361';
const BEEFY_LINEAR_FACTORY_V1 = '0xE77f03F5007Df49005CAf2a2f1D872c51aE51fD1';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

const rfusdc = '0x508734b52ba7e04ba068a2d4f67720ac1f63df47';
const rfusdt = '0x51868bb8b71fb423b87129908fa039b880c8612d';
const rfdai = '0xc0f5da4fb484ce6d8a6832819299f7cd0d15726e';
const rfweth = '0x1bad45e92dce078cf68c2141cd34f54a02c92806';
const rfwsteth = '0xb19f4d65882f6c103c332f0bc012354548e9ce0e';
const rfwbtc = '0xf6533b6fcb3f42d2fc91da7c379858ae6ebc7448';
const rfop = '0xcecd29559a84e4d4f6467b36bbd4b9c3e6b89771';

async function create() {
  const factory = await ethers.getContractAt(ReaperLinearFactory, REAPER_LINEAR_FACTORY_V3);

  console.log('Calling create on the ReaperLinearPoolFactory...');

  const tx = await factory.create(
    'Beets Reaper Boosted USDT',
    'bb-rfUSDT',
    USDT,
    rfusdt,
    fp(300000),
    fp(0.00001),
    POOL_OWNER
  );
  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);
  const pool = await ethers.getContractAt(ReaperLinear, poolAddress);
  const poolId = await pool.getPoolId();

  console.log(`Successfully deployed the ReaperLinearPoolFactory at address ${poolAddress} with id ${poolId}`);
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
