import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home'
import SplashScreen from '../components/SplashScreen/SplashScreen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SplashScreen',
      component: SplashScreen
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
