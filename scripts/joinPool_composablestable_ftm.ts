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

const VAULT_ADDRESS = '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce';

const bbrfWFTM = '0x92502cD8E00f5b8e737b2Ba203FDd7CD27B23c8f';
const bbrfWFTMPoolId = '0x92502cd8e00f5b8e737b2ba203fdd7cd27b23c8f000000000000000000000718';
const bbrfWFTMRebalancer = '0x377ef852870ff2817e04b20629efdd583db49bac';

const bbrfUSDC = '0xC385e76E575b2d71eB877c27DCc1608f77fadA99';
const bbrfUSDCPoolId = '0xc385e76e575b2d71eb877c27dcc1608f77fada99000000000000000000000719';
const bbrfUSDCRebalancer = '0x268292559d120e101a38eff1d04e6d20a67334ea';

const bbrfDAI = '0x685056d3A4E574b163d0fa05A78F1B0b3aa04a80';
const bbrfDAIPoolId = '0x685056d3a4e574b163d0fa05a78f1b0b3aa04a8000000000000000000000071a';
const bbrfDAIRebalancer = '0x3c1420df122AC809B9d1ba77906F833764D64501';

const WFTM = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83';
const ANKRFTM = '0xCfC785741Dc0e98ad4c9F6394Bb9d43Cd1eF5179';

const bbrfWETH = '0xA0051aB2c3eb7F17758428b02a07cF72eB0EF1a3';
const bbrfWETHPoolId = '0xa0051ab2c3eb7f17758428b02a07cf72eb0ef1a300000000000000000000071c';
const bbrfWETHRebalancer = '0x8553fdc738521b0408c22897f6ceeed7f753a2c9';

const bbrfWBTC = '0x3c1420df122AC809B9d1ba77906F833764D64501';
const bbrfWBTCPoolId = '0x3c1420df122ac809b9d1ba77906f833764d6450100000000000000000000071b';
const bbrfWBTCRebalancer = '0xb7880303215e8cbcfad05a43ffde1a1396795df1';

const bbrfFUSDT = '0x442988091CDC18aCb8912Cd3Fe062CDA9233F9Dc';
const bbrfFUSDTPoolId = '0x442988091cdc18acb8912cd3fe062cda9233f9dc00000000000000000000071d';
const bbrfFUSDTRebalancer = '0x4e568a948fe772e36b696ac5b11b174e9807dfaa';

const ANKRWETH = '0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C';

const WETH = '0x74b23882a30290451a17c44f4f05243b6b58c76d';

const XDEUS = '0x953Cd009a490176FcEB3a26b9753e6F01645ff28';
const DEUS = '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44';

const SFTMX = '0xd7028092c830b5C8FcE061Af2E593413EbbC1fc1';

const LZWBTC = '0xf1648C50d2863f780c57849D812b4B7686031A3D';
const LZUSDC = '0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf';
const LZDAI = '0x91a40C733c97a6e1BF876EaF9ed8c08102eB491f';

const LZWETH = '0x695921034f0387eAc4e11620EE91b1b15A6A09fE';
const LZUSDT = '0xcc1b99dDAc1a33c201a742A1851662E87BC7f22C';
const FRAX = '0xdc301622e621166bd8e82f2ca0a26c13ad0be355';

const POOL_ID = '0xe401df443303232ab4866a625286f97bb26a98af000000000000000000000762';
const POOL_ADDRESS = '0xE401dF443303232aB4866A625286F97bB26a98AF';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS);

  await initJoinPool(
    {
      vault: vault,
      poolId: POOL_ID,
      tokens: [LZUSDC, LZDAI, LZUSDT, POOL_ADDRESS],
      initialBalances: [parseUnits('0.5', 6), parseUnits('0.5', 18), parseUnits('0.5', 6), fp(10_000_000_000_000_000)],
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
