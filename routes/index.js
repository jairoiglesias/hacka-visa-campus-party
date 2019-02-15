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

  // console.log(client)
  // console.log('-----')

  var args = {
    afsService_run: 'true',
    merchantID: 'jiglesias',
    afsService_run: 'true',
    merchantReferenceCode: '2A0373972I4109O61207SX642',
    billTo_street1: 'Avenida Doutor Augusto de Toledo, 1340',
    billTo_contry: ' Brasil',
    billTo_firstName: 'Emerson',
  }

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

  let { nome, cpf, cnpj, endereco, valor } = req.body

})

router.post('/analise_risco', (req, res) => {

  // 35
  // { scoreIni: 35, scoreFim: 59, status: 'aprovado' },

  let { scoreUser } = req.body
  // let scoreUser = 40


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
