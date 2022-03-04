import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Row} from '@mui-treasury/components/flex';
import {Container} from "react-bootstrap";
import GridSystem from "./GridSystem";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import GlobalContext from "./GlobalContext";
import UserCard from "./UserCard";
import UploadProductDialog from "./dialogs/UploadProductDialog";
import UpdateInfoDialog from "./dialogs/UpdateInfoDialog";
import Compressor from 'compressorjs';
import UpdateCarouselDialog from "./dialogs/UpdateCarouselDialog";
import {Backdrop, CircularProgress} from "@mui/material";
import {generateHeight} from "./Utility";


export default function User() {
    const [id, setId] = useState(null);
    const [email, setEmail] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [website, setWebsite] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [carousel, setCarousel] = useState([]);
    const [products, setProducts] = useState([]);
    const [uploadProductDialog, setUploadProductDialog] = useState(false);
    const [updateCarouselDialog, setUpdateCarouselDialog] = useState(false);
    const [updateInfoDialog, setUpdateInfoDialog] = useState(false);
    const [info, setInfo] = useState(null);
    const [infoToEdit, setInfoToEdit] = useState(null);
    const [loading, setLoading] = useState(null);
    const {username} = useParams();
    const appContext = useContext(GlobalContext);
    let navigate = useNavigate();

    const getUserInfo = () => {
        axios.get(appContext.hostShops + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            setId(response.data[0].id);
            setEmail(response.data[0].email);
            setTitle(response.data[0].title);
            setDescription(response.data[0].description);
            setAvatar(appContext.host + response.data[0].avatar?.url);
            setCarousel(getCarousel(response.data[0].carousel0, response.data[0].carousel1, response.data[0].carousel2));
            setTelephone(response.data[0].telephone);
            setWebsite(response.data[0].website);
        }).catch((error) => {
            navigate('/no-user');
        })
    };

    const getProducts = () => {
        axios.get(appContext.hostProducts + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            let items = response.data.map((element) => ({
                height: generateHeight(),
                title: element.title,
                token: appContext.token,
                id: element.id,
                description: element.description,
                username: username,
                picture: appContext.host + element.cover.url
            }));
            setProducts(items);
        }).catch((error) => {
        })
    };

    const getCarousel = (...pictures) => {
        let returnList = [];
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i] != null) {
                returnList.push({index: i, image: appContext.host + pictures[i].url, rawImage: null, add: false});
            }
        }
        return returnList;
    };

    const updateAvatar = (e) => {
        setLoading(true);
        const formData = new FormData();
        new Compressor(e.target.files[0], {
            quality: appContext.qualityPictures, success(result) {
                formData.append('files.avatar', result, 'avatar.jpg');
                formData.append('data', JSON.stringify({}));
                axios.put(appContext.hostShops + "/" + id, formData, {
                    headers: {'Authorization': 'Bearer ' + appContext.token,}
                }).then((response) => {
                    getUserInfo();
                    setLoading(false);
                }).catch((error) => {})
            }, error(err) {}
        })
    };

    const updateCarousel = (pictures) => {
        for (let picture of pictures) {
            if (picture.image != null) {
                new Compressor(picture.rawImage, {
                    quality: appContext.qualityPictures, success(result) {
                        setLoading(true);
                        const formData = new FormData();
                        formData.append('files.carousel' + picture.index, result, 'example.jpg');
                        formData.append('data', JSON.stringify({}));
                        axios.put(appContext.hostShops + "/" + id, formData, {
                            headers: {'Authorization': 'Bearer ' + appContext.token,}
                        }).then((response) => {
                            getUserInfo();
                            setLoading(false)
                        }).catch((error) => {})
                    }, error(err) {}
                })
            } else {
                setLoading(true);
                let data = {};
                data['carousel' + picture.index] = null;
                axios.put(appContext.hostShops + "/" + id, data, {
                    headers: {'Authorization': 'Bearer ' + appContext.token,}
                }).then((response) => {
                    getUserInfo();
                    setLoading(false);
                }).catch((error) => {})
            }
        }
    };

    const updateInfo = (type, value) => {
        setLoading(true)
        const data = {};
        data[type] = value;
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        axios.put(appContext.hostShops + "/" + id, formData, {headers: {
                'Authorization': 'Bearer ' + appContext.token,
            }}).then((response) => {
            getUserInfo();
            setLoading(false);
        }).catch((error) => {})
    };

    const uploadProduct = (params) => {
        setLoading(true);
        new Compressor(params.rawPicture, {
            quality: appContext.qualityPictures, success(result) {
                const formData = new FormData();
                const data = {
                    title: params.title,
                    description: params.description,
                    username: username
                };
                formData.append('files.cover', result, params.rawPicture.name);
                formData.append('data', JSON.stringify(data));
                axios.post(appContext.hostProducts, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + appContext.token,
                    }
                }).then((response) => {
                    getProducts();
                    setLoading(false);
                }).catch((error) => {
                })
            }, error(err) {
            }
        })
    };

    const openInfoDialog = (info) => {
        switch (info) {
            case 'title':
                setInfo(title);
                break;
            case 'website':
                setInfo(website);
                break;
            case 'email':
                setInfo(email);
                break;
            case 'telephone':
                setInfo(telephone);
                break;
            case 'description':
                setInfo(description);
                break;
            default:
                break;
        }
        setInfoToEdit(info)
        setUpdateInfoDialog(true);
    };

    useEffect(() => {
        getUserInfo();
        getProducts();
    }, []);

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <UserCard
                    email={email}
                    title={title}
                    description={description}
                    avatar={avatar}
                    carousel={carousel}
                    website={website}
                    telephone={telephone}
                    openUpdateCarouselDialog={() => {setUpdateCarouselDialog(true)}}
                    openUploadProductDialog={() => {setUploadProductDialog(true)}}
                    openUpdateInfoDialog={openInfoDialog}
                    updateAvatar={updateAvatar}/>
                <br/>
                <br/>
                <br/>
                <Row className="justify-content-center">
                    <Typography variant="h3" gutterBottom component="div" className="text-center"
                                style={{color: 'darkred', fontWeight: 'bold'}}>
                        Tutti i prodotti:
                    </Typography>
                </Row>
            </Container>
            <UploadProductDialog
                open={uploadProductDialog}
                onClose={() => {setUploadProductDialog(false)}}
                uploadProduct={uploadProduct}/>
            <UpdateInfoDialog
                open={updateInfoDialog}
                infoToEdit={infoToEdit}
                onClose={() => {setUpdateInfoDialog(false)}}
                updateInfo={(e) => {updateInfo(infoToEdit, e)}}
                info={info}/>
            <UpdateCarouselDialog
                open={updateCarouselDialog}
                onClose={() => {setUpdateCarouselDialog(false)}}
                updateCarousel={updateCarousel}
                carousel={carousel}/>
            <Container fluid>
                <GridSystem products={products} columnWidth={appContext.columnWidth} isUser={true}/>
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}