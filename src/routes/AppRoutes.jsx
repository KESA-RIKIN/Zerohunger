import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardHome from '../pages/dashboard/DashboardHome';
import Donate from '../pages/Donate';
import Receive from '../pages/Receive';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/dashboard" element={<DashboardHome />} />
            {/* Direct sub-routes if needed, or linked from DashboardHome */}

            <Route path="/donate" element={<Donate />} />
            <Route path="/receive" element={<Receive />} />
        </Routes>
    );
};

export default AppRoutes;
