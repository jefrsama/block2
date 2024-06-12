<template>
  <div class="main-page">
    <header>
      <h1>Main Page</h1>
      <ConnectWallet />
      <button @click="create">Create</button>
    </header>
    <section class="opened">
      <h2>Opened</h2>
      <div
          class="question-card"
          v-for="(ballot, index) in ballots"
          :key="index"
          @click="goToQuestion(index)"
      >
        <h3>{{ ballot[0] }}</h3>
<!--        <p>Start Time: {{ new Date(ballot[2] * 1000).toLocaleString() }}</p>-->
        <p>Duration: {{ ballot[3] }} seconds</p>
        <span class="status">🟢</span>
      </div>
    </section>
  </div>
</template>

<script>
import ConnectWallet from './ConnectWallet.vue'
import contractFunctions from '../contract';
export default {
  name: 'MainPage',
  components: {
    ConnectWallet
  },
  data (){
    return{
      ballots: []
    }
    
  },
  methods: {
    create() {
      console.log('Create button clicked')
    },
    async getActiveBallotsWithPagination() {
      let some = await contractFunctions.getActiveBallotsCount();
      let pageSize = 5;
      if (some <= pageSize) {
          pageSize = some;
          console.log("Hello")
      }
      this.ballots = await contractFunctions.getActiveBallotsWithPagination(0, pageSize);
      // console.log(ballots)
      // for(let i=0;i<pageSize;i++){
      //   console.log(ballots[i])
      //   for(let j=0;j<5;j++){
      //     console.log(ballots[i][j])
      //   }
      // }
    }
 
  } ,async mounted() {
    await this.getActiveBallotsWithPagination();
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
