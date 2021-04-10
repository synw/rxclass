<template>
  <div>
    <!-- this prop is reactive -->
    <p v-html="conf.prop1.value"></p>
    <p>
      <button @click="toggleProp1()">Toggle prop 1</button>
    </p>
    <p>{{ conf.prop2.value }}</p>
    <p>
      <button @click="mutateProp2()">Mutate prop 2</button>
    </p>
    <p>{{ conf.prop3.value }}</p>
    <p>
      <button @click="mutateProp3()">Mutate prop 3</button>
    </p>
    <p v-html="conf.prop4.value.subprop1"></p>
    <p>
      <button @click="mutateProp4()">Mutate prop 4</button>
    </p>
    <p>{{ conf.prop5.value }}</p>
    <p>
      <button @click="mutateProp5()">Mutate prop 5</button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { reactiveConf } from "../state";

export default defineComponent({
  setup() {
    const conf = reactiveConf;
    return {
      conf,
    };
  },
  methods: {
    toggleProp1() {
      reactiveConf.prop1.value = !reactiveConf.prop1.value;
    },
    mutateProp2() {
      reactiveConf.prop2.value = reactiveConf.prop2.value + "+";
    },
    mutateProp3() {
      reactiveConf.prop3.value++;
    },
    mutateProp4() {
      reactiveConf.prop4.value.subprop1 =
        reactiveConf.prop4.value.subprop1 + "+";
    },
    mutateProp5() {
      reactiveConf.prop5.value = reactiveConf.prop5.value + "+";
    },
  },
  created() {
    console.log("CONF", JSON.stringify(this.conf, null, "  "));
  },
});
</script>
