D:\Projects\flightSuretyUpdt>truffle migrate --rinkeby
Compiling .\contracts\Ownable.sol...

Compilation warnings encountered:

/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:109:37: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
                                    address airline,
                                    ^-------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:110:37: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
                                    string memory flight,
                                    ^------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:111:37: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
                                    uint256 timestamp,
                                    ^---------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:112:37: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
                                    uint8 statusCode
                                    ^--------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:362:33: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function setOperatingStatus(bool mode, address sender) external {}
                                ^-------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:362:44: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function setOperatingStatus(bool mode, address sender) external {}
                                           ^------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:365:30: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function registerAirline(address airline, address owner) external {}
                             ^-------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:365:47: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function registerAirline(address airline, address owner) external {}
                                              ^-----------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:366:19: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function fund(address owner) public payable {}
                  ^-----------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:367:18: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function buy(address passenger, string flight) public payable {}
                 ^---------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:367:37: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function buy(address passenger, string flight) public payable {}
                                    ^-----------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:368:29: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function creditInsurees(address passenger, string flight) external payable{}
                            ^---------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:368:48: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function creditInsurees(address passenger, string flight) external payable{}
                                               ^-----------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:370:24: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function isAirline(address airline) external view returns(bool){}
                       ^-------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:371:34: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function getAirlineOwnership(address airline) external view returns(uint256){}
                                 ^-------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:372:29: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function registerFlight(address airline, string flightId, uint256 timestamp) external {}
                            ^-------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:372:46: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function registerFlight(address airline, string flightId, uint256 timestamp) external {}
                                             ^-------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:372:63: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function registerFlight(address airline, string flightId, uint256 timestamp) external {}
                                                              ^---------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:373:29: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function setTestingMode(bool mode) external {}
                            ^-------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:374:31: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function flightSuretyInfo(address passenger, string flight) external returns(uint256){}
                              ^---------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:374:50: Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
    function flightSuretyInfo(address passenger, string flight) external returns(uint256){}
                                                 ^-----------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:362:5: Warning: Function state mutability can be restricted to pure
    function setOperatingStatus(bool mode, address sender) external {}
    ^----------------------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:363:5: Warning: Function state mutability can be restricted to pure
    function isOperational() external view returns(bool) {}
    ^-----------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:364:5: Warning: Function state mutability can be restricted to pure
    function getActiveAirlines() external view returns(address[]){}
    ^-------------------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:365:5: Warning: Function state mutability can be restricted to pure
    function registerAirline(address airline, address owner) external {}
    ^------------------------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:370:5: Warning: Function state mutability can be restricted to pure
    function isAirline(address airline) external view returns(bool){}
    ^---------------------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:371:5: Warning: Function state mutability can be restricted to pure
    function getAirlineOwnership(address airline) external view returns(uint256){}
    ^----------------------------------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:372:5: Warning: Function state mutability can be restricted to pure
    function registerFlight(address airline, string flightId, uint256 timestamp) external {}
    ^--------------------------------------------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:373:5: Warning: Function state mutability can be restricted to pure
    function setTestingMode(bool mode) external {}
    ^--------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyApp.sol:374:5: Warning: Function state mutability can be restricted to pure
    function flightSuretyInfo(address passenger, string flight) external returns(uint256){}
    ^-------------------------------------------------------------------------------------^
,/D/Projects/flightSuretyUpdt/contracts/FlightSuretyData.sol:345:5: Warning: Function state mutability can be restricted to view
    function flightSuretyInfo
    ^ (Relevant source part starts here and spans across multiple lines).

Writing artifacts to .\build\contracts

⚠️  Important ⚠️
If you're using an HDWalletProvider, it must be Web3 1.0 enabled or your migration will hang.


Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 999999999999999


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xa2dda61ce546647b7bcf921ec98b62aedeea18d28cc725b821ecca778564c4f6
   > Blocks: 0            Seconds: 0
   > contract address:    0x2237010E331f40c53024eaE26ecC1242124C35b7
   > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
   > balance:             958.154175480000000106
   > gas used:            277398
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00554796 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00554796 ETH


2_deploy_contracts.js
=====================

   Replacing 'FlightSuretyData'
   ----------------------------
   > transaction hash:    0x932bb191c22a84880973b2f9aa29f1428ceefbfdcb36094ea3e72d0f1451e386
   > Blocks: 0            Seconds: 0
   > contract address:    0xb4b4773d987353D7D29a4853813dBAa7245C15c2
   > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
   > balance:             958.076931620000000106
   > gas used:            3862193
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.07724386 ETH


   Replacing 'FlightSuretyApp'
   ---------------------------
   > transaction hash:    0x8c2dc9f9322e3b5e2a86a99604e3ed06d64e733702ba96a0c46b41ed9b8efa7d
   > Blocks: 0            Seconds: 0
   > contract address:    0xC27B5a4370e5658139E0A9a66645aC4F19864bE2
   > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
   > balance:             958.030669540000000106
   > gas used:            2313104
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04626208 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.12350594 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.1290539 ETH

