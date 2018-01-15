<template>
  <div id="wrapper">
    <div class="window">
      <header class="toolbar toolbar-header">
        <h1 class="title">{{ name }}</h1>
      </header>
      <div class="window-content">
        <div class="pane-group">

          <!--LEFT SIDEBAR-->
          <div class="pane-sm sidebar">
            <ul class="list-group">
              <li class="list-group-header">
                <input class="form-control" type="text" placeholder="Search for someone">
              </li>
              <li class="list-group-item" v-for="(item, index) in leftList">
                <span class="icon icon-user"></span>
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

          <!--MAIN CONTENT-->
          <div class="pane">
            <video-stream></video-stream>
          </div>

          <!--REMOTE DEVICES LIST-->
          <div class="pane sidebar">
            <remote-station></remote-station>
          </div>
        </div>
      </div>

      <footer class="toolbar toolbar-footer">
        <h1 class="title">Version 2.0 Beta</h1>
      </footer>
    </div>
  </div>
</template>

<script>
  import VideoStream from './ControlRoom/VideoStream'
  import RemoteStation from './ControlRoom/RemoteStation'

  export default {
    components: { VideoStream, RemoteStation },
    data () {
      return {
        name: 'Control Room',
        leftList: [
          {
            title: 'title_1',
            content: 'content_1'
          },
          {
            title: 'title_2',
            content: 'content_2'
          }
        ]
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      addRoute (objRouteInfo) {
        this.leftList.push({
          title: objRouteInfo.title,
          content: objRouteInfo.content
        })
      }
    }
  }

  let {ipcRenderer, remote} = require('electron');

  ipcRenderer.on('message-from-remote', (event, arg) => {  
    console.log("Message from main process: " + arg);
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import '~@/assets/photon/css/photon.min.css';

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
