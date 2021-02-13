import React,{useRef,useEffect} from 'react';

const Cus_video = ({stream}) => {
    const domvideo = useRef()
    useEffect(() => {
        domvideo.current.srcObject = stream
    }, [])
    return (
        <video id={stream.id} ref={domvideo} width="50%" autoPlay display="flex"></video>
    );
}

export default Cus_video;
