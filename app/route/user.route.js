module.exports = (app) => {
  var router = require("express").Router();

  const userController = require("../controller/user.controller.js");
  const authMiddleware = require("../middleware/auth.middleware.js");

  router.post("/user", userController.create);
  router.get("/user", authMiddleware.tokenValidate, userController.read);
  router.put("/user", authMiddleware.tokenValidate, userController.update);
  router.delete("/user", authMiddleware.tokenValidate, userController.delete);

  app.use("/", router);
};
