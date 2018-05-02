<template>
  <div id="SliderLineImg" class="SliderLineImg">
    <div style="padding:0 24px;">
    <TimeLineChart
      :data="offlineChartData"
      :titleMap="titleMap"

    />
  </div>
  </div>
</template>

<script>
  import TimeLineChart from '@/components/common/TimeLineChart/Index'
  const offlineChartData = [];
  for (let i = 0; i < 20; i += 1) {
    offlineChartData.push({
      x: (new Date().getTime()) + (1000 * 60 * 30 * i),
      y1: Math.floor(Math.random() * 100) + 10,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  export default {
    name: 'SliderLineImg',
    components:{
      TimeLineChart
    },
    data() {
      return {
        offlineChartData,
        titleMap:{
          y1: '客流量',
          y2: '支付笔数'
        }
      };
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
