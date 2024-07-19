const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.json());

const router = require("./controllers/Crud");
const auth = require("./controllers/auth");
app.use("/api", router);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(
    `Listening on port number ${port} with process id ${process.pid}`
  );
});
