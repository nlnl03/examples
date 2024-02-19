<template>
  <div class="exam">
    <h2>Exam {{ examId }}</h2>
    <button @click="fetchQuestions">Start Exam</button>
    <div v-if="questions.length" class="parts">
      <div v-for="(part, index) in data.parts" :key="index" class="part">
        <h3>Part {{ index + 1 }}</h3>
        <ul>
          <li v-for="(question, qIndex) in questions[index]" :key="qIndex">
            {{ question }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["examId"],
  data() {
    return {
      data: null,
      questions: [],
    };
  },
  methods: {
    fetchQuestions() {
      const examId = this.$route.params.id;
      fetch(`http://localhost:3000/exams/${examId}`)
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
          const totalQuestions = 10;
          const totalParts = data.parts.length;
          const questionsPerPart = Math.floor(totalQuestions / totalParts); // Questions per part
          let remainingQuestions = totalQuestions % totalParts; // Remaining questions to distribute
          let allQuestions = [];

          data.parts.forEach((part) => {
            const shuffledQuestions = this.shuffleArray(part.questions);
            const numQuestions =
              questionsPerPart + (remainingQuestions > 0 ? 1 : 0);
            const selectedQuestions = shuffledQuestions.slice(0, numQuestions);
            allQuestions.push(selectedQuestions);
            remainingQuestions--;
          });

          this.questions = allQuestions;
        })
        .catch((error) => console.error("Error fetching data:", error));
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
};
</script>

<style>
.exam {
  margin-bottom: 20px;
}

.part {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
