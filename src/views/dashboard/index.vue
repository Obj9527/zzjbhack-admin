<template>
  <div class="dashboard-container">
    <el-card>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;width: 100%">
        <line-chart></line-chart>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LineChart from './components/LineChart'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([])
    },
    components: {
      LineChart
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      display: flex;
      flex-direction: column;
      padding: 30px;
    }
  }
</style>
