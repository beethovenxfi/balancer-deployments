// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_OP } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_OP);

  const POOL_ID = '0x2feb76966459d7841fa8a7ed0aa4bf574d6111bf00020000000000000000011d';
  const tokens = [
    { ...TOKENS['OPTIMISM'].SFRAX, balance: parseUnits('0.1', TOKENS['OPTIMISM'].SFRAX.decimals) },
    { ...TOKENS['OPTIMISM'].SFRXETH, balance: parseUnits('0.00004415', TOKENS['OPTIMISM'].SFRXETH.decimals) },
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
