<template>
  <div id="app">
    <nav>
      <router-link to="/">Main Page</router-link>
      <router-link to="/my">My Page</router-link>
      <router-link to="/survey">Survey Page</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import contractFunctions from './contract';

export default {
  name: 'App',
  methods: {
    async createNewBallot() {
      await contractFunctions.createBallot();
    },
    async getActiveBallotsWithPagination() {
      let some = await contractFunctions.getActiveBallotsCount();
      let pageSize = 5;
      if (some <= pageSize) {
          pageSize = some;
          console.log(pageSize)
      }
      await contractFunctions.getActiveBallotsWithPagination(1, pageSize);
    },
    async fetchActiveBallotsCount() {
      try {
        await contractFunctions.getActiveBallotsCount();
      } catch (error) {
        console.error('Error fetching active ballots count:', error);
      }
    }
  },
  async mounted() {
    await this.getActiveBallotsWithPagination();
  }
}
</script>

<style>
nav {
  display: flex;
  justify-content: space-around;
  background-color: #444;
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
}

nav a.router-link-active {
  font-weight: bold;
}
</style>
