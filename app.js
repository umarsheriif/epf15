const express = require("express");
const chalk = require("chalk");
// const debug = require('debug')('app');
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;


const formRouter = express.Router();
const nav = [{ link: "/payment", title: "Data" }];
const dataRouter = require("./src/routes/dataRoutes")(nav);

app.use(morgan("tiny"));
// app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/jquery/dist"))
);
app.set("views", "./src/views");
app.set("view engine", "ejs");

formRouter.route("/forms").get((req, res) => {
  res.render("default-forms");
});
app.use("/data", dataRouter);

app.get("/", (req, res) => {
  res.redirect("/data/");
});

// app.get('/forms', (req, res) => {
//   res.render('default-forms');
// });
app.listen(port, () => {
  console.log(`listening on port + ${chalk.green(port)}`);
});
