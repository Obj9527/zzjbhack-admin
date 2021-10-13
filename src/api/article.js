import request from '@/utils/request'

const preAddress = 'http://127.0.0.1:3000/api'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: preAddress + '/articles',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: preAddress + '/article/update',
    method: 'post',
    data
  })
}
