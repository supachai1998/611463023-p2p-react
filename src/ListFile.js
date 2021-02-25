import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ImageIcon from '@material-ui/icons/Image';
import CardMedia from '@material-ui/core/CardMedia';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}
const imagetype = ['jpg','jpeg','png','gif','svg']
const ListFile = ({file}) => {
    console.log(file.type,file.type.split('/'))
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <ListItemLink href='#' onClick={()=>window.open(file.url, "_blank")} >
            <ListItemIcon>
                {file.type.split('/')[0] === 'image' ? <img width={30} height={30} src={file.url} />: <FileCopyIcon/> }
            </ListItemIcon>
            <ListItemText  > {file.name}</ListItemText>
      </ListItemLink>
      </div>
    );
}

export default ListFile;
