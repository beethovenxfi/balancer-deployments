// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import WeightedPoolV4Factory from '../tasks/20230320-weighted-pool-v4/artifact/WeightedPoolFactory.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '../src/helpers/numbers';
import { toNormalizedWeights } from '@balancer-labs/sdk';
import { POOL_OWNER_OP, TOKENS } from './constants';

const WEIGHTED_POOL_V4_FACTORY_ADDRESS = '0x230a59f4d9adc147480f03b0d3fffecd56c3289a';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV4Factory.abi, WEIGHTED_POOL_V4_FACTORY_ADDRESS);

  const poolName = 'Roast Beets';
  const poolSymbol = 'bpt-roabee';
  const swapFee = 1.0; // as true percentage 0.04 => 0.04%
  const random = '0xda085bdeef8eb8f8ebabeaddde47cb75744d385d4fb70401d09c06cb00066877'; // https://www.browserling.com/tools/random-hex

  const tokens = [
    {
      ...TOKENS['OPTIMISM'].LZBEETS,
      weight: fp(0.8),
    },
    {
      ...TOKENS['OPTIMISM'].RETH,
      weight: fp(0.2),
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
    POOL_OWNER_OP,
    random //random string
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
