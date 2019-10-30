import React from "react";
import styled from "styled-components";

const StyledBalance = styled.div`
  text-align: center;

  header {
    text-transform: uppercase;
    align-self: flex-end;
    justify-self: center;
    font-weight: bold;
  }

  .value {
    align-self: flex-start;
  }
`;

export default function Balance({ title, value }) {
  return (
    <StyledBalance className="balance">
      <header className="title">{title}</header>
      <div className="value">{value}</div>
    </StyledBalance>
  );
}
