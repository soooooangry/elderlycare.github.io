import React, { useState } from 'react';
import { Card, Select } from 'antd';
import ReactECharts from 'echarts-for-react';

const { Option } = Select;

const ActivityChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState('7');

  const getChartOption = () => {
    const filteredData = data.slice(-parseInt(timeRange));
    
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        data: ['步数', '睡眠时长']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: filteredData.map(item => item.date)
      },
      yAxis: [
        {
          type: 'value',
          name: '步数',
          position: 'left',
          axisLabel: {
            formatter: '{value} 步'
          }
        },
        {
          type: 'value',
          name: '睡眠时长',
          position: 'right',
          axisLabel: {
            formatter: '{value} 小时'
          }
        }
      ],
      series: [
        {
          name: '步数',
          type: 'bar',
          yAxisIndex: 0,
          data: filteredData.map(item => item.steps),
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          name: '睡眠时长',
          type: 'line',
          yAxisIndex: 1,
          data: filteredData.map(item => item.sleep),
          lineStyle: {
            color: '#52c41a'
          },
          itemStyle: {
            color: '#52c41a'
          }
        }
      ]
    };
  };

  return (
    <Card 
      title="活动与睡眠趋势"
      extra={
        <Select 
          value={timeRange} 
          onChange={setTimeRange}
          style={{ width: 120 }}
        >
          <Option value="7">近7天</Option>
          <Option value="14">近14天</Option>
          <Option value="30">近30天</Option>
        </Select>
      }
      style={{ height: '400px' }}
    >
      <ReactECharts 
        option={getChartOption()} 
        style={{ height: '320px', width: '100%' }}
      />
    </Card>
  );
};

export default ActivityChart; 