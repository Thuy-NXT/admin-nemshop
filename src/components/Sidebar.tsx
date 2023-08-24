import { MenuOutlined, PieChartOutlined, UserOutlined, SkinFilled, DropboxCircleFilled } from '@ant-design/icons';
import { Avatar, Layout, Menu, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.css';
import admin from '../assets/images/admin.png';

const { Sider } = Layout;

const menuItems = [
  {
    key: '/dashboard',
    icon: <PieChartOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/account',
    icon: <UserOutlined />,
    label: 'Người dùng',
  },
  {
    key: '/collection',
    icon: <DropboxCircleFilled />,
    label: 'Bộ sưu tập',
  },

  {
    key: '/products',
    icon: <SkinFilled />,
    label: 'Sản phẩm',
  },

  {
    key: '/category',
    icon: <MenuOutlined />,
    label: 'Danh mục sản phẩm',
  },
];
export default function SiderbarComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathName, setPathName] = useState<string>('/');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setPathName(location.pathname);
  }, [location.pathname]);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}>
      <Row
        className="items-center cursor-pointer justify-center"
        style={{ margin: 10 }}
        onClick={() => navigate('/')}>
        <Avatar
          src={admin}
          size="large"
        />
      </Row>
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathName]}
        selectedKeys={[pathName]}
        mode="inline"
        items={menuItems}
        onClick={(info) => navigate(info.key)}
      />
    </Sider>
  );
}
