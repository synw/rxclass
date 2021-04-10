<template>
  <p>Name: <input type="text" v-model="form.name.value" /></p>
  <div v-if="form.nameIsValid.value === true">Valid</div>
  <div v-else>Invalid</div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { RxDebounced } from "../rxclass";

export default defineComponent({
  setup() {
    const form = new RxDebounced(
      {
        name: "",
        icon: "",
      },
      {
        nameIsValid: {
          value: false,
          callback: (v: boolean) => console.log("Form value modified", v),
        },
        iconIsValid: false,
      }
    );

    console.log(JSON.stringify(form, null, "  "));

    const stopWatch1 = watch(form.name, (v) => {
      if (v.length >= 3) {
        form.nameIsValid.value = true;
      } else {
        form.nameIsValid.value = false;
      }
      console.log(form.nameIsValid.value);
    });

    const stopWatch2 = watch(form.icon, (v: string) => {
      if (v.startsWith("fa")) {
        form.iconIsValid.value = true;
      } else {
        form.iconIsValid.value = false;
      }
    });

    return {
      form,
      stopWatch1,
      stopWatch2,
    };
  },

  beforeUnmount() {
    this.stopWatch1();
    this.stopWatch2();
  },
});
</script>