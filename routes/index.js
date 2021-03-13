const router = require("express").Router();
const path = require("path");
const userRouter = require("./new-user");
const usersRouter = require("./users");
const exerciseRouter = require("./add");
const logRouter = require("./log");

module.exports = params => {
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../views/index.html"));
  });
  router.use("/api/exercise/new-user", userRouter());
  router.use("/api/exercise/users", usersRouter());
  router.use("/api/exercise/add", exerciseRouter());
  router.use("/api/exercise/log", logRouter());

  return router;
};
