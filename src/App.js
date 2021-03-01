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
  List,
  Paper ,


} from "@material-ui/core";
import {Alert} from '@material-ui/lab/';
import { spacing ,positions } from '@material-ui/system';
import randomstring from 'randomstring'
import Peer from "peerjs";
import Cus_video from './video'
import ListFile from './ListFile'
import ListChat from './ListChat'
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
  const idenID = '-CS61'
  const generateID = randomstring.generate(2)
  const [peer, setpeer] = useState(new Peer(generateID+idenID,{
    initiator: true,
    trickle: false,
    secure: true,
    port: 443,
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302'  }, 
      { urls: 'stun:stun1.l.google.com:19302' }, 
      { urls: 'stun:stun2.l.google.com:19302' }, 
    ]
  }));
  const [peerStatus, setpeerStatus] = useState(false);
  const [peerID, setpeerID] = useState(generateID);
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
      console.log('connect server peerid : ',id)
      setpeerStatus(true)
    });
    peer.on("error", (err) => {
      setpeerStatus(false)
      setloadding(false)
      alert(err)
      failedtoJoinServer(err)
      reconnect()
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
          setmessages((prev) => [ { from: data.from, msg: data.data },...prev,]);
          setoptional(2);
        } else if (data.type === "file") {
          setoptional(3);
          console.log(data);
          if (data.filename) {
            const blob = new Blob([data.file], {type: data.data_type});
            const url = URL.createObjectURL(blob);
            setlistFile(prev=>[{name:data.filename,url:url,type:data.data_type},...prev,]);
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
        console.log(err)
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
  }, [peer]);
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
        
        const call = peer.call(peerConnectID+idenID, stream);
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
      const conn =  peer.connect(peerConnectID+idenID);
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
          setmessages((prev) => [ { from: data.from, msg: data.data },...prev,]);
          setoptional(2);
        } else if (data.type === "file") {
          setoptional(3);
          console.log(data);
          if (data.filename) {
            const blob = new Blob([data.file], {type: data.type});
            const url = URL.createObjectURL(blob);
            setlistFile(prev=>[{name:data.filename,url:url,type:data.data_type},...prev,]);
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
      const conn = peer.connect(peerConnectID+idenID);
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
          setlistFile(prev=>[{name:data.filename,url:url,type:data.data_type},...prev,]);
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
      <div style={{margin:'16px auto'}}>
        <Paper  style={{maxHeight: 200, overflow: 'auto'}}>
          <List>
              {messages.map((data, ind) => <ListChat key={ind} data={data} peer={peer} />)}
          </List>
        </Paper>
        <TextField
          type="text"
          label="ใส่ข้อความ"
          style={{margin:'16px auto' ,width:"100%"}}

          defaultValue={typemsg}
          onChange={(e) => settypemsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter" && typemsg.length > 0) {
              const msg = typemsg;
              const myid = peer.id;
              try{
                conn.send({ type: "chat", data: msg, from: myid });
              }catch(e){setloadding(false);console.warn(e.message); reconnect()}
              setmessages((prev) => [ { from: myid, msg: typemsg },...prev,]);
              e.target.value = "";
              settypemsg("")
            }
          }}
        />
      </div>
    );
  };
  const [file, setmyfile] = useState();
  const [buttonUpload, setbuttonUpload] = useState(true);

  const upload = () => {
    const onChangeHandler = (e) => {
      const file = e.target.files[0]
      if(file.size >= 5242880){
        setmyfile(file);
        setbuttonUpload(false);
      }else{
        alert("file ต้องมากกว่า 5MB")
      }
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
      setbuttonUpload(true);
    };
    return (
      <>
        <input
        style={{marginTop:"3% auto"}}
          type="file"
          accept="*"
          onChange={(e) => onChangeHandler(e)}
        />
        <Button
          variant="outlined"
          color="primary"
          style={{margin:" auto"}}
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
        <Container maxWidth="sm">
            <Card>
              <CardContent display="flex">
              {peerStatus ?  <Tooltip title="กดเพื่อคัดลอก">
                      <Alert
                        severity="success"
                        onClick={() => {
                          try {navigator.clipboard.writeText(peerID);} catch (e) {console.log("ERROR : ไม่สามารถใช้งานคลิกเพื่อคัดลอกได้ \n ให้ผู้ใช้คลุมเพื่อคัดลอกแทน \n");}}}>
                        ID : {peerID}{"  "}  
                        {peerStatus && !conn ?<Button variant="outlined" size="small" onClick={()=>{
                          const inputID = prompt("กรอก ID เป็นภาษาอังกฤษ")
                          if(inputID && inputID.length > 0){
                            setpeerStatus(false)
                            // peer.disconnect()
                              setpeer()
                              setpeer(new Peer(inputID+idenID,{
                                initiator: true,
                                trickle: false,
                                secure: true,
                                port: 443,
                                iceServers: [
                                  { urls: 'stun:stun.l.google.com:19302'  }, 
                                  { urls: 'stun:stun1.l.google.com:19302' }, 
                                  { urls: 'stun:stun2.l.google.com:19302' }, 
                                ]
                              }))
                              setpeerID(inputID)
                            }else{alert("กรุณาใส่ ID")}
                        }}>เปลี่ยน ID</Button> : <></>}
                        {conn ? <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    display="flex"
                    justify="space-between" 
                    style={{  justifyContent: 'flex'  }}
                    onClick={() => {try{conn.send({ type: "disconnect", success: "bye" })}catch(e){};reconnect()}}>
                    ออกจากระบบ</Button> : <></>}
                      </Alert>
                    </Tooltip> 
                  : <><Alert severity="warning"> กำลังเชื่อมต่อ  </Alert><LinearProgress  /></>}
                             
              </CardContent>
              {conn ? (
                <></>
              ) : (
                <>
                  <hr />
                  <Grid container xs={12} p="2" >
                  {peerStatus ?  
                    <Grid xs={10} style={{margin:"1% auto"}}>
                      <TextField
                        type="text"
                        label="ID เพื่อน "
                        defaultValue={prevpeerConnectID}
                        onChange={(e) =>{ setpeerConnectID(e.target.value);setprevpeerConnectID(e.target.value)}}
                      /> 
                    </Grid>: <LinearProgress  /> }
                   

                    
                    <Grid xs={3} style={{margin:"3% auto"}}>
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
                    <Grid xs={3} style={{margin:"3% auto"}}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => connectPeer(2)}
                        disabled={!peerConnectID && !prevpeerConnectID ? true : false}
                      >
                        แชท
                      </Button>
                    </Grid>
                    <Grid xs={3} style={{margin:"3% auto"}}>
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
          {listFile.length >0  ?
          <Container theme={theme} justify="center" maxWidth="sm" style={{marginTop:'2%'}}>
          <Paper  style={{maxHeight: 200, overflow: 'auto'}}>
            <List >
              {listFile && listFile.map((file,ind)=><ListFile key={ind} file={file} />)}
            </List>
            </Paper>
          </Container> : <></>}
          <Container theme={theme} maxWidth="sm" style={{marginTop:'2%'}}>
              {optional === 2 ? (
                <>{chat()}</>
              ) : optional === 3 && conn? (
                <>{upload()}</>
              ) : (
                <></>
              )}
          </Container>
          {loadding ? <LinearProgress style={{marginTop:'2%'}} />: <> </> }
          
          <Container theme={theme} justify="center" maxWidth="sm"  style={{marginTop:'2%'}}>
          {conn && optional === 1 ? <>Video ของคุณ {peer.id}</> : <></>}
            <video
              ref={clientVideo}
              style={{margin:"auto auto"}}
              width="100%"
              height="50%"
              autoPlay
              muted
            />
           
            {conn && optional === 1 ? <> <hr style={{margin: "10px 2px"}}/> Video เพื่อน</> : <></>}
            
            {objectVideo && objectVideo.map((stream,i)=><Cus_video key={i} stream={stream} />)}
           </Container>
          
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
