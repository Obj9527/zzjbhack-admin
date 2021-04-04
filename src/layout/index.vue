<template>
  <div>
    <h1>这是layout</h1>
    <navbar></navbar>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  export default {
    name: 'Layout',
    components: {
      'navbar': Navbar
    }
  }
</script>

<style scoped>

</style>
