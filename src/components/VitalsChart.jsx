import React from 'react';
import ReactECharts from 'echarts-for-react';

const VitalsChart = ({ data }) => {
  const getChartOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: function(params) {
          let result = `${params[0].axisValue}<br/>`;
          params.forEach(param => {
            const color = param.color;
            const name = param.seriesName;
            const value = Math.round(param.value);
            result += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>${name}: ${value}<br/>`;
          });
          return result;
        }
      },
      legend: {
        data: ['心率', '收缩压', '舒张压', '血氧饱和度'],
        top: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        top: 60
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(item => item.date),
        axisLabel: {
          fontSize: 12
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '心率/血压',
          position: 'left',
          axisLabel: {
            formatter: '{value}',
            fontSize: 12
          },
          min: 40,
          max: 200
        },
        {
          type: 'value',
          name: '血氧饱和度',
          position: 'right',
          axisLabel: {
            formatter: '{value}%',
            fontSize: 12
          },
          min: 90,
          max: 100
        }
      ],
      series: [
        {
          name: '心率',
          type: 'line',
          yAxisIndex: 0,
          data: data.map(item => Math.round(item.heartRate)),
          lineStyle: {
            color: '#ff4d4f',
            width: 2
          },
          itemStyle: {
            color: '#ff4d4f'
          },
          smooth: true,
          symbol: 'circle',
          symbolSize: 4
        },
        {
          name: '收缩压',
          type: 'line',
          yAxisIndex: 0,
          data: data.map(item => Math.round(item.systolic)),
          lineStyle: {
            color: '#722ed1',
            width: 2
          },
          itemStyle: {
            color: '#722ed1'
          },
          smooth: true,
          symbol: 'circle',
          symbolSize: 4
        },
        {
          name: '舒张压',
          type: 'line',
          yAxisIndex: 0,
          data: data.map(item => Math.round(item.diastolic)),
          lineStyle: {
            color: '#722ed1',
            width: 2,
            type: 'dashed'
          },
          itemStyle: {
            color: '#722ed1'
          },
          smooth: true,
          symbol: 'circle',
          symbolSize: 4
        },
        {
          name: '血氧饱和度',
          type: 'line',
          yAxisIndex: 1,
          data: data.map(item => Math.round(item.oxygenSaturation)),
          lineStyle: {
            color: '#1890ff',
            width: 2
          },
          itemStyle: {
            color: '#1890ff'
          },
          smooth: true,
          symbol: 'circle',
          symbolSize: 4
        }
      ]
    };
  };

  return (
    <ReactECharts 
      option={getChartOption()} 
      style={{ height: '300px', width: '100%' }}
      opts={{ renderer: 'svg' }}
    />
  );
};

export default VitalsChart; 