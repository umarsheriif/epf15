const bodyParser = require("body-parser");
const url = require("url");
const querystring = require("querystring");
const sql = require("mssql");

const nodemailer = require("nodemailer");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const endpoint = "https://ylbzlacaaap001.documents.azure.com:443/";
console.log(endpoint);
const masterKey =
  "JL1bGhsw6xxhTS5haZb22uCG2rwkDYDkj1CLt4mgpAE9dDRxvONqhqoxPeWbrIVpvMJliNX1Lq2mK2ZdhORNrQ==";
const client = new CosmosClient({
  endpoint: endpoint,
  auth: { masterKey: masterKey }
});

const databaseId = "epf15";
const containerId = "scoring";

function dataContoller(nav) {
  async function getIndex(req, res) {
    try {
      const querySpec = {
        query: "SELECT * FROM c "
      };

      const { result: itemDefList } = await client
          .database(databaseId)
          .container(containerId)
          .items.readAll()
          .toArray();
          const lastValue = itemDefList.length -1;
          watervalue = itemDefList[lastValue].body * 100;
          watervalue = watervalue * 100
          for(let i = 0; i < itemDefList.length; i++){

            itemDefList[i]._ts = convertTime(itemDefList[i]._ts)
            // itemDefList[i].body = itemDefList.body * 100;
            const clearvalue = itemDefList[i].body * 100;
            itemDefList[i].body = clearvalue
            if(clearvalue< 0.5)
            {
              itemDefList[i].label = 'success';
            }
            else if (clearvalue<1 && clearvalue>0.5)
            {
              itemDefList[i].label = 'danger'
            }
            
         
         }
          res.render("analytics", {
            title: "Data",
            scoringdata: itemDefList,
            oil: watervalue
          });
    } catch (error) {
      console.log(error.stack);
    }
   
  }
  function convertTime(unix_timestamp){

    var date = new Date(unix_timestamp*1000);
    var year = date.getFullYear();
    var month = ("0"+(date.getMonth()+1)).substr(-2);
    var day = ("0"+date.getDate()).substr(-2);
    var hour = ("0"+date.getHours()).substr(-2);
    var minutes = ("0"+date.getMinutes()).substr(-2);
    var seconds = ("0"+date.getSeconds()).substr(-2);

    return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
}

  
  return {
    getIndex
    // middleware
  };
}

module.exports = dataContoller;
