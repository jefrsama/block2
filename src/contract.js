import { ethers } from 'ethers';
import abiData from './abi.json'; // Correct the path to abi.json

const infuraProjectId = '1ba057ea4d2c4ea8beecda48ac63b1a6';
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraProjectId}`);

const privateKey = '40423dd82129adebc5d45d474f9649e133730510a0cb40f64415978c9b641286';
const wallet = new ethers.Wallet(privateKey, provider);

const contractAbi = abiData.abi[0];

const contractAddress = '0xe4aFA9e78ec3225b012FAB9a6411f4e42A7aa6fA';

const voteChainContract = new ethers.Contract(contractAddress, contractAbi, wallet);

async function createBallot(question, options, from, to, reward) {
    const startTime = Math.floor(new Date(from).getTime() / 1000);
    const endTime = Math.floor(new Date(to).getTime() / 1000);
    const duration = endTime - startTime;
    const rewardAmount = ethers.utils.parseEther(reward);

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
    return [winnerIndex, winningVotes];
}

async function getActiveBallotsWithPagination(page, pageSize) {
    
        let result = await voteChainContract.getActiveBallotsWithPagination(page, pageSize);
        return result;

}

async function getUserVotingHistory(userAddress) {
    const history = await voteChainContract.getUserVotingHistory(userAddress);
    console.log('User Voting History:', history);
}

async function getActiveBallotsCount() {
    const counts = await voteChainContract.getActiveBallotsCount();
    console.log(counts)
    return parseInt(counts);
}

// Exporting the functions
export default {
    createBallot,
    vote,
    getBallotByIndex,
    getResults,
    distributeRewards,
    getWinner,
    getActiveBallotsWithPagination,
    getUserVotingHistory,
    getActiveBallotsCount
};

// Example usage (uncomment to test)
// getActiveBallotsCount();
