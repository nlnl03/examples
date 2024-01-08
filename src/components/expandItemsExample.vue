<template>
  <div class="page-wrapper">
    <!-- FIRST CARD -->
    <div class="card-wrapper">
      <div class="card-details">
        <h3 class="card-title">Product #1</h3>
        <p>Some content regarding the first card will go here</p>
      </div>
      <!-- end card-details -->

      <div class="reveal-details">
        <p>Extra content that will help along the way</p>
      </div>
      <!-- end reveal-details -->
    </div>
    <!-- end card-wrapper -->

    <!-- SECOND CARD -->
    <div class="card-wrapper">
      <div class="card-details">
        <h3 class="card-title">Product #2</h3>
        <p>Some content regarding the first card will go here</p>
      </div>
      <!-- end card-details -->

      <div class="reveal-details">
        <p>Extra content that will help along the way</p>
      </div>
      <!-- end reveal-details -->
    </div>
    <!-- end card-wrapper -->
  </div>
  <!-- end page-wrapper -->
</template>

<script>
export default {
  name: "expandItemsExample",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  background: #eee;
  font-family: "Montserrat", sans-serif;
}

.page-wrapper {
  padding-top: 5%;
  display: flex;
  -webkit-display: flex;
  justify-content: space-around;
}

.card-wrapper {
  background: white;
  border-radius: 6px;
  max-height: 100px;
  overflow: hidden;
  padding: 2rem;
  width: 30%;
  transition: max-height 500ms ease-in-out;
}
.card-wrapper:hover {
  box-shadow: 0 0 8px #d3d3d3;
  cursor: pointer;
  max-height: 300px;
}

.card-details,
.reveal-details {
  font-weight: 300;
}

.card-height-animate {
  height: 300px;
}
</style>
