import { createRouter, createWebHashHistory } from 'vue-router';
//  import Home from "../views/Home.vue";
//  import quiz from '../views/quiz.vue';
 
const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component:Home 
  // },
  // { 
  //   path: '/quiz',
  //   name: 'quiz',
  //   component: quiz
  // },

  // Add more routes as needed
];

router.beforeEach((to, from, next) => {
    if (to.path === '/quiz') {
      document.getElementById('app').classList.add('active');
    } else {
      document.getElementById('app').classList.remove('active');
    }
    next();
  });
  

const router = createRouter({
   history: createWebHashHistory(process.env.BASE_URL),
   routes
});

export default router;
