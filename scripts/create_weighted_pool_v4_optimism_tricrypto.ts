// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';

import YearnLinearPoolFactory from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPoolFactory.json';
import BooLinearPoolFactory from '../tasks/20221205-boo-linear-pool-v2/build-info/BooLinearPoolFactory.json';
import YearnLinearPool from '../tasks/20221114-yearn-linear-pool-v2/abi/YearnLinearPool.json';
// import WeightedPoolV2Factory from '../tasks/20220908-weighted-pool-v2/artifact/WeightedPoolFactory.json';
import WeightedPoolV4Factory from '../tasks/20230320-weighted-pool-v4/artifact/WeightedPoolFactory.json';
import { toNormalizedWeights } from '@balancer-labs/balancer-js/src';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';

const RFSOWBTCLINEAR = '0x6af3737F6d58Ae8Bcb9f2B597125D37244596E59';
const RFSOWSTETHLINEAR = '0x7e9250cC13559eB50536859e8C076Ef53e275Fb3';
const BBRFSOUSDC = '0xedcfaf390906a8f91fb35b7bac23f3111dbaee1c';

const WSTETH_RATEPROVIDER = '0x5B043A12936777Cf18fC7Ba259673C795DE932a6';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const WEIGHTED_POOL_V4_FACTORY_ADDRESS = '0x230a59f4d9adc147480f03b0d3fffecd56c3289a';

const POOL_OWNER = '0xd9e2889AC8C6fFF8e94c7c1bEEAde1352dF1A513';

async function create() {
  const factory = await ethers.getContractAt(WeightedPoolV4Factory.abi, WEIGHTED_POOL_V4_FACTORY_ADDRESS);

  console.log('Calling create on the WeightedPoolV4Factory...');

  const tx = await factory.create(
    'Tri-SONNE Harmonic Crescendo',
    'bb-rf-SOTRI',
    [RFSOWBTCLINEAR, RFSOWSTETHLINEAR, BBRFSOUSDC],
    toNormalizedWeights([fp(0.25), fp(0.5), fp(0.25)]),
    [RFSOWBTCLINEAR, WSTETH_RATEPROVIDER, BBRFSOUSDC],
    fp(0.004),
    POOL_OWNER,
    '0x1e939abaf96bf39842eb1426beb842be0f3d90d24af345eb963ea02eacede0a4'
  );

  const { poolAddress, blockHash } = await getPoolAddressAndBlockHashFromTransaction(tx);

  console.log(`Successfully deployed the WeightedPoolVt4Factory at address ${poolAddress}`);
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
