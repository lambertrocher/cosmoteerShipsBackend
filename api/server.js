const createApp = require("./app");

function startApp() {
  const port = 3000;
  createApp().listen(port, () => {
    console.log(`CosmoteerSips listening on port ${port}`);
  });
}

startApp();
