//const routes = []


const router = new VueRouter({
	routes // short for `routes: routes`
})
const app = new Vue({
	router,
	components: {
	    circleslider: VueCircleSlider.VueCircleSlider
	  }
}).$mount('#wrapper')
