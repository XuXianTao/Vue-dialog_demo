<template>
  <div class="dialog-demo" id="dialog" ref="dialog">
    <div class="dialog-demo__head" id="dialog-head" @mousedown="moveStart" @touchstart.stop.prevent="moveStart" @mousemove.prevent="moving" @touchmove.stop.prevent="moving" @mouseup="moveEnd" @touchend.stop.prevent="moveEnd">
      <span class="dialog-demo__head-title">临时对话框</span>
      <div class="dialog-demo__head-close"></div>
      <br>
      <span class="dialog-demo__head-date" v-once>创建于:{{date}}</span>
    </div>
    <div class="dialog-demo__body-bg" v-once>我是{{name}}</div>
    <div class="dialog-demo__body" ref="dialog_body">
      <div :class="['dialog-demo__body-item', getItemClass(item)]" v-for="item in msgs" :key="item.id+''+item.by">
        <div class="dialog-demo__body-item-icon">
          {{item.by}}
        </div>
        <div class="dialog-demo__body-item-content">
          <div class="nickname">{{item.by}} {{item.time}}</div>
          <div class="msg">{{item.msg}}</div>
        </div>
      </div>
    </div>
    <div class="dialog-demo__foot">
      <textarea class="dialog-demo__foot-input" ref="dialog_input" @keyup.ctrl.enter="submitMsg"></textarea>
      <button class="dialog-demo__foot-submit" @click="submitMsg">提交</button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    date: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    msgs: {
      type: Array
    }
  },
  data() {
    return {
      pos: {
        x: 0,
        y: 0,
        is_down: false
      }
    };
  },
  methods: {
    getItemClass(item) {
      return item.by !== this.name?"left":"right";
    },
    moveStart(ev) {
      let clientX = ev.clientX || ev.touches[0].clientX;
      let clientY = ev.clientY || ev.touches[0].clientY;
      this.$data.pos = {
        x: clientX - this.$refs.dialog.offsetLeft,
        y: clientY - this.$refs.dialog.offsetTop,
        ori_z: this.$refs.dialog.style.zIndex,
        is_down: true
      };
      this.$refs.dialog.style.position = 'absolute';
      this.$refs.dialog.style.cursor = 'move';
      this.$refs.dialog.style.zIndex = 10;
    },
    moving(ev) {
      let clientX = ev.clientX || ev.touches[0].clientX;
      let clientY = ev.clientY || ev.touches[0].clientY;
      if (this.$data.pos.is_down) {
        this.$refs.dialog.style.left = clientX - this.$data.pos.x + "px";
        this.$refs.dialog.style.top = clientY - this.$data.pos.y + "px";
      }
    },
    moveEnd(ev) {
      this.$data.pos.is_down = false;
      this.$refs.dialog.style.cursor = "default";
      this.$refs.dialog.style.zIndex = this.$data.pos.ori_z;
    },
    submitMsg() {
      let time = new Date();
      let msg = this.$refs.dialog_input.value;
      this.$emit('updateMsg', {time, msg, by: this.name})
      this.$refs.dialog_input.value = '';
    }
  },
  mounted() {
    this.$refs.dialog_body.scrollTop = this.$refs.dialog_body.scrollHeight;
  },
  watch: {
    msgs(val, oldVal) {
      // 延迟到下一次渲染更新的时候
      this.$nextTick(() => {
        this.$refs.dialog_body.scrollTop = this.$refs.dialog_body.scrollHeight;
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
}

.dialog-demo {
  position: absolute
  top: 50px;
  left: @top;
  width: 400px;
  overflow-x hidden
  border: 1px solid gray;
  border-radius: 10px;
  background-color white
  &__head {
    height: 60px;
    padding: 10px;
    background-color: #CCCCCC;

    &-title {
      font-size: 20px;
      font-weight: bold;
    }
    &-close {
      content: '\2715'
      float right 
      width 20px
      height @width
    }
  }

  &__body {
    position: relative;
    width 100%
    height: 300px;
    padding: 10px;
    border-bottom: 1px solid gray;
    box-sizing border-box
    overflow-x hidden
    overflow-y auto
    &::-webkit-scrollbar {
      display none
    } 
    &:after {
      content: '.';
      visibility: hidden;
      clear: both;
    }

    &-bg {
      position: absolute;
      top: 50%;
      width: 100%;
      z-index: 0;
      font-size: 40px;
      color: #CCC;
      text-align: center;
      margin-top: -(@font-size / 2);
    }

    &-item {
      width: 100%;
      margin-top: 15px;

      &-icon {
        float: left;
        width: 50px;
        height: @width;
        background-color: gray;
        border-radius: (@width / 2);
        text-align center
        line-height @width
      }

      &-content {
        display: inline-block;
        width: 50%;
        margin: 0 10px;

        .msg {
          box-sizing: border-box;
          width: 100%;
          min-height: 30px;
          padding: 5px 10px;
          background-color: #CCC;
          border-radius: 5px;
          font-size: 15px;
        }
      }

      &.left {
        float: left;
      }

      &.right {
        float: right;

        .dialog-demo__body-item {
          &-icon {
            float: right;
          }

          &-content {
            float: right;
          }
        }
      }
    }
  }

  &__foot {
    position: relative;
    width: 100%;
    min-height: 100px;
    font-size: 0;

    &-input {
      resize: none;
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      padding: 10px;
      border: none;
      font-size: 15px;
    }

    &-submit {
      position: absolute;
      right: 10px;
      bottom: @right;
      padding: 3px 15px;
      background-color: white;
      border: 1px outset gray;
      border-radius: 5px;
      outline: none;

      &:active {
        border-style: inset;
        box-shadow: 0 0 0 1px gray;
      }
    }
  }
}
</style>

