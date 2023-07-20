// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { FundManagement, SingleSwap } from '@balancer-labs/sdk';
import { MAX_UINT256 } from '../src/helpers/constants';
import { BigNumber } from 'ethers';
import VaultAbi from '../tasks/20210418-vault/artifact/Vault.json';
import XBOOABI from './abi/xboo.json';
import BOOABI from './abi/boo.json';
import { getAddress } from '@ethersproject/address';
import { parseUnits } from 'ethers/lib/utils';

const boo = '0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE';
const xboo = getAddress('0xa48d959AE2E88f1dAA7D5F611E01908106dE7598');

const bbbooLinearPoolId = '0x71959b131426fdb7af01de8d7d4149ccaf09f8cc0000000000000000000002e7';
const bbbooLinearPoolAddress = '0x71959b131426fdb7af01de8d7d4149ccaf09f8cc';

const sender = process.env.DEPLOYER_ADDRESS || ''; //deployer

const vault = '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce';
const remoteVaultAbi = XBOOABI;
const wrappedTokenAddress = xboo;
const linearPoolId = bbbooLinearPoolId;
const linearPoolAddress = bbbooLinearPoolAddress;
const mainTokenAddress = boo;

const direction: 'wrap' | 'unwrap' = 'unwrap';

async function loop() {
  const balancerVault = await ethers.getContractAt(VaultAbi.abi, vault);
  const remoteVault = await ethers.getContractAt(remoteVaultAbi, wrappedTokenAddress);
  const mainToken = await ethers.getContractAt(BOOABI, mainTokenAddress);
  const vaultToken = await ethers.getContractAt(XBOOABI, wrappedTokenAddress);

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

  console.log(`Approve swap`);
  const approve = await mainToken.approve(vault, mainTokenBalance);
  await approve.wait();

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
    const withdrawTransaction = await remoteVault.leave(vaultTokenBalance);
    await withdrawTransaction.wait();

    console.log('leave complete ' + i);
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

function formatFixed(mainTokenBalance: BigNumber, arg1: number): any {
  throw new Error('Function not implemented.');
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
