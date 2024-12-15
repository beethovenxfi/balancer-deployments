// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_CANONCIAL } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_CANONCIAL);

  const POOL_ID = '0x0c5f3b54ca6fae8a1838771a82508d82b6f521fd000200000000000000000003';
  const tokens = [
    { ...TOKENS['SONIC'].BEETS, balance: parseUnits('5', TOKENS['SONIC'].BEETS.decimals) },
    { ...TOKENS['SONIC'].STS, balance: parseUnits('0.07', TOKENS['SONIC'].STS.decimals) },
  ];

  const sortedTokens = tokens.sort((a, b) => ('' + a.address).localeCompare(b.address));

  await initJoinPool(
    {
      vault: vault,
      poolId: POOL_ID,
      tokens: sortedTokens.map((token) => token.address),
      initialBalances: sortedTokens.map((token) => token.balance),
    },
    false
  );
}

join().catch((e) => {
  console.log('error', e);
});
