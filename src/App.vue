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
export default {
  name: 'App'
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
