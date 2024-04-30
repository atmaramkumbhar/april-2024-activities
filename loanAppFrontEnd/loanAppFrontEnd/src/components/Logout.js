import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Logout(){
    const navigate = useNavigate();

    return (<div>
        {navigate('/login')}
    </div>)
}