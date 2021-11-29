import Vue from 'vue';
import App from './App.vue';
import '../../rem';
import tool from '../../tool'

Vue.use(tool)
new Vue({
    el: '#app',
    render: h => h(App)
});
