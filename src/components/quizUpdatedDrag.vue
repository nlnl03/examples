<template>
  <div>
    <h2>Drag and Drop Quiz</h2>
    <div
      v-for="(question, index) in quizQuestions"
      :key="index"
      class="question"
    >
      <p>{{ question.text }}</p>
      <draggable
        v-model="question.options"
        :itemKey="customItemKey"
        :options="{ group: 'quizzes', animation: 150 }"
        @end="checkAnswer(index)"
        class="options"
      >
        <template v-slot:item="{ element }">
          <div :key="element" class="option">
            <div class="drag-handle">≡</div>
            <div class="drag-item">{{ element }}</div>
          </div>
        </template>
      </draggable>
      <span v-if="question.isCorrect !== null">
        {{ question.isCorrect ? "Correct!" : "Incorrect!" }}
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  data() {
    return {
      quizQuestions: [
        {
          id: 1,
          text: "Arrange the colors in the correct order:",
          options: ["Red", "Green", "Blue"],
          correctOrder: ["Red", "Green", "Blue"],
          isCorrect: null,
        },
        {
          id: 2,
          text: "Arrange the fdfdfdffddffd:",
          options: ["dfdffd", "Green", "Blue"],
          correctOrder: ["dfdffd", "Green", "Blue"],
          isCorrect: null,
        },
        // Add more questions similarly
      ],
    };
  },
  methods: {
    checkAnswer(index) {
      const question = this.quizQuestions[index];
      const isCorrect =
        JSON.stringify(question.options) ===
        JSON.stringify(question.correctOrder);
      this.quizQuestions[index].isCorrect = isCorrect;
    },
    customItemKey(value) {
      return value; // Using the value itself as the unique key
    },
  },
  components: {
    draggable,
  },
  name: "quizUpdatedDrag",
});
</script>

<style scoped>
/* Add your styles for the quiz elements here */
.question {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}

.options {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.option {
  display: flex;
  align-items: center;
  border: 1px solid #eaeaea;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}

.drag-handle {
  cursor: grab;
  margin-right: 5px;
}

.drag-item {
  flex-grow: 1;
}
</style>
