import React from 'react';
import {ListItem,Typography,Box   }  from '@material-ui/core';

const ListChat = ({data,peer}) => {
    return (
        <ListItem  style={{display:'flex', justifyContent:data.from === peer.id ?'flex-end' : 'flex-start'}} >
            <Box bgcolor="info">
                <Typography nowrap color={data.from === peer.id ?'primary' : 'initial'}>{data.msg}</Typography>
            </Box>
        </ListItem>
    );
}

export default ListChat;
