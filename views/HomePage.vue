<!-- Home.vue -->
<template>
  <div>
    <h2>Home</h2>
    <button v-for="exam in exams" :key="exam.id" @click="startExam(exam.id)">
      {{ exam.name }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exams: [
        { id: 1, name: 'Exam 1' },
        { id: 2, name: 'Exam 2' }
      ]
    };
  },
  methods: {
    startExam(id) {
      this.$router.push(`/exam/${id}`);
    }
  }
};
</script>

<style>
/* Add your styles here */
</style>
