var express = require('express');
var router = express.Router();
var soap = require('soap');
var generator = require('creditcard-generator')

let scoreData = [
  { scoreIni: 0, scoreFim: 34, status: 'negado' },
  { scoreIni: 35, scoreFim: 59, status: 'aprovado' },
  { scoreIni: 60, scoreFim: 89, status: 'aprovado com 25% extra' },
  { scoreIni: 90, scoreFim: 100, status: 'aprovado com 25% extra + 1%' }
]

var apiWSDL = 'https://ics2wstesta.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.151.wsdl'
// var apiWSDL = 'https://ics2wsa.ic3.com/commerce/1.x/transactionProcessor/CyberSourceTransaction_1.151.wsdl'

soap.createClient(apiWSDL, function (err, client) {

  if (err) {
    console.log(err)
    console.log('------------')
    return
  }

  // console.log(client)
  // console.log('-----')

  var args = {
    merchantID: 'jiglesias',
    afsService_run: 'true',
    merchantReferenceCode: '2A0373972I4109O61207SX642',
    item_0_unitPrice: '100.00',
    billTo_street1: 'Rua Capitao Macedo, 42 - Vila Mariana',
    billTo_country: 'BR',
    billTo_city: 'Sao Paulo',
    billTo_firstName: 'Jairo',
    billTo_lastName: 'Iglesias',
    billTo_email: 'jairohighwind@hotmail.com',
  }

  client.runTransactionAsync(args, (err, result) => {

    if (err) {
      console.log(err)
      console.log('ERROR TRANSACTION')
      return
    }

    console.log(result)

  })

});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/get_score', (req, res) => {

  let { nome, cpf, cnpj, endereco, valor } = req.body

})

router.post('/analise_risco', (req, res) => {

  let { scoreUser } = req.body


  let score = scoreData.filter(scoreItem => {
    let scoreIni = scoreItem.scoreIni
    let scoreFim = scoreItem.scoreFim

    console.log(scoreIni, scoreFim, scoreUser)

    if (scoreUser >= scoreIni && scoreUser <= scoreFim) {
      return scoreItem
    }

  })

  let resp = JSON.stringify(score)
  // console.log(resp)
  // console.log('****')
  res.status(200).send(resp)

})


router.get('/get_random_cardnumber', (req, res) => {

  let cardNumber = generator.GenCC("VISA")[0]
  res.status(200).send(cardNumber)
})

router.post('/validate')

module.exports = router;
