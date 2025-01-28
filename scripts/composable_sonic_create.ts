// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ComposableStablePoolV6Factory from '../v2/tasks/20240223-composable-stable-pool-v6/artifact/ComposableStablePoolFactory.json';
import { fp } from '../src/helpers/numbers';
import { COMPOSABLE_STABLE_POOL_V6_FACTORY_SONIC, POOL_OWNER_SONIC, TOKENS } from './constants';

async function create() {
  const factory = await ethers.getContractAt(ComposableStablePoolV6Factory.abi, COMPOSABLE_STABLE_POOL_V6_FACTORY_SONIC);

  // BEGIN ====== variables ====== BEGIN

  const poolName = 'Atoll\'s Ether '
  const poolSymbol = 'bpt-ateth-weth';
  const amp = 200;
  const yieldFeeExemption = false;
  const swapFee = 0.04; // as true percentage 0.04 => 0.04%
  const random = '0x508386059394506d816cb2e782f2395981d492caf02ea51bfbe905a2972918f9'; // https://www.browserling.com/tools/random-hex

  const tokens = [TOKENS['SONIC'].ATETH, TOKENS['SONIC'].WETH, ];

  // END ====== variables ====== END

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address)); // sort on address case insensitive

  console.log({ sortedTokens });

  console.log('Calling create on the ComposableStableV6Factory...');

  const tx = await factory.create(
    poolName,
    poolSymbol,
    sortedTokens.map((token) => token.address),
    amp, //amp
    sortedTokens.map((token) => token.rateProvider), // rate provider
    sortedTokens.map((token) => token.cache), // cache
    yieldFeeExemption, // yield fee exemption
    fp(swapFee / 100), // swap fee
    POOL_OWNER_SONIC,
    random // random string
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the ComposableStableV6 at address ${poolAddress}`);
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
