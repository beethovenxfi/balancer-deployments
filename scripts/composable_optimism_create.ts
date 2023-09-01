// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ComposableStablePoolV5Factory from '../tasks/20230711-composable-stable-pool-v5/artifact/ComposableStablePoolFactory.json';
import { fp } from '../src/helpers/numbers';
import { COMPOSABLE_STABLE_POOL_V5_FACTORY_OP, POOL_OWNER_OP, TOKENS } from './constants';


async function create() {
  const factory = await ethers.getContractAt(
    ComposableStablePoolV5Factory.abi,
    COMPOSABLE_STABLE_POOL_V5_FACTORY_OP
  );

  // BEGIN ====== variables ====== BEGIN

  const poolName = 'Sonata for Two: DOLA & USDC';
  const poolSymbol = 'bpt-dolausdc';
  const amp = 200;
  const feeExemption = false;
  const swapFee = fp(0.002);
  const random = '0x3204c89905c57b192942dfb2afd8236150c85a68a88880bda05256b2300d8a30'; // https://www.browserling.com/tools/random-hex

  const tokens = [TOKENS['OPTIMISM'].USDC, TOKENS['OPTIMISM'].DOLA];

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
    feeExemption, //fee exemption
    swapFee, //swap fee
    POOL_OWNER_OP,
    random //random string
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
