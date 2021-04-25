import request from '@/utils/request'

export function listUser() {
  return request({
    url: '/vue-admin-template/user/list',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/vue-admin-template/user/add',
    method: 'post',
    data
  })
}

export function editUser(id) {
  return request({
    url: '/vue-admin-template/user/add',
    method: 'post',
    id
  })
}
