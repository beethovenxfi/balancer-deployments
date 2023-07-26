// @ts-ignore
import { ethers } from 'hardhat';
import ChildChainStreamerAbi from '../tasks/20220413-child-chain-gauge-factory/abi/ChildChainStreamer.json';
import { getAddress } from '@ethersproject/address';

const BEETS = getAddress('0x97513e975a7fa9072c72c92d8000b0db90b163c5');
const BAL = getAddress('0xfe8b128ba8c78aabc59d4c64cee7ff28e9379921');

async function notify_reward_amount() {
  const allLoveStreamer = await ethers.getContractAt(
    ChildChainStreamerAbi,
    '0x005e43c4bb2932605b121941797ebb123325301e'
  );
  const happyRoadStreamer = await ethers.getContractAt(
    ChildChainStreamerAbi,
    '0x9d27eaa04face448956eab5b422c542fffeeb4ef'
  );
  const lennonLongStreamer = await ethers.getContractAt(
    ChildChainStreamerAbi,
    '0x66f885344c4acbafc8d52653694613410689840f'
  );

  // console.log("######################All you need is love - BEETS")
  // var transaction = await allLoveStreamer.notify_reward_amount(BEETS);
  // var receipt = await transaction.wait();
  // console.log('receipt', receipt);

  // console.log("######################All you need is love - BAL")
  // transaction = await allLoveStreamer.notify_reward_amount(BAL);
  // receipt = await transaction.wait();
  // console.log('receipt', receipt);

  // console.log("######################Happy Road - BEETS")
  // var transaction = await happyRoadStreamer.notify_reward_amount(BEETS);
  // var receipt = await transaction.wait();
  // console.log('receipt', receipt);

  // console.log("######################Happy Road - BAL")
  // transaction = await happyRoadStreamer.notify_reward_amount(BAL);
  // receipt = await transaction.wait();
  // console.log('receipt', receipt);

  console.log('######################Lennons Long - BEETS');
  var transaction = await lennonLongStreamer.notify_reward_amount(BEETS);
  var receipt = await transaction.wait();
  console.log('receipt', receipt);

  console.log('######################Lennons Long - BAL');
  transaction = await lennonLongStreamer.notify_reward_amount(BAL);
  receipt = await transaction.wait();
  console.log('receipt', receipt);
}

notify_reward_amount().catch((e) => {
  console.log('error', e);
});
