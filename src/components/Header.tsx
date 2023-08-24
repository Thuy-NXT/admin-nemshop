import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, MenuProps, Row, Space, Typography, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
const { Text } = Typography;

const { Header } = Layout;
export default function HeaderComponent() {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <Text
          className="text-black"
          onClick={() => {
            // dispatch(UserLogout());
            message.success('Logout success!');
            navigate('/login');
          }}>
          {<LogoutOutlined style={{ marginRight: 4 }} />}
          Đăng xuất
        </Text>
      ),
    },
  ];
  return (
    <Header>
      <Row className="h-full justify-end items-center">
        <Button
          title="Mục tiêu"
          className="text-white text-[25px] text-center flex items-center justify-center mr-6  "
        />
        <Dropdown menu={{ items }}>
          <Space>
            <DownOutlined style={{ color: 'white', marginLeft: '5px' }} />
          </Space>
        </Dropdown>
      </Row>
    </Header>
  );
}
