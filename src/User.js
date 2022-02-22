import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Row} from '@mui-treasury/components/flex';
import {Container} from "react-bootstrap";
import GridSystem from "./GridSystem";
import axios from "axios";
import {useParams} from "react-router-dom";
import AppContext from "./AppContext";
import UserCard from "./UserCard";

export default function User() {
    const [idShopStrapi, setIdShopStrapi] = useState(null)
    const [email, setEmail] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [carousel, setCarousel] = useState(null)
    const [website, setWebsite] = useState(null)
    const [telephone, setTelephone] = useState(null)
    const [items, setItems] = useState([])
    const {username} = useParams();
    const appContext = useContext(AppContext);

    const generateHeight = () => {
        return Math.floor((Math.random() * (380)) + 80);
    }

    const getUserInfo = () => {
        axios.get("http://zion.datafactor.it:40505/shops?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        })
            .then((response) => {
                setIdShopStrapi(response.data[0].id)
                setEmail(response.data[0].email)
                setTitle(response.data[0].title)
                setDescription(response.data[0].description)
                setAvatar("http://zion.datafactor.it:40505" + response.data[0].avatar.url)
                setCarousel("http://zion.datafactor.it:40505" + response.data[0].carousel.url)
                setTelephone(response.data[0].telephone)
                setWebsite(response.data[0].website)
            }).catch((error) => {
        })
    }

    const getInitialItems = () => {
        axios.get("http://zion.datafactor.it:40505/products?username=" + username, {
            headers: {'Authorization': 'Bearer ' + appContext.token}
        }).then((response) => {
            let items = response.data.map((element) => ({
                height: generateHeight(),
                title: element.title,
                token: appContext.token,
                description: element.description,
                username: username,
                picture: "http://zion.datafactor.it:40505" + element.picture.url
            }))
            setItems(items)
        }).catch((error) => {
        })
    }

    const updateAvatar = (e) => {
        const formData = new FormData();
        formData.append('files.avatar', e.target.files[0], 'avatar.jpg');
        formData.append('data', JSON.stringify({}));
        axios.put("http://zion.datafactor.it:40505/shops/" + idShopStrapi, formData, {
            headers: {
                'Authorization': 'Bearer ' + appContext.token,
            }
        }).then((response) => {
            getUserInfo();
        }).catch((error) => {
        })
    }

    const updateCarousel = (e) => {
        const formData = new FormData();
        formData.append('files.carousel', e.target.files[0], 'example.jpg');
        formData.append('data', JSON.stringify({}));
        axios.put("http://zion.datafactor.it:40505/shops/" + idShopStrapi, formData, {
            headers: {'Authorization': 'Bearer ' + appContext.token,}
        }).then((response) => {
            getUserInfo();
        }).catch((error) => {
        })
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
                    updateAvatar={updateAvatar}
                    updateCarousel={updateCarousel}/>
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
                <GridSystem items={items} columnWidth={appContext.columnWidth} isUser={true}/>
            </Container>
        </>
    )
}