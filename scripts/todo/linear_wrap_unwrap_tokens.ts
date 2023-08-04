// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { FundManagement, SingleSwap } from '@balancer-labs/sdk';
import { MAX_UINT256 } from '../src/helpers/constants';
import { BigNumber } from 'ethers';
import VaultAbi from '../tasks/20210418-vault/artifact/Vault.json';
import YearnVaultAbi from './abi/yearnvault.json';
import RfCryptAbi from './abi/rfcrypt.json';
import IERC20Abi from './abi/IERC20.json';
import { getAddress } from '@ethersproject/address';

const USDC = getAddress('0x04068DA6C83AFCFA0e13ba15A6696662335D5B75');
const yvUSDC = getAddress('0xEF0210eB96c7EB36AF8ed1c20306462764935607');
const DAI = getAddress('0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E');
const yvDAI = getAddress('0x637eC617c86D24E421328e6CAEa1d92114892439');
const USDT = getAddress('0x049d68029688eAbF473097a2fC38ef61633A3C7A');
const yvUSDT = getAddress('0x148c05caf1Bb09B5670f00D511718f733C54bC4c');
const yvWBTC = getAddress('0xd817A100AB8A29fE3DBd925c2EB489D67F758DA9');
const WBTC = getAddress('0x321162Cd933E2Be498Cd2267a90534A804051b11');
const yvFRAX = getAddress('0x357ca46da26E1EefC195287ce9D838A6D5023ef3');
const FRAX = getAddress('0xdc301622e621166BD8E82f2cA0A26c13Ad0BE355');
const yvWETH = getAddress('0xCe2Fc0bDc18BD6a4d9A725791A3DEe33F3a23BB7');
const WETH = getAddress('0x74b23882a30290451A17c44f4F05243b6b58C76d');

const bbyvDAI = getAddress('0x2Ff1552Dd09f87d6774229Ee5eca60CF570AE291');
const bbyvDAIPoolId = '0x2ff1552dd09f87d6774229ee5eca60cf570ae291000000000000000000000186';
const bbyvUSDC = getAddress('0x3b998ba87b11a1c5bc1770de9793b17a0da61561');
const bbyvUSDCPoolId = '0x3b998ba87b11a1c5bc1770de9793b17a0da61561000000000000000000000185';
const bbyvUSDT = getAddress('0xFE0004cA84bac1D9CF24a3270BF70Be7E68e43aC');
const bbyvUSDTPoolId = '0xfe0004ca84bac1d9cf24a3270bf70be7e68e43ac0000000000000000000003c5';
const bbyvWBTC = getAddress('0x42538Ce99111ea34dc2987b141Bd6E9b594752D6');
const bbyvWBTCPoolId = '0x42538ce99111ea34dc2987b141bd6e9b594752d60000000000000000000002f9';
const bbyvFRAX = getAddress('0x7cF76BCCfA5d3340D42F08351552f5a59dC6089C');
const bbyvFRAXPoolId = '0x7cf76bccfa5d3340d42f08351552f5a59dc6089c000000000000000000000396';
const bbyvWETH = getAddress('0x44165faD0b7eA0D54d8856765D936d7026f9E2f2');
const bbyvWETHPoolID = '0x44165fad0b7ea0d54d8856765d936d7026f9e2f20000000000000000000002f8';

const bbrfTUSDPoolId = '0xb85a3fc39993b2e7e6874b8700b436c212a005160000000000000000000003d0';
const bbrfTUSD = getAddress('0xb85a3fc39993b2e7e6874b8700b436c212a00516');
const TUSD = getAddress('0x9879aBDea01a879644185341F7aF7d8343556B7a');
const rfTUSD = getAddress('0xbd81110596651c1b00b6a7d9d93e8831e227eae9');

const bbyvUSDPoolId = '0x5ddb92a5340fd0ead3987d3661afcd6104c3b757000000000000000000000187';
const bbyvUSD = getAddress('0x5ddb92A5340FD0eaD3987D3661AfcD6104c3b757');

const bbyvFTMPoolId = '0xc3bf643799237588b7a6b407b3fc028dd4e037d200000000000000000000022d';
const WFTM = getAddress('0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83');
const yvFTM = getAddress('0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0');

const bbrfWFTM = getAddress('0x92502cd8e00f5b8e737b2ba203fdd7cd27b23c8f');
const bbrfWFtmPoolId = '0x92502cd8e00f5b8e737b2ba203fdd7cd27b23c8f000000000000000000000718';
const rfWftm = getAddress('0x963ffcd14d471e279245ee1570ad64ca78d8e67e');

const bbrfUSDCPoolId = '0xc385e76e575b2d71eb877c27dcc1608f77fada99000000000000000000000719';
const bbrfUSDC = getAddress('0xc385e76e575b2d71eb877c27dcc1608f77fada99');
const rfUSDC = getAddress('0xd55c59da5872de866e39b1e3af2065330ea8acd6');

const sender = process.env.DEPLOYER_ADDRESS || ''; //deployer

const remoteVaultAbi = RfCryptAbi;
const vaultTokenAddress = rfWftm;
const linearPoolId = bbrfWFtmPoolId;
const linearPoolAddress = bbrfWFTM;
const mainTokenAddress = WFTM;

const direction: 'wrap' | 'unwrap' = 'wrap';

const VAULT_ADDRESS_OP = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';
const VAULT_ADDRESS_FTM = '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce';

async function loop() {
  const balancerVault = await ethers.getContractAt(VaultAbi.abi, VAULT_ADDRESS_OP);

  const remoteVault = await ethers.getContractAt(remoteVaultAbi, vaultTokenAddress);
  const mainToken = await ethers.getContractAt(IERC20Abi, mainTokenAddress);
  const vaultToken = await ethers.getContractAt(IERC20Abi, vaultTokenAddress);

  // 10 USDC
  const mainTokenBalanceUsed = '0';

  for (let i = 0; i < 1; i++) {
    if (direction === 'unwrap') {
      await unwrap(mainToken, balancerVault, i, remoteVault, linearPoolId, vaultToken, mainTokenBalanceUsed);
    } else if (direction === 'wrap') {
      await wrap(mainToken, balancerVault, i, remoteVault, linearPoolId, vaultToken, mainTokenBalanceUsed);
    }
  }
}

loop().catch((e) => {
  console.log('error', e);
});

async function unwrap(
  mainToken: any,
  balancerVault: any,
  i: number,
  remoteVault: any,
  linearPoolId: string,
  vaultToken: any,
  mainTokenBalanceUsed: string
) {
  let mainTokenBalance = BigNumber.from('0');
  if (mainTokenBalanceUsed === '0') {
    mainTokenBalance = await mainToken.balanceOf(sender);
  } else {
    mainTokenBalance = BigNumber.from(mainTokenBalanceUsed);
  }
  console.log('main token balance', mainTokenBalance.toString());

  if (mainTokenBalance.lte('0')) {
    console.log('no maintoken');
    return;
  }

  // swap for vault token
  const data: SingleSwap = {
    poolId: linearPoolId,
    kind: 0,
    assetIn: mainToken,
    assetOut: vaultToken,
    amount: mainTokenBalance,
    userData: '0x', //the user data here is not relevant on the swap
  };

  const funds: FundManagement = {
    sender,
    fromInternalBalance: false,
    toInternalBalance: false,
    recipient: sender,
  };

  const swapTransaction = await balancerVault.swap(data, funds, BigNumber.from('0'), MAX_UINT256);
  await swapTransaction.wait();
  console.log('swap complete ' + i);

  // withdraw main asset
  const vaultTokenBalance = await remoteVault.balanceOf(sender);

  console.log('vault token balance', vaultTokenBalance.toString());

  if (vaultTokenBalance.gt('0')) {
    const withdrawTransaction = await remoteVault.deposit(vaultTokenBalance);
    await withdrawTransaction.wait();

    console.log('unwrap complete ' + i);
  }
}

async function wrap(
  mainToken: any,
  balancerVault: any,
  i: number,
  remoteVault: any,
  linearPoolId: string,
  vaultToken: any,
  mainTokenBalanceUsed: string
) {
  let mainTokenBalance = BigNumber.from('0');
  if (mainTokenBalanceUsed === '0') {
    mainTokenBalance = await mainToken.balanceOf(sender);
  } else {
    mainTokenBalance = BigNumber.from(mainTokenBalanceUsed);
  }
  console.log('main token balance', mainTokenBalance.toString());

  // deposit main asset

  if (mainTokenBalance.lte('0')) {
    console.log('no maintoken');
    return;
  }

  const approveTransaction = await mainToken.approve(remoteVault.address, mainTokenBalance);
  await approveTransaction.wait();

  const depositTransaction = await remoteVault.deposit(mainTokenBalance);
  await depositTransaction.wait();

  console.log('wrap complete ' + i);
  const vaultTokenBalance = await remoteVault.balanceOf(sender);
  console.log('vault token balance', vaultTokenBalance.toString());

  const approveVaultTransaction = await vaultToken.approve(balancerVault.address, vaultTokenBalance);
  await approveVaultTransaction.wait();

  const data: SingleSwap = {
    poolId: linearPoolId,
    kind: 0,
    assetIn: vaultToken.address,
    assetOut: mainToken.address,
    amount: vaultTokenBalance,
    userData: '0x', //the user data here is not relevant on the swap
  };

  const funds: FundManagement = {
    sender,
    fromInternalBalance: false,
    toInternalBalance: false,
    recipient: sender,
  };

  const swapTransaction = await balancerVault.swap(data, funds, BigNumber.from('0'), MAX_UINT256);
  await swapTransaction.wait();
  console.log('swap complete ' + i);
}
/*

    const data: SingleSwap = {
      poolId: bbyvUSDCPoolId,
      kind: 1, //0 means the amount is givenIn. 1 is for giventOut
      assetIn: USDC,
      assetOut: yvUSDC,
      amount: '5',
      userData: '0x', //the user data here is not relevant on the swap
    };

    const funds: FundManagement = {
      sender,
      fromInternalBalance: false,
      toInternalBalance: false,
      recipient: sender,
    };

    const transaction = await vault.swap(data, funds, '1000000', MAX_UINT256);
    const receipt = await transaction.wait();
    console.log('swap complete ' + i);

    */
