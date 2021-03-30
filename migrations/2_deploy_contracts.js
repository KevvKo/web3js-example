const helloWorld = artifacts.require('HelloWorld')
const initMessage = 'Hello World!'

module.exports = function(deployer) {
    deployer.deploy(helloWorld, initMessage)
}