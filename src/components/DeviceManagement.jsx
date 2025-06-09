import React, { useState } from 'react';
import { Card, List, Button, Badge, Progress, Modal, Select, Input, message, Typography, Row, Col, Popconfirm } from 'antd';
import { 
  TabletOutlined, 
  HeartOutlined, 
  PlusOutlined, 
  WifiOutlined,
  ThunderboltOutlined,
  DisconnectOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const DeviceManagement = ({ data, onChange }) => {
  const [addDeviceVisible, setAddDeviceVisible] = useState(false);
  const [newDeviceForm, setNewDeviceForm] = useState({
    type: '',
    name: '',
    model: ''
  });

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'smartwatch':
        return <TabletOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      case 'bloodpressure':
        return <HeartOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />;
      case 'thermometer':
        return <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />;
      default:
        return <TabletOutlined style={{ fontSize: '24px', color: '#666' }} />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return <Badge status="success" text="已连接" />;
      case 'disconnected':
        return <Badge status="error" text="已断开" />;
      case 'connecting':
        return <Badge status="processing" text="连接中" />;
      default:
        return <Badge status="default" text="未知" />;
    }
  };

  const handleUnbindDevice = (deviceId) => {
    const newDevices = data.filter(device => device.id !== deviceId);
    onChange(newDevices);
    message.success('设备已解除绑定');
  };

  const handleAddDevice = () => {
    if (!newDeviceForm.type || !newDeviceForm.name) {
      message.error('请填写完整的设备信息');
      return;
    }

    const newDevice = {
      id: Date.now().toString(),
      name: newDeviceForm.name,
      type: newDeviceForm.type,
      status: 'connecting',
      battery: newDeviceForm.type === 'smartwatch' ? Math.floor(Math.random() * 50) + 50 : null
    };

    // 模拟连接过程
    setTimeout(() => {
      newDevice.status = 'connected';
      const newDevices = [...data, newDevice];
      onChange(newDevices);
      message.success('设备添加成功');
    }, 2000);

    const newDevices = [...data, newDevice];
    onChange(newDevices);
    
    setAddDeviceVisible(false);
    setNewDeviceForm({ type: '', name: '', model: '' });
  };

  const deviceTypes = [
    { value: 'smartwatch', label: '智能手表' },
    { value: 'bloodpressure', label: '血压计' },
    { value: 'thermometer', label: '体温计' },
    { value: 'glucometer', label: '血糖仪' }
  ];

  return (
    <div style={{ maxWidth: '800px' }}>
      <Card 
        title={
          <span>
            <WifiOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
            连接与设备管理
          </span>
        }
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setAddDeviceVisible(true)}
          >
            添加新设备
          </Button>
        }
      >
        <Title level={5} style={{ marginBottom: '16px' }}>
          已连接设备 ({data.length})
        </Title>

        <List
          dataSource={data}
          renderItem={device => (
            <List.Item
              actions={[
                <Popconfirm
                  title="确定要解除绑定此设备吗？"
                  onConfirm={() => handleUnbindDevice(device.id)}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button 
                    type="text" 
                    danger 
                    icon={<DisconnectOutlined />}
                  >
                    解除绑定
                  </Button>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                avatar={getDeviceIcon(device.type)}
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: 'bold' }}>{device.name}</span>
                    {getStatusBadge(device.status)}
                  </div>
                }
                description={
                  <div>
                    <div style={{ marginBottom: '8px' }}>
                      <Text type="secondary">设备类型: {deviceTypes.find(t => t.value === device.type)?.label}</Text>
                    </div>
                    {device.battery !== null && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ThunderboltOutlined style={{ color: device.battery > 20 ? '#52c41a' : '#ff4d4f' }} />
                        <Progress 
                          percent={device.battery} 
                          size="small" 
                          style={{ width: '100px' }}
                          strokeColor={device.battery > 20 ? '#52c41a' : '#ff4d4f'}
                        />
                        <Text style={{ fontSize: '12px' }}>{device.battery}%</Text>
                      </div>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
          locale={{ emptyText: '暂无已连接设备' }}
        />
      </Card>

      {/* 添加设备模态框 */}
      <Modal
        title="添加新设备"
        open={addDeviceVisible}
        onOk={handleAddDevice}
        onCancel={() => {
          setAddDeviceVisible(false);
          setNewDeviceForm({ type: '', name: '', model: '' });
        }}
        okText="添加设备"
        cancelText="取消"
      >
        <div style={{ padding: '16px 0' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                设备类型 *
              </label>
              <Select
                style={{ width: '100%' }}
                placeholder="请选择设备类型"
                value={newDeviceForm.type}
                onChange={(value) => setNewDeviceForm(prev => ({ ...prev, type: value }))}
              >
                {deviceTypes.map(type => (
                  <Option key={type.value} value={type.value}>
                    {type.label}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col span={24}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                设备名称 *
              </label>
              <Input
                placeholder="请输入设备名称，如：华为智能手表 GT 3"
                value={newDeviceForm.name}
                onChange={(e) => setNewDeviceForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </Col>

            <Col span={24}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                设备型号（可选）
              </label>
              <Input
                placeholder="请输入设备型号"
                value={newDeviceForm.model}
                onChange={(e) => setNewDeviceForm(prev => ({ ...prev, model: e.target.value }))}
              />
            </Col>
          </Row>

          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: '6px'
          }}>
            <Text style={{ fontSize: '14px', color: '#52c41a' }}>
              <CheckCircleOutlined style={{ marginRight: '8px' }} />
              添加设备后，请按照设备说明书进行配对连接
            </Text>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeviceManagement; 