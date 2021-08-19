<template>
  <div class="route-container">
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <Layout>
        <template #left>
          <NavBar />
        </template>

        <template #default>
          <div class="map-container">
            <!-- 地图容器 -->
            <div id="map"></div>
            <div class="route-menu">
              <button
                class="btn"
                v-for="(item, index) in data"
                :key="index"
                @click="handleClick(index)"
              >
                {{ "路线" + (index + 1) }}
              </button>
            </div>

            <div class="msg-panel" ref="panel" v-show="data">
              <div ref="hideBar" class="hide-bar" @click="handleBarClick">
                &lt;
              </div>

              <div class="hide-panel" ref="hidePanel">
                <h2>请点击相应路线获取学习任务！</h2>
              </div>
            </div>
          </div>
        </template>
      </Layout>
    </div>
  </div>
</template>

<script>
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import getRoute from "@/api/route";
import fetchData from "@/mixins/fetchData.js";
import markerUrl from "@/assets/marker.png";
export default {
  mixins: [fetchData({})],
  components: {
    Layout,
    Header,
    NavBar,
  },
  data() {
    return {
      map: "",
    };
  },
  mounted() {
    this.initMap();
  },
  beforeDestroy() {
    this.$bus.$emit("hideToTop");
  },
  methods: {
    //获取远程数据
    async fetchData() {
      return await getRoute();
    },
    drawMarker(targetName, targetCdt) {
      let map = this.map;
      let that = this;
      let Marker = new AMap.Marker({
        position: targetCdt,
        icon: markerUrl,
        map: map,
      });
      
      let InfoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: `<h3 style="color:#0ff; font-size: 20px">${targetName}</h3>`,
        offset: new AMap.Pixel(0, -30),
      });

      InfoWindow.open(map, Marker.getPosition());
      if (targetName === "新桥矿床") {
        AMap.event.addListener(Marker, "click", function () {
          that.$router.push("/mine");
        });
      }
      
      if (targetName === "铜陵矿集区") {
        let southWest = new AMap.LngLat(117.606851, 30.778583);
        let northEast = new AMap.LngLat(117.911721, 31.155397);
        let bounds = new AMap.Bounds(southWest, northEast);

        let rectangle = new AMap.Rectangle({
          bounds: bounds,
          strokeColor: "#f40",
          strokeWeight: 3,
          strokeOpacity: 1,
          strokeStyle: "solid",
          fillColor: "white",
          fillOpacity: 0,
          cursor: "pointer",
          zIndex: 50,
        });

        rectangle.setMap(map);
        // 调整视野达到最佳显示区域
        map.setFitView([Marker, rectangle]);
      }else {
        // 调整视野达到最佳显示区域
        map.setFitView([Marker]);
      }
    },

    handleClick(index) {
      //清楚地图上所有的要素
      this.map.clearMap();

      //构造路线导航类
      let targetCdt = this.data[index].targetCdt.split(",");
      let targetName = this.data[index].targetName;
      //添加标记
      this.drawMarker(targetName, targetCdt);

      //2、修改hideBar里的文本
      const hideBar = this.$refs.hideBar;
      hideBar.innerText = ">";
      //3、修改Panel里的文本
      const panel = this.$refs.panel;
      this.$refs.hidePanel.innerHTML = `<div class="msg-title" style="color: #008c8c">
                  <h1>${this.data[index].name}</h1>
                </div>
                <div class="msg-content" style="margin-top: 20px">
                  <h2>实习内容</h2>
                  <p>${this.data[index].content}</p>
                </div>
                <div class="msg-task" style="margin-top: 20px">
                  <h2>作业</h2>
                  <div class="in-task">
                    <h3>室外作业</h3>
                    <p>${this.data[index].inTask}</p>
                  </div>
                  <div class="out-task">
                    <h3>室内作业</h3>
                    <p>${this.data[index].outTask}</p>
                  </div>
                </div>`;

      //4、信息面板展示
      if (panel.style.width == "") {
        panel.style.width = "400px";
        panel.style.right = "0";
      }
    },
    handleBarClick(e) {
      if (e.target.innerText === "<") {
        e.target.innerText = ">";
      } else {
        e.target.innerText = "<";
      }
      //信息面板展示
      let dom = this.$refs.panel;
      if (dom.style.width == "") {
        dom.style.width = "400px";
        dom.style.right = "0";
      } else {
        dom.style.width = "";
        dom.style.right = "0";
      }
    },
    initMap: function () {
      this.map = new AMap.Map("map", {
        zoom: 15, //级别
        center: [117.295754, 31.843559], //中心点坐标
        //viewMode: "3D", //使用3D视图,
        resizeEnable: true,
        //pitch: 50, //俯仰角度
        layers: [
          new AMap.TileLayer.Satellite(),
          new AMap.TileLayer.RoadNet(),
          new AMap.Buildings(),
        ],
        mapStyle: "amap://styles/fresh", //设置地图样式
        isHotspot: true,
      });
      let that = this;
      AMap.plugin(
        ["AMap.ToolBar", "AMap.OverView"],
        function () {
          //异步同时加载多个插件
          let toolbar = new AMap.ToolBar({
            offset: new AMap.Pixel(20, 50),
          });
          that.map.addControl(toolbar);
          that.map.addControl(
            new AMap.OverView({
              isOpen: true,
            })
          );
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.route-container {
  width: 100%;
  height: 100%;
  position: relative;

  .header {
    width: 100%;
    height: 60px;
  }

  .main {
    width: 100%;
    height: calc(100% - 60px);
  }

  .navbar-container {
    width: 250px;
  }

  .map-container {
    width: 100%;
    height: 100%;
    position: relative;

    #map {
      width: 100%;
      height: 100%;
    }
  }

  .route-menu {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 700px;
    margin: 10px;

    button {
      height: 30px;
      padding: 0 10px;
      margin-left: 10px;
      border: none;
      color: #fff;
      background-color: @primary;
      border-radius: 3px;
      outline: none;

      &:focus {
        background-color: #f40;
      }
    }
  }

  .msg-panel {
    position: absolute;
    transition: width 1s;
    outline: 2px solid #dcdfe6;
    box-sizing: border-box;
    background-color: #fff;
    width: 0px;
    height: 100%;
    right: 0;
    top: 0;
    z-index: 999;

    .hide-bar {
      width: 15px;
      height: 60px;
      line-height: 60px;
      position: absolute;
      left: -15px;
      color: #fff;
      text-align: center;
      border-radius: 5px 0 0 5px;
      top: 50%;
      background-color: @primary;
      transform: translateY(-30px);
    }

    .hide-panel {
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow-y: auto;
    }
  }
}
</style>