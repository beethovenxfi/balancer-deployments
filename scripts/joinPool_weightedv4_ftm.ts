// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';

// import ReaperLinearPoolV2Factory from './abi/ReaperLinearPoolV2Factory.json';
// import ReaperLinearPool from './abi/ReaperLinearPool.json';

import { getAddress } from '@ethersproject/address';
import { BigNumber, fp } from '../src/helpers/numbers';
import { initJoinPool } from './helpers';
import { WEEK } from '../src/helpers/time';

const WFTM = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83';
const bbrfWBTC = '0x3c1420df122AC809B9d1ba77906F833764D64501';
const bbrfWFTM = '0x92502cD8E00f5b8e737b2Ba203FDd7CD27B23c8f';
const bbrfWETH = '0xA0051aB2c3eb7F17758428b02a07cF72eB0EF1a3';
const ROCK_STEADY = '0xc46066ff87b3861ffc5c26ad2e9705190c22aa56';
const LQDR = '0x10b620b2dbac4faa7d7ffd71da486f5d44cd86f9';
const bbrfUSDC = '0xC385e76E575b2d71eB877c27DCc1608f77fadA99';

const ANKRWETH = '0x12D8CE035c5DE3Ce39B1fDD4C1d5a745EAbA3b8C';

const ANKRFTM = '0xCfC785741Dc0e98ad4c9F6394Bb9d43Cd1eF5179';

const ANKR = '0x0615Dbba33Fe61a31c7eD131BDA6655Ed76748B1';
const MATIC = '0x40df1ae6074c35047bff66675488aa2f9f6384f3';

const WSTA = '0xCEeBDE49eC95E21F7eE63C5c6f98CaB3519570de';
const BEETS = '0xF24Bcf4d1e507740041C9cFd2DddB29585aDCe1e';

const GRAIN = '0x02838746d9e1413e07ee064fcbada57055417f21';

const FRAXETH = '0x9E73F99EE061C8807F69f9c6CCc44ea3d8c373ee';
const AXLUSDC = '0x1B6382DBDEa11d97f24495C9A90b7c88469134a4';

const LZWBTC = '0xf1648C50d2863f780c57849D812b4B7686031A3D';
const LZUSDC = '0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf';
const LZWETH = '0x695921034f0387eAc4e11620EE91b1b15A6A09fE';
const LZUSDT = '0xcc1b99dDAc1a33c201a742A1851662E87BC7f22C';
const FRAX = '0xdc301622e621166bd8e82f2ca0a26c13ad0be355';

const AXLWBTC = '0x448d59B4302aB5d2dadf9611bED9457491926c8e';
const ERN = '0xce1E3cc1950D2aAEb47dE04DE2dec2Dc86380E0A';
const AXLWETH = '0xfe7eDa5F2c56160d406869A8aA4B2F365d544C7B';

const VAULT_ADDRESS = '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce';
const POOL_ID = '0x01027294bce2ac379c771b053d6754ba6292fbb0000200000000000000000765';

const BPT_DEUSX = '0x3eb521a33082e471f87df67b82e14e1c760fc861';

const BOO = '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE';

// WBTC 20%
// WETH 25%
// MATIC 20%
// FTM 20%
// USDC 15%

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS);
  console.log('got vault');
  await initJoinPool(
    {
      vault: vault,
      poolId: POOL_ID,
      tokens: [WFTM, BOO],
      initialBalances: [parseUnits('0.1', 18), parseUnits('0.040524', 18)],
    },
    true
  );
}

join().catch((e) => {
  console.log('error', e);
});
