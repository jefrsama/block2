<template>
  <div class="my-page">
    <header>
      <h1>My</h1>
    </header>
    <section class="my-questions">
      <h2>My Questions</h2>
      <div class="question-card" v-for="i in 4" :key="i">
        <h3>Question</h3>
        <p>0x000005</p>
        <p>24.02.2024 15:00 - 26.02.2024 16:00</p>
        <span class="status">🟢</span>
      </div>
    </section>
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
export default {
  name: 'MyPage'
}
</script>

<style scoped>
.my-page {
  background-color: #2a2a2a;
  color: #ffffff;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.my-questions, .opened {
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
