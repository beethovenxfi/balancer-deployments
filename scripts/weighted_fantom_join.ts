// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_FTM } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_FTM);

  const POOL_ID = '0x4961ACD896399537CF8DFC277C376913E21042D00001000000000000000007BD';
  const tokens = [
    { ...TOKENS['FANTOM'].WFTM, balance: parseUnits('0.05', TOKENS['FANTOM'].WFTM.decimals) },
    {
      ...TOKENS['FANTOM'].LZFMULTI,
      balance: parseUnits('42.25', TOKENS['FANTOM'].LZFMULTI.decimals),
    },
    {
      ...TOKENS['FANTOM'].FBOMB,
      balance: parseUnits('8.4', TOKENS['FANTOM'].FBOMB.decimals),
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
