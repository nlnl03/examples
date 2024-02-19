import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../../views/HomePage.vue";
//  import quiz from '../views/quiz.vue';
import Exam from "../../views/ExamsForm.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // {
  //   path: '/quiz',
  //   name: 'quiz',
  //   component: quiz
  // },
  { path: "/exam/:id", component: Exam, props: true },

  // Add more routes as needed
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
