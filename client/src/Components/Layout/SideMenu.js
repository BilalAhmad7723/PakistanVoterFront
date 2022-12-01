import React, { useState } from "react";

import { Layout, Menu } from "antd";
import {
  DatabaseOutlined,
  PieChartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = (collapsed) => setCollapsed(collapsed);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/dashboard" icon={<PieChartOutlined />}>
          <span>Dashboard</span>
          <Link to="/app"></Link>
        </Menu.Item>
        <Menu.Item key="/member" icon={<DatabaseOutlined />}>
          <span>Member</span>
          <Link to="/app/member" />
        </Menu.Item>
        <Menu.Item key="/candidate" icon={<UserOutlined />}>
          <span>Candidate</span>
          <Link to="/app/candidate" />
        </Menu.Item>
        {/* <Menu.Item key="/mail" icon={<MailOutlined />}>
          <span>Email</span>
          <Link to="/app/mail" />
        </Menu.Item> */}
      </Menu>
    </Sider>
  );
};

export default App;
