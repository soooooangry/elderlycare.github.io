import React from 'react';
import { Card, Typography, Row, Col, Divider, Alert } from 'antd';
import { 
  RobotOutlined, 
  HeartOutlined, 
  TrophyOutlined, 
  MedicineBoxOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import VitalsChart from './VitalsChart';
import VitalsTable from './VitalsTable';
import ActivityAnalysis from './ActivityAnalysis';
import SleepAnalysis from './SleepAnalysis';
import MedicationTable from './MedicationTable';
import EventList from './EventList';

const { Title, Text, Paragraph } = Typography;

const ReportContainer = ({ patient, reportData }) => {
  return (
    <div className="report-container">
      <Card 
        style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          background: '#fff'
        }}
        bodyStyle={{ padding: '40px' }}
      >
        {/* 报告标题与摘要 */}
        <div className="report-header" style={{ marginBottom: '32px' }}>
          <Title level={1} style={{ textAlign: 'center', marginBottom: '8px' }}>
            {patient.name}的健康报告
          </Title>
          
          <Title level={2} style={{ 
            textAlign: 'center', 
            color: '#666', 
            fontWeight: 'normal',
            marginBottom: '24px'
          }}>
            报告期间：{reportData.period.start} - {reportData.period.end}
          </Title>

          <Alert
            icon={<RobotOutlined />}
            message="AI 智能摘要"
            description={
              <Paragraph style={{ margin: '8px 0 0 0', fontSize: '14px', lineHeight: '1.6' }}>
                {reportData.aiSummary}
              </Paragraph>
            }
            type="info"
            showIcon
            style={{ 
              backgroundColor: '#f0f9ff',
              border: '1px solid #91d5ff',
              borderRadius: '8px'
            }}
          />
        </div>

        <Divider />

        {/* 生命体征总览 */}
        <div className="vitals-overview" style={{ marginBottom: '32px' }}>
          <Title level={3} style={{ marginBottom: '16px' }}>
            <HeartOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
            生命体征趋势
          </Title>
          
          <VitalsChart data={reportData.vitalsTrend} />
          
          <div style={{ marginTop: '16px' }}>
            <VitalsTable stats={reportData.vitalsStats} />
          </div>
        </div>

        <Divider />

        {/* 活动与生活方式分析 */}
        <div className="lifestyle-analysis" style={{ marginBottom: '32px' }}>
          <Title level={3} style={{ marginBottom: '16px' }}>
            <TrophyOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
            活动与睡眠分析
          </Title>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <ActivityAnalysis data={reportData.activityData.dailySteps} />
            </Col>
            <Col xs={24} lg={12}>
              <SleepAnalysis data={reportData.activityData.sleepData} />
            </Col>
          </Row>
        </div>

        <Divider />

        {/* 用药记录 */}
        <div className="medication-log" style={{ marginBottom: '32px' }}>
          <Title level={3} style={{ marginBottom: '16px' }}>
            <MedicineBoxOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
            用药依从性
          </Title>
          
          <MedicationTable data={reportData.medicationData} />
        </div>

        <Divider />

        {/* 重大事件记录 */}
        <div className="significant-events" style={{ marginBottom: '32px' }}>
          <Title level={3} style={{ marginBottom: '16px' }}>
            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: '8px' }} />
            重要健康事件
          </Title>
          
          <EventList events={reportData.significantEvents} />
        </div>

        <Divider />

        {/* 报告页脚 */}
        <div className="report-footer" style={{ 
          textAlign: 'center', 
          color: '#666',
          fontSize: '12px',
          lineHeight: '1.6'
        }}>
          <p>
            <FileTextOutlined style={{ marginRight: '4px' }} />
            此报告由「老年人健康智能评估系统」生成 | 
            生成时间: {reportData.generatedAt}
          </p>
          <p style={{ marginTop: '8px' }}>
            免责声明：本报告数据仅供参考，不能替代专业的临床诊断和医疗建议。
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ReportContainer; 