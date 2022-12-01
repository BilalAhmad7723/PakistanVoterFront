import { React } from "react";
import { Container } from "react-bootstrap";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function NoMatch() {
  const history = useHistory();
  const Middle = {
    padding: `6em 0`,
    background: `aliceblue`
  };

  const back = () => {
    history.push("/app/mail");
  };
  return (
    <Container fluid>
      <div style={Middle}>
      <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={back}>Back Home</Button>} />

      </div>
    </Container>
  );
}
