import React from 'react';
import { useState, useEffect } from "react";
import http from "../../apiConfig";
import { ConstituencyArray } from "../../data/constituencies";
import Select from 'react-select'
import { useForm, Controller } from "react-hook-form";
import { Form,Col, Row, Container, Button, Table, Modal} from "react-bootstrap";
import { Empty,Spin,Badge } from "antd";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import "../Member/table.css";
import { WhatsAppOutlined , PhoneOutlined} from "@ant-design/icons";
import { Popconfirm, message} from "antd";
function CandidateTable({ data, onEdit, onDelete }) {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const columns = [
        { header: "#", cell: ({ row }) => row.index + 1 },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "fname", header: "Father Name" },
        { accessorKey: "constituency", header: "Constituency" },
        { accessorKey: "count", header: "Vote" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const status = getValue();
                return (
                    <Badge
                        style={{ backgroundColor: status === "approved" ? "#008000" : status === "pending" ? "#0dcaf0" : "" }}
                        count={status ? status.charAt(0).toUpperCase() + status.slice(1) : ""}
                    />
                );
            },
        },
        {
            accessorKey: "phone",
            header: "Phone No.",
            cell: ({ getValue }) => {
                const phone = getValue() || "";
                return (
                    <Row>
                        <Col>{phone}</Col>
                        <Col>
                            <WhatsAppOutlined
                                onClick={() => window.open(`http://api.whatsapp.com/send?phone=92${phone.slice(1)}`)}
                                style={{ fontSize: "20px", color: "green" }}
                            />
                        </Col>
                        <Col>
                            <a href={`tel:92${phone.slice(1)}`}>
                                <PhoneOutlined style={{ fontSize: "20px", color: "#0e4ba5" }} />
                            </a>
                        </Col>
                    </Row>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            enableSorting: false,
            cell: ({ row }) => (
                <>
                    <Button variant="outline-success" size="sm" onClick={() => onEdit(row.original)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this Candidate?"
                        onConfirm={() => onDelete(row.original)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="ms-2" variant="outline-danger" size="sm">
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];
    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <Form.Control
                className="mb-2"
                placeholder="Search candidates"
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
            />
            <Table striped hover size="md" responsive>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <button
                                            type="button"
                                            className="border-0 bg-transparent p-0 fw-bold"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{ asc: " ^", desc: " v" }[header.column.getIsSorted()] || ""}
                                        </button>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    )) : (
                        <tr><td colSpan={columns.length} className="text-center">No candidates found.</td></tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
                <span>Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}</span>
                <div>
                    <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

function Subject() {
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({});
  const [finaldata1, setfinaldata1] = useState();
  const [seldata, setseldata] = useState({});
  const { register, handleSubmit,reset,control } = useForm();
  const onSubmit = (data) => {
      if(data.email === '') data.email = seldata.email;
      if(data.cnic === '') data.cnic = seldata.cnic;
      if(data.name === '') data.name = seldata.name;
      if(data.fname === '') data.fname = seldata.fname;
      if(data.phone === '') data.phone = seldata.phone;
      if(data.edu === '') data.edu = seldata.edu;
      if(data.status === '') data.status = seldata.staus;
      if (data.constituency === ""|| data.constituency === undefined) data.constituency = seldata.constituency;
      else data.constituency = data.constituency.value;
      if(data.count === '') data.count = seldata.count;
      data.nominatedBy = seldata.nominatedBy;
    //  data.Image = seldata.Image;
      onUpdate(data);
      reset();
      setModalShow(false);
  };

  const onUpdate = (data) => {
      http.put('/candidate/update-candidates/' + seldata._id, data)
      .then((res) => {
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
        setfinaldata1({
            data: response.data,
          })
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
              <Controller name="constituency" control={control} render={({ field }) => <Select {...field} placeholder={seldata.constituency}  options={ConstituencyArray} />} />
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

  return (
    <Container fluid>
       <Spin spinning={loading}  description="Loading Subjects..." size="large">
      <section>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }} >
          <section className="mb-2">
            <Row> <h3>Candidates:</h3> </Row>
          </section>
          <section>
            {data.data ? (
                            <CandidateTable
                                data={data.data}
                                onEdit={(item) => {
                                    setseldata(item);
                                    setModalShow(true);
                                }}
                                onDelete={confirm}
                            />
            ) : (
              <Empty />
            )}
          </section>
                    <EditModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
        </div>
      </section>
      </Spin>
    </Container>
  );
}

export default Subject;

