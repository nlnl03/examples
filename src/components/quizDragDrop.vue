<template>
  <div class="main-box">
    <div class="box-flex">
      <div class="row no-wrap justify-around q-px-md q-pt-md">
        <div
          v-mutation="handler2"
          @dragenter="onDragEnter"
          @dragleave="onDragLeave"
          @dragover="onDragOver"
          @drop="onDrop"
          v-for="que in questions"
          :key="que"
        >
          {{ que.label }}
        </div>
      </div>

      <div
        v-mutation="handler1"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover="onDragOver"
        @drop="onDrop"
        class="bank-words"
      >
        <div
          v-for="item in bankWords"
          :key="item"
          :id="item.id"
          draggable="true"
          @dragstart="onDragStart"
          class="box"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="row justify-around items-start">
      <div class="col row justify-center q-pa-md">
        <div class="text-subtitle1">
          Mutation Info
        </div>
        <div v-for="status in this.status1" :key="status">
          {{ status }}
        </div>
      </div>

      <div class="col row justify-center q-pa-md">
        <div class="text-subtitle1">
          Mutation Info
        </div>
        <div v-for="status in status2" :key="status">
          {{ status }}
        </div>
      </div>
    </div> -->
</template>

<script>
import { ref } from "vue";
export default {
  name: "dragDrop",
  data() {
    const status1 = ref([]);
    const status2 = ref([]);

    return {
      status1,
      status2,
      bankWords: [
        {
          id: "box1",
          label: "cat",
        },
        {
          id: "box2",
          label: "dogs",
        },
        {
          id: "box3",
          label: "bird",
        },
        {
          id: "box4",
          label: "bear",
        },
      ],

      questions: [
        {
          id: 1,
          label: "The quick brown ___ jumps over the lazy ___",
          blanks: ["cat", "dogs"],
        },
        {
          id: 2,
          label: "The quick brown ___ jumps over the lazy ___",
          blanks: ["dogs", "bear"],
        },
        {
          id: 3,
          label: "The quick ___ fff jumps ___ over ",
          blanks: ["bird", "bear"],
        },
      ],
    };
  },
  methods: {
    handler1(mutationRecords) {
      this.status1.value = [];
      for (const index in mutationRecords) {
        const record = mutationRecords[index];
        const info = `type: ${record.type}, nodes added: ${
          record.addedNodes.length > 0 ? "true" : "false"
        }, nodes removed: ${
          record.removedNodes.length > 0 ? "true" : "false"
        }, oldValue: ${record.oldValue}`;
        this.status1.value.push(info);
      }
    },

    handler2(mutationRecords) {
      this.status2.value = [];
      for (const index in mutationRecords) {
        const record = mutationRecords[index];
        const info = `type: ${record.type}, nodes added: ${
          record.addedNodes.length > 0 ? "true" : "false"
        }, nodes removed: ${
          record.removedNodes.length > 0 ? "true" : "false"
        }, oldValue: ${record.oldValue}`;
        this.status2.value.push(info);
      }
    },

    // store the id of the draggable element
    onDragStart(e) {
      e.dataTransfer.setData("text", e.target.id);
      e.dataTransfer.dropEffect = "move";
    },

    onDragEnter(e) {
      // don't drop on other draggables
      if (e.target.draggable !== true) {
        e.target.classList.add("drag-enter");
      }
    },

    onDragLeave(e) {
      e.target.classList.remove("drag-enter");
    },

    onDragOver(e) {
      e.preventDefault();
    },

    onDrop(e) {
      e.preventDefault();

      // don't drop on other draggables
      if (e.target.draggable === true) {
        return;
      }

      const draggedId = e.dataTransfer.getData("text");
      const draggedEl = document.getElementById(draggedId);

      // check if original parent node
      if (draggedEl.parentNode === e.target) {
        e.target.classList.remove("drag-enter");
        return;
      }

      // make the exchange
      draggedEl.parentNode.removeChild(draggedEl);
      e.target.appendChild(draggedEl);
      e.target.classList.remove("drag-enter");
    },
  },
};
</script>

<style>
.main-box {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.q-px-md {
  display: flex;
  flex-direction: column;
  width: 70%;
}
.bank-words {
  width: 60%;
  flex-wrap: wrap;
  padding: 0.5em;
  max-height: 200px;
  border-radius: 10px;
  background-color: gainsboro;
  display: flex;
  justify-content: center;
}
.drop-target {
  height: 200px;
  background-color: gainsboro;
}

.box-flex {
  width: 55%;
  height: 450px;
  background: #dcdcdc69;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.drag-enter {
  outline-style: dashed;
}
.box {
  width: 100px;
  height: 100px;
  float: left;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media only screen and (max-width: 500px) {
  .drop-target {
    height: 200px;
    width: 100px;
    min-width: 100px;
    background-color: gainsboro;
  }
}
.box {
  width: 50px;
  height: 50px;
  background: none;
}
.box:nth-child(3) {
  clear: both;
}
.navy {
  background-color: navy;
}
.red {
  background-color: firebrick;
}
.green {
  background-color: darkgreen;
}
.orange {
  background-color: orange;
}
</style>
