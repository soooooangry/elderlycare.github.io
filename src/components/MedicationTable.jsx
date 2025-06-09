import React from 'react';
import { Table, Progress, Typography } from 'antd';

const { Text } = Typography;

const MedicationTable = ({ data }) => {
  const columns = [
    {
      title: '药品名称',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: text => <Text strong>{text}</Text>
    },
    {
      title: '规定剂量',
      dataIndex: 'dosage',
      key: 'dosage',
      width: '20%',
      align: 'center'
    },
    {
      title: '服用频率',
      dataIndex: 'frequency',
      key: 'frequency',
      width: '25%',
      align: 'center'
    },
    {
      title: '依从率',
      dataIndex: 'adherence',
      key: 'adherence',
      width: '25%',
      align: 'center',
      render: (value) => (
        <div>
          <Progress 
            percent={value} 
            size="small" 
            strokeColor={
              value >= 90 ? '#52c41a' : 
              value >= 80 ? '#faad14' : '#ff4d4f'
            }
            style={{ marginBottom: '4px' }}
          />
          <Text style={{ 
            fontSize: '12px',
            color: value >= 90 ? '#52c41a' : 
                   value >= 80 ? '#faad14' : '#ff4d4f'
          }}>
            {value}%
          </Text>
        </div>
      )
    }
  ];

  const dataSource = data.map((med, index) => ({
    key: index.toString(),
    ...med
  }));

  return (
    <Table 
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="small"
      bordered
    />
  );
};

export default MedicationTable; 