import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames";

const StyledButton = styled.div.attrs(props => ({
    style: {
        width: props.size,
        height: props.size,
    },
}))`
    cursor: pointer;
    mask-size: 75%;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-image: url("https://image.flaticon.com/icons/svg/60/60740.svg");

    &.btn-home {
        mask-image: url("https://image.flaticon.com/icons/svg/25/25694.svg");
    }

    &.btn-cashier {
        mask-image: url("https://image.flaticon.com/icons/svg/70/70551.svg");
    }

    &.btn-history {
        mask-image: url("https://image.flaticon.com/icons/svg/61/61122.svg");
    }

    &.btn-info {
        mask-image: url("https://image.flaticon.com/icons/svg/685/685815.svg");
    }

    &.btn-menu {
        mask-image: url("https://image.flaticon.com/icons/svg/128/128453.svg");
    }

    &.btn-sound {
        mask-image: url("https://image.flaticon.com/icons/svg/27/27150.svg");
    }
`;

export default function Button(props) {
    return <StyledButton className={classNames("button", props.button && `btn-${props.button}`)} {...props} />;
}

Button.propTypes = {
    button: PropTypes.string,
    size: PropTypes.number.isRequired,
};

Button.defaultProps = {
    size: 0,
};
