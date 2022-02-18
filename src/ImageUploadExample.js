import {Component} from "react";
import {Container, Input} from "@mui/material";
import {Row} from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

class ImageUploadExample extends Component {
    constructor() {
        super();
        this.state = {
            picture: null
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
    };

    uploadImage = () => {
        const myToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMmUzMmZkYzUxNWJkMDAzMTM0YWFjYSIsImlhdCI6MTY0NTE3NTIyNywiZXhwIjoxNjQ1MjYxNjI3LCJpc3MiOiJzdHJhcGkifQ.ulULRtOFmPGnjzqGtGoLu1s5bETL2T_8lIgokUhOPCI';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + myToken,
            },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('http://zion.datafactor.it:40505/image-uploadeds', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id }));
    }

    render() {
        return (
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row className="justify-content-center">
                    <Typography variant='h2' className='text-center'>Prova upload immagine</Typography>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <label htmlFor="contained-button-file" className='text-center'>
                        <Input accept="image/*" id="contained-button-file" type="file" hidden onChange={this.onChangePicture.bind(this)}/>
                        <Button variant="contained" component="span">
                            CARICA IMMAGINE
                        </Button>
                    </label>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <img  src={this.state.picture}/>
                </Row>
            </Container>
        )
    }
}

export default ImageUploadExample;