import React from "react";

export default class Clock extends React.Component {
    componentDidMount() {
        this.setState({ date: new Date() });
        this._interval = setInterval(() => this.setState({ date: new Date() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const { date = new Date() } = this.state || {};
        return <div className="clock">{this.fmt(date)}</div>
    }

    fmt(d) {
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
    }
}
