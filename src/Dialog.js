import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {DialogContent, useMediaQuery, useTheme} from "@mui/material";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CallMade from '@material-ui/icons/CallMade';
import { Row, Column, Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';



export default function ProductDialog(props) {
    const { onClose, selectedValue, open } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        onClose('ho chiuso');
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullScreen={fullScreen} fullWidth={true} maxWidth={'sm'}>
            <DialogTitle>Dettaglio prodotto</DialogTitle>
            <DialogContent>
                <Typography variant="h1">MOLTO BENE</Typography>
                {/*<Typography variant="h1">MOLTO BENE</Typography>*/}
                {/*<Typography variant="h1">MOLTO BENE</Typography>*/}
                {/*<Typography variant="h1">MOLTO BENE</Typography>*/}
                {/*<Typography variant="h1">MOLTO BENE</Typography>*/}

            </DialogContent>
        </Dialog>
    );
}


// export default function SimpleDialogDemo() {
//     const [open, setOpen] = React.useState(false);
//     const [selectedValue, setSelectedValue] = React.useState(emails[1]);
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = (value) => {
//         setOpen(false);
//         setSelectedValue(value);
//     };
//
//     return (
//         <div>
//             <Typography variant="subtitle1" component="div">
//                 Selected: {selectedValue}
//             </Typography>
//             <br />
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Open simple dialog
//             </Button>
//             <ProductDialog
//                 selectedValue={selectedValue}
//                 open={open}
//                 onClose={handleClose}
//             />
//         </div>
//     );
// }