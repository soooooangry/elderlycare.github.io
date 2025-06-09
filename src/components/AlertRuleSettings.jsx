import React from 'react';
import { Card, Form, Switch, InputNumber, Slider, Row, Col, Typography, Divider } from 'antd';
import { 
  HeartOutlined, 
  RocketOutlined, 
  WarningOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const AlertRuleSettings = ({ data, onChange }) => {
  const [form] = Form.useForm();

  const handleFormChange = (changedFields, allFields) => {
    const formData = form.getFieldsValue();
    onChange(formData);
  };

  React.useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <div style={{ maxWidth: '800px' }}>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={handleFormChange}
        initialValues={data}
      >
        {/* 生命体征阈值设置 */}
        <Card 
          title={
            <span>
              <HeartOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
              生命体征阈值设置
            </span>
          }
          style={{ marginBottom: '24px' }}
        >
          {/* 心率设置 */}
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Form.Item
                  name={['vitals', 'heartRate', 'enabled']}
                  valuePropName="checked"
                  style={{ margin: 0, marginRight: '12px' }}
                >
                  <Switch />
                </Form.Item>
                <Title level={5} style={{ margin: 0 }}>
                  心率警报 (BPM)
                </Title>
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="最低阈值"
                name={['vitals', 'heartRate', 'minThreshold']}
              >
                <InputNumber
                  min={30}
                  max={100}
                  style={{ width: '100%' }}
                  addonAfter="BPM"
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="最高阈值"
                name={['vitals', 'heartRate', 'maxThreshold']}
              >
                <InputNumber
                  min={80}
                  max={200}
                  style={{ width: '100%' }}
                  addonAfter="BPM"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* 血压设置 */}
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Form.Item
                  name={['vitals', 'bloodPressure', 'enabled']}
                  valuePropName="checked"
                  style={{ margin: 0, marginRight: '12px' }}
                >
                  <Switch />
                </Form.Item>
                <Title level={5} style={{ margin: 0 }}>
                  血压警报 (mmHg)
                </Title>
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="收缩压范围"
                name={['vitals', 'bloodPressure', 'systolicRange']}
              >
                <Slider
                  range
                  min={80}
                  max={180}
                  marks={{
                    90: '90',
                    120: '120',
                    140: '140',
                    160: '160'
                  }}
                  tooltip={{ formatter: (value) => `${value} mmHg` }}
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="舒张压范围"
                name={['vitals', 'bloodPressure', 'diastolicRange']}
              >
                <Slider
                  range
                  min={50}
                  max={110}
                  marks={{
                    60: '60',
                    80: '80',
                    90: '90',
                    100: '100'
                  }}
                  tooltip={{ formatter: (value) => `${value} mmHg` }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* 血氧设置 */}
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Form.Item
                  name={['vitals', 'oxygenSaturation', 'enabled']}
                  valuePropName="checked"
                  style={{ margin: 0, marginRight: '12px' }}
                >
                  <Switch />
                </Form.Item>
                <Title level={5} style={{ margin: 0 }}>
                  血氧饱和度警报 (%)
                </Title>
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="最低阈值"
                name={['vitals', 'oxygenSaturation', 'minThreshold']}
              >
                <InputNumber
                  min={85}
                  max={98}
                  style={{ width: '100%' }}
                  addonAfter="%"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 活动与跌倒监测 */}
        <Card 
          title={
            <span>
              <RocketOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              活动与跌倒监测
            </span>
          }
        >
          {/* 长时间静止监测 */}
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Form.Item
                  name={['activity', 'inactivity', 'enabled']}
                  valuePropName="checked"
                  style={{ margin: 0, marginRight: '12px' }}
                >
                  <Switch />
                </Form.Item>
                <Title level={5} style={{ margin: 0 }}>
                  <WarningOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                  长时间静止警报
                </Title>
              </div>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="静止时长"
                name={['activity', 'inactivity', 'duration']}
                help="超过此时长未检测到活动将触发警报"
              >
                <InputNumber
                  min={30}
                  max={300}
                  step={15}
                  style={{ width: '100%' }}
                  addonAfter="分钟"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* 跌倒监测 */}
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Form.Item
                  name={['activity', 'fall', 'enabled']}
                  valuePropName="checked"
                  style={{ margin: 0, marginRight: '12px' }}
                >
                  <Switch />
                </Form.Item>
                <Title level={5} style={{ margin: 0 }}>
                  <ThunderboltOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
                  跌倒监测警报
                </Title>
              </div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                需要兼容的智能设备支持（如智能手表、传感器等）
              </Text>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default AlertRuleSettings; 