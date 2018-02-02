<template>
  <div id="app">
   <nav class="navbar navbar-dafult">
    <div class="container">
     <div class="navbar-header">
      <router-link class="navbar-brand" to="/">Posts</router-link>
     </div>
     <ul class="nav navbar-nav">
      <li><router-link to="/" >Home</router-link></li>
      <li><router-link to="/posts">Posts</router-link></li>

     </ul>
    </div>
   </nav>
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}
</style>
