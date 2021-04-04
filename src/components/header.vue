<template>
    <div class="header"><h1>{{title}}</h1></div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      title: '重装机兵管理app'
    }
  }
}
</script>

<style scoped>
  .header{
    width: 100%;
    height: 200px;
    background: palevioletred;
    float: top;
  }
</style>
