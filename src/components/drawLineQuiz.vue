<template>
    <div class="matching-quiz">
      <div class="columns">
        <div class="column">
          <h2>Options</h2>
          <div class="options">
            <div
              class="option"
              v-for="(option, index) in options"
              :key="'option-' + index"
              :draggable="true"
              @dragstart="dragStart(index)"
            >
              {{ option }}
            </div>
          </div>
        </div>
        <div ref="stageContainer" class="stage-container" ></div>

        <div class="column">
          <h2>Answers</h2>
          <div class="answers">
            <div
              class="answer"
              v-for="(answer, index) in answers"
              :key="'answer-' + index"
              @drop="drop(index, $event)"
              @dragover.prevent
            >
              {{ answer }}
            </div>
          </div>
        </div>
      </div>
      <button @click="checkConnections">Check Connections</button>
    </div>
  </template>
  
  <script>
  import Konva from 'konva';
  
  export default {
    name: "drawLine",
    data() {
      return {
        options: ['Option 1', 'Option 2', 'Option 3'],
        answers: ['Answer A', 'Answer B', 'Answer C'],
        draggedOptionIndex: null,
        connections: [],
        stage: null,
        layer: null,
        line: null
      };
    },
    mounted() {
      this.stage = new Konva.Stage({
        container: this.$refs.stageContainer,
        width: 400,
        height: 300 
      });
  
      this.layer = new Konva.Layer();
      this.stage.add(this.layer);
    },
    methods: {
      dragStart(index) {
        this.draggedOptionIndex = index;
      },
      drop(answerIndex) {
        this.connections.push({
          optionIndex: this.draggedOptionIndex,
          answerIndex
        });
        this.drawLine(this.draggedOptionIndex, answerIndex);
      },
      checkConnections() {
        // Add your correct connections here for validation
      },
      drawLine(optionIndex, answerIndex) {
        const optionBox = this.$el.querySelectorAll('.options .option')[optionIndex].getBoundingClientRect();
        const answerBox = this.$el.querySelectorAll('.answers .answer')[answerIndex].getBoundingClientRect();
  
        const x1 = optionBox.x + optionBox.width;
        const y1 = optionBox.y + optionBox.height / 2;
        const x2 = answerBox.x;
        const y2 = answerBox.y + answerBox.height / 2;
  
        this.line = new Konva.Line({
          points: [x1, y1, x2, y2],
          stroke: 'black',
          strokeWidth: 2
        });
  
        this.layer.add(this.line);
        this.stage.add(this.layer);
        this.stage.batchDraw();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles for columns, options, and answers */
  /* Add specific styles for the stage-container as needed */
  .columns {
  display: flex;
  justify-content: space-around;
}

.column {
  width: 45%;
  margin: 10px;
}
.stage-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.konvajs-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

 .options,
.answers {
  display: flex;
  flex-direction: column;
}

.option,
.answer {
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

  </style>
  