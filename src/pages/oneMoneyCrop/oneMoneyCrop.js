import Vue from 'vue';
import App from './oneMoneyCrop.vue';
import '../../rem';
import tool from '../../tool'
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
Vue.use(tool)
new Vue({
    el: '#app',
    render: h => h(App)
});
