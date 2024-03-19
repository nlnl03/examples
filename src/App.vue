<!-- App.vue -->
<template>
  <div>
    <router-link :to="{ name: 'mainQuiz' }"> fdfdfdf</router-link>
    <!-- <quizUpdatedDrag /> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import quizUpdatedDrag from "@/components/quizUpdatedDrag.vue";
export default {
  name: "App",
  components: {
    // quizUpdatedDrag,
  },
};
</script>

<style>
/* Add your styles here */
</style>
