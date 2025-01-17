import express, { Express } from "express";
import path from "path";
import { WebViewServerAddress } from "@/main-process/utils";

export class WebViewServer {
  public addressInfo: WebViewServerAddress | null = null;

  private expressInstance: Express | null;
  private bundleFolder = path.join(process.resourcesPath, `/dist`);
  private bundledHtml = path.join(this.bundleFolder, "/index.html");

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static setup = () => {
    const server = new WebViewServer();

    server.setServer();
    server.serveStatic();
    server.registerRoutes();

    return server;
  };

  private setServer = () => {
    this.expressInstance = express();
  };

  private serveStatic = () => {
    this.expressInstance.use(express.static(this.bundleFolder));

    this.expressInstance.get("*", (req, res) => {
      res.sendFile(this.bundledHtml);
    });

    const serverInstance = this.expressInstance.listen(0, () => {
      this.addressInfo = new WebViewServerAddress(serverInstance.address());

      console.log(
        `Web View server running at: ${this.addressInfo.getServerAddress()}`,
      );
    });
  };

  private registerRoutes = (): null => null;
}
