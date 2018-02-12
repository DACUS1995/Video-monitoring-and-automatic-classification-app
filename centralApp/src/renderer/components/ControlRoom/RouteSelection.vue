<template>
	<div class="pane-sm sidebar">
	  <ul class="list-group">
	    <li class="list-group-header">
	      <input class="form-control" type="text" placeholder="Search for someone">
	    </li>
	    <li class="list-group-item" v-for="(item, index) in leftList">
	      <span class="icon icon-address"></span>
				<div>
					<select class="form-control">
						<option>Option one</option>
  					<option>Option two</option>
					</select>
				</div>
	     	<div class="media-body">
	      	<strong>{{ item.title }}</strong>
	      	<p>{{ item.content }}</p>
	     	</div>
	  	</li>
	    <li class="list-group-item">
	      <button class="btn btn-large btn-primary icon icon-plus-circled">
	        Add new route
	      </button>
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
      			title: 'Condition One',
      			content: 'Description'
     			},
     			{
      			title: 'Condition Two',
      			content: 'Description'
    	 		}
   			],
      }
    }
  }
</script>


<style scoped>
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
