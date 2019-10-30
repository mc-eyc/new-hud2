import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import FitText from "react-fittext";

export default class BalanceScaler extends React.Component {
    render() {
        return (
            <FitText minFontSize={this.props.min} maxFontSize={this.props.max}>
                {this.props.children}
            </FitText>
        );
    }
}

BalanceScaler.defaultProps = {
  min: 8,
  max: 16,
};
