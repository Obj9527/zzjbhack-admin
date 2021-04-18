<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {
    name: 'LineChart',
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      }
    },
    data: function() {
      return {
        chart: null,
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
        }
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
    },
    methods: {
      initChart() {
        let chart = echarts.init(this.$el, 'light')
        chart.setOption(this.chartData)
        window.addEventListener('resize', function() {
          chart.resize()
        })
      },
      resize() {
        this.chart.resize()
      }
    }
  }
</script>

<style scoped>
</style>
