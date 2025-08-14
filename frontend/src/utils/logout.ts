// import { clearAuth } from '../redux/slices/authSlice';
// import { AppDispatch } from '../redux/store/store';

// export const logoutUser = (dispatch: AppDispatch, navigate: (path: string) => void) => {
//     dispatch(clearAuth());
//     localStorage.removeItem('token');
//     navigate('/');

//     // Optional: force reload if needed (not usually recommended)
//     // window.location.reload();
// };


// // used in component
// // const dispatch = useDispatch();

// // const handleLogout = () => {
// //     logoutUser(dispatch, navigate);
// // };



// -----------------------------------------------------------------------------------------------------------------

import { clearAuth } from '../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { AppDispatch } from '../redux/store/store';

const BE_URL = import.meta.env.VITE_BACKEND_URL; // or your actual base URL

interface LogoutOptions {
    dispatch: AppDispatch;
    navigate: (path: string) => void;
    showToast?: boolean;
    revokeRefreshToken?: boolean; // Optional: only if backend supports it
    refreshToken?: string; // Optional if using refresh token
}

export const logoutUser = async ({
    dispatch,
    navigate,
    showToast = true,
    revokeRefreshToken = false,
    refreshToken = '',
}: LogoutOptions) => {
    try {
        if (revokeRefreshToken && refreshToken) {
            await axios.post(`${BE_URL}/api/v1/auth/logout`, {
                refreshToken,
            });
        }

        dispatch(clearAuth());

        localStorage.removeItem('auth');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        if (showToast) {
            toast.success('Logged out successfully!');
        }

        navigate('/');
        window.location.reload();
    } catch (err) {
        toast.error('Logout failed');
        console.error('Logout error:', err);
    }
};
