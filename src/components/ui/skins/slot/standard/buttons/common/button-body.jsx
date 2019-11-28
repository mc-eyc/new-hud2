import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function ButtonBody(props) {
    const { alt, size, border } = props;
    const r = size / 2;
    const bodyCls = classNames({ "ui-fg": alt }, { "ui-bg": !alt }, "theme-fill");
    const lineCls = classNames({ "ui-fg": !alt }, { "ui-bg": alt }, "theme-stroke");
    return (
        <>
            <circle className={bodyCls} cx={r} cy={r} r={r} />
            <circle className={lineCls} cx={r} cy={r} r={r - border / 2} strokeWidth={border} fill="none" />
        </>
    );
}

ButtonBody.propTypes = {
    alt: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    border: PropTypes.number.isRequired,
};

ButtonBody.defaultProps = {
    alt: false,
    size: 64,
    border: 2,
};
