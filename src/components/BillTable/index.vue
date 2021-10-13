<template>
  <el-table :data="tableData">
    <template v-for="column in columns">
      <el-table-column
        :label="column.label"
        :width="column.width || uniformWidth"
        :prop="column.prop"
      >
        <template slot-scope="scope">
          <slot :name="column.prop" :row="scope.row">{{ scope.row[column.prop] }}</slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "BillTable",
  props: {
    tableData: {
      type: Array,
      require: true,
    },
    columns: {
      type: Array,
      require: true,
    },
    uniformWidth: {
      type: String,
      default: "180",
    }
  }
}
</script>

<style scoped>

</style>
