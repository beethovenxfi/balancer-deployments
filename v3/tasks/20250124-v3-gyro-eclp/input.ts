import { MONTH } from '@helpers/time';
import { Task, TaskMode } from '@src';

export type GyroECLPPoolDeployment = {
  Vault: string;
  PauseWindowDuration: number;
  WETH: string;
  BAL: string;
  FactoryVersion: string;
  PoolVersion: string;
};

const Vault = new Task('20241204-v3-vault', TaskMode.READ_ONLY);
const WETH = new Task('00000000-tokens', TaskMode.READ_ONLY);
const BAL = new Task('00000000-tokens', TaskMode.READ_ONLY);

const BaseVersion = { version: 1, deployment: '20250124-v3-gyro-eclp' };

export default {
  Vault,
  PauseWindowDuration: 4 * 12 * MONTH,
  WETH,
  BAL,
  FactoryVersion: JSON.stringify({ name: 'GyroECLPPoolFactory', ...BaseVersion }),
  PoolVersion: JSON.stringify({ name: 'GyroECLPPool', ...BaseVersion }),
};
