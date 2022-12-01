import { React, useRef, useEffect } from "react";
import { Button, Container,Row } from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import { SendOutlined } from "@ant-design/icons";
import { message,Spin } from "antd";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "../MailTemplate/editor.css";
import http from "../../apiConfig";
export default function MailEditor() {

  const history = useHistory();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [data, setData] = useState({});
  const [loading, setloading] = useState(false);
  const [fileD, setfileD] = useState("");
  const [active,setactive] = useState();
  const editorRef = useRef(null);
  const fileRef = useRef();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]) && setIsFilePicked(true);
    if (isFilePicked) return;
    else fileread(event.target.files[0]);
  };

  const fileread = (file) => {
    if (file !== undefined) {
      var reader = new FileReader();
      var textFile = /text.*/;
      let filedata = "";
      if (file.type.match(textFile)) {
        reader.onload = function (event) {
          filedata = event.target.result;
          setfileD(filedata);
        };
      } else {
        filedata = "It doesn't seem to be a text file!";
        message.error(filedata);
        fileRef.current.value = "";
        setSelectedFile(undefined);
      }
      reader.readAsText(file);
    } else setfileD("");
  };

  const sendmail = () => {
    setloading(true);
    let receiver = FinalData(selectedFile);
    let data = {
      From : active,
      To: receiver
    }
    if (receiver.length > 0) {
        http.post("/email/send", data)
        .then((res) => {
          setloading(false);
          Notifymsg("Mails Has been send Successfully")
          history.push("/success");
        })
        .catch((error) => {
          console.log(error);
          Notifyerrormsg("Mail Sending Failed!");
          history.push("/error");
        });
    }
};

  const Notifymsg = (msg) => {
    message.success(msg);
  };
  const Notifyerrormsg = (msg) => {
    message.error(msg);
  };

  const FinalData = () => {
    let finalD = [];
    let mailFromFile = fileD.split("\r\n");
    if (mailFromFile[0] !== "") {
      let text_data = editorRef.current.getContent();
      if (text_data !== "") {
        mailFromFile.forEach((element) => {
          let rad = RandomFunc(4,9);
          let subjectrad = RandomFunc(1,data.count);
          let delay = rad.toString().concat("000");
          finalD.push({
            id: element,
            subject: data.data[subjectrad].subject,
            mail: text_data,
            time: delay,
          });
        });
        return finalD;
      } else {
        Notifyerrormsg("Please Write Some Mail in Text Area!!!");
        return finalD;
      }
    } else {
      Notifyerrormsg("Please Select a text file first having Emails!!!");
      return finalD;
    }
  };

  function RandomFunc(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    get_Subject_Data();
    get_selected_user();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);   

  const get_selected_user = () => {

    let obj = localStorage.getItem('Login') ? JSON.parse(localStorage.getItem('Login')) : '';
    if(obj !== null)
    {
      setactive(obj);
    }
    //  http.get(`/account/search-active`)
    //    .then((data) => {
    //      let obj = data.data[0];
    //      setactive(obj);
    //    })
    //    .catch((err) => console.log(err));
   }
  const get_Subject_Data = () => {
    const headers = { "Content-Type": "application/json" };
    const endpoint = "/api";
    http
      .get(endpoint, { headers })
      .then((response) => {
        setData({
          data: response.data,
          count: response.data.length
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid>
      <Spin spinning={loading}  tip="Sending Mail..." size="large">
      <section>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Row>
              <h2>Compose a New Mail:</h2>
            </Row>
            { active !== "" ?
          <section>
            <div className="mb-3">
              <label htmlFor="From" className="form-label">
                From:&nbsp;&nbsp;<span className="badge badge--secondary badge--small">{active && active.email}</span>
              </label>
            </div>
          </section> : 
                      <div className="mb-3">
                      <label htmlFor="From" className="form-label">
                      <span className="badge bg-success">Please Select Account from account Tab</span>
                      </label>
                    </div>
          }
          <section>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                AttachFile:
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                ref={fileRef}
                onChange={changeHandler}
              />
            </div>
          </section>
        
          <section>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Email:
              </label>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue=""
                apiKey="211cd8ujzjbfa61ki3rmmxtl6qmj5sshibpsct3d2xj5iwdu"
                init={{
                  height: 400,
                  max_width: 150,
                  menubar: "file edit insert view format table tools",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | searchreplace  ",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
            <div className="mb-3">
              <div className="d-grid gap-2 col-4 mx-auto">
                <Button
                  variant="primary"
                  className="form-control btn btn-primary submit px-3"
                  type="submit"
                  style={{ borderRadius: `10px` }}
                  onClick={sendmail}
                >
                  <SendOutlined style={{ verticalAlign: 0 }} /> Send
                </Button>
              </div>
            </div>
          </section>
        </div>
      </section>
      </Spin>
    </Container>
  );
}
