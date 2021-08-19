<template>
  <div id="cesiumContainer"></div>
</template>

<script>
import worldUrl from "@/assets/worldimage.jpg";

export default {
  data() {
    return {
       sceneUrl: "http://localhost:8090/iserver/services/3D-workspace/rest/realspace",
    }
  },
  mounted() {
    if (typeof Cesium !== "undefined") {
      window.startupCalled = true;
      this.onload();
    }
  },
  methods: {
    onload() {
      try {
        const viewer = new Cesium.Viewer("cesiumContainer");
        viewer.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
            url: worldUrl
        }));
        const scene = viewer.scene;
        scene.open(this.sceneUrl);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>