<template>
  <div>
    <canvas ref="canvas" width="500" height="500" @mousedown="startDrawing" @mousemove="draw"
      @mouseup="endDrawing"></canvas>
    <button @click="checkAnswer">Check Answer</button>
    <p v-if="showResult">{{ result }}</p>
  </div>
</template>

<script>
export default {
  name: "drawLine",
  data() {
    return {
      drawing: false,
      lastX: 0,
      lastY: 0,
      ctx: null,
      correctAnswer: [{ x: 50, y: 50 }, { x: 200, y: 200 }], // Sample correct answer points
      userAnswer: [],
      showResult: false,
      result: ''
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
  },
  methods: {
    startDrawing(event) {
      this.drawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = event.clientX - rect.left;
      this.lastY = event.clientY - rect.top;
    },
    draw(event) {
      if (this.drawing) {
        const rect = this.$refs.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        this.lastX = x;
        this.lastY = y;

        this.userAnswer.push({ x, y });
      }
    },
    endDrawing() {
      this.drawing = false;
    },
    checkAnswer() {
      if (this.userAnswer.length !== this.correctAnswer.length) {
        this.result = 'Incorrect!';
      } else {
        let correct = true;
        for (let i = 0; i < this.correctAnswer.length; i++) {
          if (this.correctAnswer[i].x !== this.userAnswer[i].x || this.correctAnswer[i].y !== this.userAnswer[i].y) {
            correct = false;
            break;
          }
        }
        if (correct) {
          this.result = 'Correct!';
        } else {
          this.result = 'Incorrect!';
        }
      }
      this.showResult = true;
    }
  }
};
</script>

<style>
/* Add your CSS styles here if needed */
</style>
