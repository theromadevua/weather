import React from 'react';
import {useAppSelector, useAppDispatch} from "../../../store/store";
import {logoutUser} from "../../../store/auth/AuthThunks";

function Profile() {
    const {isAuth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    if(!isAuth) return null;

    const logout = () => {
        dispatch(logoutUser())
        window.location.href = '/'
    }

    return (
        <div className="profile">
            <button onClick={logout} className="profile-logout-button">logout</button>
        </div>
    );
}

export default Profile;