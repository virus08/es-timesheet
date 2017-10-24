Vue.component('profile', {
  props: ['source'],
  // just like data, the prop can be used inside templates
  // and is also made available in the vm as this.message
  data: function () {
	    return {
	    	profiles: null
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



Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // Pass the component definition to the resolve callback
    resolve({
    	template: '<div>I am async {{items.test}}</div>',
    	data: function() {
    		return {
    			items: {"test":1},
    		};
    	},
    	created: function () {
    		this.fetchData();
    	},
    	methods: {
    		fetchData: function () {
    			var self = this;
    			$.get( '/endpoint', function( data ) {
    				self.items = {"test":2};
    			});
    		}
    	}
    })}, 1000)});

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

Vue.component('messages-box',{
	template: `
	<li class="dropdown">
                    <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                        <i class="fa fa-envelope"></i>  <span class="label label-warning">16</span>
                    </a>
                    <ul class="dropdown-menu dropdown-messages">
                        <li>
                            <div class="dropdown-messages-box">
                                <a href="profile.html" class="pull-left">
                                    <img alt="image" class="img-circle" src="img/a7.jpg">
                                </a>
                                <div class="media-body">
                                    <small class="pull-right">46h ago</small>
                                    <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br>
                                    <small class="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
                                </div>
                            </div>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <div class="dropdown-messages-box">
                                <a href="profile.html" class="pull-left">
                                    <img alt="image" class="img-circle" src="img/a4.jpg">
                                </a>
                                <div class="media-body ">
                                    <small class="pull-right text-navy">5h ago</small>
                                    <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
                                    <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                </div>
                            </div>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <div class="dropdown-messages-box">
                                <a href="profile.html" class="pull-left">
                                    <img alt="image" class="img-circle" src="img/profile.jpg">
                                </a>
                                <div class="media-body ">
                                    <small class="pull-right">23h ago</small>
                                    <strong>Monica Smith</strong> love <strong>Kim Smith</strong>. <br>
                                    <small class="text-muted">2 days ago at 2:30 am - 11.06.2014</small>
                                </div>
                            </div>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <div class="text-center link-block">
                                <a href="mailbox.html">
                                    <i class="fa fa-envelope"></i> <strong>Read All Messages</strong>
                                </a>
                            </div>
                        </li>
                    </ul>
                </li>
	`
});

Vue.component('alerts-box',{
	template: `
	<li class="dropdown">
                    <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
                        <i class="fa fa-bell"></i>  <span class="label label-primary">8</span>
                    </a>
                    <ul class="dropdown-menu dropdown-alerts">
                        <li>
                            <a href="mailbox.html">
                                <div>
                                    <i class="fa fa-envelope fa-fw"></i> You have 16 messages
                                    <span class="pull-right text-muted small">4 minutes ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="profile.html">
                                <div>
                                    <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                    <span class="pull-right text-muted small">12 minutes ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="grid_options.html">
                                <div>
                                    <i class="fa fa-upload fa-fw"></i> Server Rebooted
                                    <span class="pull-right text-muted small">4 minutes ago</span>
                                </div>
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <div class="text-center link-block">
                                <a href="notifications.html">
                                    <strong>See All Alerts</strong>
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </div>
                        </li>
                    </ul>
                </li>
	`
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
	
	
Vue.component('profile1', {
  props: {
    name: {
      type: String,
      default: 'David Williams'
    },
	profile_img:{
		type: String,
		default: 'img/profile_small.jpg'
	},
	position:{
		type:String,
		default: 'Staff'
	},
	menus:{
		type: Array,
		default: function () {
			return null
		}
	},
  },
 
  // just like data, the prop can be used inside templates
  // and is also made available in the vm as this.message
  template: `
	<li class="nav-header">
		<center>
		<div class="dropdown profile-element"> 
			<span>
				<img alt="image" class="img-circle" v-bind:src="profile_img" />
			</span>
			<a data-toggle="dropdown" class="dropdown-toggle" href="#">
				<span class="clear"> 
					<span class="block m-t-xs"> 
						<strong class="font-bold">wanchai</strong>
					</span> 
					<span class="text-muted text-xs block">
					{{position}}</b>
					</span>
				</span> 
			</a>
		</div>
		</center>
        <div class="logo-element">
			IN+
		</div>
	</li>
`
});


