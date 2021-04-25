<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in items" :key="item.name">
      <card-panel :name="item.name" :num="item.num" :card-color="item.color" :icon="item.icon"></card-panel>
    </el-col>
  </el-row>
</template>

<script>
  import CardPanel from "./CardPanel";
  export default {
    name: "PanelGroup",
    props: {
      items: {
        type: Array,
        require: true
      }
    },
    components: {
      CardPanel
    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }
  }
</style>
