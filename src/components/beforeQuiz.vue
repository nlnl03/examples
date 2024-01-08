<template>
    <div class="flip-book-container" v-on:click="startQuiz">
      <div class="flip-book">
        <div class="page front">
          <h2>Welcome to the Quiz!</h2>
          <p>Some information about the quiz goes here...</p>
          <button>Start</button>
        </div>
        <div class="page back">
          <h2>Quiz Questions</h2>
          <!-- Add your quiz questions and logic here -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'beforeQuiz',
    methods: {
      startQuiz() {
        this.$router.push('/quiz');
      },
    },
  };
  </script>
  
  <style scoped>
  .flip-book-container {
    perspective: 1000px;
    height: 400px; /* Adjust the height as needed */
  }
  
  .flip-book {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 1s;
  }
  
  .page {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
  }
  
  .front {
    z-index: 2;
  }
  
  .back {
    transform: rotateY(180deg);
    z-index: 1;
  }
  
  .flip-book-container.active .flip-book {
    transform: rotateY(180deg);
  }
  </style>
  