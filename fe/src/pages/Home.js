import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../redux/user.slice';

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.currentUser);
    function handleLogout() {
        dispatch(userAction.signOut());
        navigate('/sign-in')
    }

    return (
        <div className='home-wrapper'>
            <div>
                <h1 className='mb-5'>Welcome {user.firstName} {user.lastName}</h1>
                <button className='btn btn-logout' onClick={handleLogout}>Logout</button>
            </div>
        </div >
    );
}

export default Home;