import React from 'react';
import { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UsergroupAddOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Define navigation items as an array of objects
  const menuItems = [
    {
      key: "/app",
      icon: <PieChartOutlined />,
      label: <Link to="/app">Dashboard</Link>,
    },
    {
      key: "/app/member",
      icon: <UsergroupAddOutlined />,
      label: <Link to="/app/member">Member</Link>,
    },
    {
      key: "/app/candidate",
      icon: <UserOutlined />,
      label: <Link to="/app/candidate">Candidate</Link>,
    },
    /* {
      key: "/app/mail",
      icon: <MailOutlined />,
      label: <Link to="/app/mail">Email</Link>,
    }, */
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default App;