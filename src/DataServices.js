import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://zion.datafactor.it:40505",
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

const getAllRestaurants = () => {
    return axiosInstance.get('/restaurants');
};

const getRestaurant = (id) => {
    return axiosInstance.get(`/restaurants/${id}`);
};

export {getAllRestaurants, getRestaurant};