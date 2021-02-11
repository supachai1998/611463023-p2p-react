import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  Typography,
  createMuiTheme,
  CardContent,
  CardActions,
  Card,
  TextField ,
  Grid,
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
  const [optional, setoptional] = useState();
  const [messages, setmessages] = useState([])
  const clientVideo = useRef();
  const otherVideo = useRef();
  useEffect(() => {
    const _peer = new Peer(uuid(), {
      host: "localhost",
      port: 9000,
      path: "/myapp",
      secure: false,
    });
    const pr = () => {
      setpeer(_peer);
    };
    pr();
    _peer.on("open", (id) => {
      // console.log(id);
    });
    _peer.on("error", (err) => {
      alert(err);
      setconn(null);
      setpeerConnectID(null);
    });
    _peer.on("connection",  (_conn) => {
      
      setconn(_conn);
      console.log(":N:--->> peer connection");
      console.log(_conn)
      _conn.on("open", () => {
        console.log("open-->")
        _conn.send({type:'chat' ,data:"tst"} );
      });
      _conn.on("data", (data) => {
        if(data.type === 'chat'){
          setmessages(prev=>[...prev,data.data])
          
          setoptional(2)
          }
      });
      
      _conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });
    });

    _peer.on("disconnect",  () => {
      setconn();
      console.log("disconnect")
    });
    _peer.on('call', (call) => {
      const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({video: true, audio: true}, (stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
          console.log('received stream',remoteStream)
          clientVideo.current.srcObject = stream;
          otherVideo.current.srcObject = remoteStream
          setconn(call)
        });
        call.on('error', (err) => {alert(err);stream.getTracks().forEach(track => track.stop())})
      }, (err) => {
        console.error('Failed to get local stream', err);
        
      });
      
    });
    
  }, []);
  const back = () => {
    peer.destroy();
    window.location.reload(false);
  };
  const openWebCam = () => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        
        const call = peer.call(peerConnectID, stream);
        call.on('stream', (remoteStream) => {
          console.log('received stream',remoteStream)
          clientVideo.current.srcObject = stream;
          otherVideo.current.srcObject = remoteStream
          setconn(call)
        });
        call.on('error', (err) => {
          alert(err)
          stream.getTracks().forEach(track => track.stop())
        });        
      },
      (fail) => alert(`ไม่สามารถเปิดกล้องได้`)
    );
  };
  const connectPeer = (option) => {
    if(option === 1){
      openWebCam()
    }else if(option === 2){
      const _conn = peer.connect(peerConnectID);
      console.log("<<---:E: peer connection");
      console.log(_conn)
      _conn.on('open', () => {
        const data = peer.id
        _conn.send({type:'chat' ,data:data} );
      });
      setconn(_conn);
     _conn.on("data", (data) => {
       if(data.type === 'chat'){
        setmessages(prev=>[...prev,data.data])
        _conn.send(`สวัสดี ${peerConnectID} จาก ${peer.id}`);
        setoptional(2)
        }
      });
      
       _conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });
      
    }else if(option === 3){
      setoptional(3)
    }else{
      alert("fail to connect")
    }
  };
  const [typemsg, settypemsg] = useState("")
  const chat = () =>{
    return(<>{
    messages.map((msg,ind)=>(
      <Card key={ind+msg} maxWidth="sm">
        <CardContent>{msg}</CardContent>
      </Card>
    ))}
    <TextField type="text" label="ใส่ข้อความ" defaultValue={typemsg} onChange={e=>settypemsg(e.target.value)} onKeyDown={e => {if(e.key=='Enter') conn.send(typemsg)}}/>
    </>)
  }
  return (
    <>
      {peer ? (
        <>
        <Container theme={theme} maxWidth="sm">
          <Card>
            <CardContent>
              <Tooltip title="กดเพื่อคัดลอก">
                <Typography
                  variant="h6"
                  onClick={() => navigator.clipboard.writeText(peer.id)}
                >
                  ID : {peer._id}{" "}
                </Typography>
              </Tooltip>
            </CardContent>
            {conn ? (
              <CardActions>
                <Button size="small" onClick={() => back()}>
                  ย้อนกลับ
                </Button>
              </CardActions>
            ) : (
              <>
                <hr />
                <Grid container  spacing={12}>
                  <Grid Item xs={12}>
                    <TextField
                      type="text"
                      label="ID เพื่อน "
                      onChange={(e) => setpeerConnectID(e.target.value)}
                    />
                  </Grid>
                  <Grid Item xs={3}>
                    <Button
                      size="small"
                      onClick={() => {connectPeer(1)}}
                      disabled={!peerConnectID ? true : false}
                    >
                      กล้อง
                    </Button>
                  </Grid>
                  <Grid Item xs={3}>
                    <Button
                      size="small"
                      onClick={() => connectPeer(2)}
                      disabled={!peerConnectID ? true : false}
                    >
                      แชท
                    </Button>
                  </Grid>
                  <Grid Item xs={3}>
                    <Button
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
        <Grid container justify = "center">
        {optional === 2 ? <>{chat()}</> : optional ===3 ? <></>: <></>}
      </Grid>
      <Grid container justify = "center">
        <video display="flex"  ref={clientVideo} width="50%" autoPlay muted/>
          <video display="flex"  ref={otherVideo} width="50%" autoPlay />
        </Grid>
        </>

      ) : (
        <></>
      )}
    </>
  );
};

export default App;
