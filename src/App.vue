<template>
  <!-- <dragDrop /> -->
  <!-- <sortTable /> -->
  <!-- <quizUpdatedDrag /> -->
  <!-- <drawLine /> -->
  <!-- <beforeQuiz /> -->
  <expandItemsExample />
</template>

<script>
// import dragDrop from "@/components/quizDragDrop.vue";
// import sortTable from "@/components/sortTable.vue";
// import quizUpdatedDrag from "@/components/quizUpdatedDrag.vue";
// import drawLine from "@/components/drawLineQuiz.vue";
// import beforeQuiz from "@/components/beforeQuiz.vue";
import expandItemsExample from "@/components/expandItemsExample"
export default {
  components: {
    // dragDrop,
    // sortTable,
    // quizUpdatedDrag,
    // drawLine,
    // beforeQuiz,
    expandItemsExample
  },
};
</script>

<style>
#app {
  transition: background-color 1s;
}

.flip-book-container.active #app {
  background-color: #f0f0f0; /* Change to your desired background color */
}
</style>
