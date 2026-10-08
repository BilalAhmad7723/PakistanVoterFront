import * as React from "react";
import { useState, useEffect } from "react";
import http from "../../apiConfig";
import { ConstituencyArray } from "../../data/constituencies";
import Select from 'react-select'
//import { connect} from 'react-redux';
import { useForm, Controller  } from "react-hook-form";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
//import $ from 'jquery'
import "../Member/table.css";
import { Form,Col, Row,Container, Button,Table,Modal} from "react-bootstrap";
import { LikeTwoTone, DislikeTwoTone } from "@ant-design/icons";
import { WhatsAppOutlined , PhoneOutlined} from "@ant-design/icons";
import { Empty, Spin } from "antd";
import { Popconfirm, message, Badge } from "antd";
import './member.css'

const GenderArray =  [
  {
      "label": "Male",
      "value": "male"
  },    {
      "label": "Female",
      "value": "female"
  },    {
      "label": "Transgender",
      "value": "transgender"
  }
]
const ReligionArray =  [
  {
      "label": "Islam",
      "value": "islam"
  },    {
      "label": "Hinduism",
      "value": "hinduism"
  },    {
      "label": "Christianity",
      "value": "christianity"
  }
]
function MemberTable({ data, onEdit, onDelete }) {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const columns = [
        {
            header: "#",
            cell: ({ row }) => row.index + 1,
        },
        { accessorKey: "email", header: "Account" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "cnic", header: "CNIC" },
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
            accessorKey: "voteFlag",
            header: "Voted",
            cell: ({ getValue }) => getValue() ? (
                <LikeTwoTone twoToneColor="green" style={{ fontSize: 20 }} />
            ) : (
                <DislikeTwoTone twoToneColor="red" style={{ fontSize: 20 }} />
            ),
        },
        { accessorKey: "constituency", header: "Consti." },
        {
            id: "actions",
            header: "Action",
            enableSorting: false,
            cell: ({ row }) => (
                <>
                    <Button variant="outline-success" size="sm" onClick={() => onEdit(row.original)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this Account?"
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
                placeholder="Search members"
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
            />
            <Table striped hover size="sm">
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
                        <tr><td colSpan={columns.length} className="text-center">No members found.</td></tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center">
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
                </span>
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

function Account() {
  // const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [seldata, setseldata] = useState({});
  const [finaldata, setfinaldata] = useState();
  const [finaldata1, setfinaldata1] = useState();
  const { control, register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    if (data.email === "") data.email = seldata.email;
    if (data.name === "") data.name = seldata.name;
    if (data.father === "") data.father = seldata.father;
    if (data.cnic === "") data.cnic = seldata.cnic;
    if (data.phone === "") data.phone = seldata.phone;
    if (data.city === "") data.city = seldata.city;
    if (data.fullAddress === "") data.fullAddress = seldata.fullAddress;
    if (data.occupation === "") data.occupation = seldata.occupation;
    if (data.password === "") data.password = seldata.password;
    if (data.feeCollection === "") data.feeCollection = seldata.feeCollection;
    if (data.constituency === ""|| data.constituency === undefined) data.constituency = seldata.constituency;
    else data.constituency = data.constituency.value;
    if (data.gender === "" || data.gender === undefined) data.gender = seldata.gender;
    else data.gender = data.gender.value;
    if (data.religion === ""  || data.religion === undefined) data.religion = seldata.religion;
    else data.religion = data.religion.value;
    if (data.dateOFJoin === "" || data.dateOFJoin === undefined) data.dateOFJoin = seldata.dateOFJoin;
    else data.dateOFJoin = data.dateOFJoin;
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
        setfinaldata1(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function EditModal(props) {
    const selectedData = props.data;
    const joinDate = selectedData.dateOFJoin
      ? new Date(selectedData.dateOFJoin).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";
    return (
      <Modal
        {...props} size="xl" aria-labelledby="EditModalTitle" backdrop="static" keyboard={false} centered >
        <Badge.Ribbon color="#008000" text={selectedData.email + ":" + selectedData.password} >
          <Modal.Header>
            <Modal.Title id="EditModal" style={{color:'green'}}>
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
              <Col lg={3} sm={3} className="mb-1">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder={selectedData.email} defaultValue={selectedData.email} type="text" {...register("email")} />
              </Col>
              <Col lg={3} sm={3} className="mb-1">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder={selectedData.name} defaultValue={selectedData.name} type="text" {...register("name")} />
              </Col>
              <Col lg={3} sm={3} className="mb-1">
              <Form.Label>Father Name</Form.Label>
              <Form.Control placeholder={selectedData.father} defaultValue={selectedData.father} type="text" {...register("father")} />
              </Col>
              <Col lg={3} sm={3} className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder={selectedData.password} defaultValue={selectedData.password} type="text" {...register("password")} />
              </Col>

            </Row>
            <Row>
            <Col lg={3} sm={3} className="mb-1">
              <Form.Label>CNIC</Form.Label>
                <Form.Control placeholder={selectedData.cnic} defaultValue={selectedData.cnic} type="text" {...register("cnic")} />
            </Col>
            <Col lg={6} sm={6} className="mb-1">
              <Form.Label>Full Address</Form.Label>
              <Form.Control placeholder={selectedData.fullAddress} defaultValue={selectedData.fullAddress} type="text" {...register("fullAddress")} />
              </Col>
              <Col lg={3} sm={3} className="mb-1">
              <Form.Label>Date Of joining:  <span style={{color:'green',fontFamily:'monospace',fontWeight:'bold'}}>{joinDate}</span></Form.Label>
              <Form.Control type="date" {...register("dateOFJoin")} />
              </Col>
            </Row>
            <Row>
              <Col lg={4} sm={4} className="mb-1">
              <Form.Label>Constituency</Form.Label>
              <Controller name="constituency" control={control} render={({ field }) => <Select {...field} placeholder={selectedData.constituency} options={ConstituencyArray} />} />
              </Col>
              <Col lg={4} sm={4} className="mb-2">
              <Form.Label>Religion</Form.Label>
              <Controller name="religion" control={control} render={({ field }) => <Select {...field} placeholder={selectedData.religion} options={ReligionArray} />} />
              </Col>
              <Col lg={4} sm={4} className="mb-2">
              <Form.Label>Gender</Form.Label>
              <Controller name="gender" control={control} render={({ field }) => <Select {...field} placeholder={selectedData.gender} options={GenderArray} />} />
              </Col>
            </Row>
            <Row>
              <Col lg={3} sm={3} className="mb-3">
              <Form.Label>Telephone / Mob No.</Form.Label>
              <Form.Control placeholder={selectedData.phone} defaultValue={selectedData.phone} type="text" {...register("phone")} />
              </Col>
              <Col lg={3} sm={3} className="mb-3">
              <Form.Label>Occupation</Form.Label>
              <Form.Control placeholder={selectedData.occupation} defaultValue={selectedData.occupation} type="text" {...register("occupation")} />
              </Col>
              <Col lg={3} sm={3} className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control placeholder={selectedData.city} defaultValue={selectedData.city} type="text" {...register("city")} />
              </Col>
              <Col lg={3} sm={3} className="mb-3">
              <Form.Label>Fee Collection</Form.Label>
              <Form.Control placeholder={selectedData.feeCollection} defaultValue={selectedData.feeCollection} type="text" {...register("feeCollection")} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: `center` }}>
            <Button style={{ background: `#008000`, border: `#008000` }} type="submit">
              Update
            </Button>
            <Button style={{ background: `#008000`, border: `#008000` }} onClick={props.onHide} >
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

  return (
    <Container fluid>
      <Spin spinning={loading} description="Loading Accounts..." size="large">
        <section>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }} >
            <section className="mb-2"> <Row> <h3>Members:</h3> </Row> </section>
            <section style={{overflowX : `auto`}}>
              {finaldata ? (
                                <MemberTable
                                    data={finaldata}
                                    onEdit={(item) => {
                                        setseldata(item);
                                        reset({
                                            email: item.email || "",
                                            name: item.name || "",
                                            father: item.father || "",
                                            password: item.password || "",
                                            cnic: item.cnic || "",
                                            fullAddress: item.fullAddress || "",
                                            dateOFJoin: item.dateOFJoin ? String(item.dateOFJoin).slice(0, 10) : "",
                                            constituency: ConstituencyArray.find((option) => option.value === item.constituency) || null,
                                            religion: ReligionArray.find((option) => option.value === item.religion) || null,
                                            gender: GenderArray.find((option) => option.value === item.gender) || null,
                                            phone: item.phone || "",
                                            occupation: item.occupation || "",
                                            city: item.city || "",
                                            feeCollection: item.feeCollection || "",
                                        });
                                        setModalShow(true);
                                    }}
                                    onDelete={confirm}
                                />
              ) : (
                <Empty />
              )}
            </section>
                        <EditModal
                            data={seldata}
                            show={modalShow}
                            control={control}
                            onHide={() => setModalShow(false)}
                        />
          </div>
        </section>
      </Spin>
    </Container>
  );
}
export default Account;
