<template>
  <div>
    <header class="toolbar toolbar-header">
      <h1 class="title">{{ name }}</h1>
    </header>
    <ul class="list-group">
      <li class="list-group-header">
        <input class="form-control" type="text" placeholder="Search for device">
      </li>
      <li class="list-group-item" v-for="(item, index) in remoteList" :class="{ 'selected': item.clicked }" @click="toggle(item)">
        <span class="icon icon-network"></span>
        <div class="media-body">
          <strong>{{ item.label }}</strong>
          <p>{{ item.status }}</p>
        </div>
       </li>
       <li class="list-group-item">
        <button class="btn btn-large btn-positive icon icon-plus-circled">
          Add new remote device
        </button>
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        name: 'Remote Station',
        remoteList: [
          {
            label: 'Name_1',
            status: "connected",
            clicked: false
          },
          {
            label: 'Name_2',
            status: 'connection pending',
            clicked: false
          }
        ]
      }
    },
    methods: {
      toggle: function (item) {
        for(let listItem of this.remoteList)
        {
          listItem.clicked = false;
        }

        item.clicked = !item.clicked;
      }
    }
  }
</script>


<style scoped>
  .active {
    background-color: coral;
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
