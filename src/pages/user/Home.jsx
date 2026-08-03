import React from 'react'
import { toast } from 'react-toastify';
import UserLayout from '../../layout/UserLayout';

const Home = () => {
    const handleClick = () => {
        toast.success("Welcome to Cozykie!");
    };

    return (
        <UserLayout>
            <button onClick={handleClick}>Click</button>
        </UserLayout>
    )
}

export default Home