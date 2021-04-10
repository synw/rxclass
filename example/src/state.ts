import User from "@/models/user";
import ReactiveConf from "@/models/reactive_conf";

let reactiveConf: ReactiveConf;
let user: User;

function initState(): void {
  reactiveConf = new ReactiveConf();
  user = new User();
}

export { initState, user, reactiveConf };