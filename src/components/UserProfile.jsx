import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="user-profile">
            <h2>Perfil de Usuario</h2>
            <div>
                <strong>ID:</strong> {user.sub}
            </div>
            <div>
                <strong>Nombre:</strong> {user.nombre}
            </div>
        </div>
    );
};

export default UserProfile;