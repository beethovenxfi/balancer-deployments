// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import YearnLinearPoolFactory from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPoolFactory.json';
import BooLinearPoolFactory from '../tasks/20221205-boo-linear-pool-v2/build-info/BooLinearPoolFactory.json';
import YearnLinearPool from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPool.json';
// import WeightedPoolV2Factory from '../tasks/20220908-weighted-pool-v2/artifact/WeightedPoolFactory.json';
import WeightedPoolV4Factory from '../tasks/20230320-weighted-pool-v4/artifact/WeightedPoolFactory.json';
import { toNormalizedWeights } from '@balancer-labs/balancer-js/src';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const PSP = '0xd3594E879B358F430E20F82bea61e83562d49D48';
const OP = '0x4200000000000000000000000000000000000042';
const WETH = '0x4200000000000000000000000000000000000006';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const WEIGHTED_POOL_V4_FACTORY_ADDRESS = '0x230a59f4d9adc147480f03b0d3fffecd56c3289a';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV4Factory.abi, WEIGHTED_POOL_V4_FACTORY_ADDRESS);

  console.log('Calling create on the WeightedPoolV4Factory...');

  const tx = await factory.create(
    'Blue Rev',
    'BPT-BREV',
    [WETH, PSP],
    toNormalizedWeights([fp(0.2), fp(0.8)]),
    [ZERO_ADDRESS, ZERO_ADDRESS],
    fp(0.01),
    POOL_OWNER,
    '0xc8c9b8d7bfa71e4afc0209da0c5efea8543d12fcefac342149391e4154c3dd85'
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
