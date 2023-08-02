// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_FTM } from './constants';


async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_FTM);

  const POOL_ID = '0x5cf22419e61845b1a0695eded343559411f9c7f4000100000000000000000773';
  const tokens = [
    { ...TOKENS['FANTOM'].WFTM, balance: parseUnits('0.1', TOKENS['FANTOM'].WFTM.decimals) },
    {
      ...TOKENS['FANTOM'].FBOMB,
      balance: parseUnits('10', TOKENS['FANTOM'].FBOMB.decimals),
    },
    {
      ...TOKENS['FANTOM'].MCLB,
      balance: parseUnits('0.6', TOKENS['FANTOM'].MCLB.decimals),
    },
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
