import React from 'react';
import {ListItem }  from '@material-ui/core';

const ListChat = ({data,peer}) => {
    console.log(data)
    return (
        <ListItem  style={{display:'flex', justifyContent:data.from === peer.id ?'flex-end' : 'flex-start'}} >{data.msg}</ListItem>
    );
}

export default ListChat;
