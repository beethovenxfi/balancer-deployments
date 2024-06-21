// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ComposableStablePoolV5Factory from '../tasks/20230711-composable-stable-pool-v5/artifact/ComposableStablePoolFactory.json';
import { fp } from '../src/helpers/numbers';
import { COMPOSABLE_STABLE_POOL_V5_FACTORY_OP, POOL_OWNER_OP, TOKENS } from './constants';

async function create() {
  const factory = await ethers.getContractAt(ComposableStablePoolV5Factory.abi, COMPOSABLE_STABLE_POOL_V5_FACTORY_OP);

  // BEGIN ====== variables ====== BEGIN

  const poolName = 'Stake me baby one more time';
  const poolSymbol = 'bpt-weethwsteth';
  const amp = 100;
  const yieldFeeExemption = false;
  const swapFee = 0.04; // as true percentage 0.04 => 0.04%
  const random = '0x20d83280560cd1358fb501dfde87eda028fcad0fabd2cced3a7bcd7bcd94a671'; // https://www.browserling.com/tools/random-hex

  const tokens = [TOKENS['OPTIMISM'].WSTETH, TOKENS['OPTIMISM'].WEETH];

  // END ====== variables ====== END

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address)); // sort on address case insensitive

  console.log({ sortedTokens });

  console.log('Calling create on the ComposableStableV5Factory...');

  const tx = await factory.create(
    poolName,
    poolSymbol,
    sortedTokens.map((token) => token.address),
    amp, //amp
    sortedTokens.map((token) => token.rateProvider), // rate provider
    sortedTokens.map((token) => token.cache), // cache
    yieldFeeExemption, // yield fee exemption
    fp(swapFee / 100), // swap fee
    POOL_OWNER_OP,
    random // random string
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the ComposableStableV5Factory at address ${poolAddress}`);
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
