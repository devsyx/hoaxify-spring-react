import React from "react";

export const Input = (props) => {
    const { label, error, name, onChange, type, defaultValue } = props;
    let className = 'form-control';

    if (type === 'file') {
        className += '-file pb-1'
    }
    if (error !== undefined) {
        className += ' is-invalid'
    }

    return (
        <div className='form-group'>
            <label>{label}</label>
            <input name={name} className={className} onChange={onChange} type={type} autoComplete='of' defaultValue={defaultValue} {...props} />
            <div className="invalid-feedback">{error}</div>
        </div>
    )
}
