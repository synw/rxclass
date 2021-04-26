<template>
  <div>
    <h1>RxInput</h1>
    value : {{ name.inputValue.value }}
    <p>Name: <input type="text" v-model="name.inputValue.value" /></p>
    <div v-if="name.isValid.value === true">Valid</div>
    <div v-else-if="name.isValid.value === false">Invalid</div>
    <div v-else>Null</div>
    <div v-if="isFormValid === true">Form is valid</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RxInput } from "../rxclass";

export default defineComponent({
  setup() {
    const name = new RxInput<string>({
      id: "name",
      value: "",
      validator: (v: string): boolean => {
        console.log("Validate", v);
        if (v.length >= 3) {
          return true;
        }
        return false;
      },
    });

    const isFormValid = name.isValid;

    return {
      name,
      isFormValid,
    };
  },
});
</script>