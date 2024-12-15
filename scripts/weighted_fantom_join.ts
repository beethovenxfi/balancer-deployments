// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';
import Vault from '../v2/tasks/20210418-vault/artifact/Vault.json';
import { initJoinPool } from './helpers';
import { TOKENS, VAULT_ADDRESS_FTM } from './constants';

async function join() {
  const vault = await ethers.getContractAt(Vault.abi, VAULT_ADDRESS_FTM);

  const POOL_ID = '0x8A9346FF6537F4F93C85619A26BF871299EB6017000100000000000000000809';
  const tokens = [
    { ...TOKENS['FANTOM'].WFTM, balance: parseUnits('0.05', TOKENS['FANTOM'].WFTM.decimals) },
    { ...TOKENS['FANTOM'].LFG, balance: parseUnits('79.8393', TOKENS['FANTOM'].LFG.decimals) },
    { ...TOKENS['FANTOM'].PXL, balance: parseUnits('1396090', TOKENS['FANTOM'].PXL.decimals) },
    { ...TOKENS['FANTOM'].BPEPE, balance: parseUnits('30137650', TOKENS['FANTOM'].BPEPE.decimals) },
    { ...TOKENS['FANTOM'].POOH, balance: parseUnits('0.25', TOKENS['FANTOM'].POOH.decimals) },
    { ...TOKENS['FANTOM'].CONK2, balance: parseUnits('230379500', TOKENS['FANTOM'].CONK2.decimals) },
    { ...TOKENS['FANTOM'].FDUCK, balance: parseUnits('158254', TOKENS['FANTOM'].FDUCK.decimals) },
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
