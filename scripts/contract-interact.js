require('dotenv').config()

const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(API_URL)
const contract = require('../build/contracts/HelloWorld.json')
const contractAdress = '0x9995a8393c94396154e9da1d8c4597ffa23e70fa'
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAdress)

// FunctionS

const main = async () => {
    const message = await helloWorldContract.methods.message().call()
    console.log(`The message is: ${message}`)

    await updateMessage("Bitch")
}

const updateMessage = async (newMessage) => {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest')
    const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas()

    const tx = {
        "chainId": 3,
        'from': PUBLIC_KEY,
        'to': contractAdress,
        'nonce': nonce,
        'gas': gasEstimate,
        'data': helloWorldContract.methods.update(newMessage).encodeABI()
    }

    const singPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    singPromise.then( (signedTx) => {

        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash){
            if(!error) { console.log(`Transaction-Hash ${hash}`) }
            else {console.log(`Something went wrong to submit the transaction: ${error}`) }
        })
    }).catch( (error) => {
        console.log(`Promise failed: ${error}`)
    })
}



main()

