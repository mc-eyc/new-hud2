import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import { connect } from "react-redux";
import _get from "lodash.get";

import { useComponentVisible } from "../../utils";

const StyledThemePicker = styled.div`
    display: flex;

    label {
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    .sketch-picker {
        position: absolute;
        z-index: 9999;
        margin-top: 1.5em;
    }
`;

const StyledColorBox = styled.a.attrs(props => ({
    style: {
        backgroundColor: props.color,
    },
}))`
    width: 1em;
    height: 1em;
    border: 0.25em solid black;
    display: block;
    cursor: pointer;
`;

export function ThemePicker(props) {
    const { ref, isComponentVisible: showColor, setIsComponentVisible: setShowColor } = useComponentVisible(false);
    return (
        <StyledThemePicker className="theme-picker" ref={ref}>
            <StyledColorBox color={props.color} onClick={() => setShowColor(!showColor)} />
            {showColor ? (
                <SketchPicker color={props.color} onChange={c => props.updateColor(props.prop, fmtColor(c))} onBlur={() => console.log('oi')} />
            ) : null}
            {props.label ? <label onClick={() => setShowColor(!showColor)}>{props.label}</label> : null}
        </StyledThemePicker>
    );
}

ThemePicker.propTypes = {
    color: PropTypes.string.isRequired,
    label: PropTypes.string,
    prop: PropTypes.string.isRequired,
};

ThemePicker.defaultProps = {
    color: "transparent",
};

const fmtColor = c => `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`;

export default connect(
    (state, ownProps) => ({ color: _get(state.theme, ownProps.prop) }),
    dispatch => ({
        updateColor: (prop, color) => dispatch({ type: "theme.update", prop, value: color }),
    })
)(ThemePicker);
