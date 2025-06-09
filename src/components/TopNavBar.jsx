import React, { useState } from 'react';
import { Layout, Input, Badge, Avatar, Dropdown, Button, Space } from 'antd';
import { 
  SearchOutlined, 
  BellOutlined, 
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  HeartOutlined
} from '@ant-design/icons';

const { Header } = Layout;

const TopNavBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const userMenuItems = [
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      danger: true,
    },
  ];

  const alertItems = [
    {
      key: '1',
      label: (
        <div style={{ width: 300, padding: '8px 0' }}>
          <div style={{ fontWeight: 'bold', color: '#ff4d4f' }}>陈奶奶 - 心率过速</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            10:15 - 心率达到110次/分钟，需要立即关注
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ width: 300, padding: '8px 0' }}>
          <div style={{ fontWeight: 'bold', color: '#faad14' }}>王爷爷 - 血压偏高</div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            08:30 - 血压150/95mmHg，建议调整用药
          </div>
        </div>
      ),
    },
  ];

  return (
    <Header style={{ 
      background: '#fff', 
      padding: '0 24px', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <HeartOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '12px' }} />
        <h1 style={{ 
          margin: 0, 
          fontSize: '20px', 
          fontWeight: 'bold',
          color: '#1890ff'
        }}>
          健康智能评估仪表板
        </h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          placeholder="搜索老年个案..."
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 250, marginRight: '24px' }}
          allowClear
        />

        <Space size="large">
          <Dropdown
            menu={{ items: alertItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <Badge count={2} size="small">
              <Button 
                type="text" 
                icon={<BellOutlined style={{ fontSize: '18px' }} />}
                style={{ border: 'none', boxShadow: 'none' }}
              />
            </Badge>
          </Dropdown>

          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
          >
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar 
                size="small" 
                icon={<UserOutlined />} 
                style={{ marginRight: '8px' }}
              />
              <span>护理员小王</span>
            </div>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default TopNavBar; 