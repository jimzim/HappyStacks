var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

// TODO Modularize and separate
// Create a service which manages a singleton and updates a list of packages.

var azure = require('azure-storage');
var templates = {};

process.env.AZURE_STORAGE_ACCOUNT = "";
process.env.AZURE_STORAGE_ACCESS_KEY = "";

var retryOperations = new azure.ExponentialRetryPolicyFilter();
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


app.get('/templates', function (req, res) {
  res.send(mockData);
});

app.post('/templates', function (req, res, body) {
  res.send('{"success" : "Updated Successfully", "status" : 200}');
});

app.get('/deploy', function (req, res) {
  blob.createBlockBlobFromText('templates', blobfile.filename, mockData, function (error, result, response) {
    if (!error) {
      console.log("File uploaded");
      console.log(result);
      console.log("redirecting... " + blobfile.azureEndpoint());
      res.writeHead(301, {Location: blobfile.azureEndpoint()});
      res.end()
      // res.status(200);
      // res.send('{"success" : "Updated Successfully", "status" : 200}');
    }
    else {
      console.log(error);
      res.status(500);
      res.send('{"Failure" : "Failed to publish", "status" : 500}')
    }
  });
})

app.listen(2999, function () {
  console.log('Listening on port 2999!');
});