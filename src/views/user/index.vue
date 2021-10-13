<template>
  <div class="app-container">
    <el-table :data="this.users" border style="min-width: 800px">
      <template v-for="item in columns">
        <el-table-column :label="item.label" :prop="item.prop"></el-table-column>
      </template>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button :id="row.id" type="delete" :disabled="row.disabled" @click="handleDelete(row.id)">删除</el-button>
          <el-button :id="row.id" type="primary" @click="handleEdit">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {listUser} from "../../api/user-manager";

  export default {
    data() {
      return {
        users: [],
        columns: [
          {
            label: 'ID',
            prop: 'id'
          },
          {
            label: '用户名',
            prop: 'name'
          },
          {
            label: '邮箱',
            prop: 'email'
          }
        ]
      }
    },
    mounted() {
      this.getData()
      setTimeout(() => {
        console.log(this.users[0])
      }, 2000)
    },
    methods: {
      async getData() {
        const response = await listUser()
        let data = JSON.parse(response.data)
        this.users = data
      },
      handleDelete(id) {
      },
      handleEdit() {
        console.log('edit')
      }
    },
    components: {}
  }
</script>
