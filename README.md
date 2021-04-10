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
reactiveConf.prop1.value = false;
```

All the state properties are reactive. Usage in a Vuejs component:

```html
<template>
  <!-- this prop is reactive -->
  <div>{{ reactiveConf.prop1.value }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import reactiveConf from "@/conf";

export default defineComponent({
  data() {
    return {
      prop1: reactiveConf,
    };
  }
});
</script>
```

### Callback

Add a callback when a prop is modified:

```typescript
import { RxParam } from "../rxclass/interfaces";
import RxClass from "../rxclass/base";

export default class ReactiveConf extends RxClass {
  constructor() {
    const state = {
      prop5: {
        value: "val",
        callback: (v: string) => console.log("Prop 5 changed to", v)
      } as RxParam
    };
    super(state);
  }
}
```

The callback will be executed each time the property is changed

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
const isLoggedIn = user.store.isLoggedIn.value;
```

Mutate a store property:

```typescript
user.store.isLoggedIn.value = true;
```
