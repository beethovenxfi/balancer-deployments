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

const WFTM = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83';
const USDC = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75';

// const WSTETH_RATE_PROVIDER = '0x9aa3cd420f830E049e2b223D0b07D8c809C94d15';
// const USDC_RATE_PROVIDER = '0x0000000000000000000000000000000000000000';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const WEIGHTED_POOL_V2_FACTORY_ADDRESS = '0xB2ED595Afc445b47Db7043bEC25e772bf0FA1fbb';

const POOL_OWNER = '0xCd983793ADb846dcE4830c22F30C7Ef0C864a776';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV2Factory.abi, WEIGHTED_POOL_V2_FACTORY_ADDRESS);

  console.log('Calling create on the WeightedPoolV2Factory...');

  const tx = await factory.create(
    'Fantom of the Opera, Act II',
    'BPT-FOTO-II',
    [USDC, WFTM],
    [fp(0.3), fp(0.7)],
    [ZERO_ADDRESS, ZERO_ADDRESS],
    fp(0.002),
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
