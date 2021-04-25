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
      },
      chartData: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        chart: null,
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
