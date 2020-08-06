import Vue from 'vue'
import App from './App'
import request from './utils/request'
import uView from 'uview-ui';

Vue.config.productionTip = false
Vue.prototype.request=request;
App.mpType = 'app'

Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()
