const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/handshake", function(req, res){
    var sender = req.param('sender');
    var receiver = req.param('receiver');
    var trustGroup = req.param('trust_group');

    const Eos = require('eosjs');

    const config = {
        expireInSeconds: 60,
        broadcast: true,
        keyProvider: ['5KXBRhhdMH7DprM38GKTgMHwUybFXdKCrKbZdV4K7QoaKWwJ5xX'],
        debug: false,
        sign: true,
        // mainNet bp endpoint
        httpEndpoint: 'http://10.20.11.163:8888',
        // mainNet chainId
        chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
    };

    const eos = Eos(config);

    console.log(Eos);

    eos.getAccount('trevor')
        .then(result => console.log(result))
        .catch(error => console.error(error));

    eos.getAccount('kaeuouji')
        .then(result => console.log(result))
        .catch(error => console.error(error));

    eos.getCurrencyBalance('eosio.token', 'kaeuouji', 'EOS')
        .then(result => console.log(result))
        .catch(error => console.error(error));

    eos.getCurrencyBalance('eosio.token', 'trevor', 'EOS')
        .then(result => console.log(result))
        .catch(error => console.error(error));

    options = {
      authorization: 'kaeuouji@active',
      broadcast: true,
      sign: true
    }

    eos.transfer('kaeuouji', 'trevor', '5.0000 EOS', '', options)
      .then(result => console.log(result))
      .catch(error => console.error(error));

    res.json({ sender: sender, receiver:receiver, trust_group: trustGroup});
});

app.listen(3001, function(){
  console.log("App starts at port :" +3001);
});
