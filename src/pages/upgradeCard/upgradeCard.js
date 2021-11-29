import Vue from 'vue';
import App from './App.vue';
import '../../rem';
import tool from '../../tool';
import VueI18n from 'vue-i18n'
import utils from '../../utils'
Vue.use(VueI18n)
Vue.use(tool);

let i18n = new VueI18n({
    locale: utils.getLang('zh-CN'), // 语言标识
    messages: {
        'zh-TW': require('../../i18n/tw'),
        'zh-CN': require('../../i18n/zh'),
        'en': require('../../i18n/en'),
        'ms': require('../../i18n/ms')
    }
})

new Vue({
    i18n,
    el: '#app',
    render: h => h(App)
});
