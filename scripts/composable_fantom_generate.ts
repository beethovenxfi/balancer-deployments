import { Etherscan } from 'etherscan-ts';
import Web3 from 'web3';
import ComposableStablePoolFactory from '../tasks/20230711-composable-stable-pool-v5/artifact/ComposableStablePoolFactory.json';
import ComposableStablePool from '../tasks/20230711-composable-stable-pool-v5/artifact/ComposableStablePool.json';
import InputDataDecoder from 'ethereum-input-data-decoder';
import {
  VAULT_ADDRESS_FTM,
  PROTOCOL_FEE_PERCENTAGES_PROVIDER_FTM,
  COMPOSABLE_STABLE_POOL_V5_FACTORY_FTM,
} from './constants';

import dotenv from 'dotenv';
dotenv.config();

interface DecodedPoolData {
  name: string;
  symbol: string;
  tokens: string[];
  amplificationParameter: any;
  rateProviders: string[];
  tokenRateCacheDurations: any;
  exemptFromYieldProtocolFeeFlag: boolean;
  swapFeePercentage: any;
  owner: string;
  salt: string;
}

// BEGIN ====== variables ====== BEGIN

const COMPOSABLE_STABLE_POOL_ADDRESS = '0x6a488fa7DE0641511580AD833ADED393D64D6956';
const NETWORK = 'fantom';

// manually added for now
const ID = '20230711-composable-stable-pool-v5';
const NAME = 'ComposableStablePool';
const VERSION = `{"name":"${NAME}","version":${ID.slice(-1)},"deployment":"${ID}"}`;

// END ====== variables ====== END

const etherscan = new Etherscan(process.env.ETHERSCAN_API_KEY || '', process.env.ETHERSCAN_API_URL || '');
const decoder = new InputDataDecoder(ComposableStablePoolFactory.abi);
const web3 = new Web3(process.env.RPC_URL);

const decodedPoolData: DecodedPoolData = {
  name: '',
  symbol: '',
  tokens: [],
  amplificationParameter: null,
  rateProviders: [],
  tokenRateCacheDurations: [],
  exemptFromYieldProtocolFeeFlag: false,
  swapFeePercentage: null,
  owner: '',
  salt: '',
};

async function getTransactionsByAddress(address: string) {
  const list = await etherscan.getInternalTrxListByAddress(address, 0, 99999999, 1, 10, 'asc');
  return list;
}

async function generate() {
  const txnsFactory = await getTransactionsByAddress(COMPOSABLE_STABLE_POOL_V5_FACTORY_FTM);
  const stampFactory = txnsFactory.result[0].timeStamp;

  const txnsPool = await getTransactionsByAddress(COMPOSABLE_STABLE_POOL_ADDRESS);
  const stampPool = txnsPool.result[0].timeStamp;
  const inputData = (await web3.eth.getTransaction(txnsPool.result[0].hash)).input;
  const decoded = decoder.decodeData(inputData);
  decoded.names.forEach((el, index) => {
    decodedPoolData[el as string] = decoded.inputs[index];
  });

  //1 times for pause/buffer
  const daysToSec = 24 * 60 * 60; // hr * min * sec
  const pauseDays = 90;
  const bufferPeriodDays = 30;

  // calculate proper durations
  const pauseWindowDurationSec = Math.max(pauseDays * daysToSec - (parseInt(stampPool) - parseInt(stampFactory)), 0);
  let bufferPeriodDurationSec = bufferPeriodDays * daysToSec;
  if (pauseWindowDurationSec == 0) {
    bufferPeriodDurationSec = 0;
  }

  const args = [
    [
      VAULT_ADDRESS_FTM,
      PROTOCOL_FEE_PERCENTAGES_PROVIDER_FTM,
      decodedPoolData.name,
      decodedPoolData.symbol,
      decodedPoolData.tokens,
      decodedPoolData.rateProviders.map((address) => `0x${address}`),
      decodedPoolData.tokenRateCacheDurations.map((value) => value.toString()),
      decodedPoolData.exemptFromYieldProtocolFeeFlag,
      decodedPoolData.amplificationParameter.toString(),
      decodedPoolData.swapFeePercentage.toString(),
      pauseWindowDurationSec,
      bufferPeriodDurationSec,
      decodedPoolData.owner,
      VERSION,
    ],
  ];

  const encodedPoolData = web3.eth.abi.encodeParameters(ComposableStablePool.abi[0].inputs, args);

  return `yarn hardhat verify-contract --id ${ID} --name ${NAME} --address ${COMPOSABLE_STABLE_POOL_ADDRESS} --network ${NETWORK} --key ${
    process.env.ETHERSCAN_API_KEY
  } --args ${encodedPoolData.slice(2)}`;
}

generate().then((v) => console.log(v));
