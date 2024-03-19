import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../../views/HomePage.vue";
//  import quiz from '../views/quiz.vue';
import Exam from "../../views/ExamsForm.vue";
import mainQuiz from "../../views/mainQuiz.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mainQuiz",
    name: "mainQuiz",
    component: mainQuiz,
  },
  // {
  //   path: '/quiz',
  //   name: 'quiz',
  //   component: quiz
  // },
  { path: "/exam", component: Exam, props: true },

  // Add more routes as needed
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
