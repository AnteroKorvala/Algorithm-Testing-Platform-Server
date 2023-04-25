const express = require('express');
const router = express.Router();
const crypto = require('crypto-js')

//Unrealistic implementation of shared keys
const algorithm_variables = {
    private_key:
        '',
    public_key:
        '',
    message_length:
        32,
    algorithm:
        ''
}

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('User in home page')
    res.render('index', {title: 'Express'});
});

router.post('/', async function (req, res) {
    if (Object.keys(req.body).length === 0 &&
        Object.keys(req.params).length === 0) {
        res.status(400).send('Body or params required');
    }
    let algorithm
    if (algorithm_variables.algorithm === '3DES') {
        algorithm = crypto.TripleDES
    } else if (algorithm_variables.algorithm === 'AES') {
        algorithm = crypto.AES
    } else {
        algorithm = crypto.DES
    }
    performance.mark('Decryption-start')
    let decrypted = await algorithm.decrypt(req.body.message, algorithm_variables.private_key).toString(crypto.enc.Utf8)
    performance.measure('Decryption-time', 'Decryption-start')
    console.log('Encrypted message - SERVER --> ' + req.body.message + req.params.message)
    console.log('Decrypted message --> ' + decrypted)
    performance.getEntriesByName('Decryption-time').forEach((entry, index) => {
        console.log(index + ': ' + entry.duration)
    })
    res.send(decrypted)
    //For starters will just send a decrypted version of the req message,
    // but in the future will send its own encrypted message
});

router.post('/secret-key', function (req, res) {
    let response = 'Secret key and algorithm in use received'
    if (Object.keys(req.body).length === 0 &&
        Object.keys(req.params).length === 0) {
        res.status(400).send('Body or params required');
    } else if (Object.keys(req.body).length !== 0) {
        algorithm_variables.private_key = req.body.key
        algorithm_variables.algorithm = req.body.algorithm
    } else if (Object.keys(req.params).length !== 0) {
        algorithm_variables.private_key = req.params.key
        algorithm_variables.algorithm = req.params.algorithm
    }
    console.log('Private-key-SERVER --> ' + algorithm_variables.private_key)
    console.log('Algorithm-SERVER --> ' + algorithm_variables.algorithm)
    res.send(response)
})

module.exports = router;
