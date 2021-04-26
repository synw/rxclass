# Rxclass

[![pub package](https://img.shields.io/npm/v/rxclass)](https://www.npmjs.com/package/rxclass)

A set of stateful data classes with reactive properties

- [Reactive data class](#base-reactive-class): base class with reactive properties
- [Persistent data class](#persistent-data-class): a class that persists it's own state to localstorage
- [Debounced data class](#debounced-data-class): a class where properties are set after a delay
- [Input data class](#input-data-class): a class to input a value with validation
- [Rest data class](#rest-data-class): a class that handles rest requests

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
  setup() {
    return {
      reactiveConf,
    };
  }
});
</script>
```

### Callback

Add a callback when a prop is modified:

```typescript
import { RxParam } from "rxclass";
import { RxClass } from "rxclass";

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
import { RxStorage } from "rxclass";

export default class User extends RxStorage {
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

## Input data class

A class to input a value with validation

```html
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
import { RxInput } from "rxclass";

export default defineComponent({
  setup() {
    const name = new RxInput<string>({
      id: "name",
      value: "",
      validator: (v: string): boolean => {
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
```

## Debounced data class

A class where properties are set after a delay. Form example:

```html
<template>
  <p>Name: <input type="text" v-model="form.debounced.name.value" /></p>
  <div v-if="form.nameIsValid.value === true">Valid</div>
  <div v-else-if="form.nameIsValid.value === false">Invalid</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RxDebounced } from "rxclass";

export default defineComponent({
  setup() {
    const form = new RxDebounced(
      // debounced props
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
      // regular ephemeral state
      {
        nameIsValid: null, // tristate: null, false or true
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
import { RxRest } from "rxclass";

export default class ReactiveDataModel extends RxRest {
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
