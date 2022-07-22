import React from 'react';
import defaultPicture from '../assets/profile.png'

const ProfileImageWithDefault = (props) => {
    let { image, tempimage } = props;
    let imageSource = defaultPicture;
    if (image) {
        imageSource = 'images/profile/' + image;
    }
    return (
        <img src={tempimage || imageSource} alt='Profile' {...props} onError={(e) => {
            e.target.src = defaultPicture;
        }} />
    );
};
export default ProfileImageWithDefault; 