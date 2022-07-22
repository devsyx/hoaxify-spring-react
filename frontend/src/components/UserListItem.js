import React from 'react';
import ProfileImageWithDefault from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';
const UserListItem = (props) => {
    const { user } = props;
    const { username, image } = user;
    return (
        <Link to={`/user/${username}`} className='list-group-item list-group-item-action'>
            <ProfileImageWithDefault image={image} className='rounded-circle' width='32' height='32' />
            <span className='ps-2'>{username}</span>
        </Link>
    );
};

export default UserListItem;