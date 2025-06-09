import React from 'react';
import { Card } from 'antd';
import ReactECharts from 'echarts-for-react';

const VitalsCard = ({ title, current, unit, data, icon, color }) => {
  const getSparklineOption = () => {
    return {
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.time),
        show: false
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: data.map(item => {
          if (item.systolic !== undefined) {
            return item.systolic; // 对于血压，显示收缩压
          }
          return item.value;
        }),
        type: 'line',
        smooth: true,
        lineStyle: {
          color: color,
          width: 2
        },
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: color + '40'
            }, {
              offset: 1, color: color + '10'
            }]
          }
        }
      }]
    };
  };

  return (
    <Card 
      className="vital-card"
      style={{ 
        textAlign: 'center',
        borderColor: color + '40',
        height: '140px'
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
        <span style={{ color: color, marginRight: '8px' }}>
          {icon}
        </span>
        <span style={{ fontSize: '14px', color: '#666' }}>{title}</span>
      </div>
      
      <div className="vital-value" style={{ color: color, marginBottom: '8px' }}>
        {current}
        <span className="vital-unit">{unit}</span>
      </div>

      <div className="vital-trend" style={{ height: '40px' }}>
        <ReactECharts 
          option={getSparklineOption()} 
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </Card>
  );
};

export default VitalsCard; 