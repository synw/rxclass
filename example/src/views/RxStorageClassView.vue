<template>
  <div>
    <h2>Ephemeral state</h2>
    <div v-if="user.isLoggedIn.value">
      <p>User is logged in</p>
      <p>
        <button @click="logout()">Logout user</button>
      </p>
    </div>
    <div v-else>
      <p>User is anonymous</p>
      <p>
        <button @click="login()">Login user</button>
      </p>
    </div>
    <h2>Persistent state</h2>
    <p>Username: {{ user.store.profile.value.name }}</p>
    <label for="username">Set user name:</label>
    <input id="username" type="text" v-model="form.username" />
    <button @click="setName">Submit</button>
    <p v-html="user.store.hasSubscribed.value"></p>
    <button @click="setSub">Toggle subsciption</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { user } from "../state";

export default defineComponent({
  setup() {
    const form = {
      username: "",
    };
    return {
      user,
      form,
    };
  },
  methods: {
    // mutate ephemeral state
    login() {
      this.user.isLoggedIn.value = true;
    },
    logout() {
      this.user.isLoggedIn.value = false;
    },
    // mutate persistent state
    setLastSeen() {
      this.user.store.lastSeen.value = new Date().getUTCMilliseconds();
    },
    setSub() {
      this.user.store.hasSubscribed.value = !this.user.store.hasSubscribed
        .value;
    },
    setName() {
      if (this.form.username.length === 0) {
        throw "Set a username";
      }
      console.log(
        "Mutate name to",
        this.form.username,
        "from",
        this.user.store.profile.value.name
      );
      this.user.store.profile.value.name = this.form.username;
      // mutate
      this.user.store.profile.value = Object.assign(
        this.user.store.profile.value
      );
    },
  },
  mounted() {
    console.log("USER", JSON.stringify(this.user, null, "  "));
  },
});
</script>
