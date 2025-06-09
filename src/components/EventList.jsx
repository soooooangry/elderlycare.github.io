import React from 'react';
import { List, Tag, Typography, Empty } from 'antd';
import { 
  AlertOutlined, 
  FileTextOutlined, 
  ClockCircleOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

const EventList = ({ events }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case '健康警报':
        return <AlertOutlined style={{ color: '#ff4d4f' }} />;
      case '护理记录':
        return <FileTextOutlined style={{ color: '#1890ff' }} />;
      default:
        return <ClockCircleOutlined style={{ color: '#666' }} />;
    }
  };

  const getEventTag = (event) => {
    if (event.type === '健康警报') {
      const color = event.severity === 'danger' ? 'error' : 'warning';
      return <Tag color={color}>{event.type}</Tag>;
    }
    return <Tag color="blue">{event.type}</Tag>;
  };

  if (!events || events.length === 0) {
    return (
      <Empty 
        description="暂无重要健康事件记录" 
        style={{ margin: '40px 0' }}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <List
      dataSource={events}
      renderItem={event => (
        <List.Item style={{ 
          padding: '12px 0',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <List.Item.Meta
            avatar={getEventIcon(event.type)}
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Text strong>{event.date} {event.time}</Text>
                {getEventTag(event)}
              </div>
            }
            description={
              <div>
                <Text>{event.description}</Text>
                {event.author && (
                  <Text type="secondary" style={{ marginLeft: '8px', fontSize: '12px' }}>
                    - {event.author}
                  </Text>
                )}
              </div>
            }
          />
        </List.Item>
      )}
      style={{ maxHeight: '300px', overflowY: 'auto' }}
    />
  );
};

export default EventList; 