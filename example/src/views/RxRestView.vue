<template>
  <button @click="employees.load()">Fetch data</button>
  <div v-if="employees.isLoading.value === true">Loading ...</div>
  <br /><br />
  <div v-for="employee in employees.all.value" :key="employee.id">
    {{ employee.id }}: {{ employee.name }} {{ employee.salaryLabel }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Employees } from "../models/employee";

export default defineComponent({
  setup() {
    const employees = new Employees();

    return {
      employees,
    };
  },
});
</script>