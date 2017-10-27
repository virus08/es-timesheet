//const routes = []
$(document).ready(function() {
	$('.dataTables-example').dataTable({
        responsive: true,
        "dom": 'T<"clear">lfrtip',
        "tableTools": {
            "sSwfPath": "js/plugins/dataTables/swf/copy_csv_xls_pdf.swf"
        }
    });           
});


const router = new VueRouter({
	routes // short for `routes: routes`
})
const app = new Vue({
	router,
	components: {
	    circleslider: VueCircleSlider.VueCircleSlider
	  }
}).$mount('#wrapper')


