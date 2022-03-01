import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Row} from '@mui-treasury/components/flex';
import {Container} from "react-bootstrap";
import GridSystem from "./GridSystem";
import axios from "axios";
import {useParams} from "react-router-dom";
import GlobalContext from "./GlobalContext";
import UserCard from "./UserCard";
import UploadProductDialog from "./dialogs/UploadProductDialog";
import UpdateTitleDialog from "./dialogs/UpdateTitleDialog";
import Compressor from 'compressorjs';
import UpdateCarouselDialog from "./dialogs/UpdateCarouselDialog";


export default function User() {
    const [idShopStrapi, setIdShopStrapi] = useState(null)
    const [email, setEmail] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [carousel, setCarousel] = useState([])
    const [website, setWebsite] = useState(null)
    const [telephone, setTelephone] = useState(null)
    const [items, setItems] = useState([])
    const [uploadProductDialog, setUploadProductDialog] = useState(false)
    const [updateTitleDialog, setUpdateTitleDialog] = useState(false)
    const [updateCarouselDialog, setUpdateCarouselDialog] = useState(false)
    const [updateDescriptionDialog, setUpdateDescriptionDialog] = useState(false)
    const [updateTelephoneDialog, setUpdateTelephoneDialog] = useState(false)
    const {username} = useParams();
    const appContext = useContext(GlobalContext);

    const generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    const getUserInfo = () => {
        axios.get(appContext.hostShops + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        })
            .then((response) => {
                setIdShopStrapi(response.data[0].id)
                setEmail(response.data[0].email)
                setTitle(response.data[0].title)
                setDescription(response.data[0].description)
                setAvatar(appContext.host + response.data[0].avatar.url)
                setCarousel(response.data[0].carousel.map((element) => ({image: appContext.host + element.url})))
                setTelephone(response.data[0].telephone)
                setWebsite(response.data[0].website)
            }).catch((error) => {
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
                picture: appContext.host + element.picture.url
            }))
            setItems(items)
        }).catch((error) => {
        })
    }

    const updateAvatar = (e) => {
        const formData = new FormData();
        new Compressor(e.target.files[0], {
            quality: 0.1, success(result) {
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
        //todo

        // const formData = new FormData();
        // formData.append('files.carousel', e.target.files[0], 'example.jpg');
        // formData.append('data', JSON.stringify({}));
        // axios.put(appContext.hostShops + "/" + idShopStrapi, formData, {
        //     headers: {'Authorization': 'Bearer ' + appContext.token,}
        // }).then((response) => {
        //     getUserInfo();
        // }).catch((error) => {
        // })
    }

    const updateTitle = (params) => {
        //TODO

        // console.log(params)
        // const formData = new FormData();
        // const data = {
        //     title: params.title,
        //     description: params.description,
        //     username: username
        // };
        // formData.append('files.picture', params.rawPicture, params.rawPicture.name);
        // formData.append('data', JSON.stringify(data));
        // axios.post(appContext.hostProducts, formData, {headers: {
        //         'Authorization': 'Bearer ' + appContext.token,
        //     }}).then((response) => {
        //     getInitialItems();
        // }).catch((error) => {})
    }

    const uploadProduct = (params) => {
        const formData = new FormData();
        const data = {
            title: params.title,
            description: params.description,
            username: username
        };
        formData.append('files.picture', params.rawPicture, params.rawPicture.name);
        formData.append('data', JSON.stringify(data));
        axios.post(appContext.hostProducts, formData, {
            headers: {
                'Authorization': 'Bearer ' + appContext.token,
            }
        }).then((response) => {
            getInitialItems();
        }).catch((error) => {
        })
    }

    const openNewProductDialog = () => {
        setUploadProductDialog(true)
    }

    const closeNewProductDialog = () => {
        setUploadProductDialog(false)
    }

    const openUpdateTitleDialog = () => {
        setUpdateTitleDialog(true)
    }

    const closeUpdateTitleDialog = () => {
        setUpdateTitleDialog(false)
    }

    const openUpdateCarouselDialog = () => {
        setUpdateCarouselDialog(true)
    }

    const closeUpdateCarouselDialog = () => {
        setUpdateCarouselDialog(false)
    }

    const openUpdateDescriptionDialog = () => {
        setUpdateTitleDialog(true)
    }

    const closeUpdateDescriptionDialog = () => {
        setUpdateTitleDialog(false)
    }

    const openUpdateTelephoneDialog = () => {
        setUpdateTelephoneDialog(true)
    }

    const closeUpdateTelephoneDialog = () => {
        setUpdateTelephoneDialog(false)
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
                    openUpdateTitleDialog={openUpdateTitleDialog}
                    openUpdateDescriptionDialog={openUpdateDescriptionDialog}
                    openUpdateCarouselDialog={openUpdateCarouselDialog}
                    openUpdateTelephoneDialog={openUpdateTelephoneDialog}
                    openUploadProductDialog={openNewProductDialog}
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
            <UploadProductDialog open={uploadProductDialog} onClose={closeNewProductDialog} uploadProduct={uploadProduct}/>
            <UpdateTitleDialog open={updateTitleDialog} onClose={closeUpdateTitleDialog} updateTitle={updateTitle}/>
            <UpdateCarouselDialog open={updateCarouselDialog} onClose={closeUpdateCarouselDialog} updateCarousel={updateCarousel}
                                  carousel={carousel}/>

            <Container fluid>
                <GridSystem items={items} columnWidth={appContext.columnWidth} isUser={true}/>
            </Container>
        </>
    )
}