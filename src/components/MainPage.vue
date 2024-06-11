<template>
  <div class="main-page">
    <header>
      <h1>Main Page</h1>
      <ConnectWallet />
      <button @click="create">Create</button>
    </header>
    <section class="opened">
      <h2>Opened</h2>
      <div class="question-card" v-for="i in 4" :key="i">
        <h3>Question</h3>
        <p>0x000005</p>
        <p>24.02.2024 15:00 - 26.02.2024 16:00</p>
        <span class="status">🟢</span>
      </div>
    </section>
  </div>
</template>

<script>
import ConnectWallet from './ConnectWallet.vue'

export default {
  name: 'MainPage',
  components: {
    ConnectWallet
  },
  methods: {
    create() {
      console.log('Create button clicked')
    }
  }
}
</script>

<style scoped>
.main-page {
  background-color: #2a2a2a;
  color: #ffffff;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
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

.opened {
  margin-top: 20px;
}

.question-card {
  background-color: #3a3a3a;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-size: 20px;
}
</style>
