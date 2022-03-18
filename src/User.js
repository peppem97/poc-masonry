import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Row} from '@mui-treasury/components/flex';
import {Container} from "react-bootstrap";
import GridSystem from "./GridSystem";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import GlobalContext from "./GlobalContext";
import UserCard from "./UserCard";
import UpdateProductDialog from "./dialogs/UpdateProductDialog";
import UpdateInfoDialog from "./dialogs/UpdateInfoDialog";
import Compressor from 'compressorjs';
import UpdateCarouselDialog from "./dialogs/UpdateCarouselDialog";
import {areAllFetched, generateHeight} from "./Utility";
import DeleteProductDialog from "./dialogs/DeleteProductDialog";
import {useDispatch, useSelector} from "react-redux";
import {setBusy, setIdle} from "./store/loading";
import {isError} from "./store/error";

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
    const [uploadProductDialogOpened, setUploadProductDialogOpened] = useState(false);
    const [updateCarouselDialogOpened, setUpdateCarouselDialogOpened] = useState(false);
    const [updateInfoDialogOpened, setUpdateInfoDialogOpened] = useState(false);
    const [deleteProductDialogOpened, setDeleteProductDialogOpened] = useState(false);
    const [updateProductDialogOpened, setUpdateProductDialogOpened] = useState(false);
    const [info, setInfo] = useState(null);
    const [infoToEdit, setInfoToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const {username} = useParams();
    const appContext = useContext(GlobalContext);
    const token = useSelector((state) => state.token.value);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const getUserInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_SHOPS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            setId(response.data[0]?.id);
            setEmail(response.data[0]?.email);
            setTitle(response.data[0]?.title);
            setDescription(response.data[0]?.description);
            setAvatar(appContext.HOST + response.data[0]?.avatar?.url);
            setCarousel(getCarousel(response.data[0]?.carousel0, response.data[0]?.carousel1, response.data[0]?.carousel2));
            setTelephone(response.data[0]?.telephone);
            setWebsite(response.data[0]?.website);
            dispatch(setIdle());
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
        })
    };

    const getProducts = () => {
        setLoadingProducts(true);
        axios.get(appContext.ENDPOINT_PRODUCTS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            let items = response.data.map((element) => ({
                height: generateHeight(),
                title: element?.title,
                id: element?.id,
                username: username,
                picture: appContext.HOST + element?.cover?.url
            }));
            setProducts(items);
            setLoadingProducts(false);
            dispatch(setIdle());
        }).catch(() => {
            setLoadingProducts(false);
            dispatch(setIdle());
            dispatch(isError('Si è verificato un errore nella ricezione dei prodotti. Riprovare ad aggiornare la pagina.'));
        })
    };

    const getCarousel = (...pictures) => {
        let returnList = [];
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i] != null) {
                returnList.push({index: i, image: appContext.HOST + pictures[i].url, rawImage: null, add: false});
            }
        }
        return returnList;
    };

    const updateAvatar = (e) => {
        dispatch(setBusy());
        const formData = new FormData();
        new Compressor(e.target.files[0], {
            quality: appContext.COMPRESSION_QUALITY, success(result) {
                formData.append('files.avatar', result, 'avatar.jpg');
                formData.append('data', JSON.stringify({}));
                axios.put(appContext.ENDPOINT_SHOPS + "/" + id, formData, {
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(() => {
                    dispatch(setIdle());
                    getUserInfo();
                }).catch(() => {
                    dispatch(setIdle());
                    dispatch(isError('Si è verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
                })
            }, error() {
                dispatch(setIdle());
                dispatch(isError('Si è verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
            }
        })
    };

    const updateCarousel = (pictures) => {
        let fetched = 0;
        for (let picture of pictures) {
            if (picture.image != null) {
                if (picture.rawImage != null) {
                    new Compressor(picture.rawImage, {
                        quality: appContext.COMPRESSION_QUALITY, success(result) {
                            dispatch(setBusy());
                            const formData = new FormData();
                            formData.append('files.carousel' + picture.index, result, 'example.jpg');
                            formData.append('data', JSON.stringify({}));
                            axios.put(appContext.ENDPOINT_SHOPS + "/" + id, formData, {
                                headers: {'Authorization': 'Bearer ' + token}
                            }).then(() => {
                                fetched++;
                                if (pictures.length === fetched) {
                                    dispatch(setIdle());
                                    getUserInfo();
                                }
                            }).catch(() => {
                                dispatch(setIdle());
                                dispatch(isError('Si è verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                            })
                        }, error() {
                            dispatch(setIdle());
                            dispatch(isError('Si è verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                        }
                    })
                } else {
                    fetched++;
                    if (pictures.length === fetched) {
                        dispatch(setIdle());
                        getUserInfo();
                    }
                }
            } else {
                dispatch(setBusy());
                let data = {};
                data['carousel' + picture.index] = null;
                axios.put(appContext.ENDPOINT_SHOPS + "/" + id, data, {
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(() => {
                    fetched++;
                    if (pictures.length === fetched) {
                        dispatch(setIdle());
                        getUserInfo();
                    }
                }).catch(() => {
                    dispatch(setIdle());
                    dispatch(isError('Si è verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                })
            }
        }
    };

    const updateInfo = (type, value) => {
        dispatch(setBusy());
        const data = {};
        const formData = new FormData();
        data[type] = value;
        formData.append('data', JSON.stringify(data));
        axios.put(appContext.ENDPOINT_SHOPS + "/" + id, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(() => {
            dispatch(setIdle());
            getUserInfo();
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si è verificato un errore nell\'aggiornamento dell\'informazione. Riprovare.'));
        })
    };

    const uploadProduct = (params) => {
        dispatch(setBusy());
        const formData = new FormData();
        const data = {
            title: params.title,
            description: params.description,
            price: params.price,
            pieces: params.pieces,
            username: username
        };
        formData.append('data', JSON.stringify(data));
        formData.append('files.cover', params.cover.rawPicture, params.cover.rawPicture.name);
        axios.post(appContext.ENDPOINT_PRODUCTS, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            let fetched = 0;
            for (let picture of params.pictures) {
                if (picture.image != null) {
                    new Compressor(picture.rawPicture, {
                        quality: appContext.COMPRESSION_QUALITY, success(result) {
                            const formData = new FormData();
                            formData.append('files.picture' + picture.index, result, picture.rawPicture.name);
                            formData.append('data', JSON.stringify({}));
                            axios.put(appContext.ENDPOINT_PRODUCTS + "/" + response?.data?.id, formData, {
                                headers: {
                                    'Authorization': 'Bearer ' + token
                                }
                            }).then(() => {
                                fetched++;
                                if (params.pictures.length === fetched) {
                                    dispatch(setIdle());
                                    getProducts();
                                }
                            }).catch(() => {
                                dispatch(setIdle());
                                dispatch(isError('Si è verificato un errore nel caricamento del prodotto. Riprovare.'));
                            })
                        }, error() {
                            dispatch(setIdle());
                            dispatch(isError('Si è verificato un errore nel caricamento del prodotto. Riprovare.'));
                        }
                    })
                } else {
                    dispatch(setBusy());
                    let data = {};
                    data['picture' + picture.index] = null;
                    axios.put(appContext.ENDPOINT_PRODUCTS + "/" + response.data.id, data, {
                        headers: {'Authorization': 'Bearer ' + token}
                    }).then(() => {
                        fetched++;
                        if (params.pictures.length === fetched) {
                            dispatch(setIdle());
                            getProducts();
                        }
                    }).catch(() => {
                        dispatch(setIdle());
                        dispatch(isError('Si è verificato un errore nel caricamento del prodotto. Riprovare.'));
                    })
                }
            }
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si è verificato un errore nel caricamento del prodotto. Riprovare.'));
        })
    };

    const updateProduct = (params) => {
        dispatch(setBusy());
        const data = {
            'title': params.title,
            'description': params.description,
            'price': params.price,
            'pieces': params.pieces
        };
        const formData = new FormData();
        if (params.cover.rawPicture != null) {
            formData.append('files.cover', params.cover.rawPicture, params.cover.rawPicture.name);
        }
        formData.append('data', JSON.stringify(data));
        axios.put(appContext.ENDPOINT_PRODUCTS + "/" + productToUpdate, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(() => {
            let fetched = 0;
            for (let picture of params.pictures) {
                if (picture.image != null) {
                    if (picture.rawImage != null) {
                        new Compressor(picture.rawPicture, {
                            quality: appContext.COMPRESSION_QUALITY, success(result) {
                                const formData = new FormData();
                                formData.append('files.picture' + picture.index, result, 'example.jpg');
                                formData.append('data', JSON.stringify({}));
                                axios.put(appContext.ENDPOINT_PRODUCTS + "/" + productToUpdate, formData, {
                                    headers: {'Authorization': 'Bearer ' + token}
                                }).then(() => {
                                    fetched++;
                                    if (params.pictures.length === fetched) {
                                        dispatch(setIdle());
                                        getProducts();
                                    }
                                }).catch(() => {
                                    dispatch(setIdle());
                                    dispatch(isError('Si è verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
                                })
                            }, error() {
                                dispatch(setIdle());
                                dispatch(isError('Si è verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
                            }
                        })

                    } else {
                        fetched++;
                        if (params.pictures.length === fetched) {
                            dispatch(setIdle());
                            getProducts();
                        }
                    }
                } else {
                    let data = {};
                    data['picture' + picture.index] = null;
                    axios.put(appContext.ENDPOINT_PRODUCTS + "/" + productToUpdate, data, {
                        headers: {'Authorization': 'Bearer ' + token}
                    }).then(() => {
                        fetched++;
                        if (params.pictures.length === fetched) {
                            dispatch(setIdle());
                            getProducts();
                        }
                    }).catch(() => {
                        dispatch(setIdle());
                        dispatch(isError('Si è verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
                    })
                }
            }
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si è verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
        })
    };

    const deleteProduct = (consens) => {
        if (consens === true) {
            const formData = new FormData();
            formData.append('data', JSON.stringify({}));
            axios.delete(appContext.ENDPOINT_PRODUCTS + "/" + productToDelete, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(() => {
                dispatch(setIdle());
                getProducts();
            }).catch(() => {
                dispatch(setIdle());
                dispatch(isError('Si è verificato un errore nella cancellazione del prodotto. Riprovare.'));
            })
        }
    }

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
        setInfoToEdit(info);
        setUpdateInfoDialogOpened(true);
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
                    openUpdateCarouselDialog={() => {
                        setUpdateCarouselDialogOpened(true)
                    }}
                    openUploadProductDialog={() => {
                        setUploadProductDialogOpened(true)
                    }}
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
            <Container fluid>
                <GridSystem
                    loadingProducts={loadingProducts}
                    isProducts={true}
                    products={products}
                    isUser={true}
                    updateProduct={(id) => {
                        setProductToUpdate(id);
                        setUpdateProductDialogOpened(true);
                    }}
                    deleteProduct={(id) => {
                        setProductToDelete(id);
                        setDeleteProductDialogOpened(true);
                    }}/>
            </Container>
            <br/>
            <br/>
            <UpdateProductDialog
                open={uploadProductDialogOpened || updateProductDialogOpened}
                onClose={() => {
                    setUploadProductDialogOpened(false);
                    setUpdateProductDialogOpened(false);
                }}
                isUpdate={updateProductDialogOpened}
                isUpload={uploadProductDialogOpened}
                productToUpdate={productToUpdate}
                updateProduct={updateProduct}
                uploadProduct={uploadProduct}/>
            <UpdateInfoDialog
                open={updateInfoDialogOpened}
                infoToEdit={infoToEdit}
                onClose={() => {
                    setUpdateInfoDialogOpened(false)
                }}
                updateInfo={(e) => {
                    updateInfo(infoToEdit, e)
                }}
                info={info}/>
            <UpdateCarouselDialog
                open={updateCarouselDialogOpened}
                onClose={() => {
                    setUpdateCarouselDialogOpened(false)
                }}
                updateCarousel={updateCarousel}
                carousel={carousel}/>
            <DeleteProductDialog
                open={deleteProductDialogOpened}
                deleteProduct={deleteProduct}
                onClose={() => {
                    setDeleteProductDialogOpened(false)
                }}>
            </DeleteProductDialog>

        </>
    )
}