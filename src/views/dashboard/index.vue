<template>
  <div class="dashboard-container">
    <panel-group :items="this.items"></panel-group>
    <el-card>
      <el-row
        style="
          background: #fff;
          padding: 16px 16px 0;
          margin-bottom: 32px;
          width: 100%;
        ">
        <line-chart :chartData="this.chartData"></line-chart>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LineChart from './components/LineChart'
  import PanelGroup from "./components/PanelGroup";

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters([])
    },
    data() {
      return {
        chartData: {
          grid: {
            left: 10,
            right: 10
          },
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        },
        panelBody: {
          display: 'flex',
          justifyContent: 'space-around'
        },
        items: [
          {
            name: '浏览',
            num: 1000,
            color: 'icon-views',
            icon: 'peoples'
          },
          {
            name: '评论',
            num: 1000,
            color: 'icon-comments',
            icon: 'message'
          },
          {
            name: '喜欢',
            num: 1000,
            color: 'icon-likes',
            icon: 'money'
          },
          {
            name: '下载',
            num: 1000,
            color: 'icon-download',
            icon: 'shopping'
          },
        ]
      }
    },
    components: {
      PanelGroup,
      LineChart
    }
  }
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 30px;
    background: #F0F2F5;
  }
  &-el-card {
    margin-bottom: 8px;
  }
}
.panel-container{
  display: flex;
  justify-content: space-around;
}
</style>
