# CertiK_Election

ELECTION VOTING APP

Project Context

This is a dapp for Election based voting where users can sign into their MetaMask accounts and vote on their favorite candidates to win the election. These votes are securely stored on the Ethereum blockchain. 

Design

The index.html is the client interface that the user interacts with to use this dapp. Index.html communicates with index.js to record votes on the blockchain using the smart contract, Voting.sol. Migrations.sol helps migrate the contracts onto the blockchain along with the migrations folder which consists of 1_initial_migrations.js and 2_deploy_contracts.js. 

Implementation 

Steps: 
1) Used truffle to create the necessary files and directories required to run a dapp.
2) Wrote the Voting.sol contract in the contracts folder to keep track of the candidate list, updating and recording their votes and checking if the candidate they are voting for is present in the candidate list
3) Edited the contents in 2_deploy_contracts.js to be compatible with the Voting contract and deploy it on the chain.
4) Edited the truffle_config.js to run on the localhost and updating solidity version
5) Edited the index.js to connect with the metamask account and check for browser without metamask 
5) Edited the index.js files to have appropriate methods to load the Candidates and their votes information of the client-side interface and carry out the voting of a candidate by the user
6) Coded the index.html to lay out the user interface in a user-friendly manner with guiding messages. 
7) Ran ganache locally in terminal and imported metamask accouts using private keys to test dapp
8) Debugged all errors

Time spent and progress

Spent around 5-6 hours on this project. It succesfully lets a user vote for their favorite candidate and stores their vote on the blockchain. In future, I plan on reducing the vulnerabilities of the dapp and making it more secure for the user.


