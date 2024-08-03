import express from "express";
import path from "path";

export const setupExpress = () => {
  const webViewServer = express();
  // TODO: make dynamic
  const port = 3001;

 webViewServer.use(express.static(path.join(process.resourcesPath, `../../../dist/`)));

  webViewServer.get('*', (req, res) => {
    res.sendFile(path.join(process.resourcesPath, `../../../dist/index.html`));
  })

  webViewServer.listen(port, () => console.log(`Webview started at localhost:${port}`));

  registerRoutes();
}

const registerRoutes = (): null => null;
