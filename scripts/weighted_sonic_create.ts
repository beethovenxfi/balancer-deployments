// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import WeightedPoolV4Factory from '../v2/tasks/20230320-weighted-pool-v4/artifact/WeightedPoolFactory.json';

import { toNormalizedWeights } from '@balancer-labs/sdk';
import { fp } from '../src/helpers/numbers';
import { POOL_OWNER_SONIC, TOKENS } from './constants';

const WEIGHTED_POOL_V4_FACTORY_ADDRESS = '0x22f5b7FDD99076f1f20f8118854ce3984544D56d';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV4Factory.abi, WEIGHTED_POOL_V4_FACTORY_ADDRESS);

  const poolName = 'Sonic Quartet Audition - Act II';
  const poolSymbol = 'BPT-scaa-ii';
  const swapFee = 0.3; // as true percentage 0.04 => 0.04%
  const random = '0x0bd8e286f83ee8cb62771185529fc5492de1969fbb5e9ea11aa6827dedadcaad'; // https://www.browserling.com/tools/random-hex

  const tokens = [
    {
      ...TOKENS['SONIC'].SCBTC,
      weight: fp(0.25),
    },
    {
      ...TOKENS['SONIC'].SCETH,
      weight: fp(0.25),
    },
    {
      ...TOKENS['SONIC'].SCUSD,
      weight: fp(0.25),
    },
    {
      ...TOKENS['SONIC'].STS,
      weight: fp(0.25),
    },
  ];

  // END ====== variables ====== END

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address)); // sort on address case insensitive

  console.log('Calling create on the WeightedPoolV4Factory...');

  const tx = await factory.create(
    poolName,
    poolSymbol,
    sortedTokens.map((token) => token.address),
    toNormalizedWeights(sortedTokens.map((token) => token.weight)),
    sortedTokens.map((token) => token.rateProvider), // rate provider
    fp(swapFee / 100), // swap fee
    POOL_OWNER_SONIC,
    random //random string
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the WeightedPoolV4 at address ${poolAddress}`);
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
