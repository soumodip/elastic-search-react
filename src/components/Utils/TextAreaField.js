import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaField = ({ field, value, label, rows, error, onChange }) => {

    return (
        <div className={classnames("control-group", {"error": error})}>
            <label className="control-label">{label}</label>
            <textarea 
                onChange={onChange}
                value={value}
                name={field}
                rows={rows}
                className="form-control" />
            {error && <span className="red">{error}</span>}
        </div>
    );

};

// TYPE CHECKING WITH PROP TYPES
TextAreaField.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rows: PropTypes.number,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

TextAreaField.defaultProps = {
    rows: 3
};

export default TextAreaField;
