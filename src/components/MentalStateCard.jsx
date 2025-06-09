import React from 'react';
import { Card, Row, Col, Progress, Typography } from 'antd';
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Text } = Typography;

const MentalStateCard = ({ mentalState }) => {
  const getEmotionChartOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}% ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['积极', '中性', '消极']
      },
      series: [
        {
          name: '情感分析',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['60%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { 
              value: mentalState.emotionAnalysis.positive, 
              name: '积极',
              itemStyle: { color: '#52c41a' }
            },
            { 
              value: mentalState.emotionAnalysis.neutral, 
              name: '中性',
              itemStyle: { color: '#faad14' }
            },
            { 
              value: mentalState.emotionAnalysis.negative, 
              name: '消极',
              itemStyle: { color: '#ff4d4f' }
            }
          ]
        }
      ]
    };
  };

  const getScoreColor = (score, maxScore, reverse = false) => {
    const percentage = (score / maxScore) * 100;
    if (reverse) {
      // 对于GDS，分数低是好的
      return percentage <= 25 ? '#52c41a' : percentage <= 50 ? '#faad14' : '#ff4d4f';
    } else {
      // 对于MMSE，分数高是好的
      return percentage >= 80 ? '#52c41a' : percentage >= 60 ? '#faad14' : '#ff4d4f';
    }
  };

  const getScoreStatus = (score, maxScore, reverse = false) => {
    const percentage = (score / maxScore) * 100;
    if (reverse) {
      return percentage <= 25 ? '良好' : percentage <= 50 ? '轻度' : '需关注';
    } else {
      return percentage >= 80 ? '正常' : percentage >= 60 ? '轻度下降' : '明显下降';
    }
  };

  return (
    <Card title="情绪与认知评估" style={{ height: '400px' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <Text strong>老年抑郁量表 (GDS)</Text>
            <div style={{ marginTop: '8px' }}>
              <span style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: getScoreColor(mentalState.gds.score, mentalState.gds.maxScore, true)
              }}>
                {mentalState.gds.score}
              </span>
              <span style={{ color: '#666' }}>/{mentalState.gds.maxScore}</span>
            </div>
            <Progress 
              percent={(mentalState.gds.score / mentalState.gds.maxScore) * 100}
              strokeColor={getScoreColor(mentalState.gds.score, mentalState.gds.maxScore, true)}
              showInfo={false}
              size="small"
            />
            <div style={{ marginTop: '4px' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {mentalState.gds.date} · {getScoreStatus(mentalState.gds.score, mentalState.gds.maxScore, true)}
              </Text>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Text strong>简易精神状态检查 (MMSE)</Text>
            <div style={{ marginTop: '8px' }}>
              <span style={{ 
                fontSize: '24px', 
                fontWeight: 'bold',
                color: getScoreColor(mentalState.mmse.score, mentalState.mmse.maxScore)
              }}>
                {mentalState.mmse.score}
              </span>
              <span style={{ color: '#666' }}>/{mentalState.mmse.maxScore}</span>
            </div>
            <Progress 
              percent={(mentalState.mmse.score / mentalState.mmse.maxScore) * 100}
              strokeColor={getScoreColor(mentalState.mmse.score, mentalState.mmse.maxScore)}
              showInfo={false}
              size="small"
            />
            <div style={{ marginTop: '4px' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                {mentalState.mmse.date} · {getScoreStatus(mentalState.mmse.score, mentalState.mmse.maxScore)}
              </Text>
            </div>
          </div>
        </Col>

        <Col span={12}>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <Text strong>对话情感分析</Text>
          </div>
          <ReactECharts 
            option={getEmotionChartOption()} 
            style={{ height: '250px', width: '100%' }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-around',
            marginTop: '8px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <SmileOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
              <div style={{ fontSize: '12px' }}>{mentalState.emotionAnalysis.positive}%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <MehOutlined style={{ color: '#faad14', fontSize: '16px' }} />
              <div style={{ fontSize: '12px' }}>{mentalState.emotionAnalysis.neutral}%</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FrownOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
              <div style={{ fontSize: '12px' }}>{mentalState.emotionAnalysis.negative}%</div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default MentalStateCard; 