import React from 'react';
import { Typography } from 'antd';
import ReactECharts from 'echarts-for-react';

const { Text, Paragraph } = Typography;

const SleepAnalysis = ({ data }) => {
  const getChartOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params) {
          let result = `${params[0].axisValue}<br/>`;
          const total = params.reduce((sum, param) => sum + param.value, 0);
          params.forEach(param => {
            result += `${param.marker}${param.seriesName}: ${param.value.toFixed(1)}小时<br/>`;
          });
          result += `总睡眠: ${total.toFixed(1)}小时`;
          return result;
        }
      },
      legend: {
        data: ['深睡眠', '浅睡眠', '快速眼动期'],
        top: 0,
        textStyle: {
          fontSize: 10
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        top: 40
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.date),
        axisLabel: {
          fontSize: 10,
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '小时',
        axisLabel: {
          formatter: '{value}h',
          fontSize: 10
        }
      },
      series: [
        {
          name: '深睡眠',
          type: 'bar',
          stack: 'sleep',
          data: data.map(item => item.deepSleep),
          itemStyle: {
            color: '#1890ff'
          }
        },
        {
          name: '浅睡眠',
          type: 'bar',
          stack: 'sleep',
          data: data.map(item => item.lightSleep),
          itemStyle: {
            color: '#52c41a'
          }
        },
        {
          name: '快速眼动期',
          type: 'bar',
          stack: 'sleep',
          data: data.map(item => item.remSleep),
          itemStyle: {
            color: '#faad14'
          }
        }
      ]
    };
  };

  const calculateStats = () => {
    const totalNights = data.length;
    const avgTotalSleep = data.reduce((sum, item) => sum + item.deepSleep + item.lightSleep + item.remSleep, 0) / totalNights;
    const avgDeepSleep = data.reduce((sum, item) => sum + item.deepSleep, 0) / totalNights;
    const sleepEfficiency = Math.round((avgTotalSleep / 8) * 100); // 假设理想睡眠时间为8小时
    
    // 计算平均夜间清醒次数（模拟数据）
    const avgWakeUps = 1 + Math.random() * 2;

    return {
      avgTotalSleep: avgTotalSleep.toFixed(1),
      avgDeepSleep: avgDeepSleep.toFixed(1),
      sleepEfficiency,
      avgWakeUps: avgWakeUps.toFixed(1)
    };
  };

  const stats = calculateStats();

  return (
    <div>
      <Text strong style={{ fontSize: '14px', marginBottom: '12px', display: 'block' }}>
        每晚睡眠结构
      </Text>
      
      <ReactECharts 
        option={getChartOption()} 
        style={{ height: '220px', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
      
      <div style={{ 
        marginTop: '12px', 
        padding: '8px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <Paragraph style={{ margin: 0, fontSize: '12px', lineHeight: '1.4' }}>
          <Text strong>平均每晚睡眠：</Text>{stats.avgTotalSleep}小时<br/>
          <Text strong>平均睡眠效率：</Text>{stats.sleepEfficiency}%<br/>
          <Text strong>夜间平均清醒次数：</Text>{stats.avgWakeUps}次
        </Paragraph>
      </div>
    </div>
  );
};

export default SleepAnalysis; 