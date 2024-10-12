import { Route, Routes } from "react-router-dom";
import Register from "../pages/user/Register";


import NotFound from "../pages/404NotFound";
import Login from "../pages/user/Login";
import Size from "../components/Size";
import Home from "../pages/user/Home";
import Cart from "../pages/user/Cart";
import Shop from "../pages/user/Shop";
import DetailProduct from "../pages/user/Productdetaill";
import Checkout from "../pages/user/Checkout";
import ReturnPage from "../pages/user/Return";
import ScrollToTop from "../components/Scroll";
import Infor from "../pages/user/Infor";
import Preserve from "../components/Preserve";
import Connect from "../components/Connect";
import Recruitment from "../components/Recruitment";
const AppRoutes = (props) => {

    return (
        <>
            <ScrollToTop />
            <Routes>

                <Route path="/" element={< Home />} />

                <Route path="/size" element={< Size />} />
                <Route path="/preserve" element={<Preserve />} />
                <Route path="/connect" element={<Connect />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/cart" element={<Cart />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/detailprd/:id" element={<DetailProduct />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/return" element={<ReturnPage />} />
                <Route path="/infor" element={<Infor />} />


                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default

    AppRoutes;
