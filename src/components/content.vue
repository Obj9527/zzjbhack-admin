<template>
  <div id="container" >
    <my-header></my-header>
    <div class="container">
      <div class="sidebar"></div>
      <div class="displayArea"></div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import Header from './header'
  import Footer from './footer'

  export default {
    name: 'MyContent',
    components: {
      'my-header': Header,
      'my-footer': Footer
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    overflow: auto;
  }

  .displayArea {
    width: 70%;
    height: 1000px;
    background: mediumvioletred;
    float: right;
  }

  .sidebar {
    width: 30%;
    height: 1000px;
    background: deepskyblue;
    float: left;
  }
</style>
