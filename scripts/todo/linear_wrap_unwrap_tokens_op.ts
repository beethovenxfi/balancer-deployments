// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { FundManagement, SingleSwap } from '@balancer-labs/sdk';
import { MAX_UINT256 } from '../../src/helpers/constants';
import { BigNumber } from 'ethers';
import VaultAbi from '../../tasks/20210418-vault/artifact/Vault.json';
import YearnVaultAbi from '../abi/yearnvault.json';
import RfCryptAbi from '../abi/rfcrypt.json';
import ERC20Abi from '../abi/ERC20.json';
import { getAddress } from '@ethersproject/address';
import { TOKENS } from '../constants';

const USDC = '0x7f5c764cbc14f9669b88837ca1490cca17c31607';
const rfUSDC = '0x508734b52ba7e04ba068a2d4f67720ac1f63df47';

const sender = process.env.DEPLOYER_ADDRESS || ''; //deployer

const remoteVaultAbi = RfCryptAbi;
const vaultTokenAddress = rfUSDC;
const linearPoolId = '0xf970659221bb9d01b615321b63a26e857ffc030b0000000000000000000000e9';
const mainTokenAddress = USDC;

const direction: 'wrap' | 'unwrap' = 'wrap';

const VAULT_ADDRESS_OP = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';

async function loop() {
  const balancerVault = await ethers.getContractAt(VaultAbi.abi, VAULT_ADDRESS_OP);

  const remoteVault = await ethers.getContractAt(remoteVaultAbi, vaultTokenAddress);
  const mainToken = await ethers.getContractAt(ERC20Abi, mainTokenAddress);
  const vaultToken = await ethers.getContractAt(ERC20Abi, vaultTokenAddress);

  // 10 USDC
  const mainTokenBalanceUsed = '100000';

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
    assetIn: mainToken.address,
    assetOut: vaultToken.address,
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

  // console.log('approve remote vault to deposit');
  // const approveTransaction = await mainToken.approve(remoteVault.address, mainTokenBalance);
  // await approveTransaction.wait();

  // console.log('deposit to remote vault');
  // const depositTransaction = await remoteVault.deposit(mainTokenBalance);
  // await depositTransaction.wait();

  const vaultTokenBalance = await remoteVault.balanceOf(sender);
  console.log('vault token balance', vaultTokenBalance.toString());

  // console.log('approve balancer vault swap');
  // const approveVaultTransaction = await vaultToken.approve(balancerVault.address, vaultTokenBalance);
  // await approveVaultTransaction.wait();

  const data: SingleSwap = {
    poolId: linearPoolId,
    kind: 0,
    assetIn: getAddress(vaultToken.address),
    assetOut: getAddress(mainToken.address),
    amount: vaultTokenBalance,
    userData: '0x', //the user data here is not relevant on the swap
  };

  const funds: FundManagement = {
    sender,
    fromInternalBalance: false,
    toInternalBalance: false,
    recipient: sender,
  };

  console.log('swap');
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
