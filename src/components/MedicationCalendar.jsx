import React from 'react';
import { Card, Calendar, Badge, Typography } from 'antd';
import dayjs from 'dayjs';

const { Text } = Typography;

const MedicationCalendar = ({ medicationData }) => {
  const getMedicationStatus = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayData = medicationData.adherence.find(item => item.date === dateStr);
    return dayData ? dayData.status : null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'full': return 'success';
      case 'partial': return 'warning';
      case 'missed': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'full': return '按时服用';
      case 'partial': return '部分服用';
      case 'missed': return '未服用';
      default: return '';
    }
  };

  const dateCellRender = (value) => {
    const status = getMedicationStatus(value);
    if (!status) return null;

    return (
      <div style={{ textAlign: 'center' }}>
        <Badge 
          status={getStatusColor(status)}
          text=""
        />
      </div>
    );
  };

  const calculateStats = () => {
    const total = medicationData.adherence.length;
    const full = medicationData.adherence.filter(item => item.status === 'full').length;
    const partial = medicationData.adherence.filter(item => item.status === 'partial').length;
    const missed = medicationData.adherence.filter(item => item.status === 'missed').length;

    return {
      total,
      full,
      partial,
      missed,
      adherenceRate: ((full + partial * 0.5) / total * 100).toFixed(1)
    };
  };

  const stats = calculateStats();

  return (
    <Card 
      title="用药依从性追踪" 
      style={{ height: '400px' }}
      extra={
        <Text type="secondary">
          依从率: {stats.adherenceRate}%
        </Text>
      }
    >
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <Badge status="success" text="按时服用" />
            <div style={{ marginTop: '2px' }}>{stats.full}天</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge status="warning" text="部分服用" />
            <div style={{ marginTop: '2px' }}>{stats.partial}天</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Badge status="error" text="未服用" />
            <div style={{ marginTop: '2px' }}>{stats.missed}天</div>
          </div>
        </div>
      </div>
      
      <Calendar
        fullscreen={false}
        dateCellRender={dateCellRender}
        mode="month"
        value={dayjs()}
        style={{ height: '280px' }}
      />
    </Card>
  );
};

export default MedicationCalendar; 