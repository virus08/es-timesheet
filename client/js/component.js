//window.Vuelib = {}; // global Object container; don't use var
//window.Vuelib.vueTestTable = [];


// http://momentjs.com/
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('Do MMMM YYYY')
  }
})

/*
Vue.component('test', { 
	 props: ['source'],
	 template: '<div>{{ list. }}</div>',
	 data: function () {
	    return {
	    	list: null
	    }
	  },
	  methods: {
		  getUsers: function(){
	            this.$http.get(this.source).then(function(response){
	                this.list = response.data;
	            }, function(error){
	                console.log(error.statusText);
	            });
	        }
	    },
	    mounted: function () {
	        this.getUsers();
	    }
	})


 */



Vue.component('edit-model', {
	props: ['xid','data'],
	data: function () {
	    return {
	    	sow:null,
	    	opt:null,
	    	project:null,
	    	jobstatus:[
	    		'Open',
	    		'On Progress',
	    		'Completed',
	    		'Cancel'
	    	]
	    }
	},methods: {
		fdel:function(){
			this.$http.delete('/api/timesheets/'+this.data.id)
	    	location.href = "/";
		},
		update:function(){
			 this.data.modify_date=new Date();
			 if (this.data.Job_status==='Completed'){
				 this.data.Completed_date=new Date();
				 this.data.Job_progress=100;
			 }
			
	    	 this.$http.post('/api/timesheets/'+this.data.id+'/replace',this.data)
	    	  //$('#modal-form'+this.xid).modal('hide')
	    	 location.href = "/"
	      },
	      sethour: function(){
	    	  this.data.Hours=this.sow.Hours.filter(function (n){
	    		  return n.Name=="Guide line";
	    	  });
	      },
	      getsow: function(){
	            this.$http.get('/api/sows').then(function(response){
	                this.sow = response.data;
	            }, function(error){
	                console.log(error.statusText);
	            });
	        },
	        getproject: function(){
	            this.$http.get('/api/projects').then(function(response){
	                this.project = response.data.filter(function (n){
	                    return n.status=='Open' || n.Job_status=='Progress';
	                });
	            }, function(error){
	                console.log(error.statusText);
	            });
	        }
	    },
	    mounted: function () {
	    	this.getsow();
	    	this.opt=this.data.Job_SOW;
	    	this.getproject();
	    },
	template:`
		<div>
			<div class="text-center">
				<!-- <a data-toggle="modal" class="btn btn-primary" :href="'#modal-form'+xid">Edit</a> -->
			</div>
				<div :id="'modal-form'+xid" class="modal fade" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-body">
								<div class="row">
									<div class="col-sm-6 b-r">
				 						<div class="form-group">
				 							<p><label>Job Name</label> {{data.Job_Header}} </p>
				 							<p><label>Job Type</label> {{data.Job_Type}} </p>
				 							<p><label>SoW</label> {{data.Job_SOW}}</p>
				 							<label>Job Hours</label> {{data.Job_Hours}}
		                                    <p><label>Deadline</label> {{data.Job_date|formatDate}} </p>
		                                    <label>Brands</label>
		                                    	<ul>
		                                    		<li v-for="tech in data.Brands">{{tech}}</li>
		                                    	</ul>
		                                    <label>Base On Technology</label>
		                                    	<ul>
		                                    		<li v-for="tech in data.Base_Technology">{{tech}}</li>
		                                    	</ul>
		                                    <label>Contact</label>
		                                    	<ul>
		                                    		<li v-for="contact in data.contract">{{contact}}</li>
		                                    	</ul>
				 						</div>		
				 					</div>
				 					<div class="col-sm-6">
				 						<div class="form-group">
					 							<label>Scope Of Works</label> 
				 								<select class="form-control m-b" v-model="opt" v-on:change='data.Job_Hours=opt.Hours;data.Job_SOW=opt.Name' :disabled="data.Job_status == 'Completed'|| data.Job_status == 'Cancel'"" >
				 									<option selected >{{data.Job_SOW}}</option>
			                                        <option v-for="option in sow" :value=option v-if='option.GroupName=== data.Job_Type'>{{option.Name}}</option>                                       
			                                    </select>
					 							<label>Job Detail</label> <input type="text" v-model="data.Job_detail" placeholder="รายละเอียด" class="form-control" :disabled="data.Job_status == 'Completed'|| data.Job_status == 'Cancel'"" >
					 							<label>Job Progress</label> <input type="number" v-model="data.Job_progress" placeholder="ความคืบหน้า" class="form-control" :disabled="data.Job_status == 'Completed'|| data.Job_status == 'Cancel'"" >
					 							<label>Job status</label> 
					 							<select class="form-control m-b" v-model="data.Job_status" >
			                                        <option v-for="option in jobstatus">{{option}}</option>                                       
			                                    </select>
			                                    <label>Project Task Tack</label> 
					 							<select class="form-control m-b" v-model="data.project" :disabled="data.Job_status == 'Completed'|| data.Job_status == 'Cancel'">
			                                        <option v-for="option in project">{{option.Name}}</option>                                       
			                                    </select>
				 							</div>
				 						<div class="row">
				 							<div class="col-sm-6"/>
				 							<div class="col-sm-3">
				 								<button class="btn btn-sm btn-primary pull-right m-t-n-xs" v-on:click="update">
				 									<strong>Update</strong>
				 								</button> 
				 							</div>
				 							
				 							<div class="col-sm-3">
				 								<button class="btn btn-sm btn-primary pull-right m-t-n-xs " v-on:click="fdel">
				 									<strong>Delete</strong>
				 								</button>
				 							</div>
				 						</div>
				 					</div>
				
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`
});

Vue.component('Timesheet1', {
	 props: ['source','uid'],
	 template: `<div>
		 	<div class="row">
                <div class="col-lg-12">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>New Timesheet table</h5>
	                        <div class="ibox-tools">
	                            <!-- <a class="collapse-link"> <i class="fa fa-chevron-up"></i></a> -->
	                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
	                                <i class="fa fa-wrench"></i>
	                            </a>
	                            <ul class="dropdown-menu dropdown-user">
	                                <li><a href="#">Config Option 1</a> </li>
	                                <!-- <li><a href="#">Config Option 2</a> </li> --> 
	                            </ul>
	                            	<!--  <a class="close-link"> <i class="fa fa-times"></i> </a> -->
	                        </div>
                        </div>
                        <div class="ibox-content">
                         <div class="table-responsive">
                         	<vue-test-table />
		 					 <New_Job name='#newjob-form' :UID=uid />
		 					 <xedit :source="source" />
                         </div> 		 				
                        </div>
                    </div>
                </div>
            </div>
		 </div>
		
	 `,
	 data: function () {
	    return {}
	  },
	  methods: {}
	});

Vue.component('vue-test-table', {
  data: function () {
	    return {
	    	datasource: null
	    }
	  },
  mounted: function () {
	  this.mounttable();
  },
  methods: {
	  mounttable:function(){
		  var url  = "/api/timesheets";
		  var datatable=[];
		  var xhr  = new XMLHttpRequest()
		  xhr.open('GET', url, false)
		  xhr.onload = function () {
		  	var data = JSON.parse(xhr.responseText);
		  	if (xhr.readyState == 4 && xhr.status == "200") {
		  		datatable= data;
		  	} else {
		  		console.error(data);
		  	}
		  }
		  xhr.send(null);
		  var vueTestTable = [];
		  //this.datasourcs=Vuelib.datatable
		  datatable.forEach(function(entry){
			  var temparray=[];
			  var lender=`<a data-toggle="modal" class="btn btn-primary" href="#modal-form`+entry.id+`">Edit</a>	`;
			  var xdate = moment(String(entry.Job_date)).format('DD MMM YY')
			  if(entry.UID==Vuelib.UID){
				  temparray.push(entry.Job_Header);
				  temparray.push(entry.Job_detail);
				  temparray.push(entry.Job_Hours);
				  temparray.push(xdate);
				  temparray.push(entry.Job_progress);
				  temparray.push(entry.Job_status);
				  temparray.push(lender);
				  vueTestTable.push(temparray);
				  
			  }			  
			});
		  Vuelib.table = $('.vue-test-table').dataTable({"order": [[ 3, "desc" ]],responsive: true,"data": vueTestTable,"dom": 'l<"clear">frtip'});
	  }
  },  
  template: `
	  <div>
	  <table class="table table-striped table-bordered table-hover vue-test-table" >
	  	 <thead>
	  	   <tr>
                <th>Job Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Detail&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                <th>Hours</th>
                <th>Deadline</th>
                <th>Progress</th>
                <th>Status</th>
                <th data-orderable="false">Action</th>
            </tr>
          </thead>
	  </table>
	  
	 </div>
  `
});



Vue.component('xedit', {
	 props: ['source'],
	 template: `<div>
		 			<edit-model v-for="data in list" :xid=data.id :data=data />
		 		</div>`,
	 data: function () {
	    return {
	    	list: null
	    }
	  },
	  methods: {
		  getUsers: function(){
	            this.$http.get(this.source).then(function(response){
	                this.list = response.data;
	            }, function(error){
	                console.log(error.statusText);
	            });
	        }
	    },
	    mounted: function () {
	        this.getUsers();
	    }
	})

Vue.component('allTimesheet', {
	 props: ['source','uid'],
	 template: `
	 <div>
		 <div class="row">
		 	<div class="col-lg-12">
		 		<div class="ibox float-e-margins">
		 			<div class="ibox-title">
		 				<h5>Time sheet</h5>
		 			</div>
		 			<div class="ibox-content">
		 				<div class="table-responsive">
		 					<test :source="source" />
		 				</div>
                   </div>
		 		</div>                 
		 	</div>
		 </div>
	</div>

	 `,
	 data: function () {
	    return {
	    	list: null
	    }
	  },
	  methods: {
		  getUsers: function(){
	            this.$http.get(this.source).then(function(response){
	            	var uid=parseInt(this.uid);
	                this.list = response.data.filter(function (n){
	                    return n.UID===uid && (n.Job_status=='Cancel' || n.Job_status=='Completed');
	                });
	            }, function(error){
	                console.log(error.statusText);
	            });
	        }
	    },
	    mounted: function () {
	        this.getUsers();
	    }
	});


Vue.component('New_Job', {
	props:['name','UID'],
	 template: 
		 `
		 <div class="ibox-content">
          	<div class="text-center">
		 		<a data-toggle="modal" class="btn dim btn-sm btn-primary pull-right m-t-n-xs" :href=name+UID >Add Job</a>
		 	</div>
		 </div>
		 `
	})


	


Vue.component('delete', {
	props:['name','data'],
	 template: 
		 `
		<div class="col-md-3">
			<div class="text-center">
				<a data-toggle="modal" class="btn btn-primary btn-sm" :href=ahref+name+data.id>
				 <i class="fa fa-eraser"></i>
				 </a>
			</div>
		 	<div :id=name+data.id class="modal fade" aria-hidden="true">
		 		<div class="modal-dialog">
		 			<div class="modal-content">
		 				<div class="modal-body">
		 					<div class="row">
		 						<div> คุณต้องการลบ </div>
		 							{{data}}
		 						<div class="pull-right" >
		 							<button class="btn btn-danger dim" type="button"  v-on:click="Cancel">
		 								<i class="fa fa-times"></i>
		 							</button>
		 							<button class="btn btn-danger dim" type="button"  v-on:click="Submit">
		 								<i class="fa fa-check"></i>
		 							</button>
		 					</div>
		 				</div>
		 			</div>
		 		</div>
		 	</div>
		 </div>
		
		 `,
		 data: function () {
			    return {
			    	ahref:'#'
			    }
		 },
		 methods: {
			 Cancel:function(){
		    	  //this.$http.post('/api/timesheets',this.timesheet)
		    	  //$('#'+this.name+this.data.id).modal('hide')
		    	  //location.href = "/"
				 location.href = "/"
		      },
		      Submit:function(){
		    	 this.$http.delete('/api/timesheets/'+this.data.id)
		    	 location.href = "/";
		     }
		       
		    }
	})
	

	
Vue.component('c-form', {
	 props: ['f_id','f_name','f_detail','profile'],
	 template: 
		 `
		 <div :id=f_id class="modal fade" aria-hidden="true">
		 	<div class="modal-dialog">
		 		<div class="modal-content">
		 			<div class="modal-body">
		 				<div class="row">
		 					<div class="col-sm-6 b-r"><h3 class="m-t-none m-b">{{f_name}}</h3>
		 						<p>{{f_detail}}</p>
		 						<div class="form-group">
		 							<label>Job Name</label> <input type="string" v-model="timesheet.Job_Header" placeholder="หัวข้องาน"  class="form-control">
		 							<label>Job Detail</label> <input type="string" v-model="timesheet.Job_detail" placeholder="รายละเอียด" class="form-control">
		 							<label>Job Type</label> 
		 							<select class="form-control m-b" v-model="timesheet.Job_Type" v-on:change="list=sowlist.filter(data => data.GroupName == timesheet.Job_Type)">
                                        <option v-for="option in jobtype">{{option.Name}}</option>                                       
                                    </select>
                                    <label>Scope</label> 
		 							<select class="form-control m-b" v-model="timesheet.Job_SOW" v-on:change="timesheet.Job_Hours=">
                                        <option v-for="option in list">{{option.Name}}</option>                                       
                                    </select>
                                    <label>Work Hours</label> {{timesheet.Job_Hours}}<p> 
                                    <label>Deadline</label> <input type="date" v-model="timesheet.Job_date" placeholder="วันส่งงาน" class="form-control">
                                    
		 						</div>		
		 					</div>
		 						<div class="col-sm-6">
		 							<div class="form-group">
		 							<label>Base On Technology</label>
		 								<select class="form-control" size="7" multiple="" v-model="timesheet.Base_Technology">
		 									<option v-for="option in tech">{{option.Name}}</option>
		 								</select>
		 							<label>Brands</label>
		 								<select class="form-control" size="10" multiple="" v-model="timesheet.Brands">
		 									<option v-for="option in brands">{{option.Name}}</option>
		 								</select>
		 							
		 							
		 							<br><br>
		 						</div>
		 					</div>
		 				</div>
		 				<hr>
		 						<div>
		 							<button class="btn btn-sm btn-primary pull-right m-t-n-xs" v-on:click="addjob">
		 								<strong>Add Job</strong>
		 							</button>
		 						</div>		 				
		 			
		 		</div>
		 	</div>
		 </div>
		</div>
		 `,
		 data: function () {
			    return {
			    	user: null,
			    	newct:null,
			    	brands:null,
			    	jobtype:null,
			    	tech:null,
			    	list:null,
			    	sowlist:null,
			    	timesheet:{
			    	    "Name_Surname": "",
			    	    "Job_Type": "",
			    	    "Job_SOW": "",
			    	    "Base_Technology": [],
			    	    "UID": 1,
			    	    "Job_Header": "",
			    	    "Job_detail": "",
			    	    "create_date": "",
			    	    "Job_date": "",
			    	    "modify_date": "",
			    	    "Job_Hours": 0,
			    	    "Job_progress": 0,
			    	    "contract": [],
			    	    "Brands":[],
			    	    "Job_status": "Open",
			    	    "remark": [
			    	      "0"
			    	    ]
			    	  }			    	
			    }
			  },
			  methods: {
				  getUsers: function(){
			            this.$http.get(this.profile).then(function(response){
			                this.user = response.data;
			                this.timesheet.Name_Surname= this.user.Name+' '+this.user.Sname
			                this.timesheet.UID= this.user.uid
			                this.timesheet.create_date=new Date()
			                this.timesheet.modify_date=this.timesheet.create_date
			            }, function(error){
			                console.log(error.statusText);
			            });
			        },
			        getBrands: function(){
			            this.$http.get('/api/brands').then(function(response){
			                this.brands = response.data;
			            }, function(error){
			                console.log(error.statusText);
			            });
			        },
			        getjobtype: function(){
			            this.$http.get('/api/jobtypes').then(function(response){
			                this.jobtype = response.data;
			            }, function(error){
			                console.log(error.statusText);
			            });
			        },
			        gettech: function(){
			            this.$http.get('/api/teches').then(function(response){
			                this.tech = response.data;
			            }, function(error){
			                console.log(error.statusText);
			            });
			        },
			      addjob:function(){
			    	  this.$http.post('/api/timesheets',this.timesheet)
			    	  $('#'+this.f_id).modal('hide')
			    	  location.href = "/"
			    	  this.$emit('AddJob')
			      },
			     addct:function(){
			    	 //this.timesheet.Job_Hours+=1;
			    	 this.timesheet.contract.push(this.newct);
			     },
			     getsow:function(){
			    	 this.$http.get('/api/sows').then(function(response){
			                this.sowlist = response.data;
			            }, function(error){
			                console.log(error.statusText);
			            });
			     }
			       
			    },
			    mounted: function () {
			        this.getUsers();
			        this.getBrands();
			        this.getjobtype();
			        this.gettech();
			        this.getsow();
			    }
			})

Vue.component('profile', {
  props: ['source'],
  // just like data, the prop can be used inside templates
  // and is also made available in the vm as this.message
  data: function () {
	    return {
	    	profiles: {
	    		"picture":'',
	    		"Name":'',
	    		"Sname":'',
	    		"position":''
	    	}
	    }
	  },
  methods: {
	getUsers: function(){
		this.$http.get(this.source).then(function(response){
			this.profiles = response.data;
		}, function(error){
			console.log(error.statusText);
		});
	}
  },
  mounted: function () {
	this.getUsers();
  },
  template: `
	<li class="nav-header">
		<center>
		<div class="dropdown profile-element"> 
			<span>
				<img alt="image" class="img-circle" v-bind:src='profiles.picture' />
			</span>
			<span class="clear"> 
				<span class="block m-t-xs"> 
					<strong class="font-bold">{{profiles.Name}} {{profiles.Sname}}</strong>
				</span> 
				<span class="text-muted text-xs block">
				{{profiles.position}}</b>
				</span>
			</span> 
		</div>
		</center>
        <div class="logo-element">
			IN+
		</div>
		
	</li>
`
});



Vue.component('header-layout',{
	template:`
	        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
            <form role="search" class="navbar-form-custom" method="post" action="search_results.html">
                <div class="form-group">
                    <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
                </div>
            </form>
        </div>
            <ul class="nav navbar-top-links navbar-right">
                <slot></slot>
            </ul>
        </nav>
	`
});

Vue.component('logout',{
	template:'<li><a href="auth/logout"><i class="fa fa-sign-out"></i> Log out</a></li>'
});

Vue.component('welcome-message',{
	template:'<li><span class="m-r-sm text-muted welcome-message"><slot></slot></span></li>'
});

Vue.component('app-menus',{
	props: {
		app_href: {
		  type: String,
		  default: '#'
		},
		app_name: {
		  type: String,
		  default: 'Dashboards'
		},
		app_isActive:
		{
		  type: Boolean,
		  default: false
		},
		app_icont:{
			type: String,
			default: 'fa fa-th-large'
		},
		menus:{
			type: Array,
			default: function () {
				return null
			}
		}
	},
	template:`
		<li>
			<a href=app_href  >
				<i :class=app_icont></i> <span class="nav-label">{{app_name}}</span> 
				<span class="fa arrow"></span>
			</a>
			<ul class="nav nav-second-level">
				<li v-for="menu in menus" :class="{'active':menu.isActive}">
					<a :href="menu.href" >{{menu.label}}  </a>
				</li>
			</ul>
        </li>
	`
});

Vue.component('menu-list', {
	props: {
		label:{
			type: String,
			default:'MyMenu'
		},
		href:{
			type: String,
			default:'#'
		}
	},
    template: '<li><a :href=href @click="selectTab(tab)>{{label}}</a></li>'

    })
	
	
Vue.component('profile-menu-list', {
	props: {
		label:{
			type: String,
			default:'MyMenu'
		},
		href:{
			type: String,
			default:'#'
		}
	},
    template: 
	'<li><a :href=href>{{label}}</a></li>'
    })
	
	
Vue.component('conf', {
	 props: ['uid','uname'],
	 template: 
		 `
		 <div class="row">
                    <div class="panel blank-panel">

                        <div class="panel-heading">
                            <div class="panel-title m-b-md"><h4></h4></div>
                            <div class="panel-options">

                                <ul class="nav nav-tabs">
                                    <li class="active"><a data-toggle="tab" href="#tab-1"><i class="fa fa-laptop"></i></a></li>
                                    <li class=""><a data-toggle="tab" href="#tab-2"><i class="fa fa-desktop"></i></a></li>
                                    <li class=""><a data-toggle="tab" href="#tab-3"><i class="fa fa-signal"></i></a></li>
                                    <li class=""><a data-toggle="tab" href="#tab-4"><i class="fa fa-bar-chart-o"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="panel-body">

                            <div class="tab-content">
                                <div id="tab-1" class="tab-pane active">
                                	<div class="col-md-6">
                						<div class="ibox float-e-margins">
		 									<div class="ibox-title">
                        						<h5>Change Password <small>Change Password</small></h5>
		 										
                    						</div>
                    						<div class="ibox-content">
                    							<form role="form">
	                                    			<div class="form-group"><label>oldPassword</label> <input type="password" placeholder="Old Password" class="form-control"></div>
	                                    			<div class="form-group"><label>New Password</label> <input type="password" placeholder="New Password" class="form-control"></div>
	                                    			<div class="form-group"><label>Confirm Password</label> <input type="password" placeholder="Confirm Password" class="form-control"></div>
	                                    			<div>
	                                        			<button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit"><strong>Change</strong></button>
	                                        			<div><br>{{user}}{{uname}}{{uid}}</div>
	                                    			</div>
                                				</form>
                           					</div>
		 								</div>
                    				</div>
                                </div>
                                <div id="tab-2" class="tab-pane">
                                	aaa
                                </div>
                                <div id="tab-3" class="tab-pane">
                                	<strong>test3</strong>
                                </div>
                                <div id="tab-4" class="tab-pane">
                                	<strong>test4</strong>
                                </div>
                       		</div>
		`,
	 data: function () {
	    return {
	    	user: {
	    		username:""
	    	}
	    	
	    }
	  },
	  methods: {
		  getusername:function(){
	    	   this.user.username='test';
	       }
	    },
	    mounted: function () {
	    	getusername();
	    }
	})



