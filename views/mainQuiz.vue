<template>
  <div class="container">
    <h1>Quiz App</h1>

    <div v-for="(question, index) in questions" :key="index">
      <template v-if="question.type === 'multipleChoice'">
        <h3>{{ question.text }}</h3>
        <div
          v-for="(option, optionIndex) in question.options"
          :key="optionIndex"
        >
          <input
            type="radio"
            :id="'mcq-' + index + '-' + optionIndex"
            :name="'mcq-' + index"
            :value="option"
            v-model="question.selectedOption"
          />
          <label :for="'mcq-' + index + '-' + optionIndex">{{ option }}</label>
        </div>
      </template>
      <template v-else-if="question.type === 'checkbox'">
        <h3>{{ question.text }}</h3>
        <div
          v-for="(option, optionIndex) in question.options"
          :key="optionIndex"
        >
          <input
            type="checkbox"
            :id="'cbq-' + index + '-' + optionIndex"
            :value="option"
            v-model="question.selectedOptions[optionIndex]"
          />
          <label :for="'cbq-' + index + '-' + optionIndex">{{ option }}</label>
        </div>
      </template>
      <template v-else-if="question.type === 'dragDrop'">
        <h2>{{ question.title }}</h2>
        <div
          class="sentence"
          v-for="(sentence, sentenceIndex) in question.sentences"
          :key="sentenceIndex"
        >
          <span
            class="placeholder"
            v-for="(word, wordIndex) in sentence"
            :key="wordIndex"
            @dragover.prevent
            @drop="drop(question, sentenceIndex, wordIndex, $event)"
          >
            {{ word }}
          </span>
        </div>
        <div class="bank-words">
          <h3>Bank Words</h3>
          <div
            class="word"
            v-for="(word, wordIndex) in question.bankWords"
            :key="wordIndex"
            :draggable="true"
            @dragstart="dragStart(question, wordIndex, $event)"
          >
            {{ word }}
          </div>
        </div>
        <button @click="resetQuestion(question)">Reset</button>
      </template>

      <template v-if="question.type === 'dragDropTable'">
        <h2>{{ question.title }}</h2>
        <table>
          <thead>
            <tr>
              <th
                v-for="(subject, subjectIndex) in question.subjects"
                :key="subjectIndex"
              >
                {{ subject }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                v-for="(subject, subjectIndex) in question.subjects"
                :key="subjectIndex"
              >
                <div
                  class="placeholder"
                  @dragover.prevent
                  @drop="dropTable(question, subjectIndex, $event)"
                >
                  {{ question.table[subjectIndex] || "Drop Here" }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bank-words">
          <h3>Bank Words</h3>
          <div
            class="word"
            v-for="(word, wordIndex) in question.bankWords"
            :key="wordIndex"
            :draggable="true"
            @dragstart="dragStart(question, wordIndex, $event)"
          >
            {{ word }}
          </div>
        </div>
        <button @click="resetQuestion(question)">Reset</button>
      </template>
    </div>

    <!-- Submit Button -->
    <button @click="submit">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          type: "multipleChoice",
          text: "What is 2 + 2?",
          options: ["3", "4", "5"],
          selectedOption: null,
        },
        {
          type: "multipleChoice",
          text: "What is the capital of France?",
          options: ["London", "Paris", "Berlin"],
          selectedOption: null,
        },
        {
          type: "checkbox",
          text: "Select all prime numbers:",
          options: ["2", "3", "4", "5", "6", "7"],
          selectedOptions: [],
        },
        {
          type: "dragDrop",
          title: "Complete the sentence:",
          sentences: [
            ["_____", "jumps", "over", "the", "_____"],
            ["jumps", "over", "_____", "the"],
          ],
          bankWords: [
            "The",
            "quick",
            "brown",
            "fox",
            "jumps",
            "over",
            "the",
            "lazy",
            "dog",
          ],
        },
        {
          type: "dragDropTable",
          title: "Match the Concepts with Subjects:",
          subjects: ["Subject A", "Subject B", "Subject C"], // Example subjects
          concepts: ["Concept 1", "Concept 2", "Concept 3"], // Example concepts
          table: [], // Will hold the dropped concepts for each subject
          bankWords: ["Concept 1", "Concept 2", "Concept 3"], // Bank words
        },
      ],
      draggedItemIndex: null,
    };
  },
  methods: {
    dragStart(question, index, event) {
      event.dataTransfer.setData("text/plain", question.bankWords[index]);
      this.draggedItemIndex = index;
    },
    drop(question, sentenceIndex, wordIndex, event) {
      event.preventDefault();
      const word = event.dataTransfer.getData("text/plain");
      question.sentences[sentenceIndex].splice(wordIndex, 1, word);
    },
    dropTable(question, subjectIndex, event) {
      event.preventDefault();
      const word = event.dataTransfer.getData("text/plain");
      // Initialize an array if not present
      if (!Array.isArray(question.table[subjectIndex])) {
        question.table[subjectIndex] = [];
      }
      // Add the dropped word to the table for the corresponding subject
      question.table[subjectIndex].push(word);
    },

    resetQuestion(question) {
      switch (question.type) {
        case "dragDrop":
          // Reset bank words and sentences for dragDrop questions
          question.bankWords = [...question.initialBankWords];
          question.sentences = JSON.parse(
            JSON.stringify(question.initialSentences)
          );
          break;
        case "dragDropTable":
          // Reset table for dragDropTable questions
          question.table = [];
          break;
        default:
          // Handle other question types if needed
          break;
      }
    },

    submit() {
      console.log(this.questions);
    },
  },
  created() {
    this.questions.forEach((question) => {
      if (question.type === "dragDrop") {
        question.initialBankWords = [...question.bankWords]; // Store initial bank words
        question.initialSentences = JSON.parse(
          JSON.stringify(question.sentences)
        ); // Store initial sentences
      }
    });
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.bank-words {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.word,
.placeholder {
  cursor: grab;
  margin: 5px;
  padding: 5px;
  background-color: #f9f9f9;
  display: inline-block;
}

.sentence {
  margin-bottom: 10px;
}
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.bank-words {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.word,
.placeholder {
  cursor: grab;
  margin: 5px;
  padding: 5px;
  background-color: #f9f9f9;
  display: inline-block;
}
</style>
