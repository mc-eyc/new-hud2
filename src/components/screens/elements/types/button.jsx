import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  display: block;
  font-size: 1em;
  width: 100%;
  max-width: ;
`;

export default function Button(props) {
    return <StyledButton className="button">{props.text}</StyledButton>;
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  text: "",
};