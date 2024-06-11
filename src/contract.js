const { ethers } = require('ethers');
const path = require('path');
const fs = require("fs");

const infuraProjectId = '1ba057ea4d2c4ea8beecda48ac63b1a6';
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraProjectId}`);

const privateKey = '40423dd82129adebc5d45d474f9649e133730510a0cb40f64415978c9b641286';
const wallet = new ethers.Wallet(privateKey, provider);


const abiPath = path.resolve("./abi.json");  
const rawData = fs.readFileSync(abiPath);  
const contractAbi = JSON.parse(rawData).abi

const contractAddress = '0x6E0d93C0B434F0F45f80fD1132dBD735E39CaaDC';

const voteChainContract = new ethers.Contract(contractAddress, contractAbi, wallet);


async function createBallot() {
    const question = "What is your favorite color?";
    const options = ["Red", "Blue", "Green"];
    const currentTime = Math.floor(Date.now() / 1000);
    const startTime = currentTime + 120;
    const duration = 3600; 
    const rewardAmount = ethers.parseEther("0.1"); 

    try {
        

        const tx = await voteChainContract.createBallot(question, options, startTime, duration, rewardAmount, {
            value: rewardAmount
        });

        await tx.wait();
        console.log('Ballot created:', tx.hash);
    } catch (error) {
        console.error('Error creating ballot:', error);
    }
}


async function vote(ballotIndex, optionIndex) {
    const tx = await voteChainContract.vote(ballotIndex, optionIndex);
    await tx.wait();

    console.log('Voted:', tx.hash);
}


async function getBallotByIndex(index) {
    const ballot = await voteChainContract.getBallotByIndex(index);
    console.log('Ballot:', ballot);
}


async function getResults(ballotIndex, optionIndex) {
    const results = await voteChainContract.getResults(ballotIndex, optionIndex);
    console.log('Results:', results.toString());
}


async function distributeRewards(ballotIndex) {
    const tx = await voteChainContract.distributeRewards(ballotIndex);
    await tx.wait();

    console.log('Rewards distributed:', tx.hash);
}


async function getWinner(ballotIndex) {
    const [winnerIndex, winningVotes] = await voteChainContract.getWinner(ballotIndex);
    console.log(`Winner Index: ${winnerIndex}, Winning Votes: ${winningVotes}`);
}


async function getActiveBallotsWithPagination(page, pageSize) {
    const ballots = await voteChainContract.getActiveBallotsWithPagination(page, pageSize);
    console.log('Active Ballots:', ballots);
}


async function getUserVotingHistory(userAddress) {
    const history = await voteChainContract.getUserVotingHistory(userAddress);
    console.log('User Voting History:', history);
}