import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../AdminLayout'
import Dashboard from '../pages/Dashboard'
import Users from '../pages/Users'
import Revenue from '../pages/Revenue'
import Shops from '../pages/Shops'
import SignUp from '../pages/Signup'
import ProtectedRoute from '../protected/protectors'
import Delivery_Boys from '../pages/Delivery_Boys'
import Shops2 from '../pages/Shops2'
import Users2 from '../pages/Users2'


const AppRoutes = () => {


    return (
        <Routes>
            <Route path="signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="userdetails/:id" element={<Users2 />} />
                    <Route path="revenue" element={<Revenue />} />
                    <Route path="shops" element={<Shops />} />
                    <Route path="shopdetails/:id" element={<Shops2 />} />
                    <Route path="delivery_boys" element={<Delivery_Boys />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes