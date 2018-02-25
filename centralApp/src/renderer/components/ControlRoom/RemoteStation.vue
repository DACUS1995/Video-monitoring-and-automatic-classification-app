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
          <p>IPv4: {{ item.remote_address }}</p>
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
            station_id: 1,
            status: "connected",
            remote_address: "127.0.0.1",
            clicked: false
          },
          {
            label: 'Name_2',
            station_id: 2,
            status: 'connection pending',
            remote_address: "127.0.0.1",
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
    },
    // !! Use the 'mounted' life-cycle hook to trigger updates in renderer based on main events
    mounted () {
      this.$electron.ipcRenderer.on('new-connection-setup', (event, data) => {
        console.log(data);

        this.remoteList.push({
          label: data.stationId,
          station_id: data.stationId,
          remote_address: data.address,
          status: "connected",
          clicked: false
        });
      });

      this.$electron.ipcRenderer.on('remote-disconected', (event, data) => {
        console.log(data);

        for(let i = 0; i < this.remoteList.length; i++)
        {
          if(this.remoteList[i].station_id === data)
          {
            this.remoteList.splice(i, 1);
          }
        }
      });

      this.$electron.ipcRenderer.on('message-from-remoteElectron', (event, data) => {
        console.log("Message from remoteElectron", data);

        // TODO handle the message
      });
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
