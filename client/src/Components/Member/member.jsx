import { React, useState, useEffect } from "react";
import http from "../../apiConfig";
//import { connect} from 'react-redux';
import { useForm } from "react-hook-form";
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import { LikeTwoTone, DislikeTwoTone } from "@ant-design/icons";
import { Empty, Spin } from "antd";
import { Popconfirm, message, Badge } from "antd";
//import { SetEmail } from "../../Store/action/action";
//import MaterialTable from "material-table";
function Account() {
  // const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [seldata, setseldata] = useState({});
  const [finaldata, setfinaldata] = useState();
  const { control, register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    if (data.email === "") data.email = seldata.email;
    if (data.password === "") data.password = seldata.password;
    setModalShow(false);
    onUpdate(data);
    reset();
  };

  const onUpdate = (data) => {
    http
      .put("/user/update-account/" + seldata._id, data)
      .then((res) => {
        console.log("Account has been updated" + res);
        console.log(register);
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setloading(true);
    const headers = { "Content-Type": "application/json" };
    const endpoint = "/user/get-account";
    http
      .get(endpoint, { headers })
      .then((response) => {
        setloading(false);
        setfinaldata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function EditModal(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="EditModalTitle"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Badge.Ribbon
          color="#008000"
          text={seldata.email + ":" + seldata.password}
        >
          <Modal.Header>
            <Modal.Title id="EditModal">
              Update Account{" "}
              <h5 style={{ fontSize: 10, color: `red` }}>
                *Fill only those Fileds you want to update
              </h5>
            </Modal.Title>
          </Modal.Header>
        </Badge.Ribbon>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col lg={12} sm={12} className="mb-3">
                <Form.Control
                  placeholder={seldata.email}
                  type="text"
                  {...register("email")}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} sm={12} className="mb-3">
                <Form.Control
                  placeholder={seldata.password}
                  type="text"
                  {...register("password")}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: `center` }}>
            <Button
              style={{ background: `#008000`, border: `#008000` }}
              type="submit"
            >
              Update
            </Button>
            <Button
              style={{ background: `#008000`, border: `#008000` }}
              onClick={props.onHide}
            >
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  function confirm(e) {
    http
      .delete("/user/delete-account/" + e._id)
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    message.success("Delete Successfulyy!!!");
  }

  function cancel(e) {
    console.log(e);
    message.error("Click on No");
  }

  const TStyle = {
    textAlign: `center`,
    verticalAlign: `middle`,
    cursor: `pointer`,
  };

  return (
    <Container fluid>
      <Spin spinning={loading} tip="Loading Accounts..." size="large">
        <section>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <section className="mb-2">
              <Row>
                <h3>Members:</h3>
              </Row>
            </section>
            <section>
              {finaldata ? (
                <Table style={TStyle} striped table-success="true" bordered hover size="sm" responsive >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Account</th>
                      <th>Password</th>
                      <th>Voted</th>
                      <th>Constituency</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finaldata.map(function (item, i) {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{item.email}</td>
                          <td>{item.password}</td>
                          <td>{item.constituency} </td>
                          <td>
                            {item.voteFlag === true ? (
                              <LikeTwoTone
                                twoToneColor="green"
                                style={{ fontSize: 20 }}
                              />
                            ) : (
                              <DislikeTwoTone
                                twoToneColor="red"
                                style={{ fontSize: 20 }}
                              />
                            )}
                          </td>
                          <td>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => {
                                setModalShow(true);
                                setseldata(item);
                              }}
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Popconfirm
                              title="Are you sure to delete this Account?"
                              onConfirm={() => confirm(item)}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button variant="outline-danger" size="sm">
                                Delete
                              </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <EditModal
                    data={seldata}
                    show={modalShow}
                    control={control}
                    onHide={() => setModalShow(false)}
                  />
                </Table>
              ) : (
                <Empty />
              )}
            </section>
          </div>
        </section>
      </Spin>
    </Container>
  );
}
export default Account;
