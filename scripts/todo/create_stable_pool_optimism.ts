// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import StablePoolV2Factory from '../tasks/20220609-stable-pool-v2/artifact/StablePoolFactory.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';
const USDT = '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
const DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1';
const MAI = '0xdFA46478F9e5EA86d57387849598dbFB2e964b02';

const STABLE_POOL_V2_FACTORY_ADDRESS = '0xeb151668006CD04DAdD098AFd0a82e78F77076c3';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

async function create() {
  const factory = await ethers.getContractAt(StablePoolV2Factory.abi, STABLE_POOL_V2_FACTORY_ADDRESS);

  console.log('Calling create on the StablePoolV2Factory...');

  const tx = await factory.create(
    'Me, MAIself and I',
    'BPT-MAISELF-I',
    [USDC, USDT, MAI],
    500, // amp
    fp(0.0001), //swapfee 0.01%
    POOL_OWNER
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the StablePoolV2Factory at address ${poolAddress}`);
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
