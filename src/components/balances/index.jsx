import React, { useRef } from "react";
import styled from "styled-components";

import Balance from "./balance";

const StyledBalances = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @supports (-ms-flow-from: space-around) {
        justify-content: space-around;
    }
`;

export default function Balances(props) {
    const { balances } = props;

    return (
        <StyledBalances className="balances">
            {balances.map((b, i) => (
               <Balance key={`bl-${i}`} {...b} />
            ))}
        </StyledBalances>
    );
}