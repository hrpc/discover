<template>
  <div class="home">
    <div class="types">
      <button @click="allDiscover">全部歌单</button>
      <button @click="minyaoDiscover">民谣</button>
    </div>
    <div class="wrapper">
      <div class="list" v-for="(item, index) in list" :key="index">
        <!-- <img :src="item.imgUrl" alt="imgUrl"> -->
        <p>歌单标题：{{item.discoverTitle}}，</p>
        <p>播放地址：{{item.playUrl}}，</p>
        <p>播放量：{{item.playCount}}</p>
        <!-- <a :href="item.playUrl">播放地址</a> -->
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.list {
  display flex
  text-align center
  justify-content center
}
// .wrapper{
//   display flex
//   flex-wrap wrap
//   max-width 75vw
//   margin 0 auto
//   margin-top 10px
//   .list{
//     background-color #cccccc
//     margin-right 10px
//     margin-bottom 10px
//   }
// }
</style>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import {getAll, getByType} from '@/api/index'

export default {
  name: "home",
  data: function() {
    return {
      list: []
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    allDiscover() {
      getAll().then(res => {
        console.log(res)
        this.list = res.data
      })
    },
    minyaoDiscover() {
      getByType().then(res => {
        console.log(res)
        this.list = res.data
      })
    }
  }
};
</script>
