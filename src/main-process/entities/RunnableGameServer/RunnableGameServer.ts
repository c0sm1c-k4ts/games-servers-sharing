import { IPCChildProcessCommunication } from "../IPCChildProcessCommunication/IPCChildProcessCommunication";
import { IGameServerConfiguration } from "../GameServersManager/types/GameServer";
import { RunnableServerConfiguration } from "./types/RunnableServerConfiguration";

export class RunnableGameServer {
  constructor(private config: IGameServerConfiguration) {}

  run = ({ onError }: RunnableServerConfiguration) => {
    const runScript = this.getRunScript();
    const process = new IPCChildProcessCommunication(runScript, onError);

    return process;
  };

  private getRunScript = (): string => {
    return "";
  };
}
