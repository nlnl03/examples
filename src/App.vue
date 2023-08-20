<template>
  <div class="marquee-container">
    <div class="marquee">
      <div class="marquee-content" :style="{ animationDuration: animationDuration, width: contentWidth }">
        <div v-for="(message, index) in messages" :key="index" class="message" :style="{ width: itemWidth }">
          {{ message.Title }}
        </div>
      </div>
    </div>
  </div>

  <div class="table">
    <Qtable />
  </div>
</template>

<script>
import Qtable from '@/components/table.vue'
export default {
  components:{
    Qtable
  },
  data() {
    return {
      messages: [
        {Title:"Message 1"},{Title:"Message 2"},{Title:"ברוכים הבאים לאתר של גדוד 383"}
      ],
      currentIndex: 0,
      isOpen:false,
      animationDuration: "40s", // Adjust duration as needed
      containerWidth: "65%", // Container width as a percentage
      contentWidth: "100%", // Initial content width (will be calculated)
      itemWidth: "100%", // Initial item width (will be calculated),
      scrollingDelay: 20000 // Delay between message changes
    };
  },
  computed: {
    currentMessage() {
      return this.messages[this.currentIndex];
    }
  },
  mounted() {
    console.log(this.messages)
    this.startMarquee();
    this.calculateWidths();
  },
  methods: {
    startMarquee() {
      this.currentIndex = 0;

      setTimeout(() => {
        this.currentIndex = 1;
        setTimeout(() => {
          this.currentIndex = 0;
          setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.messages.length;
          }, this.scrollingDelay);
        }, 1000); // Freeze time for the first message
      }, 0);
    },
    calculateWidths() {
      this.contentWidth = (this.messages.length * 100) + "%"; // Set content width
      this.itemWidth = (100 / this.messages.length) + "%"; // Set item width
    }
  }
};
</script>

<style>
.marquee-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px; /* Adjust height as needed */
}

.marquee-content {
  display: flex;
  animation: scrollMessages linear infinite;
}

.message {
  display: inline-block;
  white-space: nowrap;
  font-size: 18px; /* Adjust font size as needed */
  padding: 0 10px; /* Adjust padding as needed */
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6); /* Adjust overlay background color */
  z-index: 1; /* Place overlay on top of the marquee */
}

.overlay-message {
  font-size: 24px; /* Adjust overlay message font size */
  color: white; /* Adjust overlay message text color */
}

@keyframes scrollMessages {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.table{
  margin-top: 100px;
  display: flex;
  justify-content: center;
  width: 100%;
}
 </style>
