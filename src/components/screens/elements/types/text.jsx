import React from "react";
import PropTypes from "prop-types";

export default function Text(props) {
    return <p>{props.value}</p>;
}

Text.propTypes = {
    value: PropTypes.string.isRequired,
};

Text.defaultProps = {
    value: "",
};
