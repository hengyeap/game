import Vue from 'vue';
import App from './newUser-lottery.vue';
import '../../rem';
import tool from '../../tool'
import { getSafe } from './utils/index'
Vue.use(tool)
new Vue({
    el: '#app',
    render: h => h(App)
});

Vue.prototype.$$ = getSafe