import {lazy} from 'react'

import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {CitiesProvider} from "./contexts/CitiesContext.jsx";
import {AuthProvider} from "./contexts/FakeAuthContext.jsx";

import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import ProtectedRouter from "./components/ProtectedRouter.jsx";

// import Product from "./pages/Product";
// import HomePage from "./pages/HomePage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// dist/assets/index-7667a5c0.css   30.48 kB │ gzip:   5.11 kB
// dist/assets/index-16f685d7.js   507.04 kB │ gzip: 148.06 kB


const HomePage = lazy(() => import('./pages/HomePage'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))

// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/HomePage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-17833322.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-e43ba14d.css           26.71 kB │ gzip:   4.36 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-c4565659.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-f1131a14.js              0.23 kB │ gzip:   0.20 kB
// dist/assets/PageNav-cf04f2d9.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-710c6436.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/HomePage-f81808a9.js          0.69 kB │ gzip:   0.42 kB
// dist/assets/Product-a70098e4.js           0.86 kB │ gzip:   0.48 kB
// dist/assets/Login-dc0e3e89.js             1.00 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-2b3c05f9.js       156.93 kB │ gzip:  46.22 kB
// dist/assets/index-28d7e430.js           348.34 kB │ gzip: 101.29 kB

function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                {/*  transition from page to another without reload */}
                <BrowserRouter>
                    <Routes>
                        <Route index element={<HomePage/>}/>{" "}
                        {/* <index element>>> default to home */}
                        <Route path="product" element={<Product/>}/>
                        <Route path="pricing" element={<Pricing/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="app" element={<ProtectedRouter>
                            <AppLayout/>
                        </ProtectedRouter>}>
                            {/*{child of app}*/}
                            <Route
                                index
                                element={<Navigate replace to='cities'/>}
                            />{" "}
                            {/*if not any Choose of that 👇🏼}*/}
                            <Route
                                path="cities"
                                element={<CityList/>}
                            />
                            <Route
                                path="cities"
                                element={<CityList/>}
                            /> <Route
                            path="cities/:id"
                            element={<City/>}
                        />
                            <Route path="countries" element={<CountryList/>}/>
                            <Route path="form" element={<Form/>}/>
                        </Route>
                        <Route path="*" element={<PageNotFound/>}/> {/* not any page  */}
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
