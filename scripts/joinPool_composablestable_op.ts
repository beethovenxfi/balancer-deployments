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

const WSTETH = '0x1F32b1c2345538c0c6f582fCB022739c4A194Ebb';
const WETH = '0x4200000000000000000000000000000000000006';
const USDC = '0x7F5c764cBc14f9669B88837ca1490cCa17c31607';
const USDT = '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58';
const DAI = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1';
const MAI = '0xdFA46478F9e5EA86d57387849598dbFB2e964b02';

const VAULT_ADDRESS = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
const WSTETH_USDC_POOLID = '0x899f737750db562b88c1e412ee1902980d3a4844000200000000000000000081';
const STABLE_BEETS_POOLID = '0x6b704813007545df4f7e2c75ebc804d3a6317549000000000000000000000089 ';
const MAISELF_POOLID = '0x3f16f0301b62015b926c3b559b645a5a0e19d8aa00000000000000000000008a';
const WSTETH_META_POOLID = '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb200020000000000000000008b';

const ERN = '0xc5b001dc33727f8f26880b184090d3e252470d45';

const bbrfUSDC = '0xDc2007D9e9A33f50630F26069FAab69c25f7758C';

const bbrfUSDT = '0xBEF1ccAaDA458a570C37B11A8872988bA1E4FDb9';

const bbrfusd = '0x64cee2338369aa9b36fc756ea231eb9bc242926f';

const RFSOWBTCLINEAR = '0x6af3737F6d58Ae8Bcb9f2B597125D37244596E59';
const RFSOWSTETHLINEAR = '0x7e9250cC13559eB50536859e8C076Ef53e275Fb3';
const BBRFSOUSDC = '0xedcfaf390906a8f91fb35b7bac23f3111dbaee1c';

const OVERNIGHT_ACTII_POOLID = '0x43da214fab3315aa6c02e0b8f2bfb7ef2e3c60a50000000000000000000000ae';
const OVERNIGHT_ACTII_POOLADDRESS = '0x43da214fab3315aA6c02e0B8f2BfB7Ef2E3C60A5';
const BB_USDPLUS = '0x88d07558470484c03d3bb44c3ecc36cafcf43253';
const BB_DAIPLUS = '0xb5ad7d6d6f92a77f47f98c28c84893fbccc94809';

const POOL_ADDRESS = '0xe94c45dE980f914904FDcFA9fbbe7c4A0FFe6ac7';
const POOLID = '0xe94c45de980f914904fdcfa9fbbe7c4a0ffe6ac70000000000000000000000e0';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS);

  //linear 1
  await initJoinPool(
    {
      vault: vault,
      poolId: POOLID,
      tokens: [bbrfusd, ERN, POOL_ADDRESS],
      initialBalances: [parseUnits('0.01', 18), parseUnits('0.01', 18), fp(10_000_000_000_000_000)],
    },
    true
  );

  //linear 2
  // await joinPool({
  //   vault: vault,
  //   poolId: DAIPLUS_LINEAR_POOLID,
  //   tokens: [DAI],
  //   initialBalances: [parseUnits('0.1', 18)],
  // });

  //composable
  // await joinPool({
  //   vault: vault,
  //   poolId: WSTETH_META_POOLID,
  //   tokens: [WSTETH, WETH],
  //   initialBalances: [parseUnits('0.002', 18), parseUnits('0.002', 18)],
  // });
}

join().catch((e) => {
  console.log('error', e);
});
