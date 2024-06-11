<template>
  <div class="connect-wallet">
    <button @click="connectWallet">Connect Wallet</button>
    <div v-if="account">
      <p>Connected Account: {{ account }}</p>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'

export default {
  data() {
    return {
      account: null,
      web3: null
    }
  },
  methods: {
    async connectWallet() {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          // We can now use the web3 instance
          this.web3 = new Web3(window.ethereum);
          // Get the user's accounts
          const accounts = await this.web3.eth.getAccounts();
          this.account = accounts[0];
        } catch (error) {
          console.error("User denied account access or there's an issue with MetaMask");
        }
      } else {
        alert('Please install MetaMask!');
      }
    }
  }
}
</script>

<style scoped>
.connect-wallet {
  display: flex;
  flex-direction: column;
  align-items: center;
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
