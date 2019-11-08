import React, { useState, useEffect } from "react";

export default function Clock() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return <div className="clock">{fmt(date)}</div>;
}

const fmt = d => {
    return `${d
        .getHours()
        .toString()
        .padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${d
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
};
