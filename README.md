# Reactive data class

A set of stateful abstract classes with reactive properties

- [Reactive data class](#base-reactive-class): base class with reactive properties
- [Persistent data class](#persistent-data-class): a class that persists it's own state to localstorage
- [Network data class](#network-data-class): a class with methods to fetch data

```bash
npm install rxclass
# or 
yarn add rxclass
```

## Base reactive class

### Create a data class

```typescript
import  { ReactiveDataClass } from "rxclass";

export default class ReactiveConf extends ReactiveDataClass {
  constructor() {
    const state = {
      prop1: true,
      prop2: "foo",
      prop3: 45,
      prop4: {
        subprop1: "bar"
      }
    };
    super(state);
  }
}
```

### Usage

Initialize and set a property value

```typescript
const reactiveConf = new ReactiveConf();
// set a new value for a prop
reactiveConf.prop("prop1", false);
```

All the state properties are reactive. Usage in a vuejs component:

```html
<template>
  <!-- this prop is reactive -->
  <div>{{ prop1 }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import reactiveConf from "@/conf";

export default defineComponent({
  data() {
    return {
      prop1: reactiveConf.prop1,
    };
  }
});
</script>
```

## Persistent data class

All the state data will be automatically persisted to localstorage

```typescript
import { ReactivePersistentDataClass } from "rxclass";

export default class ReactiveConf extends ReactivePersistentDataClass {
  constructor() {// eslint-disable-line
    const state = {
      prop1: {
        subprop1: true
      },
    }
    // provide a key for storage
    super(state, "rconf")
    // load initial data from localstorage
    this.load()
  }
}
```

## Network data class

A class with network methods to fetch data

```typescript
import { ReactiveNetworkDataClass } from "rxclass";

export default class ReactiveConf extends ReactiveNetworkDataClass {
  constructor() {// eslint-disable-line
    const state = {
      prop1: {
        subprop1: true
      },
    }
    const serverUrl = "http://localhost:8000"
    super(state, serverUrl)
  }
}

const dataManager = new ReactiveConf()
await dataManager.fetchData<Array<any>>()
// the data is now available in a reactive prop
console.log(dataManager.dataset)
```