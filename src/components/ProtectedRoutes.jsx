import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const ProtectedRoutes = ({ allowedroles }) => {
    const userRoles = useSelector(state => state.userStore.user);

    return allowedroles.find(role => userRoles?.authorities.includes(role)) ? (<Outlet />) :
        (<Navigate to={'/login'} />)
}

