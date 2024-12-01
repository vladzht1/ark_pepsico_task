const express = require("express");

const PORT = parseInt(process.env["PORT"] ?? "3000");

const app = express();

app.use("/static", express.static(__dirname + "/static"));

app.all("*", (_, res) => {
  return res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`Server started on https://localhost:${PORT}`);
});
