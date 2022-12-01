import { React } from "react";
import { Container } from "react-bootstrap";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function SuccessPage() {
  const history = useHistory();
  const Middle = {
    padding: `13em 0`,
    background: `aliceblue`
  };

  const back = () => {
    history.push("/app/mail");
  };
  const logout = () => {
    history.push("/");
  };
  return (
    <Container fluid>
      <div style={Middle}>
        <Result
          status="success"
          title="Successfully Send!"
          subTitle="Great Sol."
          extra={[
            <Button type="primary" key="console" onClick={() => logout()}>
              Go Logout
            </Button>,
            <Button key="Back" onClick={() => back()}>
              Back Again
            </Button>,
          ]}
        />
      </div>
    </Container>
  );
}
