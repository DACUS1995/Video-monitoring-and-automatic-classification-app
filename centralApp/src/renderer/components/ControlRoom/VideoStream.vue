<template>
  <div>
    <div class="title">Current Stream</div>
    <video preload width="480" height="320" src="https://08-lvl3-pdl.vimeocdn.com/01/4289/4/121445495/343291942.mp4?expires=1511909831&token=0becf46b3f27aa74ffcf7" controls>
      Your browser does not support the video tag.
    </video>

    <div class="videoWrapper">
      <!-- Copy & Pasted from YouTube -->
      <iframe width="560" height="349" src="http://www.youtube.com/embed/n_dZNLr2cME?rel=0&hd=1" frameborder="0" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
  console.log('~@')
  export default {
    data () {
      return {
        //  Empty
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
