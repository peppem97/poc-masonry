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


export default function User() {
    const [idShopStrapi, setIdShopStrapi] = useState(null)

    const [email, setEmail] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [website, setWebsite] = useState(null)
    const [telephone, setTelephone] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [carousel, setCarousel] = useState([])

    const [items, setItems] = useState([])
    const [uploadProductDialog, setUploadProductDialog] = useState(false)
    const [updateCarouselDialog, setUpdateCarouselDialog] = useState(false)
    const [updateInfoDialog, setUpdateInfoDialog] = useState(false)
    const [info, setInfo] = useState(null)
    const [infoToEdit, setInfoToEdit] = useState(null)

    const {username} = useParams();
    const appContext = useContext(GlobalContext);
    let navigate = useNavigate();



    const generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    const getCarouselList = (...carousels) => {
        let returnList = []
        for (let i = 0; i < carousels.length; i++) {
            if (carousels[i] != null) {
                returnList.push({index: i, image: appContext.host + carousels[i].url, rawImage: null, add: false})
            }
        }
        return returnList
    }

    const getUserInfo = () => {
        axios.get(appContext.hostShops + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            console.log(response)
            setIdShopStrapi(response.data[0].id)
            setEmail(response.data[0].email)
            setTitle(response.data[0].title)
            setDescription(response.data[0].description)
            setAvatar(appContext.host + response.data[0].avatar?.url)
            setCarousel(getCarouselList(response.data[0].carousel0, response.data[0].carousel1, response.data[0].carousel2))
            // setCarousel(response.data[0].carousel.map((element, index) => ({index: index, image: appContext.host + element.url, rawImage: null, add: false})))
            setTelephone(response.data[0].telephone)
            setWebsite(response.data[0].website)
        }).catch((error) => {
            navigate('/no-user')
        })
    }

    const getInitialItems = () => {
        axios.get(appContext.hostProducts + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            let items = response.data.map((element) => ({
                height: generateHeight(),
                title: element.title,
                token: appContext.token,
                description: element.description,
                username: username,
                picture: appContext.host + element.cover.url
            }))
            setItems(items)
        }).catch((error) => {
        })
    }

    const updateAvatar = (e) => {
        const formData = new FormData();
        new Compressor(e.target.files[0], {
            quality: appContext.qualityPictures, success(result) {
                formData.append('files.avatar', result, 'avatar.jpg');
                formData.append('data', JSON.stringify({}));
                axios.put(appContext.hostShops + "/" + idShopStrapi, formData, {
                    headers: {'Authorization': 'Bearer ' + appContext.token,}
                }).then((response) => {
                    getUserInfo();
                }).catch((error) => {
                })
            }, error(err) {
            }
        })
    }

    const updateCarousel = (e) => {
        for (let picture of e) {
            if (picture.image != null) {
                new Compressor(picture.rawImage, {
                    quality: appContext.qualityPictures, success(result) {
                        const formData = new FormData();
                        formData.append('files.carousel' + picture.index, result, 'example.jpg');
                        formData.append('data', JSON.stringify({}));
                        axios.put(appContext.hostShops + "/" + idShopStrapi, formData, {
                            headers: {'Authorization': 'Bearer ' + appContext.token,}
                        }).then((response) => {
                            getUserInfo();
                        }).catch((error) => {
                        })
                    }, error(err) {
                    }
                })
            } else {
                let data = {}
                data['carousel' + picture.index] = null
                axios.put(appContext.hostShops + "/" + idShopStrapi, data, {
                    headers: {'Authorization': 'Bearer ' + appContext.token,}
                }).then((response) => {
                    getUserInfo();
                }).catch((error) => {
                })
            }
        }
    }

    const updateInfo = (type, value) => {
        const data = {};
        data[type] = value;
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        axios.put(appContext.hostShops + "/" + idShopStrapi, formData, {headers: {
                'Authorization': 'Bearer ' + appContext.token,
            }}).then((response) => {
            getUserInfo();
        }).catch((error) => {})

    }

    const uploadProduct = (params) => {
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
                    getInitialItems();
                }).catch((error) => {
                })


            }, error(err) {
            }
        })






    }

    const openInfoDialog = (info) => {
        switch (info) {
            case 'title':
                setInfo(title)
                break;
            case 'website':
                setInfo(website)
                break;
            case 'email':
                setInfo(email)
                break;
            case 'telephone':
                setInfo(telephone)
                break;
            case 'description':
                setInfo(description)
                break;
        }
        setInfoToEdit(info)
        setUpdateInfoDialog(true);
    }

    // const getMultipleItems = () => {
    //     props.setLoading(true)
    //     const newItems = [];
    //     for (let i = 0; i < 5; i++) {
    //         newItems.push({
    //             height: generateHeight(),
    //             imageCard: image,
    //             imageAvatar: 'https://i.pravatar.cc/300',
    //             user: 'Utente... ',
    //             title: 'Titolo...',
    //             description: 'Descrizione...'
    //         });
    //     }
    //     setItems([...items, ...newItems]);
    //     setTimeout(() => {
    //         props.setLoading(false)
    //     }, 500)
    // }

    useEffect(() => {
        getUserInfo();
        getInitialItems();
    }, [])

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
            {/*<UpdateDescriptionDialog*/}
            {/*    open={updateDescriptionDialog}*/}
            {/*    onClose={() => {setUpdateDescriptionDialog(false)}}*/}
            {/*    updateDescription={(e) => {updateInfo('description', e)}}*/}
            {/*    description={description}/>*/}
            <UpdateCarouselDialog
                open={updateCarouselDialog}
                onClose={() => {setUpdateCarouselDialog(false)}}
                updateCarousel={updateCarousel}
                carousel={carousel}/>
            <Container fluid>
                <GridSystem items={items} columnWidth={appContext.columnWidth} isUser={true}/>
            </Container>
        </>
    )
}