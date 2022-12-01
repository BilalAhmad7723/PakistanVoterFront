import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import SideMenu from "./SideMenu";
import Footer from "./Footer";

const { Content } = Layout;

const LayoutWithRoute = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu />
      <Layout className="site-layout">
        <Header {...children}/>
        <Content style={{ margin: "5px 5px" }}>{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default LayoutWithRoute;
