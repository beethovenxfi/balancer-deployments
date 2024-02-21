// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_FTM } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_FTM);

  const POOL_ID = '0xB4D48849EE191C230FD1BDC573FC614FBC4738D20002000000000000000007E1';
  const tokens = [
    { ...TOKENS['FANTOM'].SFTMX, balance: parseUnits('0.314', TOKENS['FANTOM'].SFTMX.decimals) },
    { ...TOKENS['FANTOM'].LZUSDC, balance: parseUnits('0.0615', TOKENS['FANTOM'].LZUSDC.decimals) },
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
