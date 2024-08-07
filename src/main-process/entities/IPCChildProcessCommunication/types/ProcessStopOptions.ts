import { IGameServerConfiguration } from "../../GameServersManager/types/GameServer";

export type ProcessStopOptions = Pick<
  IGameServerConfiguration,
  "saveAndExitCommand"
>;
