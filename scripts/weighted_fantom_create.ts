// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import WeightedPoolV4Factory from '../v2/tasks/20230320-weighted-pool-v4/artifact/WeightedPoolFactory.json';

import { toNormalizedWeights } from '@balancer-labs/sdk';
import { fp } from '../src/helpers/numbers';
import { POOL_OWNER_FTM, TOKENS } from './constants';

const WEIGHTED_POOL_V4_FACTORY_ADDRESS = '0xb841Df73861E65E6D61a80F503F095a91ce75e15';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV4Factory.abi, WEIGHTED_POOL_V4_FACTORY_ADDRESS);

  const poolName = 'meme2 test';
  const poolSymbol = 'bpt-me2te';
  const swapFee = 1; // as true percentage 0.04 => 0.04%
  const random = '0x1795dbe5df9eb8bd14ff1d9e9727cead3190736c21f3341a7071de409372546c'; // https://www.browserling.com/tools/random-hex

  const tokens = [
    {
      ...TOKENS['FANTOM'].WFTM,
      weight: fp(0.15),
    },
    {
      ...TOKENS['FANTOM'].LFG,
      weight: fp(0.15),
    },
    {
      ...TOKENS['FANTOM'].PXL,
      weight: fp(0.14),
    },
    {
      ...TOKENS['FANTOM'].BPEPE,
      weight: fp(0.14),
    },
    {
      ...TOKENS['FANTOM'].POOH,
      weight: fp(0.14),
    },
    {
      ...TOKENS['FANTOM'].CONK2,
      weight: fp(0.14),
    },
    {
      ...TOKENS['FANTOM'].FDUCK,
      weight: fp(0.14),
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
    POOL_OWNER_FTM,
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