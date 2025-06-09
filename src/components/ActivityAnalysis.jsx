import React from 'react';
import { Typography } from 'antd';
import ReactECharts from 'echarts-for-react';

const { Text, Paragraph } = Typography;

const ActivityAnalysis = ({ data }) => {
  const getChartOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params) {
          const item = params[0];
          return `${item.axisValue}<br/>步数: ${item.value}步<br/>目标: ${data[item.dataIndex].target}步`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
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
        name: '步数',
        axisLabel: {
          formatter: '{value}',
          fontSize: 10
        }
      },
      series: [
        {
          name: '每日步数',
          type: 'bar',
          data: data.map(item => ({
            value: item.steps,
            itemStyle: {
              color: item.steps >= item.target ? '#52c41a' : '#faad14'
            }
          })),
          barWidth: '60%'
        },
        {
          name: '目标步数',
          type: 'line',
          data: data.map(item => item.target),
          lineStyle: {
            color: '#ff4d4f',
            type: 'dashed',
            width: 2
          },
          itemStyle: {
            color: '#ff4d4f'
          },
          symbol: 'none'
        }
      ]
    };
  };

  const calculateStats = () => {
    const totalSteps = data.reduce((sum, item) => sum + item.steps, 0);
    const avgSteps = Math.round(totalSteps / data.length);
    const targetAchievement = data.filter(item => item.steps >= item.target).length;
    const completionRate = Math.round((targetAchievement / data.length) * 100);
    const maxStepsDay = data.reduce((max, item) => item.steps > max.steps ? item : max, data[0]);

    return {
      avgSteps,
      completionRate,
      maxStepsDay
    };
  };

  const stats = calculateStats();

  return (
    <div>
      <Text strong style={{ fontSize: '14px', marginBottom: '12px', display: 'block' }}>
        每日步数分析
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
          <Text strong>平均每日步数：</Text>{stats.avgSteps}步 (目标完成率 {stats.completionRate}%)<br/>
          <Text strong>最活跃的一天：</Text>{stats.maxStepsDay.date} ({stats.maxStepsDay.steps}步)
        </Paragraph>
      </div>
    </div>
  );
};

export default ActivityAnalysis; 