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
      >
        <h3>{{ ballot.question }}</h3>
        <p>Start Time: {{ new Date(parseInt(ballot.startTime) * 1000).toLocaleString() }}</p>
        <p>End Time: {{ new Date((parseInt(ballot.startTime) + parseInt(ballot.duration)) * 1000).toLocaleString() }}</p>
        <p>Reward Amount: {{ ballot.rewardAmount }} wei</p>
        <p>Total Votes: {{ ballot.totalVotes }}</p>
        <p>Creator: {{ ballot.creator }}</p>

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
      try {
        let count = await contractFunctions.getActiveBallotsCount();
        let pageSize = count <= 5 ? count : 5;
        let ballots = await contractFunctions.getActiveBallotsWithPagination(0, pageSize);
        this.ballots = ballots.map(ballot => ({
          question: ballot[0],
          options: ballot[1],
          startTime: ballot[2],
          duration: ballot[3],
          rewardAmount: ballot[4].toString(),
          totalVotes: ballot[5].toString(),
          creator: ballot[6],
          voters: ballot[7]
        }));

        let win = await contractFunctions.getWinner(4)
        console.log(win);

      } catch (error) {
        console.error('Error loading ballots:', error);
      }
    },
    // async getActiveBallotsWithPagination() {
    //   let some = await contractFunctions.getActiveBallotsCount();
    //   let pageSize = 5;
    //   if (some <= pageSize) {
    //       pageSize = some;
    //       console.log("Hello")
    //   }
    //   this.ballots = await contractFunctions.getActiveBallotsWithPagination(0, pageSize);
    //   // console.log(ballots)
    //   // for(let i=0;i<pageSize;i++){
    //   //   console.log(ballots[i])
    //   //   for(let j=0;j<5;j++){
    //   //     console.log(ballots[i][j])
    //   //   }
    //   // }
    // }

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
