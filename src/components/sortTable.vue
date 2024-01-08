<template>
  <q-table
    :rows="tableData"
    :columns="columns"
  >
      <template v-for="col in dynamicColumns" :key="col" v-slot:[`body-cell-${col.field}`]="props">
      <q-td :props="props">
        <q-toggle v-if="col.format === 'toggle'" v-model="props.row[col.field]" />
        <template v-else>
          <!-- Render other types of cells based on their format -->
          {{ props.row[col.field] }}
        </template>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { name: 'Item 1', active: true, quantity: 10 },
        { name: 'Item 2', active: false, quantity: 5 },
        // Add more data rows as needed
      ],
      dynamicColumns: [
        { name: 'name', label: 'Item Name', field: 'name', sortable: true, format: 'text' },
        { name: 'active', label: 'Active', field: 'active', sortable: true, format: 'toggle' },
        { name: 'quantity', label: 'Quantity', field: 'quantity', sortable: true, format: 'text' },
        // Define more columns dynamically as required
      ],
    };
  },
  computed: {
    columns() {
      return this.dynamicColumns.map((col) => ({
        name: col.name,
        label: col.label,
        field: col.field,
        sortable: col.sortable,
      }));
    },
  },
};
</script>
