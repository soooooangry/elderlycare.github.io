import React from 'react';
import { Table, Typography } from 'antd';

const { Text } = Typography;

const VitalsTable = ({ stats }) => {
  const columns = [
    {
      title: '指标名称',
      dataIndex: 'indicator',
      key: 'indicator',
      width: '25%',
      render: text => <Text strong>{text}</Text>
    },
    {
      title: '平均值',
      dataIndex: 'average',
      key: 'average',
      width: '20%',
      align: 'center'
    },
    {
      title: '最大值',
      dataIndex: 'maximum',
      key: 'maximum',
      width: '20%',
      align: 'center'
    },
    {
      title: '最小值',
      dataIndex: 'minimum',
      key: 'minimum',
      width: '20%',
      align: 'center'
    },
    {
      title: '异常次数',
      dataIndex: 'abnormal',
      key: 'abnormal',
      width: '15%',
      align: 'center',
      render: (value) => (
        <Text style={{ color: value > 0 ? '#ff4d4f' : '#52c41a' }}>
          {value}
        </Text>
      )
    }
  ];

  const dataSource = [
    {
      key: '1',
      indicator: '心率 (次/分)',
      average: stats.heartRate.avg,
      maximum: stats.heartRate.max,
      minimum: stats.heartRate.min,
      abnormal: stats.heartRate.abnormal
    },
    {
      key: '2',
      indicator: '血压 (mmHg)',
      average: `${stats.bloodPressure.avgSystolic}/${stats.bloodPressure.avgDiastolic}`,
      maximum: `${stats.bloodPressure.maxSystolic}/-`,
      minimum: `${stats.bloodPressure.minSystolic}/-`,
      abnormal: stats.bloodPressure.abnormal
    },
    {
      key: '3',
      indicator: '血氧饱和度 (%)',
      average: stats.oxygenSaturation.avg,
      maximum: stats.oxygenSaturation.max,
      minimum: stats.oxygenSaturation.min,
      abnormal: stats.oxygenSaturation.abnormal
    }
  ];

  return (
    <Table 
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
      bordered
      style={{ fontSize: '12px' }}
    />
  );
};

export default VitalsTable; 