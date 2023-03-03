import { React,useState,useEffect } from "react";
import http from "../../apiConfig";
import { Container,Table, Card, Row ,Modal} from "react-bootstrap";
import "../Dashboard/dash.css";
export default function Dashboard() {
  const TStyle = {
    textAlign: `center`,
    verticalAlign: `middle`,
    cursor: `pointer`,
  };
  //const [data, setData] = useState({});
  const [Candi, setCandiData] = useState({});
  const [Pending, setPending] = useState([]);
  const [Rejected, setRejected] = useState([]);
  const [TotalCandiatdate, setTotalCandiatdate] = useState({});
  const [Muslim, setMuslim] = useState([]);
  const [NonMuslim, setNonMuslim] = useState([]);
  const [Male, setMale] = useState([]);
  const [Female, setFemale] = useState([]);
  const [MM, setMM] = useState([]);
  const [FM, setFM] = useState([]);
  const [MNonM, setMNonM] = useState([]);
  const [NonMF, setNonMF] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [DataShow, setDataShow] = useState([]);
  const [DataLabel, setDataLabel] = useState('');
  
  useEffect(() => {
    
  const getData = () => {
    const headers = { "Content-Type": "application/json" };
    const endpoint = "/user/get-account";
    http.get(endpoint, { headers })
      .then((response) => {
        response.data.forEach(element => {
        if(element.religion === 'islam') MuslimList.push(element);
        else NonMuslimList.push(element);
        if(element.gender === 'male') male.push(element);
        else female.push(element);
        if(element.religion === 'islam' && element.gender === 'male') MaleMuslim.push(element);
        else if(element.religion === 'islam' && element.gender === 'female') FemaleMuslim.push(element);
        else if(element.religion !== 'islam' && element.gender === 'male') MaleNonMuslim.push(element);
        else if(element.religion !== 'islam' && element.gender === 'female') FemaleNonMuslim.push(element);
      });
       // setData({ data: response.data});
        setMuslim(MuslimList); 
        setMale(male);
        setFemale(female);
        setNonMuslim(NonMuslimList);
        setMM(MaleMuslim);
        setFM(FemaleMuslim);
        setMNonM(MaleNonMuslim);
        setNonMF(FemaleNonMuslim);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCandidatesData = () => {
    const headers = { "Content-Type": "application/json" };
    const endpoint = "/candidate/get_candidates";
    http.get(endpoint, { headers })
      .then((response) => {
        response.data.forEach(element => {
          if(element.status === 'approved') approvedlist.push(element);
          else if(element.status === 'pending') PendingList.push(element);
          else RejectedList.push(element)
        });
        setCandiData(approvedlist);
        setPending(PendingList);
        setRejected(RejectedList);
        setTotalCandiatdate( response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }; 
    let approvedlist = [];
  let PendingList  = [];
  let RejectedList = [];
  let MuslimList = [];
  let NonMuslimList = [];
  let male = [];
  let female = [];
  let MaleMuslim = [];
  let FemaleMuslim = [];
  let MaleNonMuslim = [];
  let FemaleNonMuslim = [];
    getData();
    getCandidatesData();
  }, []);
  const dataManageAp = (array,code) =>{
    let showArry = []
    if(code === 'Approved Candiates' || code === 'Pending Candiates' ||code === 'Total Candiatdates' || code === 'Rejected Candiates'){
      array.forEach((element,i) => {
        showArry.push({
          "#": i+1,
          "Name": element.name,
          "Father Name": element.fname,
          "Email": element.email,
          "Religion": element.religion === 'islam' ? "Muslim" : 'Non Muslim',
          "Gender": element.gender === 'male' ? "Male" : "Female",
          "Status": element.status ? element.status.charAt(0).toUpperCase() + element.status.slice(1) : '',
          "Constituency": element.constituency,
        })
      });
    }
    else if(code === 'Muslim Memebers' || code === 'Non-Muslim Members' ||
     code ==='Non-Muslim Female Members' || code ==='Male Members' || code ==='Female Members' ||
      code ==='Muslim Male Members' || code ==='Muslim Female Members' || 
      code === 'Non-Muslim Male Members'){
      array.forEach((element,i) => {
        showArry.push({
          "#": i+1,
          "Account": element.email,
          "Religion": element.religion === 'islam' ? "Muslim" : 'Non Muslim',
          "Gender": element.gender === 'male' ? "Male" : "Female",
          "Constituency": element.constituency,
          "Fee Collection": element.feeCollection
        })
      });
    }
    setDataShow(showArry);
    setDataLabel(code)
  }
  function EditModal(props) {
    var keys = ''
    if(props.data.length > 0) keys = Object.keys(props.data[0]);
    return (
      <Modal {...props} size="xl" aria-labelledby="EditModalTitle" fullscreen="xxl-down" backdrop="static" keyboard={false} centered >
        <Modal.Header closeButton="true" closeLabel="">
          <Modal.Title id="example-custom-modal-styling-title">
            {DataLabel}
          </Modal.Title>
        </Modal.Header>
          <Modal.Body>
            { props.data.length > 0 ? 
          <Table style={TStyle} striped table-success="true" bordered hover size="lg" responsive >
                  <thead>
                    <tr>
                    {keys.length > 0 ? keys.map(function (item, i) {
                      return (
                      <th>{item}</th>
                      )}): ''}
                    </tr>
                  </thead>
                  <tbody>
                  {props.data.length > 0 ? props.data.map(function (item1, i) {
                      return (
                        <tr>
                           {Object.entries(item1).map((day, i) => {
                           return <td>{day[1]}</td>
                           })}
                     </tr>
                      )}): ''}
                  </tbody>
          </Table> : <span style={{textAlign: `center`}}>No Date Found</span> }
          </Modal.Body>
          {/* <Modal.Footer style={{ justifyContent: `center` }}>
            <Button style={{ background: `#008000`, border: `#008000` }} onClick={props.onHide} >
              Close
            </Button>
          </Modal.Footer> */}
      </Modal>
    );
  }

  return (
    <Container fluid>
      <section>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }} >
            <Row> <h3>Full Statistics:</h3> </Row>
          <Row style={{textAlign:`center`}}>
            <div className="col-lg-3 col-sm-6">
              <Card bg="success" border="success" text="white" className="mb-2">
                <Card.Header>Approved Candidates</Card.Header>
                <Card.Body>
                  <Card.Title>{Candi ? Candi.length : 0 }</Card.Title>
                  <Card.Text>Approved Candidates</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(Candi, "Approved Candiates") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="light" border="light" text="dark" className="mb-2">
                <Card.Header>Pending Candidates</Card.Header>
                <Card.Body>
                  <Card.Title>{Pending ? Pending.length : 0 }</Card.Title>
                  <Card.Text>Pending Candidates</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(Pending, "Pending Candiates") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="danger" border="danger" text="light" className="mb-2">
                <Card.Header>Rejected Candidates</Card.Header>
                <Card.Body>
                  <Card.Title>{Rejected ? Rejected.length : 0 }</Card.Title>
                  <Card.Text>Rejected Candidates</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(Rejected, "Rejected Candiates") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="info" border="info" text="light" className="mb-2">
                <Card.Header>Muslim Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Muslim ? Muslim.length : 0 }</Card.Title>
                  <Card.Text>Muslim Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(Muslim, "Muslim Memebers") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="warning" border="warning" text="light" className="mb-2">
                <Card.Header>Non Muslim Members</Card.Header>
                <Card.Body>
                  <Card.Title>{NonMuslim ? NonMuslim.length : 0 }</Card.Title>
                  <Card.Text>Non Muslim Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(NonMuslim, "Non-Muslim Members") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="secondary" border="secondary" text="light" className="mb-2">
                <Card.Header>Male Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Male ? Male.length : 0 }</Card.Title>
                  <Card.Text>Male Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(Male, "Male Members") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="light" border="light" text="dark" className="mb-2">
                <Card.Header>Female Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Female ? Female.length : 0 }</Card.Title>
                  <Card.Text>Female Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(Female, "Female Members") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="success" border="success" text="light" className="mb-2">
                <Card.Header>Muslim Male Members</Card.Header>
                <Card.Body>
                  <Card.Title>{MM ? MM.length : 0 }</Card.Title>
                  <Card.Text>Muslim Male Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(MM, "Muslim Male Members") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="dark" border="dark" text="light" className="mb-2">
                <Card.Header>Muslim Female Members</Card.Header>
                <Card.Body>
                  <Card.Title>{FM ? FM.length : 0 }</Card.Title>
                  <Card.Text>Muslim Female Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer  style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(FM, "Muslim Female Members") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="light" border="light" text="dark" className="mb-2">
                <Card.Header>Non-Muslim Male Members</Card.Header>
                <Card.Body>
                  <Card.Title>{MNonM ? MNonM.length : 0 }</Card.Title>
                  <Card.Text>Non-Muslim Male Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(MNonM, "Non-Muslim Male Members") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="info" border="info" text="light" className="mb-2">
                <Card.Header>Non-Muslim Female Members</Card.Header>
                <Card.Body>
                  <Card.Title>{NonMF ? NonMF.length : 0 }</Card.Title>
                  <Card.Text>Non-Muslim Female Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(NonMF, "Non-Muslim Female Members") }}>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="warning" border="warning" text="light" className="mb-2">
                <Card.Header>Total Candidates</Card.Header>
                <Card.Body>
                  <Card.Title>{TotalCandiatdate ? TotalCandiatdate.length : 0 }</Card.Title>
                  <Card.Text>Total Candidates in Records</Card.Text>
                </Card.Body>
                <Card.Footer style={{cursor:`pointer`}} onClick={() => { setModalShow(true); dataManageAp(TotalCandiatdate, "Total Candiatdates") }}>View More</Card.Footer>
              </Card>
            </div>
          </Row>
        </div>
      </section>
      <EditModal data={DataShow} show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}
