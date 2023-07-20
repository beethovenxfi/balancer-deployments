// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS } from './constants';

const VAULT_ADDRESS = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS);

  const POOL_ID = '0x362715c164d606682c4ea7e479633e419d9345eb0001000000000000000000e7';
  const tokens = [
    { ...TOKENS['OPTIMISM'].BBRFUSDC, balance: parseUnits('0.1', 6) },
    { ...TOKENS['OPTIMISM'].BBRFWSTETH, balance: parseUnits('0.00010582010582', 18) },
    { ...TOKENS['OPTIMISM'].BBRFWBTC, balance: parseUnits('0.00000335', 8) },
  ];

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address));

  await initJoinPool(
    {
      vault: vault,
      poolId: POOL_ID,
      tokens: sortedTokens.map((token) => token.address),
      initialBalances: sortedTokens.map((token) => token.balance),
    },
    true
  );
}

join().catch((e) => {
  console.log('error', e);
});
