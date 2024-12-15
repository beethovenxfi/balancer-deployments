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

  const poolName = 'Fresh Beets';
  const poolSymbol = 'bpt-fbeets-sts';
  const swapFee = 1; // as true percentage 0.04 => 0.04%
  const random = '0xc0bd3be808b757c58ac9c8b0dda2d353a6518a1af30d495b86ffc372d281e13a'; // https://www.browserling.com/tools/random-hex

  const tokens = [
    {
      ...TOKENS['SONIC'].BEETS,
      weight: fp(0.80),
    },
    {
      ...TOKENS['SONIC'].STS,
      weight: fp(0.20),
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
