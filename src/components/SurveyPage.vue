<template>
  <div class="survey-page">
    <header>
      <h1>Survey</h1>
    </header>
    <section class="question-form">
      <h2>Question</h2>
      <form @submit.prevent="save">
        <label for="question">Question:</label>
        <input type="text" id="question" v-model="question">

        <label for="type">Type:</label>
        <select id="type" v-model="type">
          <option>One answer</option>
          <option>Multiple answers</option>
        </select>

        <label for="from">From:</label>
        <input type="datetime-local" id="from" v-model="from">

        <label for="to">To:</label>
        <input type="datetime-local" id="to" v-model="to">

        <label for="reward">Reward pool:</label>
        <input type="text" id="reward" v-model="reward">

        <label for="option">Option:</label>
        <input type="text" id="option" v-model="option">
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
            <input type="radio" :name="question" :value="opt"> {{ opt }}
          </li>
        </ul>
        <button @click="submit">Submit</button>
      </div>
    </section>
  </div>
</template>

<script>
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
      options: []
    }
  },
  methods: {
    addOption() {
      if (this.option) {
        this.options.push(this.option)
        this.option = ''
      }
    },
    removeOption(index) {
      this.options.splice(index, 1)
    },
    save() {
      console.log('Form saved')
    },
    submit() {
      console.log('Survey submitted')
    }
  }
}
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

.question-form, .question-preview {
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

input, select, button {
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
