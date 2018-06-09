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
      <li v-if="!remoteList.length" class="list-group-item">
        <span class="no-remote-stations">No remote station connected</span>
      </li>
    </ul>
  </div>
</template>


<script>
  import Peer from "simple-peer";

  export default {
    data () {
      return {
        name: 'Remote Station',
        lastSelectedConnection: null,
        configViews: null
      }
    },
    computed:{
      remoteList(){
        return this.$store.state.Connections.arrConnections;
      },
			configuredRoutes(){
				return this.$store.state.RoutingInfo.arrInfoConfigs;
			}
    },
    methods: {
      toggle: function (item) {
        const objUpdatedConnection = { ...item };

        if(this.lastSelectedConnection !== null)
        {
          this.lastSelectedConnection.clicked = false;
          this.$store.commit("UPDATE_CONNECTION", this.lastSelectedConnection);
        }

        objUpdatedConnection.clicked = !objUpdatedConnection.clicked;
        this.$store.commit("UPDATE_CONNECTION", objUpdatedConnection);
      
        this.lastSelectedConnection = { ...item };
        this.bringVideoToView(item);
      },

      bringVideoToView: function(data){
        const elVideo = document.getElementById(data.video_id);
        elVideo.scrollIntoView();

        console.log(`::Bringing into view: ${data.video_id}`);
      },

      makeMessage: function(strSubject, strMessage){
        return JSON.stringify(
            {
                subject: strSubject,
                message: strMessage
            }
        );
      },

      decodeMessage(strStringObject){
        let objDecodedMessage = JSON.parse(strStringObject);
        return objDecodedMessage;
      }
    },
    // !! Use the 'mounted' life-cycle hook to trigger updates in renderer based on main events
    mounted () {
      // console.log(this.remoteList);
      this.$electron.ipcRenderer.on('new-connection-setup', (event, data) => {
        // console.log(data);
        
        console.log("::Adding new remote station::");
        let objNewConnection = {
          label: data.stationId,
          station_id: data.stationId,
          remote_address: data.address,
          status: "connected",
          clicked: false,
          video_id: `station_${data.stationId}`,
          socket: null
        };

        // Add new station to the central store
        this.$store.commit("ADD_NEW_STATION", objNewConnection);
        // console.log(this.$store.state.Connections.arrConnections);

        // Wait for 5 seconds to make sure the remote electron process has started
        setTimeout(() => {
          console.log("::Create websocket connection to the remote electron process::");
          let socket = new WebSocket(`ws://${data.address}:4000`);

          // Peer handle for the WebRTC peer to peer connection
          let peer2 = new Peer();

          // Connection opened
          socket.addEventListener('open', (event) => {
            socket.send(
              this.makeMessage("first-message", "Connection Established")
            );

            // Register the created socket
            let objUpdatedConnectionSocket = { ...objNewConnection };
            objUpdatedConnectionSocket.socket = socket;
            this.$store.commit("UPDATE_CONNECTION", objUpdatedConnectionSocket);

            // Load the routing config info and send them to every station connected
            // if(this.configViews)
            // {
            //   this.configViews = require("./configViews.json");
            // }

            // socket.send(
            //   this.makeMessage("updateConfigViewsJSON", )
            // );

            peer2.on('signal', (data) => {
              console.log("signal");
              socket.send(
                this.makeMessage("webRTC_Data", data)
              );
            });

            // Route message to the remote renderer Electron process
            this.$electron.ipcRenderer.on('classification_results', (event, data) => {
              socket.send(
                this.makeMessage("classification_results", data.message)
              );
            });
          });

          // Listen for messages
          socket.addEventListener('message', (event) => {

            let strMessageRaw = event.data;
            let objDecodedMessage = this.decodeMessage(strMessageRaw);

            if(objDecodedMessage.subject == "webRTC_Data")
            {
              console.log("Signal on peer2 from peer1");
              peer2.signal(objDecodedMessage.message);
            }

            if(objDecodedMessage.subject == "className")
            {
              console.log("[Remove this log] " + objDecodedMessage.message);
              this.$store.commit("INCREMENT_COUNTER", objDecodedMessage.message);
            }
          });

          peer2.on('stream', function (stream) {
            console.log("Event on peer2 to start stream");
            // got remote video stream, now let's show it in a video tag
            let video = document.querySelector(`#${objNewConnection.video_id}`);

            video.src = window.URL.createObjectURL(stream)
            video.play()
          });
        },
        2000);
      });

      this.$electron.ipcRenderer.on('remote-disconected', (event, data) => {
        console.log(data);

        this.$store.commit("REMOVE_NEW_STATION", data);
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

  .no-remote-stations{
    font-weight: bold;
  }

</style>
