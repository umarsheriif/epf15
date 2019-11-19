const bodyParser = require("body-parser");
const url = require("url");
const querystring = require("querystring");
const sql = require("mssql");

const nodemailer = require("nodemailer");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const endpoint = "https://emdtdd.documents.azure.com:443/";
console.log(endpoint);
const masterKey =
  "g0EnFTlKsUh5H0h8jQKvlzjEwjrBqmaPhmYEhyzNdxQQE6buOs3bTaATASV6xTkhQE8aU7bQW2zMN8IWcReQMA==";
const client = new CosmosClient({
  endpoint: endpoint,
  auth: { masterKey: masterKey }
});

const databaseId = "fraud";
const containerId = "cards";

function dataContoller(nav) {
  function getIndex(req, res) {
    // const url = "mongodb://localhost:27017";
    // const dbName = "PaymentInformation";
    res.render("analytics", {
        title: "Data",
        nav

      });

  }


  
  return {
    getIndex
    // middleware
  };
}

module.exports = dataContoller;
