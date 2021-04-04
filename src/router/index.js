import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/content'
import Layout from '@/layout'

Vue.use(Router)

const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const Product = {
  template: '<div>Product Name: {{$route.params.name}}, Category: {{$route.params.category}}</div>'
}

const routes = [
  {
    path: '/',
    component: Layout
  },
  {
    path: '/user/:id',
    component: User
  },
  {
    path: '/product/:category/name/:name',
    component: Product
  }
]

export default new Router({
  routes: routes
})
