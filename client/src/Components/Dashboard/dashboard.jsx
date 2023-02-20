import { React,useState,useEffect } from "react";
import http from "../../apiConfig";
import { Container, Card, Row } from "react-bootstrap";
import "../Dashboard/dash.css";
export default function Dashboard() {

  //const [data, setData] = useState({});
  const [Candi, setCandiData] = useState({});
  const [Pending, setPending] = useState([]);
  const [TotalCandiatdate, setTotalCandiatdate] = useState({});
  const [Muslim, setMuslim] = useState([]);
  const [NonMuslim, setNonMuslim] = useState([]);
  const [Male, setMale] = useState([]);
  const [Female, setFemale] = useState([]);
  const [MM, setMM] = useState([]);
  const [FM, setFM] = useState([]);
  const [MNonM, setMNonM] = useState([]);
  const [NonMF, setNonMF] = useState([]);
  let approvedlist = [];
  let PendingList  = [];
  let MuslimList = [];
  let NonMuslimList = [];
  let male = [];
  let female = [];
  let MaleMuslim = [];
  let FemaleMuslim = [];
  let MaleNonMuslim = [];
  let FemaleNonMuslim = [];

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
          else PendingList.push(element)
        });
        setCandiData(approvedlist);
        setPending(PendingList);
        setTotalCandiatdate( response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }; 
    getData();
    getCandidatesData();
  }, []);
  return (
    <Container fluid>
      <section>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }} >
            <Row> <h3>Full Statistics:</h3> </Row>
          <Row style={{textAlign:`center`}}>
            <div className="col-lg-3 col-sm-6">
              <Card bg="success" border="success" text="white" className="mb-2">
                <Card.Header>Approved Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Candi ? Candi.length : 0 }</Card.Title>
                  <Card.Text>Approved Members</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="light" border="light" text="dark" className="mb-2">
                <Card.Header>Approved Pending Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Pending ? Pending.length : 0 }</Card.Title>
                  <Card.Text>Approved Pending Members</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="info" border="info" text="light" className="mb-2">
                <Card.Header>Muslim Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Muslim ? Muslim.length : 0 }</Card.Title>
                  <Card.Text>Muslim Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="warning" border="warning" text="light" className="mb-2">
                <Card.Header>Non Muslim Members</Card.Header>
                <Card.Body>
                  <Card.Title>{NonMuslim ? NonMuslim.length : 0 }</Card.Title>
                  <Card.Text>Non Muslim Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="secondary" border="secondary" text="light" className="mb-2">
                <Card.Header>Male Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Male ? Male.length : 0 }</Card.Title>
                  <Card.Text>Muslim Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="danger" border="danger" text="light" className="mb-2">
                <Card.Header>Female Members</Card.Header>
                <Card.Body>
                  <Card.Title>{Female ? Female.length : 0 }</Card.Title>
                  <Card.Text>Female Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="success" border="success" text="light" className="mb-2">
                <Card.Header>Muslim Male Members</Card.Header>
                <Card.Body>
                  <Card.Title>{MM ? MM.length : 0 }</Card.Title>
                  <Card.Text>Muslim Male Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="dark" border="dark" text="light" className="mb-2">
                <Card.Header>Muslim Female Members</Card.Header>
                <Card.Body>
                  <Card.Title>{FM ? FM.length : 0 }</Card.Title>
                  <Card.Text>Muslim Female Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="light" border="light" text="dark" className="mb-2">
                <Card.Header>Non-Muslim Male Members</Card.Header>
                <Card.Body>
                  <Card.Title>{MNonM ? MNonM.length : 0 }</Card.Title>
                  <Card.Text>Non-Muslim Male Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="info" border="info" text="light" className="mb-2">
                <Card.Header>Non-Muslim Female Members</Card.Header>
                <Card.Body>
                  <Card.Title>{NonMF ? NonMF.length : 0 }</Card.Title>
                  <Card.Text>Non-Muslim Female Members in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="warning" border="warning" text="light" className="mb-2">
                <Card.Header>Total Candidates</Card.Header>
                <Card.Body>
                  <Card.Title>{TotalCandiatdate ? TotalCandiatdate.length : 0 }</Card.Title>
                  <Card.Text>Total Candidates in Records</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
          </Row>
        </div>
      </section>
    </Container>
  );
}
