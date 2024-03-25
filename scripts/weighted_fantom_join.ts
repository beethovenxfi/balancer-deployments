// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_FTM } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_FTM);

  const POOL_ID = '0x08D27037CB3EEF926279530CEA5272B263CFF1800002000000000000000007F7';
  const tokens = [
    { ...TOKENS['FANTOM'].MUTTSKI, balance: parseUnits('313896544540', TOKENS['FANTOM'].MUTTSKI.decimals) },
    { ...TOKENS['FANTOM'].WFTM, balance: parseUnits('0.05', TOKENS['FANTOM'].WFTM.decimals) },
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
