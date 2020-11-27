import Home from "./containers/Home/Home";
import Request from "./containers/Request/Request";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";

const routes = [
  {
    path: "/home",
    name: "Home",
    icon: "",
    component: Home
  },
  {
    path: "/request",
    name: "Request",
    icon: "",
    component: Request
  },
  {
    path: "/signup",
    name: "SignUp",
    icon: "",
    component: SignUp
  },
  {
    path: "/signin",
    name: "SignIn",
    icon: "",
    component: SignIn
  }
  
];

export default routes;