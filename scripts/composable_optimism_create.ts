// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ComposableStablePoolV5Factory from '../tasks/20230711-composable-stable-pool-v5/artifact/ComposableStablePoolFactory.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '../src/helpers/numbers';

const USDPLUS_LINEAR = '0x88D07558470484c03d3bb44c3ECc36CAfCF43253';
const DAIPLUS_LINEAR = '0xb5ad7d6d6F92a77F47f98C28C84893FBccc94809';
const ERN = '0xc5b001dc33727f8f26880b184090d3e252470d45';
const bbrfUSDC = '0xDc2007D9e9A33f50630F26069FAab69c25f7758C';
const bbrfUSDT = '0xBEF1ccAaDA458a570C37B11A8872988bA1E4FDb9';
const bbrfusd = '0x64cee2338369aa9b36fc756ea231eb9bc242926f';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const COMPOSABLESTABLE_POOL_V5_FACTORY_ADDRESS = '0x043A2daD730d585C44FB79D2614F295D2d625412';
const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

async function create() {
  const factory = await ethers.getContractAt(
    ComposableStablePoolV5Factory.abi,
    COMPOSABLESTABLE_POOL_V5_FACTORY_ADDRESS
  );

  // BEGIN ====== variables ====== BEGIN

  const poolName = 'Dollar Dollar Bills';
  const poolSymbol = 'bb-doldol';
  const amp = 40;
  const feeExemption = false;
  const swapFee = fp(0.0005);
  const random = '0xc4084939b87f183e144bbf3fdbcbbd0c356f0813344f298f8de1404f5e6d20e2'; // https://www.browserling.com/tools/random-hex

  const tokens = [
    {
      name: 'ERN',
      address: ERN,
      rateProvider: ZERO_ADDRESS,
      cache: 30,
    },
    {
      name: 'bbrfUSDC',
      address: bbrfUSDC,
      rateProvider: bbrfUSDC,
      cache: 30,
    },
    {
      name: 'bbrfUSDT',
      address: bbrfUSDT,
      rateProvider: bbrfUSDT,
      cache: 30,
    },
  ];

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
    POOL_OWNER,
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
