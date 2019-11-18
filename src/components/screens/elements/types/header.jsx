import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 1.5em;
`;

export default function Header(props) {
    return <StyledHeader className={props.className}>{props.text}</StyledHeader>;
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};

Header.defaultProps = {
  text: "",
};
