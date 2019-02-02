### Separation of Concerns, Operational Control and “Fail Fast”
1. Smart Contract Seperation - Smart Contract code is separated into multiple contracts:
	> FlightSuretyData contains the structs and persistence logic / FlightSuretyApp contains encapsulations and validations; It is exposed to use. 

2. Dapp Created and Used for Contract Calls - A Dapp client has been created and is used for triggering contract calls. Client can be launched with “npm run dapp” and is available at http://localhost:8000
	> Boilerplate is up and running upon ` npm run dapp` execution.
	
	2.1 Passenger can purchase insurance for flight
	> TBD
	
	2.2 Trigger contract to request flight status update
	> This event can be triggered by pressing the button on the UI, this will trigger the function `fetchFlightStatus - line 69 contract.js` which will gather the current selected from the dropdown and call the function with the parameters. 

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
	> tbd
	
3. Passenger Repayment - If flight is delayed due to airline fault, passenger receives credit of 1.5X the amount they paid
	> tbd
	                         
4. Passenger Withdraw - Passenger can withdraw any funds owed to them as a result of receiving credit for insurance payout
	> tbd
	
5. Insurance Payouts - Insurance payouts are not sent directly to passenger’s wallet
	> tbd

### Oracles (Server App)
1. Functioning Oracle - Oracle functionality is implemented in the server app.
	> Oracle functionalities can be observed through the server.js code. Around the line `135` there is the listener for oracle events, of after identified who are the responsible to answer, do fire the `submitOracleResponse`
	
2. Oracle Initialization - Upon startup, 20+ oracles are registered and their assigned indexes are persisted in memory
	> The function `initOracles` at line ` 79 - server.js` will receive an Array of accounts, fetched from web3 methods (`web3.eth.getAccounts`), my ganache is configured to start with 20 accounts, so this must be ensured to met this requirement
	
3. Oracle Updates - Update flight status requests from client Dapp result in OracleRequest event emitted by Smart Contract that is captured by server (displays on console and handled in code)
	> The `server.js` implements at the line `115`  the `OracleRequest` event subscription. The Dapp code triggers this event passing the flight, airline and timestamp parameters for that flight, and then the assigned oracle deals with it.
	
4. Oracle Functionality - 	
Server will loop through all registered oracles, identify those oracles for which the OracleRequest event applies, and respond by calling into FlightSuretyApp contract with random status code of Unknown (0), On Time (10) or Late Airline (20), Late Weather (30), Late Technical (40), or Late Other (50)
	> This can be observed at `server.js line 125`, and its implementation was based on the previously existent test on `test/oracle.js`. A simple console.log of (`"found"` ) is implemented to indicate when an Oracle got assigned to respond	
   