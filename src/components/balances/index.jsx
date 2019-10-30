import React, { useRef } from "react";
import styled from "styled-components";

import Balance from "./balance";
import BalanceScaler from "./scaler";

const StyledBalances = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    @supports (-ms-flow-from: space-around) {
        justify-content: space-around;
    }

    .balance {
        flex-basis: 25%;
    }
`;

export default function Balances(props) {
    const { balances } = props;
    const ref = useRef(null);

    // TODO: Use the ref to determine the correct font proportion based on height and width
    // TODO: offscreen render and then scale via aspect ratio?

    return (
        <StyledBalances className="balances" ref={ref}>
            {balances.map((b, i) => (
                <BalanceScaler min={props.minFont} max={props.maxFont}>
                    <Balance key={`bl-${i}`} {...b} />
                </BalanceScaler>
            ))}
        </StyledBalances>
    );
}