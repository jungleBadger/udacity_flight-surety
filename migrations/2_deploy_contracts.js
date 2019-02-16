const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const FlightSuretyData = artifacts.require("FlightSuretyData");
const fs = require('fs');

registerFirstAirline = undefined;
module.exports = function(deployer) {


    deployer.deploy(FlightSuretyData)
    .then( () => {
        return deployer.deploy(FlightSuretyApp, FlightSuretyData.address)
                .then(async () => {
                    let config = {
                        localhost: {
                            url: 'ws://localhost:8545',
                            dataAddress: FlightSuretyData.address,
                            appAddress: FlightSuretyApp.address
                        }
                    };

                    accounts = await web3.eth.getAccounts();
                    let flightSuretyData = await FlightSuretyData.new();
                    let flightSuretyApp = await FlightSuretyApp.new(flightSuretyData.address);
                    await flightSuretyData.authorizeCaller(flightSuretyApp.address);


                    await fs.writeFile(__dirname + '/../src/dapp/config.json',JSON.stringify(config, null, '\t'), 'utf-8', function (err, data) {});
                    await fs.writeFile(__dirname + '/../src/server/config.json',JSON.stringify(config, null, '\t'), 'utf-8', function (err, data) {});
                });
    });
};