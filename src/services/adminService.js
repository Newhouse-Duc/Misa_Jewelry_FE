import axios from '../axios/axios';




//login admin 

const loginAdmin = (valueLogin, password) => {

    return axios.post('api/v2/login/admin',
        {
            valueLogin, password
        })
}



// managerment user
const allUser = () => {
    return axios.get('api/v2/getuser', {

    })
}


const changeStatus = (iduser, newStatus) => {
    return axios.put(`api/v2/update/user/${iduser}/status`, {
        newStatus
    })
}


const deleteUser = (userid) => {
    return axios.delete(`api/v2/delete/user/${userid}`)
}
// order 
const allOrder = () => {
    return axios.get('api/v2/get/order', {})
}

const deleteOrder = (order) => {
    return axios.delete(`api/v2/delete/order/${order}`)
}
const changeStatusOrder = (idorder, newStatus) => {
    return axios.put(`api/v2/update/order/${idorder}/status`, {
        newStatus
    })
}



// order detail 

const getdetailorder = (orderid) => {
    return axios.get(`api/v2/get/detail/${orderid}`)
}

const getAllDetail = () => {
    return axios.get("api/v2/get/orderdetail")
}

// managerment product 

const allProduct = () => {
    return axios.get("api/v2/get/product", {})
}


const createNewProduct = (datanewproduct) => {
    return axios.post("api/v2/create/product",
        datanewproduct, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
const deleteproduct = (product) => {

    return axios.delete("api/v2/delete/product",
        {

            data: { id: product.id }
        });

}


const getproductID = (productid) => {
    return axios.get(`api/v2/get/product/${productid}`);
}


const updateProduct = (productId, datanewproduct) => {

    return axios.put(`api/v2/edit/product/${productId}`, datanewproduct,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
}
// managerment category
const allCategory = () => {
    return axios.get('api/v2/category', {

    })
}

const createCategory = (categoryname) => {
    return axios.post('api/v2/createcategory', {
        categoryname
    })

}
const deletecategory = (category) => {

    return axios.delete("api/v2/delete/category", { data: { id: category.id } });
}

const editCurrentcategory = (dataid, dataname) => {
    return axios.put("api/v2/update/category", {
        dataid, dataname
    })
}




export {
    // admin 
    loginAdmin,
    // user
    allUser,
    changeStatus,
    deleteUser,
    // product
    allProduct,
    createNewProduct,
    deleteproduct,
    getproductID,
    updateProduct,
    //category
    allCategory,
    createCategory,
    deletecategory,
    editCurrentcategory,
    // order
    allOrder,
    deleteOrder,
    changeStatusOrder,
    // orderdetail
    getAllDetail,
    getdetailorder
}