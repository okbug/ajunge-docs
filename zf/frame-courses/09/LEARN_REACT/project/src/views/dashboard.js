import React from 'react';
import { Chart } from '@antv/g2'
class Dashboard extends React.Component {
  componentDidMount() {
    this.init2()
  }
  initChart() {

    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 },
    ];
    const chart = new Chart({
      container: this.el,
      autoFit: true,
      height: 200,
    });

    chart.data(data);
    chart.scale('sales', {
      nice: true,
    });

    chart.tooltip({
      showMarkers: false
    });
    chart.interaction('active-region');

    chart.interval().position('year*sales');

    chart.render();
  }
  init2() {
    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/gas-import-export.json')
      .then(res => res.json())
      .then(data => {
        const chart = new Chart({
          container: this.el,
          autoFit: true,
          height: 300,
          padding: [50, 20, 30, 30]
        });
        chart.data(data);
        chart.scale({
          value: {
            nice: true,
          }
        });

        chart.tooltip({
          showCrosshairs: true,
          shared: true,
          itemTpl: `<div class="g2-tooltip">
          <div class="g2-tooltip-title">Language</div>
          <ul class="g2-tooltip-list">
            <li class="g2-tooltip-list-item">
              <span class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">a</span>:<span class="g2-tooltip-value">70</span>
            </li>
            <li class="g2-tooltip-list-item">
              <span class="g2-tooltip-marker"></span>
              <span class="g2-tooltip-name">b</span>:<span class="g2-tooltip-value">50</span>
            </li>
          </ul>
        </div>`
        });
        // Y轴单位
        chart.annotation().text({
          position: [2015, 8],
          content: '万立方/英尺',
          style: {
            fill: '#8c8c8c',
            fontWeight: 300
          },
          offsetY: -30,
          offsetX: -20
        });
        // export mexico
        chart.annotation().text({
          position: [2040, 6.3],
          content: '出口至墨西哥',
          style: {
            fill: '#eee',
            fontWeight: 300,
            textAlign: 'end',
            textBaseline: 'center'
          },
          offsetX: -10
        });
        // export canada
        chart.annotation().text({
          position: [2040, 5],
          content: '出口至加拿大',
          style: {
            fill: '#eee',
            fontWeight: 300,
            textAlign: 'end',
            textBaseline: 'center'
          },
          offsetX: -10
        });
        // export nature
        chart.annotation().text({
          top: true,
          position: [2040, 2],
          content: '来自40个州的液化天然气出口',
          style: {
            fill: '#eee',
            fontWeight: 300,
            textAlign: 'end',
            textBaseline: 'center'
          },
          offsetX: -10
        });
        // import canada
        chart.annotation().text({
          position: [2015, -1.5],
          content: '从加拿大进口',
          style: {
            fill: '#eee',
            fontWeight: 300,
            textAlign: 'start',
            textBaseline: 'center'
          },
          offsetX: 10
        });
        // import nature
        chart.annotation().text({
          position: [2019, -3.5],
          content: '从其他国家进口',
          style: {
            fill: '#6b6b6b',
            fontWeight: 300,
            textAlign: 'start',
            textBaseline: 'center'
          },
        });

        chart.annotation().region({
          start: [2019, 8],
          end: [2040, -4],
          style: {
            lineWidth: 0,
            fill: '#dcdcdc',
            fillOpacity: 0.3,
            stroke: '#ccc'
          }
        });

        chart.legend(false);
        chart
          .area()
          .adjust('stack')
          .position('year*value')
          .color('type', ['#1890ff', '#40a9ff', '#0050b3', '#003a8c', '#002766'])
          .style({
            fillOpacity: 0.5,
          });
        chart
          .line()
          .adjust('stack')
          .position('year*value')
          .color('type', ['white'])
          .size(1)
          .tooltip(false)
          .style({
            fillOpacity: 0.2,
          });;
        chart.render();
      });
  }
  render() {
    return <div className=''>
      <div ref={(el) => this.el = el}></div>
    </div>;
  }
}
export default Dashboard