<template>
  <div align="middle" class="polaroid">
    <div class="title">Number of connections: {{ Connections.length }}</div>
    <div class="title">Streams: </div>
    <ul>
      <li v-for="(item, index) in Connections">
        <video :id="item.video_id" :class="{ 'selectedVideo':item.clicked }" width="480" height="320" autoplay></video>
      </li>
    </ul>
    <!--<video id='localVideo' width="480" height="320" autoplay></video>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        //  Empty
      }
    },
    computed: {
      Connections(){
        return this.$store.state.Connections.arrConnections;
      }
    }
  }
</script>

<style scoped>
  div.polaroid {
    padding: 10px 10px 20px 10px;
    border: 1px solid #BFBFBF;
    background-color: white;
    box-shadow: 10px 10px 5px #aaaaaa;
  }

  #localVideo {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .selectedVideo {
    background-color: powderblue;
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

  .videoWrapper {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;
}
.videoWrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
