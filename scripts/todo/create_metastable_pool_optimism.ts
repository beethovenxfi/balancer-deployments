// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import MetaStablePoolV2Factory from '../tasks/deprecated/20210727-meta-stable-pool/artifact/MetaStablePoolFactory.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const WSTETH = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';
const WETH = '0x4200000000000000000000000000000000000006';
const METASTABLE_POOL_FACTORY_ADDRESS = '0xb08e16cfc07c684daa2f93c70323badb2a6cbfd2';

const WSTETH_RATE_PROVIDER = '0x9aa3cd420f830E049e2b223D0b07D8c809C94d15';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

async function create() {
  const factory = await ethers.getContractAt(MetaStablePoolV2Factory.abi, METASTABLE_POOL_FACTORY_ADDRESS);

  console.log('Calling create on the MetaStablePoolFactory...');

  const tx = await factory.create(
    'Shanghai Shakedown',
    'BPT-WSTETH-WETH',
    [WSTETH, WETH],
    500, // amp
    [WSTETH_RATE_PROVIDER, ZERO_ADDRESS],
    [10800, 0],
    fp(0.0001), //swapfee 0.04%
    true,
    ZERO_ADDRESS
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the MetaStablePoolFactory at address ${poolAddress}`);
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
