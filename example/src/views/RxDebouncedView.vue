<template>
  <div>
    <p>Name: <input type="text" v-model="form.debounced.name.value" /></p>
    <div v-if="form.nameIsValid.value === true">Valid</div>
    <div v-else>Invalid</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RxDebounced } from "../rxclass";

export default defineComponent({
  setup() {
    const form = new RxDebounced(
      {
        name: {
          value: "",
          callback: (v: string) => {
            if (v.length >= 3) {
              form.nameIsValid.value = true;
            } else {
              form.nameIsValid.value = false;
            }
          },
        },
      },
      {
        nameIsValid: false,
      }
    );

    return {
      form,
    };
  },
});
</script>