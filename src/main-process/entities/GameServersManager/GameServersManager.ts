import { IGameServerConfiguration, RunningServer } from "./types/GameServer";
import { RunnableGameServer } from "../RunnableGameServer/RunnableGameServer";
import { ObservableCollection } from "@/shared/utils/observable";

class GameServersManager extends ObservableCollection<
  Map<string, RunningServer>
> {
  constructor() {
    super(new Map());
  }

  startServer = (configuration: IGameServerConfiguration) => {
    const currentServers = this.getValues();
    const server = new RunnableGameServer(configuration);
    const process = server.run({
      onError: () => this.stopServer(configuration.id),
    });

    currentServers.set(configuration.id, { process, configuration });
    this.notifyObservers(currentServers);
  };

  stopServer = (id: string) => {
    const currentServers = this.getValues();
    const { process, configuration } = currentServers.get(id);
    process.stop({
      saveAndExitCommand: configuration.saveAndExitCommand,
    });

    currentServers.delete(id);
    this.notifyObservers(currentServers);
  };
}

const gsManager = new GameServersManager();
gsManager.addObservers([]);

export default gsManager;
