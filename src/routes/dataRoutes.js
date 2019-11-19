const express = require("express");

const dataRouter = express.Router();
const dataController = require("../controllers/dataController.js");

function router(nav) {
  const { getIndex } = dataController(
    nav
  );
  //# We have to activate middle ware in order to check if the user is authenticated or not
  // dataRouter.use(middleware);
  dataRouter.route("/").get(getIndex);

  return dataRouter;
}

module.exports = router;
