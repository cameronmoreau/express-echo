const express = require("express");
const ngrok = process.env.NGROK_AUTHTOKEN ? require("ngrok") : null;

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello 👋"));

app.post("/post", (req, res) => {
  const output = {
    body: req.body,
    headers: req.headers,
  };

  console.log(output);
  res.send(output);
});

const server = app.listen(port, () => {
  console.log(`🚀  Server listening on port ${server.address().port}`);
});

if (ngrok) {
  ngrok
    .connect({
      addr: port,
      hostname: process.env.NGROK_HOSTNAME,
      subdomain: process.env.NGROK_SUBDOMAIN,
      authtoken: process.env.NGROK_AUTHTOKEN,
    })
    .then((url) => {
      console.log(`💳  App URL to see the demo in your browser: ${url}/`);
    })
    .catch((err) => {
      if (err.code === "ECONNREFUSED") {
        console.log(`⚠️  Connection refused at ${err.address}:${err.port}`);
      } else {
        console.log(`⚠️ Ngrok error: ${JSON.stringify(err)}`);
      }
      process.exit(1);
    });
}
