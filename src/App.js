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
  LinearProgress ,
} from "@material-ui/core";
import {Alert} from '@material-ui/lab/';
import { spacing ,positions } from '@material-ui/system';
import randomstring from 'randomstring'
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
// 'iceServers': [ { url: 'stun:stun.l.google.com:19302' }, { url: 'stun:stun1.l.google.com:19302' }, ],
const App = () => {
  const [peer, setpeer] = useState(new Peer(randomstring.generate(2)+'-CS',{
    initiator: true,
    trickle: false,
    secure: true,
  }));
  const [peerID, setpeerID] = useState(peer.id);
  const [conn, setconn] = useState();
  const [peerConnectID, setpeerConnectID] = useState();
  const [prevpeerConnectID, setprevpeerConnectID] = useState("");
  const [optional, setoptional] = useState();
  const [messages, setmessages] = useState([]);
  const clientVideo = useRef();
  const [objectVideo, setobjectVideo] = useState([]);
  const [listFile, setlistFile] = useState([]);

  const [loadding, setloadding] = useState(false);

  useEffect(() => {

    peer.on("open", (id) => {
      setpeerID(id)
    });
    peer.on("error", (err) => {
      setloadding(false)
      failedtoJoinServer(err)
    });
    peer.on("disconnected",()=>{
      console.log(`peer id ${peer.id} disconnected`)
      reconnect()
    })
    peer.on("connection", (conn) => {
      setloadding(true)
      setconn(conn);
      console.log(":N:--->> peer connection");
      console.log(conn);
      conn.on("open", () => {
        
        setloadding(false)
        const data = `${peer.id} is Joined`;
        conn.send({ type: "chat", data: data, from: peer.id });
      });
      conn.on("data", (data) => {
        setloadding(false)
        if (peerConnectID === undefined){
            setprevpeerConnectID(data.from)
           setpeerConnectID(data.from);
          }
        if (data.type === "disconnect"){
          // console.warn(`${peerConnectID} is disconnected`)
          console.log(`${peerConnectID} is disconnected`)
          reconnect()
        }
        if (data.type === "chat") {
          setmessages((prev) => [...prev, { from: data.from, msg: data.data }]);
          setoptional(2);
        } else if (data.type === "file") {
          setoptional(3);
          console.log(data);
          if (data.filename) {
            const blob = new Blob([data.file], {type: data.data_type});
            const url = URL.createObjectURL(blob);
            setlistFile(prev=>[...prev,{name:data.filename,url:url}]);
            // window.open(url, "_blank");
            if (url) {
              conn.send({ type: "connect", success: true });
            }
          }
        }
        else if (data.type === "connect" && data.success) {
          console.log("success");
          conn.send({ type: "connect", success: true });
        }
      });

      conn.on("error", (err) => {
        setloadding(false)
        failedtoJoinServer(err)
      });
    });

    peer.on("call", (call) => {
      
      setloadding(true)
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia || navigator.mozGetUserMedia.getUserMedia;
        
        
      navigator.getUserMedia (
        { video: { width: window.innerWidth / 2, height: window.innerHeight / 2 }, audio: true },
        (stream) => {
          clientVideo.current.srcObject = stream;
          call.answer(stream); 
          call.on("stream", (remoteStream) => {
            setprevpeerConnectID(call.peer)
            setloadding(false)
            prevStream.push(remoteStream)
            let pp = prevStream.filter( (ele, ind) => ind === prevStream.findIndex( elem =>  elem.id === ele.id))
            setobjectVideo(pp)
            setconn(call);
          });
          call.on("error", (err) => {
            setloadding(false)
            failedtoJoinServer(err)
            stream.getTracks().forEach((track) => track.stop());
          });
        },
        (err) => {
          setloadding(false)
          console.error("Failed to get local stream", err);
        }
      );
    });
  }, []);
  let prevStream = []

  const failedtoJoinServer = async (err) =>{
    if(err.type === 'unavailable-id'||err.type === 'peer-unavailable'){ 
      console.log(err); 
      setInterval(() => {
        peer.destroy()
      }, 2345);
      if(peer.disconnected)
        window.location.reload()
    }else{
      console.error(err)
    }
  }
  
  const reconnect = async () => {
    console.log('reconnect')
    window.location.reload()
  };
  const openWebCam = () => {
    setloadding(true)
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia || navigator.mozGetUserMedia.getUserMedia;

        
    navigator.getUserMedia (
      { video: { width: window.innerWidth / 2, height: window.innerHeight / 2 }, audio: true },
      (stream) => {
        
        const call = peer.call(peerConnectID, stream);
        console.log(` caller => `,call,stream)
        clientVideo.current.srcObject = stream;
        call.on("stream", (remoteStream) => {
          setloadding(false)
          prevStream.push(remoteStream)
          let pp = prevStream.filter( (ele, ind) => ind === prevStream.findIndex( elem =>  elem.id === ele.id))
          setobjectVideo(pp)
          setconn(call);
        });
        call.on("error", (err) => {
          setloadding(false)
          failedtoJoinServer(err)
          stream.getTracks().forEach((track) => track.stop());
          stream.getAudioTracks()[0].stop();
          stream.getVideoTracks()[0].stop();
        });
      },
      (fail) => {console.log(`ไม่สามารถเปิดกล้องได้`); console.log(fail);setloadding(false)}
    );
  };
  const connectPeer = (option) => {
    setloadding(true)
    if (option === 1) {
      openWebCam();
    } else if (option === 2) {
      const conn =  peer.connect(peerConnectID);
      console.log("<<---:E: peer connection");
      console.log(conn);
      
      conn.on("open", () => {
        
        setloadding(false)
        const data = `${peer.id} is Joined`;
        conn.send({ type: "chat", data: data, from: peer.id });
      });
      setconn(conn);
      conn.on("data", (data) => {
        setloadding(false)
        if (peerConnectID === undefined) {setpeerConnectID(data.from);}
        if (data.type === "chat") {
          setmessages((prev) => [...prev, { from: data.from, msg: data.data }]);
          setoptional(2);
        } else if (data.type === "file") {
          setoptional(3);
          console.log(data);
          if (data.filename) {
            const blob = new Blob([data.file], {type: data.type});
            const url = URL.createObjectURL(blob);
            setlistFile(prev=>[...prev,{name:data.filename,url:url}]);
            // window.open(url, "_blank");
            if (url) {
              conn.send({ type: "connect", success: true });
            }
          }
        }
        if (data.type === "disconnect"){
          
          // console.warn(`${peerConnectID} is disconnected`)
          console.log(`${peerConnectID} is disconnected`)
          setloadding(false)
          reconnect()
        }
      });

      conn.on("error", (err) => {
        setloadding(false)
        failedtoJoinServer(err)
      });
    } else if (option === 3) {
      const conn = peer.connect(peerConnectID);
      console.log("<<---:E: peer connection");
      console.log(conn);
      conn.on("open", () => {
        setloadding(false)
        const data = `${peer.id} is Joined`;
        conn.send({ type: "file", data: data, from: peer.id });
      });
      setconn(conn);
      conn.on("data", (data) => {
        setloadding(false)
       if (data.type === "file") {
        setoptional(3);
        console.log(data);
        if (data.filename) {
          const blob = new Blob([data.file], {type: data.data_type});
          const url = URL.createObjectURL(blob);
          setlistFile(prev=>[...prev,{name:data.filename,url:url}]);
          // window.open(url, "_blank");
          if (url) {
            conn.send({ type: "connect", success: true });
          }
        }
      }
        if (data.type === "disconnect"){
          // console.warn(`${peerConnectID} is disconnected`)
          console.log(`${peerConnectID} is disconnected`)
          conn.send({ type: "disconnect", from: peer.id });
        }
      });

      conn.on("error", (err) => {
        setloadding(false)
        failedtoJoinServer(err)
      });
      setoptional(3);
    } else {
      setloadding(false)
      console.warn("fail to connect");
      
    }
  };
  const [typemsg, settypemsg] = useState("");

  const chat = () => {
    return (
      <>
        {messages.map((data, ind) => (
          <Grid key={ind + data.from + data.msg} Item={true} xs={12}>
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
            if (e.key == "Enter" && typemsg.length > 0) {
              const msg = typemsg;
              const myid = peer.id;
              try{
                conn.send({ type: "chat", data: msg, from: myid });
              }catch(e){setloadding(false);console.warn(e.message); reconnect()}
              setmessages((prev) => [...prev, { from: myid, msg: typemsg }]);
              e.target.value = "";
              settypemsg("")
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
      const blob = new Blob([file], {type: file.type});
        conn.send({
          type: 'file',
          data_type:file.type,
          file: blob,
          filename: file.name,
          from: peer.id,
        });
        console.log('send ',file.name)
      //
    };
    return (
      <>
        <input
        style={{marginTop:"3%"}}
          type="file"
          accept="*"
          onChange={(e) => onChangeHandler(e)}
        />
        <Button
          variant="outlined"
          color="primary"
          style={{marginTop:"3%"}}
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
                      <Alert
                        severity="success"
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
                      </Alert>
                    </Tooltip>

              </CardContent>
              {conn ? (
                <CardActions style={{ width: '90%', justifyContent: 'flex-end'  }}>
                  <Button
                    variant="contained"
                    size="small"
                    justify="space-between" 
                    onClick={() => {try{conn.send({ type: "disconnect", success: "bye" })}catch(e){};reconnect()}}
                  >
                    ย้อนกลับ
                  </Button>
                  </CardActions>

              ) : (
                <>
                  <hr />
                  <Grid container xs={12} p="2">
                    <Grid Item={true} xs={10}>
                      <TextField
                        type="text"
                        label="ID เพื่อน "
                        defaultValue={prevpeerConnectID}
                        onChange={(e) =>{ setpeerConnectID(e.target.value);setprevpeerConnectID(e.target.value)}}
                      />
                    </Grid>
                    <Grid Item={true} xs={3}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          console.log('open camera')
                          connectPeer(1);
                        }}
                        disabled={!peerConnectID && !prevpeerConnectID ? true : false}
                      >
                        กล้อง
                      </Button>
                    </Grid>
                    <Grid Item={true} xs={3}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => connectPeer(2)}
                        disabled={!peerConnectID && !prevpeerConnectID ? true : false}
                      >
                        แชท
                      </Button>
                    </Grid>
                    <Grid Item={true} xs={3}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => connectPeer(3)}
                        disabled={!peerConnectID && !prevpeerConnectID ? true : false}
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
              ) : optional === 3 && conn? (
                <>{upload()}</>
              ) : (
                <></>
              )}
            </Grid>
          </Container>
          {loadding ? <LinearProgress style={{marginTop:'1%'}} />: <> </> }
          
          <Container theme={theme} justify="center" maxWidth="sm" mt={2}>
          {listFile && listFile.map((file,ind)=>
              <p key={ind}>
                <a href="#" onClick={()=>window.open(file.url, "_blank")}> {file.name}</a>
              </p>
            )}
          </Container>
          <Grid container justify="center">
            {/* setlistFile(prev=>[...prev,{name:data.filename,url:url}]); */}
            
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
