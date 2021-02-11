import React, { useState, useRef, useEffect } from "react";
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
const peer = new Peer(uuid(), {
  host: "localhost",
  port: 9000,
  path: "/myapp",
  secure: false,
});
const App = () => {
  const [conn, setconn] = useState();
  const [peerConnectID, setpeerConnectID] = useState();
  const [optional, setoptional] = useState();
  const [messages, setmessages] = useState([])
  const clientVideo = useRef();
  const otherVideo = useRef();
  const img = useRef()
  useEffect(() => {
    peer.on("open", (id) => {
      // console.log(id);
    });
    peer.on("error", (err) => {
      alert(err);
      setconn(null);
      setpeerConnectID(null);
    });
    peer.on("connection", (conn) => {

      setconn(conn);
      console.log(":N:--->> peer connection");
      console.log(conn)
      conn.on("open", () => {
        const data = `${peer.id} is Joined`
        conn.send({ type: 'chat', data: data, from: peer.id });
      });
      conn.on("data", (data) => {
        if (data.type === 'chat') {
          setmessages(prev => [...prev, { from: data.from, msg: data.data }])
          setoptional(2)
        }else if (data.type === 'file') {
          setoptional(3)
          console.log(data)
          if(data.filename){
          var arrayBufferView = new Uint8Array( data.data )
          const blob = new Blob( [arrayBufferView], { type: "image/jpeg" });
          const url = URL.createObjectURL( blob );
          console.log(url)
          img.current.src = url
          window.open(url, "_blank")
          if(url) {conn.send({ type:'connect',success:true});}}
        }
        if(data.type==='connect' && data.success) {console.log("success");conn.send({ type:'connect',success:true}) }
      });

      conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });
    });

    peer.on("disconnect", () => {
      setconn();
      console.log("disconnect")
    });
    peer.on('call', (call) => {
      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
          console.log('received stream', remoteStream)
          clientVideo.current.srcObject = stream;
          otherVideo.current.srcObject = remoteStream
          setconn(call)
        });
        call.on('error', (err) => { alert(err); stream.getTracks().forEach(track => track.stop()) })
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
          console.log('received stream', remoteStream)
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
    if (option === 1) {
      openWebCam()
    } else if (option === 2) {
      const conn = peer.connect(peerConnectID);
      console.log("<<---:E: peer connection");
      console.log(conn)
      conn.on('open', () => {
        const data = `${peer.id} is Joined`
        conn.send({ type: 'chat', data: data, from: peer.id });
      });
      setconn(conn);
      conn.on("data", (data) => {
        if (data.type === 'chat') {
          setmessages(prev => [...prev, { from: data.from, msg: data.data }])
          setoptional(2)
        }
      });

      conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });

    } else if (option === 3) {
      const conn = peer.connect(peerConnectID);
      console.log("<<---:E: peer connection");
      console.log(conn)
      conn.on('open', () => {
        const data = `${peer.id} is Joined`
        conn.send({ type: 'file', data: data, from: peer.id });
      });
      setconn(conn);
      conn.on("data", (data) => {
        if (data.type === 'file') {
          setmessages(prev => [...prev, { from: data.from, msg: data.data }])
        }
      });

      conn.on("error", (err) => {
        setconn(null);
        setpeerConnectID(null);
      });
      setoptional(3)
    } else {
      alert("fail to connect")
    }
  };
  const [typemsg, settypemsg] = useState("")
  const chat = () => {
    return (<>{
      messages.map((data, ind) => (
        <Grid key={ind + data.from + data.msg} Item xs={12}>
          <Card  maxWidth="sm">
            <Typography align={data.from === peer.id ? "right" : "left"} color={data.from === peer.id ? "primary" : "textPrimary"}>{data.msg}</Typography>
          </Card>
        </Grid>
      ))}
      <TextField type="text" label="ใส่ข้อความ" defaultValue={typemsg} onChange={e => settypemsg(e.target.value)} onKeyDown={e => {
        if (e.key == 'Enter') {
          const msg = typemsg
          const myid = peer.id
          conn.send({ type: 'chat', data: msg, from: myid });
          setmessages(prev => [...prev, { from: myid, msg: typemsg }]);
          e.target.value = ""
        }
      }} />
    </>)
  }
  const [file, setmyfile] = useState()
  const [buttonUpload, setbuttonUpload] = useState(true)
  
  const upload = () =>{
    const onChangeHandler = (e) =>{
      setmyfile(e.target.files[0])
      
     
      setbuttonUpload(false)
    }
    const onClickHandler = () => {
      const fileReader = new FileReader();

      const slice = file.slice(0, 10485760);
      fileReader.readAsArrayBuffer(slice);
      fileReader.onload = (evt) => {
        const arrayBuffer = fileReader.result;
        conn.send({ type: 'file', data: arrayBuffer,filename:file.name, from: peer.id })
      };
      // 
    }
    return(
      <>
        <input type="file" accept="image/*" onChange={e =>onChangeHandler(e)}/>
        <Button variant="outlined" color="primary" disabled={buttonUpload} onClick={() =>onClickHandler()}>
        Upload
        </Button>
      </>
    )
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
                <CardActions justify="space-between">
                  <Button variant="contained" size="small" onClick={() => back()} >
                    ย้อนกลับ
                </Button>
                </CardActions>
              ) : (
                  <>
                    <hr />
                    <Grid container spacing={12}>
                      <Grid Item xs={12}>
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
                          onClick={() => { connectPeer(1) }}
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
          <Container theme={theme} maxWidth="sm" mt={10}>
            <Grid container justify="center" >
              {optional === 2 ? <>{chat()}</> : optional === 3 ? <>{upload()}</> : <></>}
            </Grid>
          </Container>
          
          <Grid container justify="center" >
            <image ref={img}/>
            <video display="flex" ref={clientVideo} width="50%" autoPlay muted />
            <video display="flex" ref={otherVideo} width="50%" autoPlay />
          </Grid>
        </>

      ) : (
          <></>
        )}
    </>
  );
};

export default App;
