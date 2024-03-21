<template>
  <div class="container">
    <h1>Quiz App</h1>

    <!-- Show only one question at a time -->
    <div class="question-box" v-if="currentQuestion !== null">
      <div class="question">
        <h2>{{ currentQuestion.text }}</h2>
        <!-- Render question based on its type -->
        <template v-if="currentQuestion.type === 'multipleChoice'">
          <!-- Multiple Choice question content -->
          <div v-for="(option, index) in currentQuestion.options" :key="index">
            <input
              type="radio"
              :id="'option-' + index"
              :name="'question-' + currentQuestionIndex"
              :value="option"
              v-model="currentQuestion.selectedOption"
            />
            <label :for="'option-' + index">{{ option }}</label>
          </div>
        </template>
        <template v-else-if="currentQuestion.type === 'checkbox'">
          <!-- Checkbox question content -->
          <div
            v-for="(option, optIndex) in currentQuestion.options"
            :key="optIndex"
          >
            <input
              type="checkbox"
              :id="'option-' + optIndex"
              :value="option"
              v-model="currentQuestion.selectedOption[optIndex]"
            />
            <label :for="'option-' + optIndex">{{ option }}</label>
          </div>
        </template>
        <template v-else-if="currentQuestion.type === 'dragDrop'">
          <h2>{{ currentQuestion.title }}</h2>
          <div class="sentence-container">
            <span
              v-for="(word, index) in currentQuestion.sentences"
              :key="index"
              :class="{ empty: !word }"
              @drop="drop(currentQuestion.sentences, index, $event)"
              @dragover.prevent
            >
              {{ word || "___" }}
            </span>
          </div>
          <div class="word-bank">
            <span
              v-for="(word, index) in currentQuestion.bankWords"
              :key="index"
              draggable="true"
              @dragstart="dragStart(word, $event)"
            >
              {{ word }}
            </span>
          </div>
          <button @click="resetQuestion(currentQuestion)">Reset</button>
        </template>

        <template v-if="currentQuestion.type === 'dragDropTable'">
          <h1>{{ currentQuestion.title }}</h1>

          <!-- Drag Drop Table -->
          <div class="drag-drop-table">
            <table>
              <thead>
                <tr>
                  <th
                    v-for="(subject, subjectIndex) in currentQuestion.subjects"
                    :key="subjectIndex"
                  >
                    {{ subject }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    v-for="(subject, subjectIndex) in currentQuestion.subjects"
                    :key="subjectIndex"
                  >
                    <div
                      class="placeholder"
                      @dragover.prevent
                      @drop="dropTable(currentQuestion, subjectIndex, $event)"
                    >
                      <div
                        class="placeholder-item"
                        v-if="
                          currentQuestion.table[subjectIndex] &&
                          currentQuestion.table[subjectIndex].length > 0
                        "
                      >
                        <div
                          class="word"
                          v-for="(word, wordIndex) in currentQuestion.table[
                            subjectIndex
                          ]"
                          :key="wordIndex"
                        >
                          {{ word }}
                        </div>
                      </div>
                      <div v-else class="drop-here">Drop Here</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bank Words -->
          <div class="bank-words">
            <h3>Bank Words</h3>
            <div class="bank-items">
              <div
                class="word"
                v-for="(word, wordIndex) in currentQuestion.bankWords"
                :key="wordIndex"
                :draggable="true"
                @dragstart="dragStart(wordIndex, $event)"
              >
                {{ word }}
              </div>
            </div>
          </div>
          <button @click="resetQuestion(currentQuestion)">Reset</button>
        </template>
      </div>

      <button
        v-if="
          currentQuestionIndex > 0 &&
          this.currentQuestionIndex != this.questions.length - 1
        "
        @click="prevQuestion"
      >
        Previous
      </button>
      <button
        v-if="
          canProceedToNextQuestion &&
          currentQuestionIndex !== questions.length - 1
        "
        @click="nextQuestion"
      >
        Next
      </button>

      <button
        v-if="
          currentQuestionIndex === questions.length - 1 &&
          canProceedToNextQuestion
        "
        @click="submitAnswer"
      >
        Submit
      </button>
    </div>

    <!-- Show message when all questions are answered -->
    <div v-if="currentQuestionIndex === null">
      <p>Congratulations! You've completed the quiz.</p>
      <p>Your grade: {{ gradeQuiz() }}%</p>
    </div>
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
          correctAnswer: "4",
        },
        {
          type: "multipleChoice",
          text: "What is the capital of France?",
          options: ["London", "Paris", "Berlin"],
          correctAnswer: "Paris",
          selectedOption: null,
        },
        {
          type: "checkbox",
          text: "Select all prime numbers:",
          options: ["2", "3", "4", "5", "6", "7"],
          correctAnswer: ["2", "3", "5", "7"],
          selectedOption: [],
        },
        {
          type: "dragDrop",
          title: "Complete the sentence:",
          sentences: ["The", "quick", "", "", "jumps", "", "the", "lazy", ""],
          bankWords: ["dog", "quick", "brown", "fox", "jumps", "over"],
          correctAnswer: [
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

          subjects: ["Math", "Science", "History"],
          bankWords: [
            "Algebra",
            "Geometry",
            "Biology",
            "Chemistry",
            "World War I",
            "World War II",
          ],

          correctMatches: [
            { subject: "Math", concepts: ["Algebra"] },
            { subject: "Science", concepts: ["Biology", "Chemistry"] },
            { subject: "History", concepts: ["World War I", "World War II"] },
          ],
          table: [], // Will hold the dropped concepts for each subject
        },
      ],
      currentQuestionIndex: 0,
      grade: null,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || null;
    },
    canProceedToNextQuestion() {
      if (this.currentQuestion.type === "multipleChoice") {
        return this.currentQuestion.selectedOption !== null;
      } else if (this.currentQuestion.type === "checkbox") {
        return this.currentQuestion.selectedOption.length > 0;
      } else if (this.currentQuestion.type === "dragDrop") {
        var boolCheck = true;
        this.currentQuestion.sentences.forEach((word) => {
          if (word == "") {
            boolCheck = false;
          }
        });
        return boolCheck;
      } else {
        return this.currentQuestion.table.length > 0;
      }
    },
  },
  methods: {
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },

    submitAnswer() {
      this.currentQuestionIndex = null;
      console.log(this.questions);
    },

    gradeQuiz() {
      let totalQuestions = this.questions.length;
      let correctAnswers = 0;

      // Iterate over each question
      this.questions.forEach((question) => {
        switch (question.type) {
          case "multipleChoice":
            // Check if the selected option is the correct one
            if (question.selectedOption === question.correctAnswer) {
              correctAnswers++;
              console.log("multipleChoice correct");
            }
            break;
          case "checkbox":
            // Initialize a counter for correctly selected options
            var correctOptionsCount = 0;

            // Loop through each option and check if it's correctly selected
            question.options.forEach((option, index) => {
              // Check if the option is correctly selected and selected by the user
              if (
                question.correctAnswer.includes(option) &&
                question.selectedOption[index]
              ) {
                correctOptionsCount++;
              }
            });

            // Calculate the total possible correct options
            var totalPossibleCorrectOptions = question.correctAnswer.length;

            // Calculate the fraction of correct options
            var fracCorrect = correctOptionsCount / totalPossibleCorrectOptions;

            // Update the grade by the fraction of correct options
            correctAnswers += fracCorrect;
            break;

          case "dragDrop":
            // Check if the completed sentence matches the correct answer
            var isCorrect =
              question.sentences.join("") === question.correctAnswer.join("");

            // If the completed sentence matches the correct answer, increase the grade
            if (isCorrect) {
              correctAnswers += 1;
            }
            break;

          case "dragDropTable":
            // Initialize a counter for correctly matched concepts
            var correctConceptsCount = 0;

            // Loop through each subject and its associated correct concepts
            question.correctMatches.forEach((correctMatch) => {
              const { subject, concepts } = correctMatch;
              const subjectIndex = question.subjects.indexOf(subject);
              if (subjectIndex !== -1) {
                // Check if all concepts in the table match the correct concepts for the subject
                if (
                  question.table[subjectIndex] &&
                  question.table[subjectIndex].every((concept) =>
                    concepts.includes(concept)
                  )
                ) {
                  // If all concepts match, increment correctConceptsCount by the number of correct concepts for this subject
                  correctConceptsCount += concepts.length;
                }
              }
            });

            // Calculate the total possible concepts
            var totalPossibleConcepts = question.correctMatches.reduce(
              (total, match) => total + match.concepts.length,
              0
            );

            // Calculate the fraction of correct concepts
            var fractionCorrect = correctConceptsCount / totalPossibleConcepts;

            // Update the grade by the fraction of correct concepts
            correctAnswers += fractionCorrect;
            break;
        }
      });

      // Calculate percentage and return
      return (correctAnswers / totalQuestions) * 100;
    },

    dragStart(word, event) {
      event.dataTransfer.setData("text/plain", word);
      // this.draggedItemIndex = index;
      console.log(event.dataTransfer);
    },
    drop(sentence, index, event) {
      event.preventDefault();
      const draggedWord = event.dataTransfer.getData("text/plain");
      if (!sentence[index]) {
        sentence.splice(index, 1, draggedWord);
      }
    },

    dropTable(question, columnIndex, event) {
      event.preventDefault();
      const wordIndex = parseInt(event.dataTransfer.getData("text/plain"));
      const word = question.bankWords[wordIndex];

      // Update the table for the dropped word
      if (!question.table[columnIndex]) {
        // Create a new array for the column if it doesn't exist
        question.table[columnIndex] = [word];
      } else {
        // Push the word into the existing column array
        question.table[columnIndex].push(word);
      }
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

.question-box {
  border: 1px solid #ccc;
  padding: 20px;
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
.bank-words {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.question {
  margin-bottom: 20px;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}
.sentence-container {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
}

.sentence-container span {
  padding: 5px;
}

.sentence-container .empty {
  border: 1px dashed #ccc;
}

.word-bank {
  display: flex;
  flex-wrap: wrap;
}

.word-bank span {
  background-color: #f2f2f2;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}

.word-bank span:hover {
  background-color: #ddd;
}

.drag-drop-table {
  margin-top: 20px;
}

.drag-drop-table table {
  width: 100%;
  border-collapse: collapse;
}

.drag-drop-table th,
.drag-drop-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.placeholder {
  height: 100px; /* Adjust the height as needed */
  overflow: auto;
  border: 2px dashed #aaa;
  margin-bottom: 10px;
  padding: 10px;
}
.placeholder-item {
  display: flex;
  flex-direction: column;
}
.bank-items {
  display: flex;
  justify-content: center;
}
.word {
  cursor: grab;
  margin: 5px;
  padding: 5px;
  background-color: #f9f9f9;
}

.drop-here {
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.bank-words {
  margin-top: 20px;
}

.bank-words h3 {
  text-align: center;
}
</style>
