<template>
 <div class="horizontal-timeline">
  <q-timeline :align="left" layout="horizontal">
   <q-timeline-entry v-for="(event, index) in timelineEvents" :key="index">
    <div class="timeline-content">
     <div class="timeline-date">{{ event.date }}</div>
     <div class="timeline-description">{{ event.description }}</div>
    </div>
   </q-timeline-entry>
  </q-timeline>
 </div>
</template>

<script>
export default {
 data() {
  return {
   timelineEvents: [
    { date: '2023-01-01', description: 'Event 1' },
    { date: '2023-02-15', description: 'Event 2' },
    // Add more events as needed
   ],
  };
 },
};
</script>

<style scoped>
/* CSS for horizontal timeline */
.horizontal-timeline {
 width: 100%;
}

/* Adjust the layout for horizontal timeline */
.q-timeline {
 flex-direction: row;
}

/* Customize the content style */
.timeline-content {
 margin: 10px;
 padding: 10px;
 border: 1px solid #ccc;
 border-radius: 5px;
 background-color: #f0f0f0;
}

.timeline-date {
 font-weight: bold;
}

.timeline-description {
 margin-top: 5px;
}
</style>
