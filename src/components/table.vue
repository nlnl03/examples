<template>
    <div class="rtl-container">
      <q-table
        :rows="tableData"
        :columns="tableColumns"
        row-key="מס אישי"
        binary-state-sort
        virtual-scroll
        selection="multiple"
      >
        <template v-slot:body-cell-exam1="props">
          <q-toggle v-model="props.row.exam1Toggle" />
        </template>
        <template v-slot:body-cell-exam2="props">
          <q-toggle v-model="props.row.exam2Toggle" />
        </template>
        <template v-slot:top>
          <q-btn color="primary" @click="addRow" label="Add Row" />
        </template>
      </q-table>
    </div>
</template>

<script>
export default {
  name:'Q-table',
  data() {
    return {
      tableColumns: [
        { name: "שם", required: true, label: "שם", align: "right", field: "שם", sortable: true },
        { name: "מס אישי", align: "right", label: "מס אישי", field: "מס אישי", sortable: true },
        { name: "exam1", align: "right", label: "exam1", field: "exam1", sortable: true, "body-cell-name": "exam1" },
        { name: "exam2", align: "right", label: "exam2", field: "exam2", sortable: true, "body-cell-name": "exam2" }
      ],
      tableData: [
        { "שם": "John Doe", "מס אישי": "123", exam1Toggle: true, exam2Toggle: false },
        { "שם": "Jane Smith", "מס אישי": "456", exam1Toggle: false, exam2Toggle: true }
      ]
    };
  },
  methods: {
    addRow() {
      this.tableData.push({ "שם": "", "מס אישי": "", exam1Toggle: false, exam2Toggle: false });
    }
  }
};
</script>
