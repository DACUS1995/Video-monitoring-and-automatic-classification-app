<template>
	<div class="pane route-panel sidebar">
	  <ul class="list-group">
	    <li class="list-group-header">

	    </li>
	    <li class="list-group-item" v-for="(item, index) in configuredRoutes">
	      <span class="icon icon-address"></span>
	     	<div class="media-body">
	      	<strong>{{ item.route_name }}</strong>
	      	<p class="text-content">{{ `Description: ${item.route_description}` }}</p>
					<div class="text-content">{{ `Route: ${item.route_indication}` }}</div>
					<div>
						<textarea :id="`info_${item.route_id}`" class="textarea-dinamic"></textarea>
					</div>
	     	</div>
					<span><button @click="saveRoute(item)" class="btn btn-primary">Save</button></span>
					<span v-if="item.route_name !== 'Default'" id="counter-element">Counter: {{item.counter}}</span>
	  	</li>
	 	</ul>
	</div>
</template>


<script>
  export default {
    data () {
      return {
        name: 'Route Selection',
      }
    },
		computed: {
			configuredRoutes(){
				return this.$store.state.RoutingInfo.arrInfoConfigs;
			},
			remoteList(){
        return this.$store.state.Connections.arrConnections;
      }
		},
		methods:{
			saveRoute(route){
				let strIndication = document.getElementById(`info_${route.route_id}`).value;
				let strClassName = null;

				switch(route.route_id)
				{
					case 1:
						strClassName = "tricycle";
						break;
					case 2:
						strClassName = "walking_stick";
						break;
					default:
						strClassName = "default";
				}

				let objNewConfig = {
					route_id: route.route_id,
					route_name: route.route_name,
					route_description: route.route_description,
					route_indication: strIndication,
					class_name: strClassName
				};
				
				this.$store.commit("EDIT_CONFIG", objNewConfig);

				let objAnvelope = {...objNewConfig};

				for(let remoteStation of this.remoteList)
				{
					console.log(`::Updating config view to station: ${remoteStation.label}`);
					remoteStation.socket.send(
						this.makeMessage("updateViewConfig", objAnvelope)
					);
				}
			},
			makeMessage(strSubject, strMessage){
    		return JSON.stringify(
    	  	{
    	  	    subject: strSubject,
    	  	    message: strMessage
    	  	}
    	  );
    	}
		}
  }
</script>


<style scoped>
	.route-panel{
		max-width: 250px;
	}

	#counter-element{
		margin-left: 80px;
	}

	.text-content{
		word-break: keep-all;
		overflow-wrap: break-word;
		max-width: 230px;
		white-space: pre-wrap;
		overflow-wrap: break-word;
	}

	.textarea-dinamic{
		resize: both;
		width: 230px;
		white-space: pre-wrap;
		overflow-y: scroll;
	}

  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }

</style>
