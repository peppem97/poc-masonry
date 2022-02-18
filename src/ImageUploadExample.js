import {Component} from "react";
import {Backdrop, CircularProgress, Container, Input} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

class ImageUploadExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmUzMmZkYzUxNWJkMDAzMTM0YWFjYSIsImlhdCI6MTY0NTE3NTIyNywiZXhwIjoxNjQ1MjYxNjI3LCJpc3MiOiJzdHJhcGkifQ.ulULRtOFmPGnjzqGtGoLu1s5bETL2T_8lIgokUhOPCI',
            picture: null,
            rawPicture: null,
            downloadedPicture: null,
            loading: false
        };
    }

    onFileUpload = () => {

        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);
        axios.post("api/uploadfile", formData);
    };

    onChangePicture = (e) => {
        this.setState({picture: URL.createObjectURL(e.target.files[0])});
        this.setState({rawPicture: e.target.files[0]})
    };

    uploadImage = () => {
        this.setLoading();
        const formData = new FormData();
        const data = {
            email: 'ok6@ok6.it',
        };
        formData.append('files.image', this.state.rawPicture, 'kurisu.jpg');
        formData.append('data', JSON.stringify(data));
        axios.post("http://zion.datafactor.it:40505/image-uploadeds", formData, {headers: {
                'Authorization': 'Bearer ' + this.state.token,
            }})
            .then((response) => {
                this.setIdle();
                this.getImages();
            }).catch((error) => {})
    }

    getImages = () => {
        this.setLoading();
        axios.get("http://zion.datafactor.it:40505/image-uploadeds", {headers: {
                'Authorization': 'Bearer ' + this.state.token,
            }})
            .then((response) => {
                this.setState({downloadedPicture: "http://zion.datafactor.it:40505" + response.data[0].image.url})
                this.setIdle();
            }).catch((error) => {})
    }

    setLoading = () => {
        this.setState({loading: true});
    };

    setIdle = () => {
        this.setState({loading: false});
    };

    render() {
        return (
            <Container>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
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
                            <Input accept="image/*" id="contained-button-file" type="file" hidden onChange={this.onChangePicture.bind(this)}/>
                            <Button variant="contained" component="span">
                                SCEGLI IMMAGINE
                            </Button>
                        </label>
                    </Col>
                    <Col className='text-center'>
                        <Button variant="contained" disabled={this.state.picture == null} onClick={this.uploadImage.bind(this)}>
                            UPLOAD IMMAGINE
                        </Button>
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <img  src={this.state.picture}/>
                </Row>
                <br/>
                <hr/>
                <br/>
                <Row className="justify-content-center">
                    <img  src={this.state.downloadedPicture}/>
                </Row>
            </Container>
        )
    }
}

export default ImageUploadExample;