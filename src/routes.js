import Home from "./containers/Home/Home";
import Request from "./containers/Request/Request";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import Conversation from "./containers/Conversation/Conversation";
import Inbox from "./containers/Inbox/Inbox";
import Profile from "./containers/Profile/Profile";

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
  },
  {
    path: "/conversation",
    name: "Conversation",
    icon: "",
    component: Conversation
  },
  {
    path: "/inbox",
    name: "Inbox",
    icon: "",
    component: Inbox
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "",
    component: Profile
  }
  
];

export default routes;