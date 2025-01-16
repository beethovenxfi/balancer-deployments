// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../v2/tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_CANONCIAL } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_CANONCIAL);

  const POOL_ID = '0x713fb5036dc70012588d77a5b066f1dd05c712d7000200000000000000000041';
  const tokens = [
    { ...TOKENS['SONIC'].USDCE, balance: parseUnits('0.23', TOKENS['SONIC'].USDCE.decimals) },
    { ...TOKENS['SONIC'].STS, balance: parseUnits('0.5', TOKENS['SONIC'].STS.decimals) },
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
