import { spawn } from "node:child_process";
import { StdioOptions } from "child_process";
import { ProcessStopOptions } from "./types/ProcessStopOptions";
import { VoidFn } from "../../shared/types/Utility";

export class IPCChildProcessCommunication {
  private childProcess: ReturnType<typeof spawn>;
  private stdioOptions: StdioOptions = ["ipc", "ipc", "pipe"];

  constructor(
    private script: string,
    private onError: VoidFn,
  ) {
    this.start();
  }

  stop = ({ saveAndExitCommand }: ProcessStopOptions = {}) => {
    if (saveAndExitCommand) {
      this.childProcess.send(saveAndExitCommand);
    } else {
      this.childProcess.kill();
    }
  };

  private start = () => {
    this.childProcess = spawn(this.script, {
      stdio: this.stdioOptions,
    });

    this.registerListeners();
  };

  private registerListeners = () => {
    if (!this.childProcess) {
      throw new Error("Child process is not running.");
    }

    this.childProcess.on("exit", () => {});

    this.childProcess.on("error", this.onError);
  };
}
