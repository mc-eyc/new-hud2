import React from "react";

export default function Spin(props) {
    return (
        <svg className="button spin" width="64" height="64" viewBox="0 0 64 64">
            <circle className="ui-bg" cx="32" cy="32" r="32" />
            <circle className="ui-fg" cx="32" cy="32" r="31" strokeWidth="2" fill="none" />`
        </svg>
    );
}
