import { Etherscan } from 'etherscan-ts';
import Web3 from 'web3';
import WeightedPoolFactory from '../tasks/20230320-weighted-pool-v4/artifact/WeightedPoolFactory.json';
import WeightedPool from './abi/WeightedPool.json';
import InputDataDecoder from 'ethereum-input-data-decoder';
import { AddressZero } from '@ethersproject/constants';
import { VAULT_ADDRESS_FTM, PROTOCOL_FEE_PERCENTAGES_PROVIDER_FTM, WEIGHTED_POOL_V4_FACTORY_FTM } from './constants';

import dotenv from 'dotenv';
dotenv.config();

interface DecodedPoolData {
  name: string;
  symbol: string;
  tokens: string[];
  normalizedWeights: any[];
  rateProviders: string[];
  swapFeePercentage: any;
  owner: string;
  salt: string;
}

// BEGIN ====== variables ====== BEGIN

const WEIGHTED_POOL_ADDRESS = '0x7761Ddb82e5B81ad56FFB7B99F6fFf59514EA2c3';
const NETWORK = 'fantom';

// manually added for now
const ID = '20230320-weighted-pool-v4';
const NAME = 'WeightedPool';
const VERSION = `{"name":"${NAME}","version":${ID.slice(-1)},"deployment":"${ID}"}`;

// END ====== variables ====== END

const etherscan = new Etherscan(process.env.ETHERSCAN_API_URL || '', process.env.ETHERSCAN_API_KEY || '');
const decoder = new InputDataDecoder(WeightedPoolFactory.abi);
const web3 = new Web3(process.env.RPC_URL);

const decodedPoolData: DecodedPoolData = {
  name: '',
  symbol: '',
  tokens: [],
  normalizedWeights: [],
  rateProviders: [],
  swapFeePercentage: null,
  owner: '',
  salt: '',
};

async function getTransactionsByAddress(address: string) {
  const list = await etherscan.getInternalTrxListByAddress(address, 0, 99999999, 1, 10, 'asc');
  return list;
}

async function generate() {
  const txnsFactory = await getTransactionsByAddress(WEIGHTED_POOL_V4_FACTORY_FTM);
  const stampFactory = txnsFactory.result[0].timeStamp;

  const txnsPool = await getTransactionsByAddress(WEIGHTED_POOL_ADDRESS);
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

  const zero_ams: string[] = [];
  for (let i = 1; i <= decodedPoolData.tokens.length; i++) {
    zero_ams.push(AddressZero);
  }

  const args = [
    [
      decodedPoolData.name,
      decodedPoolData.symbol,
      decodedPoolData.tokens,
      decodedPoolData.normalizedWeights.map((weight) => weight.toString()),
      decodedPoolData.rateProviders.map((address) => `0x${address}`),
      zero_ams,
      decodedPoolData.swapFeePercentage.toString(),
    ],
    VAULT_ADDRESS_FTM,
    PROTOCOL_FEE_PERCENTAGES_PROVIDER_FTM,
    pauseWindowDurationSec,
    bufferPeriodDurationSec,
    decodedPoolData.owner,
    VERSION,
  ];

  const encodedPoolData = web3.eth.abi.encodeParameters(WeightedPool.abi[0].inputs, args);

  return `yarn hardhat verify-contract --id ${ID} --name ${NAME} --address ${WEIGHTED_POOL_ADDRESS} --network ${NETWORK} --key ${
    process.env.ETHERSCAN_API_KEY
  } --args ${encodedPoolData.slice(2)}`;
}

generate().then((v) => console.log(v));
