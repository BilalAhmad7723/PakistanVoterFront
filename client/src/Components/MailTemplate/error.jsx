import { React } from "react";
import { Container } from "react-bootstrap";
import { Result, Button, Typography } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
const { Paragraph, Text } = Typography;

export default function ErrorPage() {

  const history = useHistory();
  const Middle = {
    padding: `13em 0`,
    background: `aliceblue`
  };
  const back = () => {
    history.push("/app/mail");
  };
  return (
    <Container fluid>
      <div style={Middle}>
        <Result
          status="error"
          title="Submission Failed"
          subTitle="Please check and modify the following information before resubmitting."
          extra={[<Button key="Back" onClick={() => back()}>Back Again</Button>]}
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                The content you submitted has the following error:
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              May be internet discount. <a href="#/">Check Internet &gt;</a>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              May be you enter wrong mail address.{" "}
              <a href="#/">Check Email Address &gt;</a>
            </Paragraph>
          </div>
        </Result>
      </div>
    </Container>
  );
}
