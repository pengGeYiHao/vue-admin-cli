<template>
  <div id="histogram" class="histogram">
    <div style="height:400px;background: #fff;">
      <div>
        <div :ref='node' />
        <div :id='sliderId'/>
      </div>
    </div>
  </div>
</template>


<script>

  import G2 from 'g2';
  import Slider from 'g2-plugin-slider';


  export default {
    name: 'histogram',
    data() {
      return {
        chart:null,
        slider:null,
        sliderId :`timeline-chart-slider-${Math.random() * 1000}`,
        node:'timeline_node'
      };
    },
    mounted () {

      const data = [
        { year: 0, sales: 38 },
        { year: 1, sales: 52 },
        { year: 2, sales: 61 },
        { year: 3, sales: 145 },
        { year: 4, sales: 48 },
        { year: 5, sales: 38 },
        { year: 6, sales: 38 },
        { year: 7, sales: 38 },
      ];
      this.renderChart(data);
    },
    beforeDestroy(){
      if (this.chart) {
        this.chart.destroy();
      }
      if (this.slider) {
        this.slider.destroy();
      }
    },
    methods: {
      renderChart(data) {

        if (!data || (data && data.length < 1)) {
          return;
        }

        // clean
        if (this.sliderId) {
          document.getElementById(this.sliderId).innerHTML = '';
        }
        this.$refs.timeline_node.innerHTML = '';


        const chart = new G2.Chart({
          container: this.$refs.timeline_node,
          forceFit: true,
          height: 400,
          width: 900
        });
        chart.source(data,{
            'year':{
              type: 'cat',
              values: ['2001年','2002年','2003年','2004年','2005年','2006年','2007年','2008年'],
              alias: '时间'
            },
            'sales': {
              type: 'linear',
              alias: '数量'
            }
        });
        chart.coord('polar', {
          radius: 0.5, // 设置半径，值范围为 0 至 1
          innerRadius: 0.3, // 空心圆的半径，值范围为 0 至 1
          startAngle: -1 * Math.PI / 2, // 极坐标的起始角度，单位为弧度
          endAngle: 3 * Math.PI / 2 // 极坐标的结束角度，单位为弧度
        });
        chart.interval().position('year*sales').color('year')
        chart.render();

        this.chart = chart;

        /* eslint new-cap:0 */
//        const slider = new Slider({
//          domId: this.sliderId,
//          height: 26,
//          xDim: 'year',
//          yDim: 'sales',
//          charts: [chart],
//        });
//        slider.render();
//
//        this.slider = slider;
      },
    },
  };
</script>
