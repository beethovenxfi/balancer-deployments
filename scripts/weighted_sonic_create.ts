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

  const poolName = 'Staked Sonic & Circle Concerto';
  const poolSymbol = 'BPT-USDCe-stS';
  const swapFee = 0.4; // as true percentage 0.04 => 0.04%
  const random = '0x4c393277952adbc463c0ca01dbe154da451afb54a620cedece6d636ebf287a77'; // https://www.browserling.com/tools/random-hex

  const tokens = [
    {
      ...TOKENS['SONIC'].STS,
      weight: fp(0.70),
    },
    {
      ...TOKENS['SONIC'].USDCE,
      weight: fp(0.30),
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
