// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import ComposableStablePoolV4Factory from '../tasks/20230320-composable-stable-pool-v4/artifact/ComposableStablePoolFactory.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const USDPLUS_LINEAR = '0x88D07558470484c03d3bb44c3ECc36CAfCF43253';
const DAIPLUS_LINEAR = '0xb5ad7d6d6F92a77F47f98C28C84893FBccc94809';

const ERN = '0xc5b001dc33727f8f26880b184090d3e252470d45';

const bbrfUSDC = '0xDc2007D9e9A33f50630F26069FAab69c25f7758C';

const bbrfUSDT = '0xBEF1ccAaDA458a570C37B11A8872988bA1E4FDb9';

const bbrfusd = '0x64cee2338369aa9b36fc756ea231eb9bc242926f';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const COMPOSABLESTABLE_POOL_V4_FACTORY_ADDRESS = '0x1802953277FD955f9a254B80Aa0582f193cF1d77';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

async function create() {
  const factory = await ethers.getContractAt(
    ComposableStablePoolV4Factory.abi,
    COMPOSABLESTABLE_POOL_V4_FACTORY_ADDRESS
  );

  console.log('Calling create on the ComposableStableV4Factory...');

  const tx = await factory.create(
    'Dollar Dollar Bills',
    'bb-ern-usd',
    [bbrfusd, ERN],
    40, //amp
    [bbrfusd, ZERO_ADDRESS], // rate provider
    [30, 30], // cache
    [true, false], //fee exemption
    fp(0.0005), //swap fee
    POOL_OWNER,
    '0x345035e3c664d23f7b0c60243eed23c375251864654a85c382e7b92946f146b7' //random string
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the ComposableStableV4Factory at address ${poolAddress}`);
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
