<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-card>
          <q-card-section>
            <q-form @submit.prevent="submitForm">
              <q-input filled v-model="exam.name" label="Exam Name" required />
              <q-select
                filled
                v-model="exam.partCount"
                label="Number of Parts"
                :options="partOptions"
                required
                @input="createPartInputs"
              />
              <div v-for="part in exam.parts" :key="part.id">
                <q-input
                  filled
                  v-model="part.title"
                  :label="'Title of Part ' + (part.id + 1)"
                  required
                />
                <q-btn
                  color="primary"
                  label="Add Question"
                  @click="addQuestion(part)"
                />
                <div v-for="(question, index) in part.questions" :key="index">
                  <q-input
                    filled
                    v-model="question.text"
                    :label="
                      'Question ' + (index + 1) + ' of Part ' + (part.id + 1)
                    "
                    required
                  />
                </div>
              </div>
              <q-btn type="submit" color="primary" label="Submit" />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      exam: {
        name: "",
        partCount: null,
        parts: [],
      },
      partOptions: [1, 2, 3, 4, 5], // Adjust as needed
    };
  },
  methods: {
    createPartInputs() {
      this.exam.parts = [];
      for (let i = 0; i < this.exam.partCount; i++) {
        this.exam.parts.push({
          id: i,
          title: "",
          questions: [],
        });
      }
    },
    addQuestion(part) {
      part.questions.push({ text: "" });
    },
    submitForm() {
      // Here you can handle the form submission, including sending exam data to the server
      console.log("Exam Name:", this.exam.name);
      console.log("Parts:", this.exam.parts);
      // Reset form after submission if needed
      this.resetForm();
    },
    resetForm() {
      this.exam.name = "";
      this.exam.partCount = null;
      this.exam.parts = [];
    },
  },
};
</script>
