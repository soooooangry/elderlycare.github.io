import React from 'react';
import { Card, Table, Checkbox, Typography, Alert, Divider } from 'antd';
import { 
  NotificationOutlined, 
  MessageOutlined, 
  MobileOutlined, 
  PhoneOutlined,
  ExclamationCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const NotificationPreferences = ({ data, onChange }) => {
  const handleNotificationChange = (level, channel, checked) => {
    const newData = {
      ...data,
      [level]: {
        ...data[level],
        [channel]: checked
      }
    };
    onChange(newData);
  };

  const columns = [
    {
      title: '警报级别',
      dataIndex: 'level',
      key: 'level',
      width: '25%',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record.icon}
          <div style={{ marginLeft: '8px' }}>
            <div style={{ fontWeight: 'bold', color: record.color }}>
              {record.name}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
              {record.description}
            </div>
          </div>
        </div>
      )
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <NotificationOutlined style={{ marginBottom: '4px' }} />
          <br />
          系统内通知
          <br />
          <Text type="secondary" style={{ fontSize: '10px' }}>
            (对护理人员)
          </Text>
        </div>
      ),
      dataIndex: 'system',
      key: 'system',
      width: '18.75%',
      align: 'center',
      render: (_, record) => (
        <Checkbox
          checked={data[record.key]?.system || false}
          onChange={(e) => handleNotificationChange(record.key, 'system', e.target.checked)}
        />
      )
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <MessageOutlined style={{ marginBottom: '4px' }} />
          <br />
          短信通知
          <br />
          <Text type="secondary" style={{ fontSize: '10px' }}>
            (对主要联系人)
          </Text>
        </div>
      ),
      dataIndex: 'sms',
      key: 'sms',
      width: '18.75%',
      align: 'center',
      render: (_, record) => (
        <Checkbox
          checked={data[record.key]?.sms || false}
          onChange={(e) => handleNotificationChange(record.key, 'sms', e.target.checked)}
        />
      )
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <MobileOutlined style={{ marginBottom: '4px' }} />
          <br />
          App推送
          <br />
          <Text type="secondary" style={{ fontSize: '10px' }}>
            (对主要联系人)
          </Text>
        </div>
      ),
      dataIndex: 'push',
      key: 'push',
      width: '18.75%',
      align: 'center',
      render: (_, record) => (
        <Checkbox
          checked={data[record.key]?.push || false}
          onChange={(e) => handleNotificationChange(record.key, 'push', e.target.checked)}
        />
      )
    },
    {
      title: (
        <div style={{ textAlign: 'center' }}>
          <PhoneOutlined style={{ marginBottom: '4px' }} />
          <br />
          自动语音电话
          <br />
          <Text type="secondary" style={{ fontSize: '10px' }}>
            (对紧急联系人)
          </Text>
        </div>
      ),
      dataIndex: 'call',
      key: 'call',
      width: '18.75%',
      align: 'center',
      render: (_, record) => (
        <Checkbox
          checked={data[record.key]?.call || false}
          onChange={(e) => handleNotificationChange(record.key, 'call', e.target.checked)}
          disabled={record.key !== 'emergency'} // 只有紧急警报支持语音电话
        />
      )
    }
  ];

  const dataSource = [
    {
      key: 'emergency',
      name: '紧急警报',
      description: '跌倒、危急生命体征等',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '18px' }} />,
      color: '#ff4d4f'
    },
    {
      key: 'moderate',
      name: '中度警报', 
      description: '血压持续偏高、心率异常等',
      icon: <WarningOutlined style={{ color: '#faad14', fontSize: '18px' }} />,
      color: '#faad14'
    },
    {
      key: 'low',
      name: '低度提醒',
      description: '用药提醒、久坐提醒等',
      icon: <InfoCircleOutlined style={{ color: '#1890ff', fontSize: '18px' }} />,
      color: '#1890ff'
    }
  ];

  return (
    <div style={{ maxWidth: '900px' }}>
      <Card 
        title={
          <span>
            <NotificationOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
            通知偏好设置
          </span>
        }
      >
        <Alert
          message="通知规则说明"
          description="请根据不同警报级别选择相应的通知方式。系统将根据设置的规则自动发送通知给相关人员。"
          type="info"
          showIcon
          style={{ marginBottom: '24px' }}
        />

        <Title level={5} style={{ marginBottom: '16px' }}>
          通知规则矩阵
        </Title>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          size="middle"
          style={{ marginBottom: '24px' }}
        />

        <Divider />

        <div style={{ marginTop: '16px' }}>
          <Title level={5} style={{ marginBottom: '12px' }}>
            通知方式说明
          </Title>
          <div style={{ color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
            <p><strong>系统内通知：</strong> 在系统界面显示警报信息，护理人员登录时可查看</p>
            <p><strong>短信通知：</strong> 向主要联系人发送短信警报</p>
            <p><strong>App推送：</strong> 通过手机应用向主要联系人推送通知</p>
            <p><strong>自动语音电话：</strong> 仅限紧急情况，系统自动拨打电话给紧急联系人</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotificationPreferences; 