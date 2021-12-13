import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home.vue'
import About from './components/About.vue'
import Edit from './components/Edit.vue';
import AddCanvas from './components/AddCanvas.vue'

//import NavBar from './components/NavBar.vue';
Vue.use(VueRouter);


const routes = [
  { path: '/about', component:  About},
  { path: '/', component: Home},
  {path: '/add', component: AddCanvas},
  {path:'/edit/:id', name: 'Edit', component: Edit}
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
