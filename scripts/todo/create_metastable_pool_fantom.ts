// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import MetaStablePoolV2Factory from '../tasks/deprecated/20210727-meta-stable-pool/artifact/MetaStablePoolFactory.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const METASTABLE_POOL_FACTORY_ADDRESS = '0x70b55Af71B29c5Ca7e67bD1995250364C4bE5554';

const ANKRFTM_RATE_PROVIDER = '0x7D896Ac06cA45E6a2982E236f3bf6b4C8D7B5705';
const ANKRETH_RATE_PROVIDER = '0x14725A954Af71CbbdE6F43Cc5e3D34B9DFf64218';

const WFTM = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83';
const ANKRFTM = '0xCfC785741Dc0e98ad4c9F6394Bb9d43Cd1eF5179';
const WETH = '0x74b23882a30290451A17c44f4F05243b6b58C76d';
const ANKRWETH = '0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C';

const POOL_OWNER = '0xCd983793ADb846dcE4830c22F30C7Ef0C864a776';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

async function create() {
  const factory = await ethers.getContractAt(MetaStablePoolV2Factory.abi, METASTABLE_POOL_FACTORY_ADDRESS);

  console.log('Calling create on the MetaStablePoolFactory...');

  const tx = await factory.create(
    'Ankr Ethereum Liquid Ocean',
    'BPT-aETH-wETH',
    [ANKRWETH, WETH],
    100, // amp
    [ANKRETH_RATE_PROVIDER, ZERO_ADDRESS],
    [0, 30],
    fp(0.0006), //swapfee 0.06%
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
