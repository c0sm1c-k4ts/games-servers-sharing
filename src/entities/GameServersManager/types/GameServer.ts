import { IPCChildProcessCommunication } from "../../IPCChildProcessCommunication/IPCChildProcessCommunication";

export interface IGameServerConfiguration {
  id: string;
  executablePath: string;
  saveAndExitCommand?: string;
  configPath?: string;
  questioner?: Array<string>;
}

export interface RunningServer {
  process: IPCChildProcessCommunication;
  configuration: IGameServerConfiguration;
}
