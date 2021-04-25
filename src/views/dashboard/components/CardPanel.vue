<template>
  <div class="card-panel">
    <div class="card-panel-icon-wrapper" :class="this.cardColor">
      <svg-icon :icon-class="this.icon" class-name="card-panel-icon"></svg-icon>
    </div>
    <div class="card-panel-description">
      <div class="card-panel-name">{{this.name}}</div>
      <count-to :start-val="0" :end-val="this.num" :duration="3000" class="card-panel-num"/>
    </div>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  export default {
    name: "CardPanel",
    props: {
      name: {
        type: String,
        default: "placeholder"
      },
      num: {
        type: Number,
        default: -1
      },
      cardColor: {
        type: String,
        default: 'icon-views'
      },
      icon: {
        type: String,
        default: 'peoples'
      }
    },
    components: {
      CountTo
    }
  }
</script>

<style lang="scss" scoped>
  .card-panel {
    height: 100px;
    background: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &-description {
      display: flex;
      flex-direction: column;
      margin-right: 26px;
    }
    &-icon-wrapper {
      margin-left: 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    &-name {
      color: rgba(0, 0, 0, 0.45);
      font-size: 24px;
      margin-bottom: 10px;
    }
    &-num {
      color: #666;
      font-weight: bold;
      font-size: 20px;
    }
    &-icon {
      font-size: 48px;
    }
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-views {
        background: #40c9c6;
      }

      .icon-comments {
        background: #36a3f7;
      }

      .icon-likes {
        background: #f4516c;
      }

      .icon-download {
        background: #34bfa3
      }
    }

    .icon-views {
      color: #40c9c6;
    }

    .icon-comments {
      color: #36a3f7;
    }

    .icon-likes {
      color: #f4516c;
    }

    .icon-download {
      color: #34bfa3
    }
  }
  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>
