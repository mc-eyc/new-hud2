import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  display: block;
  font-size: 1em;
  width: 100%;
  max-width: 20em;
  margin: 0.25em;
  padding: 0.25em;
  border: none;
`;

export default function Button(props) {
    return <StyledButton className={props.className}>{props.text}</StyledButton>;
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  text: "",
};