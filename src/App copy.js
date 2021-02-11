import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  createMuiTheme,
  CardContent,
  CardActions,
  Card,
  Input,
  Row,
  Col,
  Tooltip,
  IconButton,


} from "@material-ui/core";
import Peer from "peerjs";
import uuid from "react-uuid";

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
const App = () => {
  const [peer, setpeer] = useState();
  const [conn, setconn] = useState();
  const [peerConnectID, setpeerConnectID] = useState();
  const clientVideo = useRef();
  const otherVideo = useRef();
  useEffect(() => {
    const _peer = new Peer(uuid(), {
      host: "localhost",
      port: 9000,
      path: "/myapp",
      secure: false,
    });
    const pr = async () => {
      setpeer(_peer);
    };
    pr();
    _peer.on("open", (id) => {
      console.log(id);
    });
    _peer.on("error", (err) => {
      alert(err);
      setconn(null)
      setpeerConnectID(null)
    });
    _peer.on('connection', (_conn) =>{ 
        setconn(_conn)
        _conn.on('open',()=>{
          _conn.send(`สวัสดี ${peerConnectID} จาก ${_peer.id}`)
        })
        console.log('peer connected');
        _conn.on('error', (err)=> {
          setconn(null)
          setpeerConnectID(null)
        });
        _conn.on('data', (data)=> {
            console.log(data);
        });
    });
  }, []);
  const openWebCam = () => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: true, audio: true },
      (suc) => {
        clientVideo.current.srcObject = suc;
      },
      (fail) => alert(`ไม่สามารถเปิดกล้องได้`)
    );
  };
  const connectPeer = () =>{
    setconn(peer.connect(peerConnectID))
  }

  return (
    <>
      {peer ? (
        <Container theme={theme} maxWidth="sm">
          <Card>
            <CardContent>
            <Tooltip title="กดเพื่อคัดลอก">
              <Typography variant="h6"  onClick={() => navigator.clipboard.writeText(peer.id)}>ID : {peer._id} </Typography>
            </Tooltip>
            </CardContent>
            {conn ? (
              <CardActions>
                <Button size="small" onClick={() => openWebCam()}>
                  เปิดกล้อง
                </Button>
              </CardActions>
            ) : (
              <>
              <Typography variant="h6">คุณยังไม่ได้เชื่อมต่อกับใคร </Typography>
              <hr/>
              <Input placeholder="ใส่ ID ของเพื่อน" onChange={e=>setpeerConnectID(e.target.value)}  onKeyDown={e=>{ if(e.key=="Enter")connectPeer()}}/>
              <Button size="small" onClick={() => connectPeer()}>
                  เชื่อมต่อ
                </Button>
              </>
            )}
          </Card>
          <video ref={clientVideo} autoPlay muted></video>
          <video ref={otherVideo} autoPlay muted></video>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
