# Rxclass

A set of stateful data classes with reactive properties

- [Reactive data class](#base-reactive-class): base class with reactive properties
- [Persistent data class](#persistent-data-class): a class that persists it's own state to localstorage
- [Debounced data class](#debounced-data-class): a class where properties are set after a delay

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
import { RxParam } from "rxclass";
import RxClass from "rxclass";

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

## Debounced data class

A class where properties are set after a delay. Form example:

```html
<template>
  <p>Name: <input type="text" v-model="form.debounced.name.value" /></p>
  <div v-if="form.nameIsValid.value === true">Valid</div>
  <div v-else>Invalid</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RxParam, RxDebounced } from "rxclass";

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
        } as RxParam,
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
```

## Rest data class

A class with rest network methods to manipulate data

```typescript
import { RxRestClass } from "rxclass";

export default class ReactiveDataModel extends RxRestClass {
  constructor() {
    const serverUrl = "http://localhost:8000"
    super(serverUrl)
  }
}

const dataManager = new ReactiveDataModel()
// get array data
const data = await dataManager.fetchGetArray<Array<Record<string, any>>>("/some/endpoint")
// the data is now available in a reactive prop
console.log(dataManager.arrayDataset)

// get object data
const data2 = dataManager.fetchGetObject("/some/endpoint")
// the data is now available in a reactive prop
console.log(dataManager.objectDataset)
```

## Examples

[Examples](https://github.com/synw/rxclass/tree/main/example)
