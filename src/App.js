import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Logo from "./components/Logo/Logo";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Reset from "./Pages/Reset/Reset";
import { AuthProvider } from "./components/AuthContext";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"


function App() {
    const [active, setActive] = useState("");

    const showSidebar = () => {
        setActive("active");
    };

    const closeSidebar = () => {
        setActive("");
    };

    return (
        <AuthProvider>
            <Router>
                <Logo />
                <Routes>
                    <Route path="login" element={<Login />} />
                </Routes>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />

                        <Route path="signup" element={<Signup />} />
                        <Route
                            path="dashboard"
                            element={
                                <Home
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                    active={active}
                                />
                            }
                        />
                        <Route
                            path="profile"
                            element={
                                <Profile
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                    active={active}
                                />
                            }
                        />
                        <Route
                            path="reset"
                            element={
                                <Reset
                                    showSidebar={showSidebar}
                                    closeSidebar={closeSidebar}
                                    active={active}
                                />
                            }
                        />
                        
                    </Route>
                </Routes>
            </Router>
            <Analytics />
           < SpeedInsights/>
        </AuthProvider>
    );
}

export default App;