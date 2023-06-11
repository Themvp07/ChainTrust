// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';
//import 'hardhat/console.sol';

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * THIS EXAMPLE USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

contract APIConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 public temperature;
    uint256 public client;
    uint256 public seller;
    uint256 public delivery;
    uint256 public automate;
    uint256 public fnft = 0;
    bytes32 private jobId;
    uint256 private fee;

    event RequestTemperature(bytes32 indexed requestId, uint256 temperature);

    /**
     * @notice Initialize the link token and target oracle

     * Sapolia Testnet details:
     */

    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = 'ca98366cc7314957b8c012c72f05aeeb';
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)

    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
     function requestTemperatureData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on

        req.add('get', 'http://34.170.142.252:8000/readings');
   
        req.add('path', 'temperature');

        int256 timesAmount = 1**1;
        req.addInt('times', timesAmount);

        // Sends the request
        return sendChainlinkRequest(req, fee);  
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _temperature) public recordChainlinkFulfillment(_requestId) {
        temperature = _temperature;
        emit RequestTemperature(_requestId, _temperature);
        
       }

    function setClient(uint256 _newClient) public {
        client = _newClient;
        }

    function setSeller(uint256 _newSeller) public {
        seller = _newSeller;
        }

    function setDelivery(uint256 _newDellivery) public {
        delivery = _newDellivery;
        if (delivery == 1 && seller == 1)
            {
                requestTemperatureData();
                automate = 1;
            }
        if (delivery == 0 && seller == 0)
            {
                automate = 0;
                fnft = 1;
            }
        }

   
    /**
     * Allow withdraw of Link tokens from the contract
     */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }
}