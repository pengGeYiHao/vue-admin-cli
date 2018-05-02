<template>
  <div id="welcome" class="welcome">
    <div style="height:400px;background: #fff;">
      <div>
        <h4 v-if="title">{{title}}</h4>
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
    name: 'timeLineChart',
    props: ['height','title','data','titleMap','margin','borderWidth'],
    data() {
      return {
        chart:null,
        slider:null,
        sliderId :`timeline-chart-slider-${Math.random() * 1000}`,
        node:'timeline_node'
      };
    },
    mounted () {
      this.renderChart(this.data);
    },
    beforeDestroy(){
      if (this.chart) {
        this.chart.destroy();
      }
      if (this.slider) {
        this.slider.destroy();
      }
    },

//    render () {
//      const component = (
//        <div style="height:400px;background: #fff;">
//          <div>
//            { this.title && <h4>{this.title}</h4>}
//            <div ref={this.handleRef} />
//            <div ref={this.sliderId} />
//          </div>
//        </div>
//      );
//      return component;
//    },
    methods: {
      renderChart(data) {
        let height = this.height || 400;
        let margin = this.margin || [60, 20, 40, 40];
        let titleMap = this.titleMap;
        let borderWidth = this.borderWidth || 2

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
          height,
          plotCfg: {
            margin,
          },
        });

        chart.axis('x', {
          title: false,
        });
        chart.axis('y1', {
          title: false,
        });
        chart.axis('y2', false);

        chart.legend({
          mode: false,
          position: 'top',
        });

        let max;
        if (data[0] && data[0].y1 && data[0].y2) {
          max = Math.max(data.sort((a, b) => b.y1 - a.y1)[0].y1,
            data.sort((a, b) => b.y2 - a.y2)[0].y2);
        }
        if (data[0] && data[0].y1) {
          max = Math.max(data.sort((a, b) => b.y1 - a.y1)[0].y1,
            data.sort((a, b) => b.y2 - a.y2)[0].y2);
        }

        chart.source(data, {
          x: {
            type: 'linear',
            // tickCount: 16,
            // // mask: 'HH:MM',
//             mask: 'yyyy-mm-dd',
            // range: [0, 1],
          },
          y1: {
            alias: titleMap.y1,
            max,
            min: 0,
          },
          y2: {
            alias: titleMap.y2,
//            max,
            min: 0,
          },
        });

        chart.line().position('x*y1').color('#1890FF').size(borderWidth);
        chart.line().position('x*y2').color('#2FC25B').size(borderWidth);

        this.chart = chart;

        /* eslint new-cap:0 */
        const slider = new Slider({
          domId: this.sliderId,
          height: 26,
          xDim: 'x',
          yDim: 'y1',
          charts: [chart],
        });
        slider.render();

        this.slider = slider;
      },
      handleRef(n) {
        this.node = n;
      }
    },
  };
</script>
