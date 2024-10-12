import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import LoginAdmin from "../pages/admin/login";
const PrivateRoutes = (props) => {
    return (

        <>
            <Routes>

                <Route path="/" element={< LoginAdmin />} />
                <Route path="/dashboard" element={<Dashboard />} />




            </Routes>
        </>

    )

}
export default PrivateRoutes;