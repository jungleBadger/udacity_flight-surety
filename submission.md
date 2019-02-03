## General info

### Environment: 
* Truffle v5.0.2 (core: 5.0.2)
* Solidity - ^0.4.24 (solc-js)
* Node v8.11.1
* Tested both on MAC OS and Windows 10
* Rinkeby deploy info can be found on the `rinkeby-deloy.md` file
* mnemonic: `candy maple cake sugar pudding cream honey rich smooth crumble sweet treat`


### Flow
* Upon a contract deploy `truffle migrate` an Airline will be built on FlightSuretyData constructor
* Upon a server start `npm run server` this same airline will be funded and ready to operate along with connecting through the Oracle system
* Upon a client start `npm run dapp` five (5) flights will be created on the fly taking consideration of the previously added `airline`. The UI provides option to: `Consult oracles about a flight` and `Buy surety to a Flight limiting the value from 0.1 to 1 ether`
* Some test cases were implemented to validate some edge cases `truffle test`

### Notes

#### Dapp
I know the UX could be A LOT improved like using proper UI instead of alerts and so on. But the timeframe for delivering the projects was being reached and there was the challenge of codding on a different structure and style, so I needed to deal with resulting in a more Proof of Concept solution and not a end user deliverable.

### Server
I've enjoyed working with node.js and this project, but for the same reason as the Dapp, I could not spend time modularizating and importing things as they should. There was a babel issue impeding me for using async/await. As the workload was huge for me I've worked with promises instead.

### Passengers
I've found some difficult implementing the last two functions, `pay` and `creditInsurees` due to the reason the flights were mocked up, and I never found a decent way to controlling who passengers have bought and who of them were already paied, so I've just kept it simple and the caller was ensured if he has rights to do so upon an Oracle evnt. Again, I know this logic could be a lot improved for reaching a real world implementation, but I kept with the POC.

### Airlines
I've extensively tried to create test cases and best practices on them, but I'm aware that there is a lot to improve yet


## Step by step check out

### Separation of Concerns, Operational Control and “Fail Fast”
1. Smart Contract Seperation - Smart Contract code is separated into multiple contracts:
	> FlightSuretyData contains the structs and persistence logic / FlightSuretyApp contains encapsulations and validations; It is exposed to use. 

2. Dapp Created and Used for Contract Calls - A Dapp client has been created and is used for triggering contract calls. Client can be launched with “npm run dapp” and is available at http://localhost:8000
	> Boilerplate is up and running upon ` npm run dapp` execution.
	
	2.1 Passenger can purchase insurance for flight
	> Users can buy tickets and it is demonstrated through the `buy - contract.js line 97` function, which is triggered from the buySurety button click on UI, an window.alert will carry on details of the transaction (I know this can be drastically improved from the UX point of view) 
	
	2.2 Trigger contract to request flight status update
	> This event can be triggered by pressing the button on the UI, this will trigger the function `fetchFlightStatus - line 69 contract.js` which will gather the current selected from the dropdown and call the function with the parameters. The `FlightStatusInfo` event handler will update UI accordingly to the given request upon an Oracle response 

3. Oracle Server Application - A server app has been created for simulating oracle behavior. Server can be launched with “npm run server”
	> Server is available upon `npm run server` execution

4. Operational status control is implemented in contracts
	> Operational status is implemented through the functions `setOperatingStatus - l. 141`, `requireIsOperational - l.91` and `operational variable` within the `FlightSuretyData.sol`. `FlightSuretyApp` contract exposes those functions when needed
	
5. Fail Fast Contract - Contract functions “fail fast” by having a majority of “require()” calls at the beginning of function body
	> Have implemented a bunch of requires and tested them on test cases, is that enough? I believe not! Any feedback appreciated, I honestly got confused of what would be too much to validate like empty params and such things

### Airlines
1. Airline Contract Initialization - First airline is registered when contract is deployed.
	> This is ensured by adding a new Airline struct at the Construct of FlightSuretyData contract (line 70)

2. Multiparty Consensus - Only existing airline may register a new airline until there are at least four airlines registered Demonstrated either with Truffle test or by making call from client Dapp
	> The test case at line 169 ((airline) can add up to complete 4 airlines without assuming consensus) shows this behaviour 

3. Multiparty Consensus - Registration of fifth and subsequent airlines requires multi-party consensus of 50% of registered airlines
	> The test case at line 73 (function call is made when multi-party threshold is reached) shows this behaviour (All FlightSuretyData contract functions are protected with the `requireIsOperational`  modifier) 

4. Airline Ante - Airline can be registered, but does not participate in contract until it submits funding of 10 ether
	> The test case at line 126 ((airline) cannot register an Airline using registerAirline() if it is not funded) shows this behaviour
	
### Passengers	
1. Passenger Airline Choice - Passengers can choose from a fixed list of flight numbers and departure that are defined in the Dapp client
	> The five available airlines are mocked up and created at the frontend bootstrapping. The airline is a valid registered airline and is funded

2. Passenger Payment - Passengers may pay up to 1 ether for purchasing flight insurance.
	> This is implemented through a require on `buy` function within the `FlightSuretyApp` contract. Test cases are implemented to ensure this behavior `((flight) passenger can buy more than 1 ether on surety for a flight - l. 189)`
	
3. Passenger Repayment - If flight is delayed due to airline fault, passenger receives credit of 1.5X the amount they paid
	> This is implemented through the `creditInsurees` function on `FlightSuretyData line 364`. I've tried to divide the current paid amount and then adding it to the previous value, since SafeMath work with integers I've tried this approach
	                         
4. Passenger Withdraw - Passenger can withdraw any funds owed to them as a result of receiving credit for insurance payout
	> This is implemented through the `pay` function on the `FlightSuretyData` contract. In a more complete application, it would have some kind of iteration between insurees and assigning the value for all of them. Ive limited the scope to the caller due to the timeline.
	
5. Insurance Payouts - Insurance payouts are not sent directly to passenger’s wallet
	> This is implemented through the `creditInsurees` which the funds got binded to the user data instead of the wallet.

### Oracles (Server App)
1. Functioning Oracle - Oracle functionality is implemented in the server app.
	> Oracle functionalities can be observed through the server.js code. Around the line `135` there is the listener for oracle events, of after identified who are the responsible to answer, do fire the `submitOracleResponse`
	
2. Oracle Initialization - Upon startup, 20+ oracles are registered and their assigned indexes are persisted in memory
	> The function `initOracles` at line ` 79 - server.js` will receive an Array of accounts, fetched from web3 methods (`web3.eth.getAccounts`), my ganache is configured to start with 20 accounts, so this must be ensured to met this requirement
	
3. Oracle Updates - Update flight status requests from client Dapp result in OracleRequest event emitted by Smart Contract that is captured by server (displays on console and handled in code)
	> The `server.js` implements at the line `115`  the `OracleRequest` event subscription. The Dapp code triggers this event passing the flight, airline and timestamp parameters for that flight, and then the assigned oracle deals with it. The client implements the WebSocketsInterface in order to receive the `FlightStatusInfo - line 21 index.js`
	
4. Oracle Functionality - 	
Server will loop through all registered oracles, identify those oracles for which the OracleRequest event applies, and respond by calling into FlightSuretyApp contract with random status code of Unknown (0), On Time (10) or Late Airline (20), Late Weather (30), Late Technical (40), or Late Other (50)
	> This can be observed at `server.js line 125`, and its implementation was based on the previously existent test on `test/oracle.js`. A simple console.log of (`"found"` ) is implemented to indicate when an Oracle got assigned to respond. The random Status code assignment can be noticed when the oracle detects a discrepancy on the timestamp and assign a random status code index within the delayed range to be assigned to the response	
   
   
   
   
 

