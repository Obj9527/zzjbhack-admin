<template>
  <div class="user-container">
    <el-table :data="this.users" border>
      <el-table-column label="ID" prop="id" align="center"></el-table-column>
      <el-table-column label="用户名" prop="user" align="center"></el-table-column>
      <el-table-column label="权限" prop="permission" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {listUser} from "../../api/user-manager";

  export default {
    data() {
      return {
        users: []
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        const response = await listUser()
        console.log(response)
        this.users = response.data.users
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
.user-container {
  padding: 20px;
}
</style>
