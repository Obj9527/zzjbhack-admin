<template>
<div>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <slot name="todo" :item="todo">
        {{ todo.label }}
      </slot>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
      default: () => {},
    }
  }
}
</script>

<style scoped>

</style>
