// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '@balancer-labs/v2-deployments/tasks/20210418-vault/artifact/Vault.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { getAddress } from '@ethersproject/address';
import { BigNumber, fp } from '@balancer-labs/v2-helpers/src/numbers';
import { initJoinPool } from './helpers';

const OP = '0x4200000000000000000000000000000000000042';
const PSP = '0xd3594E879B358F430E20F82bea61e83562d49D48';
const WETH = '0x4200000000000000000000000000000000000006';

const VAULT_ADDRESS = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';

const POOL_ID = '0x11f0b5cca01b0f0a9fe6265ad6e8ee3419c684400002000000000000000000d4';

const RFSOWBTCLINEAR = '0x6af3737F6d58Ae8Bcb9f2B597125D37244596E59';
const RFSOWSTETHLINEAR = '0x7e9250cC13559eB50536859e8C076Ef53e275Fb3';
const BBRFSOUSDC = '0xedcfaf390906a8f91fb35b7bac23f3111dbaee1c';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS);
  console.log('got vault');
  await initJoinPool(
    {
      vault: vault,
      poolId: POOL_ID,
      tokens: [WETH, PSP],
      initialBalances: [parseUnits('0.00000448028', 18), parseUnits('1', 18)],
    },
    false
  );
}

join().catch((e) => {
  console.log('error', e);
});
