<template>
	<div class="pane route-panel sidebar">
	  <ul class="list-group">
	    <li class="list-group-header">

	    </li>
	    <li class="list-group-item" v-for="(item, index) in leftList">
	      <span class="icon icon-address"></span>
	     	<div class="media-body">
	      	<strong>{{item.name}}</strong>
	      	<p class="text-content">{{`Description: ${item.content}`}}</p>
					<div class="text-content">{{`Route: ${item.route}`}}</div>
					<div>
						<textarea class="textarea-dinamic" v-model="item.route"></textarea>
					</div>
	     	</div>
				<button @click="saveRoute(item.route_id)" class="btn btn-primary">Save</button>
	  	</li>
	 	</ul>
	</div>
</template>


<script>
  export default {
    data () {
      return {
        name: 'Route Selection',
        leftList: [
    			{
						route_id: 1,
						route: "Insert route",
      			name: 'Clasification 1',
      			content: 'Description 1'
     			},
     			{
						route_id: 2,
						route: "Insert route",				 
      			name: 'Clasification 2',
      			content: 'Description 2'
    	 		}
   			],
      }
    },
		methods:{
			saveRoute(route_id){
				//TODO save the updated list in a file and update it whenever the save button is clicked
				//TODO move the the leftList array to the central store
				//TODO sync the routes with every remoteStation
			}
		}
  }
</script>


<style scoped>
	.route-panel{
		max-width: 250px;
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
