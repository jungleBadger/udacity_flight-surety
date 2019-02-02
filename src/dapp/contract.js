import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import FlightSuretyData from '../../build/contracts/FlightSuretyData.json';
import Config from './config.json';
import Web3 from 'web3';

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export default class Contract {
    constructor(network, callback) {

        let config = Config[network];
        this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
        this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress, config.dataAddress);
        this.flightSuretyData = new this.web3.eth.Contract(FlightSuretyData.abi, config.dataAddress);
        this.initialize(callback);
        this.x = config.appAddress;
        this.y = config.dataAddress;
        this.owner = null;
        this.airlines = [];
        this.flights = [];
        this.passengers = [];

    }

    initialize(callback) {
        this.web3.eth.getAccounts(async (error, accts) => {
            let self = this;
            this.owner = accts[0];

            await this.flightSuretyData.methods.authorizeCaller(this.x).send({
                "from": this.owner
            });
            let counter = 1;

            //console.log(this.flightSuretyApp.events.FlightStatusInfo((err, data) => {
               // console.log(err);
               // console.log(data);
            //}));

            this.airlines = await this.flightSuretyApp.methods.getActiveAirlines().call();

            for (let i = 0; i < 5; i += 1) {
                this.flights.push({
                    airline: self.airlines[0],
                    flight: `Flight ${i}`,
                    timestamp: randomDate(new Date(), new Date(Date.now() + 1000 * 60 * 60 * 2))
                })
            }

            while(this.passengers.length < 5) {
                this.passengers.push(accts[counter++]);
            }

            callback();
        });
    }



    isOperational(callback) {
       let self = this;
       self.flightSuretyApp.methods
            .isOperational()
            .call({ from: self.x}, callback);
    }

    fetchFlightStatus(flight, callback) {
        console.log(flight);
        console.log(" ASPODKOPASD")
        let self = this;
        let payload = {
            airline: flight.airline,
            flight: flight.flight,
            timestamp: Math.floor(new Date(flight.timestamp).getTime() / 1000)
        }

        self.flightSuretyApp.methods
            .fetchFlightStatus(payload.airline, payload.flight, payload.timestamp)
            .send({ from: self.owner}, (error, result) => {
                callback(error, payload);
            });
    }
}