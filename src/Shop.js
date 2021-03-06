import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Container} from "react-bootstrap";
import GridSystem from "./GridSystem";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import GlobalContext from "./GlobalContext";
import ShopCard from "./ShopCard";
import UpdateProductDialog from "./dialogs/UpdateProductDialog";
import UpdateInfoDialog from "./dialogs/UpdateInfoDialog";
import Compressor from 'compressorjs';
import UpdateCarouselDialog from "./dialogs/UpdateCarouselDialog";
import {generateHeight} from "./Utility";
import DeleteProductDialog from "./dialogs/DeleteProductDialog";
import {useDispatch, useSelector} from "react-redux";
import {setBusy, setIdle} from "./store/loading";
import {isError} from "./store/dialogs";
import {setFavorites, setFollowing, setId} from "./store/user";
import {IconButton, List, ListItem, ListItemAvatar, ListItemText, Tab} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StoreIcon from "@mui/icons-material/Store";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import Box from "@mui/material/Box";
import CategoryIcon from '@mui/icons-material/Category';
import favoriteSVG from "./assets/favorite.svg";
import productSVG from "./assets/product.svg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Avatar from "@material-ui/core/Avatar";

export default function Shop() {
    const [tabValue, setTabValue] = useState('products');
    const [email, setEmail] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [website, setWebsite] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [carousel, setCarousel] = useState([]);
    const [products, setProducts] = useState([]);
    const [followed, setFollowed] = useState(false);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [followingShops, setFollowingShops] = useState([]);
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
    const token = useSelector((state) => state.token.value);
    const myUsername = useSelector((state) => state.user.username);
    const myFavorites = useSelector((state) => state.user.favorites);
    const myFollowing = useSelector((state) => state.user.following);
    const firstAccess = useSelector((state) => state.user.firstAccess);
    const userType = useSelector((state) => state.user.firstAccess);
    const myId = useSelector((state) => state.user.id);
    const {username} = useParams();
    const appContext = useContext(GlobalContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const onChangeTabValue = (e, value) => {
        setTabValue(value);
    };

    const goToShop = (username) => {
        navigate(appContext.routes.shop + '/' + username);
    };

    const getShopInfo = () => {
        dispatch(setBusy());
        axios.get(appContext.ENDPOINT_SHOPS + "?username=" + username, {
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            if (response.data.length > 0) {
                setId(response.data[0]?.id);
                setEmail(response.data[0]?.email);
                setTitle(response.data[0]?.title);
                setDescription(response.data[0]?.description);
                setAvatar(appContext.HOST + response.data[0]?.avatar?.url);
                setCarousel(getCarousel(response.data[0]?.carousel0, response.data[0]?.carousel1, response.data[0]?.carousel2));
                setTelephone(response.data[0]?.telephone);
                setWebsite(response.data[0]?.website);
                dispatch(setIdle());
            } else {
                dispatch(setIdle());
                navigate(appContext.routes.noUser);
            }
        }).catch(() => {
            dispatch(setIdle());
            navigate(appContext.routes.noUser);
        });
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
            dispatch(isError('Si ?? verificato un errore nella ricezione dei prodotti. Riprovare ad aggiornare la pagina.'));
        });
    };

    const getFavoriteProducts = () => {
        setLoadingProducts(true);
        let tmpProducts = [];
        if (myFavorites.length > 0) {
            const qs = require('qs');
            const query = qs.stringify({_where: {id: myFavorites},}, {encodeValuesOnly: true});
            axios.get(appContext.ENDPOINT_PRODUCTS + "?" + query, {
                headers: {'Authorization': 'Bearer ' + token}
            }).then((response) => {
                tmpProducts = response.data.map((element) => ({
                    height: generateHeight(),
                    title: element.title,
                    id: element.id,
                    picture: appContext.HOST + element.cover?.url,
                    username: element.username
                }));
                setFavoriteProducts(tmpProducts);
                setLoadingProducts(false);
            }).catch(() => {
                dispatch(setIdle());
            });
        } else {
            setFavoriteProducts(tmpProducts);
            setLoadingProducts(false);
        }
    };

    const getFollowingShops = () => {
        setLoadingProducts(true);
        let tmpShops = [];
        if (myFollowing.length > 0) {
            const qs = require('qs');
            const query = qs.stringify({_where: {username: myFollowing},}, {encodeValuesOnly: true});

            axios.get(appContext.ENDPOINT_SHOPS + "?" + query, {
                headers: {'Authorization': 'Bearer ' + token}
            }).then((response) => {
                tmpShops = response.data.map((element) => ({
                    avatar: element.avatar.url,
                    followed: true,
                    username: element.username,
                    title: element.title}));
                setFollowingShops(tmpShops);
                setLoadingProducts(false);
            }).catch(() => {
                dispatch(setIdle());
            });
        } else {
            setFollowingShops(tmpShops);
            setLoadingProducts(false);
        }
    };

    const updateAvatar = (e) => {
        dispatch(setBusy());
        const formData = new FormData();
        new Compressor(e.target.files[0], {
            quality: appContext.COMPRESSION_QUALITY, success(result) {
                formData.append('files.avatar', result, 'avatar.jpg');
                formData.append('data', JSON.stringify({}));
                axios.put(appContext.ENDPOINT_SHOPS + "/" + myId, formData, {
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(() => {
                    dispatch(setIdle());
                    getShopInfo();
                }).catch(() => {
                    dispatch(setIdle());
                    dispatch(isError('Si ?? verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
                })
            }, error() {
                dispatch(setIdle());
                dispatch(isError('Si ?? verificato un errore nell\'aggiornamento dell\'avatar. Riprovare.'));
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
                            axios.put(appContext.ENDPOINT_SHOPS + "/" + myId, formData, {
                                headers: {'Authorization': 'Bearer ' + token}
                            }).then(() => {
                                fetched++;
                                if (pictures.length === fetched) {
                                    dispatch(setIdle());
                                    getShopInfo();
                                }
                            }).catch(() => {
                                dispatch(setIdle());
                                dispatch(isError('Si ?? verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                            })
                        }, error() {
                            dispatch(setIdle());
                            dispatch(isError('Si ?? verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
                        }
                    })
                } else {
                    fetched++;
                    if (pictures.length === fetched) {
                        dispatch(setIdle());
                        getShopInfo();
                    }
                }
            } else {
                dispatch(setBusy());
                let data = {};
                data['carousel' + picture.index] = null;
                axios.put(appContext.ENDPOINT_SHOPS + "/" + myId, data, {
                    headers: {'Authorization': 'Bearer ' + token}
                }).then(() => {
                    fetched++;
                    if (pictures.length === fetched) {
                        dispatch(setIdle());
                        getShopInfo();
                    }
                }).catch(() => {
                    dispatch(setIdle());
                    dispatch(isError('Si ?? verificato un errore nell\'aggiornamento della copertina. Riprovare.'));
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
        axios.put(appContext.ENDPOINT_SHOPS + "/" + myId, formData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(() => {
            dispatch(setIdle());
            getShopInfo();
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si ?? verificato un errore nell\'aggiornamento dell\'informazione. Riprovare.'));
        });
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
                                dispatch(isError('Si ?? verificato un errore nel caricamento del prodotto. Riprovare.'));
                            })
                        }, error() {
                            dispatch(setIdle());
                            dispatch(isError('Si ?? verificato un errore nel caricamento del prodotto. Riprovare.'));
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
                        dispatch(isError('Si ?? verificato un errore nel caricamento del prodotto. Riprovare.'));
                    })
                }
            }
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si ?? verificato un errore nel caricamento del prodotto. Riprovare.'));
        });
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
                                    dispatch(isError('Si ?? verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
                                })
                            }, error() {
                                dispatch(setIdle());
                                dispatch(isError('Si ?? verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
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
                        dispatch(isError('Si ?? verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
                    })
                }
            }
        }).catch(() => {
            dispatch(setIdle());
            dispatch(isError('Si ?? verificato un errore nell\'aggiornamento del prodotto. Riprovare.'));
        });
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
                dispatch(isError('Si ?? verificato un errore nella cancellazione del prodotto. Riprovare.'));
            });
        }
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
        setInfoToEdit(info);
        setUpdateInfoDialogOpened(true);
    };

    const checkFollowed = (following) => {
        setFollowed(following.includes(username));
    };

    const toggleFollow = () => {
        let tmpFollow;
        if (followed) {
            tmpFollow = myFollowing.filter((element) => (element !== username));

        } else {
            tmpFollow = JSON.parse(JSON.stringify(myFollowing));
            tmpFollow.push(username);
        }
        let data = {
            following: tmpFollow
        };
        axios.put((userType === 'negozio' ? appContext.ENDPOINT_SHOPS : appContext.ENDPOINT_CLIENTS) + "/" + myId, data ,{
            headers: {'Authorization': 'Bearer ' + token}
        }).then((response) => {
            dispatch(setFollowing(response.data.following));
            checkFollowed(response.data.following);
        });
    };

    useEffect(() => {
        if (firstAccess) {
            navigate(appContext.routes.wizard);
        } else {
            appContext.setFavoritesFollowing();
            getShopInfo();
            getProducts();
        }
    }, []);

    // useEffect(() => {
    //     appContext.setFavoritesFollowing();
    //     getShopInfo();
    //     getProducts();
    // }, [location]);

    useEffect(() => {
        setTabValue('products')
        appContext.setFavoritesFollowing();
        getShopInfo();
        getProducts();
        checkFollowed(myFollowing);
    }, [username]);

    useEffect(() =>  {
        getFavoriteProducts();
        getFollowingShops();
        checkFollowed(myFollowing);
    }, [myFavorites, myFollowing]);

    return (
        <>
            <Container>
                <br/>
                <br/>
                <br/>
                <br/>
                <ShopCard
                    email={email}
                    followed={followed}
                    title={title}
                    description={description}
                    avatar={avatar}
                    carousel={carousel}
                    website={website}
                    toggleFollow={toggleFollow}
                    telephone={telephone}
                    selfUser={username === myUsername}
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
            </Container>
            <Container>
                <TabContext value={tabValue}>
                    <Box sx={{
                        width: '100%',
                        color: 'darkred',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: 'center'
                    }}>
                        <TabList
                            onChange={onChangeTabValue}
                            textColor='inherit' TabIndicatorProps={{style: {backgroundColor: "darkred"}}}>
                            {
                                (username === myUsername) ?
                                    [
                                        <Tab icon={<CategoryIcon/>} label="I TUOI PRODOTTI" value='products'/>,
                                        <Tab icon={<FavoriteIcon/>} label="PRODOTTI PREFERITI" value='favorites'/>,
                                        <Tab icon={<StoreIcon/>} label="NEGOZI CHE SEGUI" value='shops'/>
                                    ]
                                    :
                                    <Tab icon={<CategoryIcon/>} label="PRODOTTI PUBBLICATI" value='products'/>
                            }
                        </TabList>
                    </Box>

                    <TabPanel value='products'>
                        {products.length > 0 &&
                            <GridSystem
                            loadingProducts={loadingProducts}
                            isProducts={true}
                            products={products}
                            isUser={true}
                            isSelfUser={username === myUsername}
                            updateProduct={(id) => {
                                setProductToUpdate(id);
                                setUpdateProductDialogOpened(true);
                            }}
                            deleteProduct={(id) => {
                                setProductToDelete(id);
                                setDeleteProductDialogOpened(true);
                            }}/>}
                        {
                            products.length === 0 &&
                            <Box sx={{
                                width: '100%',
                                color: 'darkred',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <img src={productSVG} alt="" style={{width: '30%', height: 'auto'}}/>
                                <Typography variant='h4' className='text-center'>Nessun prodotto creato...</Typography>
                            </Box>
                        }
                    </TabPanel>
                    <TabPanel value='favorites'>
                        {favoriteProducts.length > 0 &&
                            <GridSystem
                            loadingProducts={loadingProducts}
                            isProducts={true}
                            products={favoriteProducts}
                            isUser={false}/>}
                        {
                            (favoriteProducts.length === 0 && !loadingProducts) &&
                            <Box sx={{
                                width: '100%',
                                color: 'darkred',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                                justifyContent: 'center'
                            }}>
                                <img src={favoriteSVG} alt="" style={{width: '30%', height: 'auto'}}/>
                                <Typography variant='h4' className='text-center'>Nessun prodotto preferito...</Typography>
                            </Box>
                        }
                    </TabPanel>
                    <TabPanel value='shops'>

                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                            {
                                followingShops.map((element) => (
                                    // <FollowCard
                                    //     avatar={appContext.HOST + element.avatar}
                                    //     title={element.title} username={element.username}/>
                                    <ListItem alignItems="flex-start" secondaryAction={
                                        [<>
                                            {element.followed ?
                                                <Button variant="outlined"
                                                        style={{color: 'darkred', borderColor: 'darkred'}}>
                                                    seguito
                                                </Button> :
                                                <Button variant="contained" style={{backgroundColor: 'darkred'}}>
                                                    Segui
                                                </Button>}
                                        </>
                                        ]
                                    }>
                                        <ListItemAvatar>
                                            <IconButton onClick={() => goToShop(element.username)}>
                                                <Avatar alt="" src={appContext.HOST + element.avatar}/>
                                            </IconButton>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={element.title}
                                            secondary={element.username}
                                        />
                                    </ListItem>
                                ))
                            }
                        </List>

                    </TabPanel>

                </TabContext>
                <br/>
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
    );
}