import React from 'react';

export const ButtonWithProgress = (props) => {
    const { onClick, pendingApiCall, disabled, text, style, className } = props;
    return (
        <button className={className || 'btn btn-primary'} onClick={onClick} disabled={disabled} style={style}>{pendingApiCall ? <span className='spinner-grow spinner-grow-sm'></span> : ''}{text}</button>
    );
};

