import Vue from 'vue';
import index from './index.vue';
import 'babel-polyfill'
const root = document.createElement('div')
document.body.appendChild(root)
Vue.config.devtools = true;

new Vue({
  render: (h)=> h(index),
}).$mount(root);