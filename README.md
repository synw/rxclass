# Rxclass

A set of stateful abstract classes with reactive properties

- [Reactive data class](#base-reactive-class): base class with reactive properties
- [Persistent data class](#persistent-data-class): a class that persists it's own state to localstorage
- [Rest data class](#network-data-class): a class with rest methods to manipulate data

```bash
npm install rxclass
# or 
yarn add rxclass
```

## Reactive data class

### Create a data class

```typescript
import  { RxClass } from "rxclass";

export default class ReactiveConf extends RxClass {
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
reactiveConf.state.prop1 = false;
```

All the state properties are reactive. Usage in a Vuejs component:

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

All the store data will be automatically persisted to localstorage

```typescript
import { RxStorageClass } from "rxclass";

export default class User extends RxStorageClass {
  public name: string;

  constructor(name: string) {
    // persistent state
    const store = {
      isLoggedIn: false
    }
    const key = "user";
    // provide a storage key for the class instance
    super(key, store);
    this.name = name;
  }
}
```

Read a store property:

```typescript
const user = User("anonymous");
const isLoggedIn = user.isLoggedIn;
```

Mutate a store property:

```typescript
user.mutate("isLoggedIn", true);
```

## Rest data class

A class with rest network methods to manipulate data

```typescript
import { RxRestClass } from "rxclass";

export default class ReactiveConf extends RxRestClass {
  constructor() {// eslint-disable-line
    const serverUrl = "http://localhost:8000"
    super(serverUrl)
  }
}

const dataManager = new ReactiveConf()
await dataManager.fetchData<Array<any>>()
// the data is now available in a reactive prop
console.log(dataManager.dataset)
```