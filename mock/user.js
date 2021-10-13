const Mock = require('mockjs')

const data = Mock.mock({
  'users|1000': [{
    id: '@id',
    user: '@name',
    'permission|1': ['admin', 'editor', 'visitor'],
    created_time: '@datetime'
  }]
})

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]
      // mock error
      if (!token) {
        console.log('token incorrect');
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      } else {
        console.log('token')
        return {
          code: 20000,
          message: 'Login success.',
          data: token
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  //获取用户列表
  {
    url: '/vue-admin-template/user/list',
    type: "get",
    response: _ => {
      const users = data.users;
      //console.log(`data: ${data}, users: ${users}`)
      return {
        code: 20000,
        data: {
          total: users.length,
          users: users
        }
      }
    }
  },
  {
    url: '/vue-element-admin/search/user',
    type: 'get',
    response: (params) => {
      let queryName = params.name
      console.log(queryName)
      let results = []
      let i = 0
      for (let key in users) {
        let name = users[key].name
        if (name.match(queryName) && queryName != undefined){
          console.log(queryName)
          results[i++] = name
        }
      }
      console.log(results)
      return {
        code: 20000,
        data: {
          items: results
        }
      }
    }
  }
]
