<template>
<div class="root">
  <button class="btn-adduser" @click="addUser">添加用户</button>
  <div :ref="user.name" class="parent" v-for="user in users" :key="user.id">
    <Dialog :name="user.name" :date="user.date" :msgs="msgs" @updateMsg="updateMsg"></Dialog>
  </div>
  <Introduce :mdfile="intro_file"></Introduce>
</div>
</template>

<script>
import Dialog from './component/dialog.vue'
import Introduce from './component/introduce.vue'
// json 在webpack2开始已经能自动处理，不必加loader
const jsons = require("./default.json");
const intro_file = 'intro.md';
const names = [
  '杨康', '穆念慈', '洪七公', '黄药师', '欧阳锋', '欧阳克', '李萍', '包惜弱'
]
export default {
  data() {
    return {
      users: jsons.users,
      msgs: jsons.msgs,
      next_msg_id: jsons.next_msgid,
      next_user_id: jsons.next_userid,
      intro_file
    }
  },
  components: {
    Dialog,
    Introduce
  },
  methods: {
    collectTime(obj) {
      let date = [obj.getFullYear(), obj.getMonth()+1, obj.getDate()];
      let time = [obj.getHours().toString().padStart(2,0), obj.getMinutes().toString().padStart(2,0), obj.getSeconds().toString().padStart(2,0)];
      return date.join('-') + ' ' + time.join(':');
    },
    updateMsg(obj) {
      let {time, msg, by} = obj;
      let id = this.$data.next_msg_id++;
      console.log(time)
      console.log(msg)
      console.log(by)
      Object.assign(obj, {id});
      obj.time = this.collectTime(obj.time);
      this.$data.msgs.push(obj);
      console.log(obj);
    },
    addUser() {
      let obj = {
        id: this.$data.next_user_id++,
        name: names[Math.floor(Math.random()*8)],
        date: this.collectTime(new Date)
      };
      this.$data.users.push(obj)
    }
  },
  created() {
    for (let [index, user] of Object.entries(this.$data.users)) {
      this.$data.users[index].date = eval(this.$data.users[index].date);
    }
  },
  mounted() {
    for (let item of this.$data.users) {
      let el = this.$refs[item.name][0];
      el.style.width = el.firstElementChild.clientWidth + 10 + 'px';
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn-adduser
  position absolute 
  left 50%
  width 200px
  height 40px
  margin-left -(@width / 2)
  background-color #41B883
  border none 
  outline none 
  box-shadow 0 0 5px #35495E
  font-size 15px
  font-weight bolder
  letter-spacing 2px
  color white
  &:active 
    box-shadow 0 0 10px #35495E
.parent
  position relative
  display inline-block
</style>
