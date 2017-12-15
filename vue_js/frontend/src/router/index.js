import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

import Users from '@/components/AllUsersPage'
import User from '@/components/UserPage'
import SignUp from '@/components/UserAdd'
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'users',
      component: Users
    },
    {
      path: '/:id',
      name: 'detail',
      component: User
    },
    {
      path: '/write',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
