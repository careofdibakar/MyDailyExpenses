module.exports = (app) => {
  var router = require("express").Router();

  const authController = require("../controller/auth.controller.js");

  router.post("/login", authController.login);

  app.use("/", router);
};
