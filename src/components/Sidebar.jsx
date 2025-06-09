import React, { useState } from 'react';
import { Layout, Card, Avatar, Input, Menu, Space, Typography } from 'antd';
import { 
  SearchOutlined, 
  DashboardOutlined, 
  FileTextOutlined, 
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ patients, selectedPatientId, onPatientSelect, currentView, onViewChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    switch (status) {
      case 'normal': return 'status-normal';
      case 'warning': return 'status-warning';
      case 'danger': return 'status-danger';
      default: return 'status-normal';
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表板',
    },
    {
      key: 'reports',
      icon: <FileTextOutlined />,
      label: '健康报告',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  return (
    <Sider 
      width={320} 
      style={{ 
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
        height: '100vh',
        overflow: 'auto'
      }}
    >
      <div style={{ padding: '16px' }}>
        <Text strong style={{ fontSize: '16px', marginBottom: '16px', display: 'block' }}>
          个案列表
        </Text>
        
        <Input
          placeholder="搜索个案..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '16px' }}
          allowClear
        />

        <div style={{ marginBottom: '24px' }}>
          {filteredPatients.map(patient => (
            <Card
              key={patient.id}
              className={`patient-card ${selectedPatientId === patient.id ? 'selected' : ''}`}
              size="small"
              style={{ 
                marginBottom: '8px',
                border: selectedPatientId === patient.id ? '2px solid #1890ff' : '1px solid #d9d9d9'
              }}
              onClick={() => onPatientSelect(patient.id)}
              hoverable
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={patient.avatar} 
                  icon={<UserOutlined />}
                  size={40}
                  style={{ marginRight: '12px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <span className={`status-indicator ${getStatusClass(patient.status)}`}></span>
                    <Text strong>{patient.name}</Text>
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {patient.age}岁 · {patient.gender}
                  </Text>
                  {patient.alerts && patient.alerts.length > 0 && (
                    <div style={{ marginTop: '4px' }}>
                      <Text type="danger" style={{ fontSize: '11px' }}>
                        {patient.alerts.length}个警报
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Menu
          mode="inline"
          selectedKeys={[currentView]}
          items={menuItems}
          onClick={({ key }) => onViewChange(key)}
          style={{ border: 'none' }}
        />
      </div>
    </Sider>
  );
};

export default Sidebar; 