var express = require('express');
var router = express.Router();
var soap = require('soap');
var generator = require('creditcard-generator')

var apiWSDL = 'https://ics2wstesta.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.153.wsdl'
// var apiWSDL = 'https://ics2wsa.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.151.wsdl'


var args = {
  name: 'value'
}

soap.createClient(apiWSDL, function (err, client) {
  // client.MyFunction(args, function (err, result) {
  //   console.log(result);
  // });

  if (err) {
    console.log(err)
    console.log('------------')
    return
  }

  console.log(client)
  console.log('-----')

  // client.runTransactionAsync(args, (err, result) => {

  //   if (err) {
  //     console.log(err)
  //     console.log('ERROR TRANSACTION')
  //     return
  //   }

  // })

});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/get_score', (req, res) => {

  let body = req.body


})


router.get('/get_random_cardnumber', (req, res) => {

  let cardNumber = generator.GenCC("VISA")[0]
  res.status(200).send(cardNumber)
})

router.post('/validate')

module.exports = router;
