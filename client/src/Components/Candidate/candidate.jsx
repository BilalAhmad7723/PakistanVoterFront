import { React, useState, useEffect } from "react";
import http from "../../apiConfig";
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
import { Empty,Spin,Badge } from "antd";
import { Popconfirm, message } from "antd";
//import Select from 'react-select';

function Subject() {
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({});
  const [seldata, setseldata] = useState({});
  const { register, handleSubmit,reset } = useForm();
  const onSubmit = (data) => {
      if(data.email === '') data.email = seldata.email;
      if(data.cnic === '') data.cnic = seldata.cnic;
      if(data.name === '') data.name = seldata.name;
      if(data.fname === '') data.fname = seldata.fname;
      if(data.phone === '') data.phone = seldata.phone;
      if(data.edu === '') data.edu = seldata.edu;
      if(data.status === '') data.status = seldata.staus;
      if(data.constituency === '') data.constituency = seldata.constituency;
      if(data.count === '') data.count = seldata.count;
      data.nominatedBy = seldata.nominatedBy;
    //  data.Image = seldata.Image;
      onUpdate(data);
      reset();
      setModalShow(false);
  };

  const onUpdate = (data) => {
    console.log(data);
      http.put('/candidate/update-candidates/' + seldata._id, data)
      .then((res) => {
        console.log('Candidate updated' + res)
        getData();
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setloading(true);
    const headers = { "Content-Type": "application/json" };
    const endpoint = "/candidate/get_candidates";
    http.get(endpoint, { headers })
      .then((response) => {
        setloading(false);
        response.data?.sort((a, b) => (parseInt(a.count) > parseInt( b.count) ? -1 : 1)) 
        setData({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };



  function EditModal(props) {
    const center = {
      justifyContent: `center !important`
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="EditModalTitle"
        backdrop="static"
        keyboard={false}
        centered
      >
          <Modal.Header style={center}>
            <Modal.Title style={center} id="EditModal" >Canidate Details<h5 style={{fontSize: 10,color: `red`}}>*Fill only those Fileds you want to update</h5></Modal.Title>
          </Modal.Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Row>
              <Col lg={6} md={6} sm={6} >
             <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control  placeholder={seldata.name} {...register("name")} />
            </Form.Group>             
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone #</Form.Label>
              <Form.Control  placeholder={seldata.phone} {...register("phone")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEducation">
              <Form.Label>Education</Form.Label>
              <Form.Control  placeholder={seldata.edu} {...register("edu")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCount">
              <Form.Label>Vote Count</Form.Label>
              <Form.Control placeholder={seldata.count} readOnly {...register("count")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCount">
              <Form.Label>Constituency</Form.Label>
              <Form.Control placeholder={seldata.constituency} {...register("constituency")} />
            </Form.Group>
              </Col>
              <Col lg={6} md={6} sm={6} >
              <Form.Group className="mb-3" controlId="formFatherName">
              <Form.Label>Father Name</Form.Label>
              <Form.Control  placeholder={seldata.fname} {...register("fname")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control  placeholder={seldata.email} {...register("email")} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCnic">
              <Form.Label>Cnic without dash</Form.Label>
              <Form.Control  placeholder={seldata.cnic} {...register("cnic")} />
            </Form.Group>
            <Form.Group controlId="formBasicSelect">
        <Form.Label>Candidate Status</Form.Label> <Badge  style={{ backgroundColor: seldata.status === 'approved' ?  '#008000': 'red'}} count={seldata.status ? seldata.status.charAt(0).toUpperCase() + seldata.status.slice(1) : ''} />
        <Form.Control as="select" placeholder={seldata.status} {...register("status")} >
        <option value="">Change Status</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </Form.Control>
      </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{justifyContent : `center`}}>
            <Button style={{background:`#008000`,border: `#008000`}} type="submit">Update</Button>
            <Button style={{background:`#008000`,border: `#008000`}} onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
  function confirm(e) {
    http
      .delete("/candidate/delete-candidates/" + e._id)
      .then((res) => {
        message.success("Delete Successfulyy!!!");
        getData();
      })
      .catch((error) => {
        message.error(error.message);
        console.log(error);
      });
    
  }

  function cancel(e) {
    message.error("Candiate not Deleted!");
  }

  const TStyle = {
    textAlign: `center`, 
    verticalAlign: `middle`,
    cursor:`pointer`
    }
  return (
    <Container fluid>
       <Spin spinning={loading}  tip="Loading Subjects..." size="large">
      <section>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <section className="mb-2">
            <Row>
              <h3>Candidates:</h3>
            </Row>
          </section>
          <section>
            {data.data ? (
              <Table
                style={TStyle}
                striped
                table-success="true"
                bordered
                hover
                size="sm"
                responsive
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Father Name</th>
                    <th>CNIC</th>
                    <th>Vote</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map(function (item, i) {
                    return (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.name}</td>
                        <td>{item.fname}</td>
                        <td>{item.cnic}</td>
                        <td>{item.count}</td>
                        <td>{item.phone}</td>
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
                            title="Are you sure to delete this Candidate?"
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
                  show={modalShow}
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

export default Subject;
