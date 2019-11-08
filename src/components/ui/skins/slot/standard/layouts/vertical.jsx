import React from "react";

export default function VerticalLayout(props) {
    return (
        <>
            <g transform="translate(8, 0)">{props.children[0]}</g>
            <g transform="translate(0, 54)">{props.children[1]}</g>
            <g transform="translate(8, 124)">{props.children[2]}</g>
        </>
    );
}

VerticalLayout.viewBox = "0 0 64 174";
