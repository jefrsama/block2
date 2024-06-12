<template>
  <div class="survey-page">
    <header>
      <h1>Survey</h1>
    </header>
    <section class="question-form">
      <h2>Question</h2>
      <form @submit.prevent="save">
        <label for="question">Question:</label>
        <input type="text" id="question" v-model="question" />

        <label for="type">Type:</label>
        <select id="type" v-model="type">
          <option>One answer</option>
          <option>Multiple answers</option>
        </select>

        <label for="from">From:</label>
        <input type="datetime-local" id="from" v-model="from" />

        <label for="to">To:</label>
        <input type="datetime-local" id="to" v-model="to" />

        <label for="reward">Reward pool:</label>
        <input type="text" id="reward" v-model="reward" />

        <label for="option">Option:</label>
        <input type="text" id="option" v-model="option" />
        <button @click.prevent="addOption">+</button>

        <ul>
          <li v-for="(opt, index) in options" :key="index">
            {{ opt }} <button @click.prevent="removeOption(index)">🗑️</button>
          </li>
        </ul>

        <button type="submit">Save</button>
      </form>
    </section>
    <section class="question-preview">
      <h2>Preview</h2>
      <div class="question">
        <h3>{{ question }}</h3>
        <ul>
          <li v-for="opt in options" :key="opt">
            <input type="radio" :name="question" :value="opt" /> {{ opt }}
          </li>
        </ul>
        <button @click="submit">Submit</button>
      </div>
    </section>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import abiData from '../abi.json';

export default {
  name: 'SurveyPage',
  data() {
    return {
      question: '',
      type: 'One answer',
      from: '',
      to: '',
      reward: '',
      option: '',
      options: [],
      provider: null,
      wallet: null,
      voteChainContract: null,
    };
  },
  created() {
    this.initializeEthereum();
  },
  methods: {
    initializeEthereum: async function() {
        
    },
    addOption: function() {
      if (this.option.trim() !== '') {
        this.options.push(this.option.trim());
        this.option = '';
      }
    },
    removeOption: function(index) {
      this.options.splice(index, 1);
    },
    save: async function() {
      // const infuraProjectId = '1ba057ea4d2c4ea8beecda48ac63b1a6';
// const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${infuraProjectId}`);

// const privateKey = '40423dd82129adebc5d45d474f9649e133730510a0cb40f64415978c9b641286';
// const wallet = new ethers.Wallet(privateKey, provider);

const contractAbi = abiData.abi[0];

const contractAddress = '0xe4aFA9e78ec3225b012FAB9a6411f4e42A7aa6fA';

let signer;
try {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  signer = this.provider.getSigner();
} catch{
  console.error('User denied account access:');
}
const voteChainContract = new ethers.Contract(contractAddress, contractAbi, signer);
      const startTime = Math.floor(new Date(this.from).getTime() / 1000);
      const endTime = Math.floor(new Date(this.to).getTime() / 1000);
      const duration = endTime - startTime;
      const rewardAmount = ethers.parseEther(this.reward);

      // Log the values to ensure they are correct
      console.log('Question:', this.question);
      console.log('Options:', this.options);
      console.log('Start Time:', startTime);
      console.log('Duration:', duration);
      console.log('Reward Amount (Ether):', this.reward);
      console.log('Reward Amount (Wei):', rewardAmount.toString());

      try {
        const tx = await voteChainContract.createBallot(
          this.question,
          this.options,
          startTime,
          duration,
          rewardAmount,
          {
            value: rewardAmount
          }
        );

        await tx.wait();
        console.log('Ballot created:', tx.hash);
        alert('Ballot created successfully!');
      } catch (error) {
        console.error('Error creating ballot:', error);
        alert('Failed to create ballot');
      }
    },
    submit: function() {
      console.log('Survey submitted');
    },
  },
};
</script>

<style scoped>
.survey-page {
  background-color: #2a2a2a;
  color: #ffffff;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-form,
.question-preview {
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input,
select,
button {
  margin-top: 5px;
}

.question {
  background-color: #3a3a3a;
  padding: 10px;
  border-radius: 5px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>
