import { React } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../Login/login.scss";
import { useHistory } from "react-router-dom";
//import http from "../apiConfig";
import logo from "../../Assets/rs.png";
import { message } from "antd";

export default function Login() {


  // const Notifymsg = (msg) => {
  //   message.success(msg);
  // };
  // const Notifyerrormsg = (msg) => {
  //   message.error(msg);
  // };

  // const login_back = (token) => {
  //   let authen = { token: token };
  //   http
  //     .post("/authentication", authen)
  //     .then((res) => {
  //       let _token = sessionStorage.getItem("access_token");
  //       let data = res.data;
  //       let b_token = data.token.token;
  //       let msg = data.msg;
  //       if (_token === b_token) {
  //         Notifymsg(msg);
  //         history.push("/app");
  //       } else {
  //         sessionStorage.removeItem("access_token");
  //         Notifyerrormsg("Invalid User!!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.email === "admin@admin.com" && data.password === "admin") {
      message.success("Login Successfully!!!");
      history.push("/app");
    } else {
      message.error("Invalid Email & Password!!!");
    }
  };
  const errormsg = {
    fontSize: `11px`,
    color: `red`,
    marginLeft: `10px`,
    fontWeight: `700`,
  };
  return (
    <section className="ftco-section">
      <Container fluid>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
          <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="login-wrap p-0">
              <h3 className="mb-4 text-center">Have an account?</h3>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    style={{ borderRadius: `14px` }}
                    {...register("email", { required: true })}
                  />
                  <Form.Text
                    className="text-muted"
                    style={{ marginLeft: `10px` }}
                  >
                    We'll never share your email with anyone else.
                  </Form.Text>
                  {errors.email && (
                    <span style={errormsg}>This field is required</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    style={{ borderRadius: `14px` }}
                    {...register("password", { required: true })}
                  />{" "}
                  {errors.password && (
                    <span style={errormsg}>This field is required</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button
                    variant="success"
                    className="form-control btn btn-success submit px-3"
                    type="submit"
                    style={{ borderRadius: `10px` }}
                  >
                    Login
                  </Button>
                </Form.Group>

               
                {/* <Form.Group className="mb-3" controlId="formRemem">
                  <Row>
                    <Col>
                      {" "}
                      <Form.Check
                        type="checkbox"
                        {...register("rme")}
                        label="Remember Me"
                      />
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      {" "}
                      <a href="/#">Forgot Password</a>
                    </Col>
                  </Row>
                </Form.Group> */}
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
