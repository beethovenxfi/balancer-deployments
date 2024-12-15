// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_CANONCIAL } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_CANONCIAL);

  const POOL_ID = '0x425f2f2b7f2255ee3e676efb504765616ce5c768000200000000000000000004';
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
    true
  );
}

join().catch((e) => {
  console.log('error', e);
});
