import Vue from 'vue'
import App from './App'
import request from './utils/request'
import uView from 'uview-ui';
import moment from "moment";
import dao from "./utils/demo-sdk.js"

Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.prototype.request=request;
Vue.prototype.dao = dao;
App.mpType = 'app'


moment.locale('zh-cn');
Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()
