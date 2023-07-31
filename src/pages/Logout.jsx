import React, { useEffect } from 'react'
import { API } from '../axios/API'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        API.post('/api/logout', {}).then(() => {
            sessionStorage.clear();
            localStorage.clear();
            navigate('/login');
        })
    },[])
    return (
    <></>
  )
}
