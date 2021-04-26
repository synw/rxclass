<template>
  <div>
    <div id="nav">
      <router-link to="/rxclass">RxClass</router-link> |
      <router-link to="/rxstorage">RxStorage</router-link> |
      <router-link to="/rxdebounced">RxDebounced</router-link> |
      <router-link to="/rxrest">RxRest</router-link> |
      <router-link to="/rxinput">RxInput</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { initState } from "./state";

export default defineComponent({
  beforeCreate() {
    initState();
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
