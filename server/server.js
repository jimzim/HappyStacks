var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

// TODO Modularize and separate
// Create a service which manages a singleton and updates a list of packages.

var azure = require('azure-storage');
var templates = {};

process.env.AZURE_STORAGE_ACCOUNT = "";
process.env.AZURE_STORAGE_ACCESS_KEY = "";

var blob = azure.createBlobService(process.env.AZURE_STORAGE_ACCOUNT, process.env.AZURE_STORAGE_ACCESS_KEY);

var _templatename = 'data.json';

var blobfile = {
    filename: _templatename,
    fspath: './templates/',
    blobTemplateEndpoint: function(){return "http://putomartiptestsa.blob.core.windows.net/templates/" + _templatename;},
    azureEndpoint: function() {return "https://portal.azure.com/#create/Microsoft.Template/uri/"+ encodeURIComponent("http://putomartiptestsa.blob.core.windows.net/templates/ " + _templatename);}
};

var fs = require('fs');
var mockData = fs.readFileSync(path.join(__dirname, blobfile.fspath+_templatename), 'utf8');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/templates', function (req, res) {
  blob.createBlockBlobFromText('templates', blobfile.filename, JSON.stringify(req.body), function (error, result, response) {
    if (!error) {
      console.log("File uploaded");
      console.log(result);
      console.log("redirecting... " + blobfile.azureEndpoint());
      res.status(200);
      res.send({"status" : "success", "endpoint" : blobfile.azureEndpoint()});
    }
    else {
      console.log(error);
      res.status(500);
      res.send('{"status" : "Failed to publish", "status" : 500}')
    }

  });
})

app.listen(2999, function () {
  console.log('Listening on port 2999!');
});