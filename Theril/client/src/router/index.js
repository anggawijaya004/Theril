import Vue from "vue";
import VueRouter from "vue-router";
import Lobby from "../views/Lobby.vue";
import Login from "../views/Login.vue";
import Room from "../views/Room.vue";
import Game from "../views/Game.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby,
  },
  {
    path: "/room/:name",
    name: "Room",
    component: Room,
  },
  {
    path: "/game/:name",
    name: "Game",
    component: Game,
  },

  {
    path: "/board",
    name: "Board",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Board.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
