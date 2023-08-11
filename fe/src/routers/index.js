import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";


const SignIn = React.lazy(() => import("../pages/signIn/SignIn"));
const SignUp = React.lazy(() => import("../pages/signUp/SignUp"));
const Home = React.lazy(() => import("../pages/Home"));

const loading = (
    <div>
        <h1>Loading...</h1>
    </div>
);

const Routers = () => {
    const user = useSelector((state) => state.user);
    return (
        <React.Suspense fallback={loading}>
            <Routes>
                <Route path="/" name="Home" element={user.isLogedIn ? <Home /> : <Navigate to="sign-in" />} />
                <Route path="/sign-in" name="SignIn" element={user.isLogedIn ? <Navigate to="/" /> : <SignIn />} />
                <Route path="/sign-up" name="SignUp" element={user.isLogedIn ? <Navigate to="/" /> : <SignUp />} />
            </Routes>
        </React.Suspense >
    );
};

export default Routers;
