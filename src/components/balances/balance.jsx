import React from "react";
import styled from "styled-components";

import ScaledText from "../common/scaled-text";

const StyledBalance = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title, .value {
        width: 100%;
        text-align: center;
    }

    .title {
        text-transform: uppercase;
        font-weight: bold;
        flex-basis: 40%;
        height: 40%;
    }

    .value {
        flex-basis: 60%;
        height: 60%;
    }
`;

export default function Balance({ title, value }) {
    return (
        <StyledBalance className="balance">
            <div className="title">
                <ScaledText>{title}</ScaledText>
            </div>
            <div className="value">
                <ScaledText>{value}</ScaledText>
            </div>
        </StyledBalance>
    );
}
