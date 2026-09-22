import { Row, Col } from "react-bootstrap";
import { Button, Dropdown, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Header(props) {
  // Define items array instead of using <Menu> or <Menu.Item> children
  const menuItems = [
    {
      key: "1",
      label: <span className="text-muted">admin@admin.com</span>,
      disabled: true, // Typically email is informational, not clickable
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <Link to="/">Logout</Link>,
    },
  ];

  return (
    <Layout.Header className="site-layout-background">
      <Row className="align-items-center">
        <Col>
          <span style={{ color: "green", fontWeight: "bold" }}>
            Pakistan Voters Front
          </span>
        </Col>
        <Col className="text-end">
          {/* AntD v5 uses menu={{ items }} and dropdownPlacement instead of placement/overlay */}
          <Dropdown
            menu={{ items: menuItems }}
            placement="bottom"
            trigger={["click"]}
          >
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