import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../redux/store/store';

interface Props {
    children: React.ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
    const auth = useSelector((state: RootState) => state.auth);

    if (!auth || typeof auth !== 'object') return null;

    if (!auth.token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(auth.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
