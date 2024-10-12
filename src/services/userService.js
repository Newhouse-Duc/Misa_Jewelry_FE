

import axios from '../axios/axios';
const registerUser = (email, phone, username, password) => {


    return axios.post('api/v1/register', {
        email, phone, username, password
    })
}


const loginUser = (valueLogin, password) => {

    return axios.post('api/v1/login',
        {
            valueLogin, password
        })
}


const methodpayment = () => {



    return axios.get("api/v1/show/payment", {

    });
}


const userOrder = (raworder, rawdetail) => {

    return axios.post("api/v1/order", {
        raworder, rawdetail
    })
}


const userOrderMomo = (raworder, rawdetail) => {
    return axios.post('api/v1/order/payment',
        {
            raworder, rawdetail
        })
}


const userListOrder = (iduser) => {
    return axios.get(`api/v1/user/listorder/${iduser}`)
}
export {
    registerUser, loginUser, methodpayment, userOrder, userOrderMomo, userListOrder
};