import React from "react";
import PropTypes from "prop-types";

export default function Text(props) {
    return <>{props.value}</>;
}

Text.propTypes = {
    value: PropTypes.string.isRequired,
};

Text.defaultProps = {
    value: "",
};
