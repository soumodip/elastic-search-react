import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ field, value, label, error, type, onChange }) => {

    return (
        <div className={classnames("control-group", {"error": error})}>
            <label className="control-label">{label}</label>
            <input 
                onChange={onChange}
                value={value}
                type={type}
                name={field}
                className="form-control" />
            {error && <span className="red">{error}</span>}
        </div>
    );

};

// TYPE CHECKING WITH PROP TYPES
TextField.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

TextField.defaultProps = {
    type: 'text'
};

export default TextField;
