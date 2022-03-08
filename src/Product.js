import DialogTitle from "@mui/material/DialogTitle";
import {Card, CardContent, CardHeader, DialogContent, IconButton, ImageList, ImageListItem} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@mui/material/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {Container} from "react-bootstrap";
import PictureCard from "./PictureCard";
import * as React from "react";

export default function Product() {
    return (
        <></>
        // <Card>
        //         <CardHeader
        //             avatar={
        //                 <IconButton onClick={goToUser}>
        //                     <Avatar src={props.avatar}/>
        //                 </IconButton>
        //             }
        //             sx={{maxHeight: '60px'}}
        //             title={<Typography variant="h6">{props.shop}</Typography>}
        //         />
        //     <CardContent>
        //         <CardMedia
        //             height="350"
        //             component="img"
        //             image={props.picture}
        //         />
        //         <br/>
        //         <Typography gutterBottom variant="h5" component="div" className="text-center">
        //             {props.title}
        //         </Typography>
        //         <Typography variant="body2" color="text.secondary" className="text-center">
        //             {props.description}
        //         </Typography>
        //         <br/>
        //         <Container>
        //             <ImageList gap={50} cols={10} sx={{overflowX: 'auto', padding: '20px'}}>
        //                 {pictures.map((element) => {
        //                         if (!element.add) {
        //                             return <ImageListItem key={element.index} cols={1} rows={1}>
        //                                 <PictureCard picture={element.image}/>
        //                             </ImageListItem>
        //                         } else {
        //                             return null;
        //                         }
        //                     }
        //                 )}
        //
        //             </ImageList>
        //
        //         </Container>
        //     </CardContent>
        // </Card>
    )
}