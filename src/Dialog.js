import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from "@mui/material/Typography";
import {DialogContent, useMediaQuery, useTheme} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Row, Column, Item } from '@mui-treasury/components/flex';

const useBasicProfileStyles = makeStyles(({ palette }) => ({
    avatar: {
        borderRadius: 8,
        backgroundColor: '#495869',
    },
    overline: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#8D9CAD',
    },
    name: {
        fontSize: 14,
        fontWeight: 500,
        color: '#495869',
    },
}));

const useCardHeaderStyles = makeStyles(() => ({
    root: { paddingBottom: 0 },
    title: {
        fontSize: '1.25rem',
        color: '#122740',
    },
    subheader: {
        fontSize: '0.875rem',
        color: '#495869',
    },
}));


export default function ProductDialog(props) {
    const { onClose, selectedValue, open } = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const gap = { xs: 1, sm: 1.5, lg: 2 }
    const styles = useCardHeaderStyles();
    const styles3 = useBasicProfileStyles();

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
                <Row p={{ xs: 0.5, sm: 0.75, lg: 1 }} gap={gap}>
                    <Item grow>
                        <Box minHeight={200} bgcolor={'#F4F7FA'} borderRadius={8} />
                    </Item>
                    <Column>
                        <Row {...props}>
                            <Item position={'middle'}>
                                <Typography className={styles.title}>
                                    <b>Firebase</b>
                                </Typography>
                                <Typography className={styles.subheader}>
                                    Similar to firebase theme
                                </Typography>
                            </Item>
                        </Row>
                        <Row position={'bottom'}>
                            <Item><Avatar className={styles3.avatar}>S</Avatar></Item>
                            <Item position={'middle'} pl={{ sm: 0.5, lg: 0.5 }}>
                                <Typography className={styles3.overline}>CREATOR</Typography>
                                <Typography className={styles3.name}>siriwatknp</Typography>
                            </Item>
                        </Row>
                    </Column>
                </Row>
            </DialogContent>
        </Dialog>
    );
}

