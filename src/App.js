import React, { useState, useRef, useEffect, createRef } from "react";
import {
  Button,
  Container,
  Typography,
  createMuiTheme,
  CardContent,
  CardActions,
  Card,
  TextField,
  Grid,
  Tooltip,
  IconButton,
  palette,
} from "@material-ui/core";
import { spacing ,positions } from '@material-ui/system';
import Peer from "peerjs";
import Cus_video from './video'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
const _peer = new Peer({
  initiator: true,
  trickle: false,

  secure: true,
});
const App = () => {
  const [peer, setpeer] = useState(_peer);
  const [peerID, setpeerID] = useState("");
  const [conn, setconn] = useState();
  const [peerConnectID, setpeerConnectID] = useState();
  const [optional, setoptional] = useState();
  const [messages, setmessages] = useState([]);
  const clientVideo = useRef();
  const [objectVideo, setobjectVideo] = useState([]);
  const [img, setimg] = useState("");

  useEffect(() => {
    peer.on("open", (id) => {
      setpeerID(id)
    });
    peer.on("error", (err) => {
      alert(err);
      setconn(null);
      setpeerConnectID(null);
    });
    peer.on("connection", (conn) => {
      setconn(conn);
      console.log(":N:--->> peer connection");
      console.log(conn);
      conn.on("open", () => {
        const data = `${peer.id} is Joined`;
        conn.send({ type: "chat", data: data, from: peer.id });
      });
      conn.on("data", (data) => {
        if (peerConnectID === undefined) setpeerConnectID(data.from);
        if (data.type === "chat") {
          setmessages((prev) => [...prev, { from: data.from, msg: data.data }]);
          setoptional(2);
        } else if (data.type === "file") {
          setoptional(3);
          console.log(data);
          if (data.filename) {
            var arrayBufferView = new Uint8Array(data.data);
            const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            console.log(url);
            setimg(url);
            window.open(url, "_blank");
            if (url) {
              conn.send({ type: "connect", success: true });
            }
          }
        }
        if (data.type === "connect" && data.success) {
          console.log("success");
          conn.send({ type: "connect", success: true });
        }
      });

      conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });
    });

    peer.on("disconnect", () => {
      setconn();
      console.log("disconnect");
    });

    
    peer.on("call", (call) => {
      let _navigator = navigator.getUserMedia ||
        navigator.webkitGetUserMedia.getUserMedia ||
        navigator.mozGetUserMedia.getUserMedia ||
        navigator.mediaDevices.getUserMedia;
        
        _navigator (
        { video: { width: window.innerWidth / 2, height: window.innerHeight / 2 }, audio: true },
        (stream) => {
          clientVideo.current.srcObject = stream;
          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream", (remoteStream) => {
            prevStream.push(remoteStream)
            let pp = prevStream.filter( (ele, ind) => ind === prevStream.findIndex( elem =>  elem.id === ele.id))
            setobjectVideo(pp)
            setconn(call);
          });
          call.on("error", (err) => {
            alert(err);
            stream.getTracks().forEach((track) => track.stop());
          });
        },
        (err) => {
          console.error("Failed to get local stream", err);
        }
      );
    });
  }, [peer]);
  let prevStream = []
  const back = () => {
    peer.disconnect()
    peer.destroy();
    const _peer = new Peer(peerID,{
      initiator: true,
      trickle: false,
      secure: true,
    });
    setpeer(_peer)
    setoptional()
    setconn()
    setobjectVideo([])
    prevStream=[]
    clientVideo.current.srcObject = null
  };
  const openWebCam = () => {
    let _navigator = navigator.getUserMedia ||
        navigator.webkitGetUserMedia.getUserMedia ||
        navigator.mozGetUserMedia.getUserMedia ||
        navigator.mediaDevices.getUserMedia;
        
        _navigator (
      { video: { width: window.innerWidth / 2, height: window.innerHeight / 2 }, audio: true },
      (stream) => {
        const call = peer.call(peerConnectID, stream);
        console.log(` caller => `,call,stream)
        clientVideo.current.srcObject = stream;
        call.on("stream", (remoteStream) => {
          prevStream.push(remoteStream)
          let pp = prevStream.filter( (ele, ind) => ind === prevStream.findIndex( elem =>  elem.id === ele.id))
          setobjectVideo(pp)
          setconn(call);
        });
        call.on("error", (err) => {
          alert(err);
          stream.getTracks().forEach((track) => track.stop());
        });
      },
      (fail) => alert(`ไม่สามารถเปิดกล้องได้`)
    );
  };
  const connectPeer = (option) => {
    if (option === 1) {
      openWebCam();
    } else if (option === 2) {
      const conn = peer.connect(peerConnectID);
      console.log("<<---:E: peer connection");
      console.log(conn);
      conn.on("open", () => {
        const data = `${peer.id} is Joined`;
        conn.send({ type: "chat", data: data, from: peer.id });
      });
      setconn(conn);
      conn.on("data", (data) => {
        if (peerConnectID === undefined) setpeerConnectID(data.from);
        if (data.type === "chat") {
          setmessages((prev) => [...prev, { from: data.from, msg: data.data }]);
          setoptional(2);
        } else if (data.type === "file") {
          setoptional(3);
          console.log(data);
          if (data.filename) {
            var arrayBufferView = new Uint8Array(data.data);
            const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            console.log(url);
            setimg(url);
            window.open(url, "_blank");
            if (url) {
              conn.send({ type: "connect", success: true });
            }
          }
        }
      });

      conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });
    } else if (option === 3) {
      const conn = peer.connect(peerConnectID);
      console.log("<<---:E: peer connection");
      console.log(conn);
      conn.on("open", () => {
        const data = `${peer.id} is Joined`;
        conn.send({ type: "file", data: data, from: peer.id });
      });
      setconn(conn);
      conn.on("data", (data) => {
        if (data.type === "file") {
          setmessages((prev) => [...prev, { from: data.from, msg: data.data }]);
        }
      });

      conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });
      setoptional(3);
    } else {
      alert("fail to connect");
    }
  };
  const [typemsg, settypemsg] = useState("");

  const chat = () => {
    return (
      <>
        {messages.map((data, ind) => (
          <Grid key={ind + data.from + data.msg} Item xs={12}>
          <CardActions style={{ width: '90%' ,justifyContent: data.from === peer.id ? "flex-end" : "flex-start" }}>
              <Typography
                color={data.from === peer.id ? "primary" : "textPrimary"}
              >
                {data.msg}
              </Typography>
            </CardActions>
          </Grid>
        ))}
        <TextField
          type="text"
          label="ใส่ข้อความ"
          defaultValue={typemsg}
          onChange={(e) => settypemsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              const msg = typemsg;
              const myid = peer.id;
              try{
                conn.send({ type: "chat", data: msg, from: myid });
              }catch(e){alert(e.message); back()}
              setmessages((prev) => [...prev, { from: myid, msg: typemsg }]);
              e.target.value = "";
            }
          }}
        />
      </>
    );
  };
  const [file, setmyfile] = useState();
  const [buttonUpload, setbuttonUpload] = useState(true);

  const upload = () => {
    const onChangeHandler = (e) => {
      setmyfile(e.target.files[0]);

      setbuttonUpload(false);
    };
    const onClickHandler = () => {
      const fileReader = new FileReader();

      const slice = file.slice(0, 10485760);
      fileReader.readAsArrayBuffer(slice);
      fileReader.onload = (evt) => {
        const arrayBuffer = fileReader.result;
        conn.send({
          type: "file",
          data: arrayBuffer,
          filename: file.name,
          from: peer.id,
        });
      };
      //
    };
    return (
      <>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChangeHandler(e)}
        />
        <Button
          variant="outlined"
          color="primary"
          disabled={buttonUpload}
          onClick={() => onClickHandler()}
        >
          Upload
        </Button>
      </>
    );
  };

  return (
    <>
      {peer ? (
        <>
          <Container theme={theme} maxWidth="sm">
            <Card>
              <CardContent display="flex">
                    <Tooltip title="กดเพื่อคัดลอก">
                      <Typography
                      
                        onClick={() => {
                          try {
                            navigator.clipboard.writeText(peerID);
                          } catch (e) {
                            console.log(
                              "ERROR : ไม่สามารถใช้งานคลิกเพื่อคัดลอกได้ \n ให้ผู้ใช้คลุมเพื่อคัดลอกแทน \n"
                            );
                          }
                        }}
                      >
                        ID : {peerID}{" "}  
                      </Typography>
                    </Tooltip>

              </CardContent>
              {conn ? (
                <CardActions style={{ width: '90%', justifyContent: 'flex-end'  }}>
                  <Button
                    variant="contained"
                    size="small"
                    justify="space-between" 
                    onClick={() => back()}
                  >
                    ย้อนกลับ
                  </Button>
                  </CardActions>

              ) : (
                <>
                  <hr />
                  <Grid container p="2">
                    <Grid Item xs={10}>
                      <TextField
                        type="text"
                        label="ID เพื่อน "
                        onChange={(e) => setpeerConnectID(e.target.value)}
                      />
                    </Grid>
                    <Grid Item xs={3}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          console.log('open camera')
                          connectPeer(1);
                        }}
                        disabled={!peerConnectID ? true : false}
                      >
                        กล้อง
                      </Button>
                    </Grid>
                    <Grid Item xs={3}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => connectPeer(2)}
                        disabled={!peerConnectID ? true : false}
                      >
                        แชท
                      </Button>
                    </Grid>
                    <Grid Item xs={3}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => connectPeer(3)}
                        disabled={!peerConnectID ? true : false}
                      >
                        ไฟล์
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Card>
          </Container>
          <Container theme={theme} maxWidth="sm" mt={2}>
            <Grid container justify="center">
              {optional === 2 ? (
                <>{chat()}</>
              ) : optional === 3 ? (
                <>{upload()}</>
              ) : (
                <></>
              )}
            </Grid>
          </Container>

          <Grid container justify="center">
            <image src={img} onClick={() => window.open(img, "_blank")} />
            <video
              display="flex"
              ref={clientVideo}
              width="50%"
              autoPlay
              muted
            />
            {objectVideo && objectVideo.map((stream,i)=><Cus_video key={i} stream={stream} />)}
           </Grid>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
