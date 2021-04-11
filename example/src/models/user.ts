import RxStorage from "../rxclass/persistence";

export default class User extends RxStorage {

  constructor() {
    console.log("Build user")
    //ephemeral state
    const state = {
      isLoggedIn: false
    }
    // persistent state
    const store = {
      profile: {
        name: "anonymous"
      },
      hasSubscribed: true,
      lastSeen: new Date().getUTCMilliseconds()
    }
    const key = "user";
    // provide a storage key for the class instance
    super(key, store, state);
    //console.log("THIS USER", JSON.stringify(this, null, "  "));
  }
}