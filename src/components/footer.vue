<template>
    <div class="footer">{{description}}</div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      description: 'This is a amazing web app'
    }
  }
}
</script>

<style scoped>
  .footer{
    width: 100%;
    height: 200px;
    background: #2c3e50;
    color: white;
    float: bottom;
  }
</style>
