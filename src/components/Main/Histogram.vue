<template>
  <div id="histogram" class="histogram">
    <div style="height:400px;background: #fff;">
      <div>
        <div :ref='node'/>
        <div :id='sliderId'/>
      </div>
    </div>
  </div>
</template>


<script>

  import G2 from '@antv/g2';
  import Slider from '@antv/g2-plugin-slider';
  import DataSet from '@antv/data-set';

  export default {
    name: 'histogram',
    data() {
      return {
        chart: null,
        slider: null,
        sliderId: `timeline-chart-slider-${Math.random() * 1000}`,
        node: 'timeline_node'
      };
    },
    mounted () {
      const data = [
        {
          "date":"1970-01",
          "count": 20
        },
        {
          "date":"1970-02",
          "count": 20
        },
        {
          "date":"1970-03",
          "count": 20
        },
        {
          "date":"1970-04",
          "count": 20
        },
        {
          "date":"1970-05",
          "count": 20
        },
        {
          "date":"1970-06",
          "count": 20
        },
        {
          "date":"1970-07",
          "count": 20
        },
        {
          "date":"1970-08",
          "count": 20
        },
        {
          "date":"1970-09",
          "count": 20
        },
        {
          "date":"1970-10",
          "count": 20
        },
        {
          "date":"1970-11",
          "count": 20
        },
        {
          "date":"1970-12",
          "count": 20
        },
        {
          "date":"1971-01",
          "count": 20
        },
        {
          "date":"1971-02",
          "count": 20
        },
        {
          "date":"1971-03",
          "count": 20
        },
        {
          "date":"1971-04",
          "count": 20
        },
        {
          "date":"1971-05",
          "count": 20
        },
        {
          "date":"1971-06",
          "count": 20
        },
        {
          "date":"1971-07",
          "count": 20
        },
        {
          "date":"1971-08",
          "count": 20
        },
        {
          "date":"1971-09",
          "count": 20
        },
        {
          "date":"1971-10",
          "count": 20
        },
        {
          "date":"1971-11",
          "count": 20
        },
        {
          "date":"1971-12",
          "count": 20
        },]
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

        const ds = new DataSet({
          state: {
            from: '1970-01',
            to: '1970-12'
          }
        });
        const dv = ds.createView();
        dv.source(data)
          .transform({
            type: 'filter',
            callback: obj => {
              let max = new Date(ds.state.to).getTime()
              let min = new Date(ds.state.from).getTime()
              let date = new Date(obj.date).getTime()
              if(date <= max && date >=min){
                return true
              }else {
                  return false
              }
//              let date = obj.date.match(/(\d+)-(\d+)/)
//              let year = date[1]
//              let month = date[2]
//              let step = (ds.state.to.match(/(\d+)-(\d+)/)[1]-ds.state.from.match(/(\d+)-(\d+)/)[1])*12-ds.state.from.match(/(\d+)-(\d+)/)[2]-(-1)+(ds.state.to.match(/(\d+)-(\d+)/)[2]-0)
//              console.log(step)
//              if(ds.state.from.match(/(\d+)-(\d+)/)[1] == ds.state.from.match(/(\d+)-(\d+)/)[1]){
//                  if(year != ds.state.from.match(/(\d+)-(\d+)/)[1]){
//                      return false
//                  }else if(month > ds.state.to.match(/(\d+)-(\d+)/)[2]-0 || month < ds.state.from.match(/(\d+)-(\d+)/)[2]-0){
//                      return false
//                  }else {
//                      return true
//                  }
//              }else {
//                if(year == ds.state.from.match(/(\d+)-(\d+)/)[1]){
//                    if(month >= ds.state.from.match(/(\d+)-(\d+)/)[2]-0){
//                        return true
//                    }else {
//                        return false
//                    }
//                }else if(year == ds.state.to.match(/(\d+)-(\d+)/)[1]){
//                  if(month <= ds.state.to.match(/(\d+)-(\d+)/)[2]-0){
//                    return true
//                  }else {
//                    return false
//                  }
//                }else {
//                    return false
//                }
//              }

              if(year == ds.state.from.match(/(\d+)-(\d+)/)[1]){
                if(month >= ds.state.from.match(/(\d+)-(\d+)/)[2]-0){
                  return true
                }else {
                  return false
                }
              }else if(year == ds.state.to.match(/(\d+)-(\d+)/)[1]){
                if(month <= ds.state.to.match(/(\d+)-(\d+)/)[2]-0){
                  return true
                }else {
                  return false
                }
              }else {
                return false
              }
//              return obj.release >= ds.state.from && obj.release <= ds.state.to;
            }
          });
//        const dv = new DataSet.View().source(data);
        const chart = new G2.Chart({
          container: this.$refs.timeline_node,
          forceFit: true,
          height: 350,
          animate: false,
          padding: [20, 100, 60]
        });
        chart.source(dv, {
          count: {
            alias: '用例数'
          },
          release: {
            alias: '时间'
          }
        });
        chart.interval().position('date*count').color('date');
        chart.render();
        this.chart = chart
        const slider = new Slider({
          container: this.sliderId,
          padding: [ 20, 100, 60 ],
          start: ds.state.from,
          end: ds.state.to,
          data,
          xAxis: 'date',
          yAxis: 'count',
          scales: {
            release: {
              formatter: (val) => {
                return parseInt(val, 10);
              }
            }
          },
          backgroundChart: {
            type: 'interval',
            color: 'rgba(0, 0, 0, 0.3)'
          },
          onChange: ({ startText, endText }) => {
            // !!! 更新状态量
            ds.setState('from', startText);
            ds.setState('to', endText);
          }
        });

        slider.render();
        this.slider = slider
      },
      handleRef(n) {
        this.node = n;
      }
    },
  };
</script>
