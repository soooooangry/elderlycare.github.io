import React from 'react';
import { Card, Form, Input, InputNumber, Select, Button, Row, Col, Typography, Divider } from 'antd';
import { 
  UserOutlined, 
  HeartOutlined, 
  ContactsOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ProfileManagement = ({ data, onChange }) => {
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

  const chronicDiseaseOptions = [
    '高血压',
    '糖尿病',
    '冠心病',
    '脑卒中',
    '慢性阻塞性肺病',
    '骨质疏松',
    '关节炎',
    '老年痴呆',
    '帕金森病',
    '慢性肾病'
  ];

  return (
    <div style={{ maxWidth: '800px' }}>
      <Form
        form={form}
        layout="vertical"
        onFieldsChange={handleFormChange}
        initialValues={data}
      >
        {/* 基础信息 */}
        <Card 
          title={
            <span>
              <UserOutlined style={{ color: '#1890ff', marginRight: '8px' }} />
              基础信息
            </span>
          }
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={8}>
              <Form.Item
                label="姓名"
                name={['basicInfo', 'name']}
              >
                <Input disabled />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                label="年龄"
                name={['basicInfo', 'age']}
              >
                <InputNumber 
                  disabled 
                  style={{ width: '100%' }}
                  addonAfter="岁"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item
                label="性别"
                name={['basicInfo', 'gender']}
              >
                <Select disabled>
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="身高"
                name={['basicInfo', 'height']}
                rules={[
                  { required: true, message: '请输入身高' },
                  { type: 'number', min: 100, max: 220, message: '身高范围：100-220cm' }
                ]}
              >
                <InputNumber 
                  style={{ width: '100%' }}
                  addonAfter="cm"
                  min={100}
                  max={220}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item
                label="体重"
                name={['basicInfo', 'weight']}
                rules={[
                  { required: true, message: '请输入体重' },
                  { type: 'number', min: 30, max: 200, message: '体重范围：30-200kg' }
                ]}
              >
                <InputNumber 
                  style={{ width: '100%' }}
                  addonAfter="kg"
                  min={30}
                  max={200}
                  step={0.1}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 健康档案 */}
        <Card 
          title={
            <span>
              <HeartOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
              健康档案
            </span>
          }
          style={{ marginBottom: '24px' }}
        >
          <Row gutter={[24, 16]}>
            <Col span={24}>
              <Form.Item
                label="慢性病史"
                name={['healthProfile', 'chronicDiseases']}
                help="可选择多个慢性病或手动输入新的病症"
              >
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="请选择或输入慢性病"
                  tokenSeparators={[',']}
                >
                  {chronicDiseaseOptions.map(disease => (
                    <Option key={disease} value={disease}>
                      {disease}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="过敏史"
                name={['healthProfile', 'allergies']}
                help="请详细记录药物、食物或其他过敏源"
              >
                <TextArea
                  rows={4}
                  placeholder="请输入过敏史信息，如：青霉素过敏、海鲜过敏等"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* 紧急联系人 */}
        <Card 
          title={
            <span>
              <ContactsOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              紧急联系人
            </span>
          }
        >
          <Form.List name={['emergencyContacts']}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ 
                    marginBottom: '24px',
                    padding: '16px',
                    border: '1px solid #f0f0f0',
                    borderRadius: '8px',
                    position: 'relative'
                  }}>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          label="联系人姓名"
                          rules={[{ required: true, message: '请输入联系人姓名' }]}
                        >
                          <Input placeholder="请输入姓名" />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'relationship']}
                          label="关系"
                          rules={[{ required: true, message: '请输入关系' }]}
                        >
                          <Select placeholder="请选择关系">
                            <Option value="子女">子女</Option>
                            <Option value="配偶">配偶</Option>
                            <Option value="兄弟姐妹">兄弟姐妹</Option>
                            <Option value="朋友">朋友</Option>
                            <Option value="邻居">邻居</Option>
                            <Option value="其他">其他</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={8}>
                        <Form.Item
                          {...restField}
                          name={[name, 'phone']}
                          label="电话号码"
                          rules={[
                            { required: true, message: '请输入电话号码' },
                            { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
                          ]}
                        >
                          <Input placeholder="请输入电话号码" />
                        </Form.Item>
                      </Col>
                    </Row>

                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        style={{ 
                          position: 'absolute',
                          top: '8px',
                          right: '8px'
                        }}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  添加紧急联系人
                </Button>
              </>
            )}
          </Form.List>
        </Card>
      </Form>
    </div>
  );
};

export default ProfileManagement; 