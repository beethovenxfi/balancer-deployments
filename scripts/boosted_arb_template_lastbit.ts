// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { FundManagement, SingleSwap } from '@balancer-labs/balancer-js/src';
import { MAX_UINT256 } from '@balancer-labs/v2-helpers/src/constants';
import { BigNumber } from 'ethers';
import VaultAbi from '../tasks/20210418-vault/artifact/Vault.json';
import YearnVaultAbi from './abi/yearnvault.json';
import IERC20Abi from './abi/IERC20.json';
import RfCryptAbi from './abi/rfcrypt.json';

import { fp } from '@balancer-labs/v2-helpers/src/numbers';
import { getAddress } from '@ethersproject/address';
import { send } from 'process';

const USDC = getAddress('0x04068DA6C83AFCFA0e13ba15A6696662335D5B75');
const yvUSDC = getAddress('0xEF0210eB96c7EB36AF8ed1c20306462764935607');
const DAI = getAddress('0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E');
const yvDAI = getAddress('0x637eC617c86D24E421328e6CAEa1d92114892439');

const bbyvDAI = getAddress('0x2Ff1552Dd09f87d6774229Ee5eca60CF570AE291');
const bbyvDAIPoolId = '0x2ff1552dd09f87d6774229ee5eca60cf570ae291000000000000000000000186';
const bbyvUSDC = getAddress('0x3b998ba87b11a1c5bc1770de9793b17a0da61561');
const bbyvUSDCPoolId = '0x3b998ba87b11a1c5bc1770de9793b17a0da61561000000000000000000000185';

const bbyvUSDPoolId = '0x5ddb92a5340fd0ead3987d3661afcd6104c3b757000000000000000000000187';
const bbyvUSD = getAddress('0x5ddb92A5340FD0eaD3987D3661AfcD6104c3b757');

const bbyvFTMPoolId = '0xc3bf643799237588b7a6b407b3fc028dd4e037d200000000000000000000022d';
const FTM = getAddress('0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83');
const yvFTM = getAddress('0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0');

const bbrfTUSDPoolId = '0xb85a3fc39993b2e7e6874b8700b436c212a005160000000000000000000003d0';
const bbrfTUSD = getAddress('0xb85a3fc39993b2e7e6874b8700b436c212a00516');
const TUSD = getAddress('0x9879aBDea01a879644185341F7aF7d8343556B7a');
const rfTUSD = getAddress('0xbd81110596651c1b00b6a7d9d93e8831e227eae9');

const sender = '0x4fbe899d37fb7514adf2f41B0630E018Ec275a0C'; //deployer

async function loop() {
  const balancerVault = await ethers.getContractAt(VaultAbi.abi, '0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce');
  const stakingVault = await ethers.getContractAt(RfCryptAbi, rfTUSD);

  const vaultTokenBalance = await stakingVault.balanceOf('0x20dd72Ed959b6147912C2e529F0a0C651c33c9ce');

  console.log('vault token balance', vaultTokenBalance.toString());

  // const withdrawTransaction = await yearnVault.withdraw(vaultTokenBalance);
  // const withdrawReceipt = await withdrawTransaction.wait();

  // console.log('unwrap complete ' + i);

  const data: SingleSwap = {
    poolId: bbrfTUSDPoolId,
    kind: 1, //0 means the amount is givenIn. 1 is for giventOut
    assetIn: TUSD,
    assetOut: rfTUSD,
    amount: vaultTokenBalance,
    userData: '0x', //the user data here is not relevant on the swap
  };

  const funds: FundManagement = {
    sender,
    fromInternalBalance: false,
    toInternalBalance: false,
    recipient: sender,
  };

  const transaction = await balancerVault.swap(data, funds, '10000000000000000000000', MAX_UINT256);
  const receipt = await transaction.wait();
  console.log('swap complete');

  const vaultTokenBalanceSender = await stakingVault.balanceOf(sender);

  const withdrawTransaction = await stakingVault.withdraw(vaultTokenBalanceSender);
  const withdrawReceipt = await withdrawTransaction.wait();

  console.log('unwrap complete');
}

loop().catch((e) => {
  console.log('error', e);
});

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
