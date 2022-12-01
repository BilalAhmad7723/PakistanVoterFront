import React from "react";
import { Row, Col } from "react-bootstrap";
import {  Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Link } from "react-router-dom";
function Header(props) {
  const menu = (
    <Menu>
      <Link to="/">
      <Menu.Item key="1">admin@admin.com</Menu.Item>
      <Menu.Item key="2">logout</Menu.Item>
      </Link>
    </Menu>
  );
  return ( 
      <Layout.Header className="site-layout-background">
        <Row>
          <Col><span style={{color: `green`,fontWeight:"bold"}}>Pakistan Voters Front</span></Col>
          <Col className="text-end" >
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button
              className="rounded-circle ms-auto"
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Col>
        </Row>
      </Layout.Header>   
  );
}

export default Header;
