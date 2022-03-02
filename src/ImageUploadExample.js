import {useContext, useEffect, useState} from "react";
import {Container, Input} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import GlobalContext from "./GlobalContext";

function ImageUploadExample() {
    const [listPictures, setListPictures] = useState([])
    const [picture, setPicture] = useState(null);
    const [rawPicture, setRawPicture] = useState(null);
    const [downloadedPicture, setDownloadedPicture] = useState(null);
    const appContext = useContext(GlobalContext);

    const onChangePicture = (e) => {
        let tmpPicture = URL.createObjectURL(e.target.files[0])
        let tmpRawPicture = e.target.files[0]
        setPicture(tmpPicture);
        setRawPicture(tmpRawPicture);
        let tmpList = listPictures;
        tmpList.push(tmpRawPicture)
        setListPictures(tmpList)
    };

    const uploadImage = () => {
        axios.get(appContext.hostExample, {headers: {'Authorization': 'Bearer ' + appContext.token,}})
            .then((response) => {
                let id = response.data[2].id
                const formData = new FormData();
                const data = {

                };
                // formData.append('files.carousel',[]);
                formData.append('files.carousel', listPictures[0]);
                // formData.append('files.carousel', listPictures[1]);

                formData.append('data', JSON.stringify({}));

                data['files.carousel[1]'] = null

                axios.put(appContext.hostExample + '/' + id, data, {headers: {
                        'Authorization': 'Bearer ' + appContext.token,
                    }})
                    .then((response) => {
                        getImages();
                    }).catch((error) => {})

            }).catch((error) => {})





        //*************************//
        // const formData = new FormData();
        // const data = {
        //     email: 'ok6@ok6.it',
        // };
        // formData.append('files.image', rawPicture, 'kurisu.jpg');
        // formData.append('files.carousel', listPictures[0]);
        // formData.append('files.carousel', listPictures[1]);
        // formData.append('data', JSON.stringify(data));
        // axios.post(appContext.hostExample, formData, {headers: {
        //         'Authorization': 'Bearer ' + appContext.token,
        //     }})
        //     .then((response) => {
        //         getImages();
        //     }).catch((error) => {})
    };

    const getImages = () => {
        axios.get(appContext.hostExample, {headers: {
                'Authorization': 'Bearer ' + appContext.token,
            }})
            .then((response) => {
                console.log(response)
                // setDownloadedPicture(appContext.host + response.data[0].image.url)
            }).catch((error) => {})
    };

    useEffect(() => {
        getImages();
    }, [])

    return (
        <Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <Row className="justify-content-md-center">
                <Typography variant='h2' className='text-center'>Prova upload immagine</Typography>
            </Row>
            <br/>
            <Row className="justify-content-md-center">
                <Col className='text-center'>
                    <label htmlFor="contained-button-file" className='text-center'>
                        <Input accept="image/*" id="contained-button-file" multiple type="file" hidden onChange={onChangePicture}/>
                        <Button variant="contained" component="span">
                            SCEGLI IMMAGINE
                        </Button>
                    </label>
                </Col>
                <Col className='text-center'>
                    <Button variant="contained" disabled={picture == null} onClick={uploadImage}>
                        UPLOAD IMMAGINE
                    </Button>
                </Col>
            </Row>
            <br/>
            <Row className="justify-content-center">
                {/*<img src={picture} alt=""/>*/}
                <Typography variant='h5' className='text-center'>Immagini pendenti: {listPictures.length}</Typography>

            </Row>
            <br/>
            <hr/>
            <br/>
            <Row className="justify-content-center">
                <img src={downloadedPicture} alt=""/>
            </Row>
        </Container>
    );
}

export default ImageUploadExample;