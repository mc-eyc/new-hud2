import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import ThemePicker from "./theme-picker";

const StyledMenu = styled.div`
    font-family: Open Sans;
    font-size: 1em;
    font-weight: bold;
    color: white;

    label {
        text-transform: uppercase;
        margin-right: 1em;
    }
`;

export function Menu({ clock, buttons, updateButton, updateClock }) {
    return (
        <StyledMenu className="menu">
            <section className="theme">
                <fieldset>
                    <legend>Theme</legend>
                    <ThemePicker label="Background" prop="background" />
                    <ThemePicker label="Buttons" prop="button.color" />
                    <ThemePicker label="Balance Title" prop="balance.title.color" />
                    <ThemePicker label="Balance Value" prop="balance.value.color" />
                    <ThemePicker label="Clock" prop="clock.color" />
                    <ThemePicker label="Border" prop="border.color" />
                </fieldset>
            </section>
            <section className="clock">
                <fieldset>
                    <legend>Clock</legend>
                    <form>
                        <input type="checkbox" checked={clock} onChange={e => updateClock(e.target.checked)} />
                        <label>Clock</label>
                    </form>
                </fieldset>
            </section>
            <section className="buttons">
                <fieldset>
                    <legend>Buttons</legend>
                    <form>
                        {Object.keys(buttons).map(b => (
                            <ButtonManager
                                key={`bm-${b}`}
                                button={b}
                                value={buttons[b]}
                                onChange={updateButton}
                            />
                        ))}
                    </form>
                </fieldset>
            </section>
        </StyledMenu>
    );
}

Menu.propTypes = {
    updateButton: PropTypes.func.isRequired,
};

Menu.defaultProps = {
    updateButton: (button, state) => console.log(`Button "${button}" = ${state}`),
};

const ButtonManager = ({ button, value, onChange }) => {
    return (
        <>
            <input name={`btn-${button}`} type="checkbox" checked={value} onChange={e => onChange(button, e.target.checked)} />
            <label htmlFor={`btn-${button}`}>{button}</label>
        </>
    );
};

export default connect(
    state => state,
    dispatch => ({
        updateClock: value => dispatch({ type: "clock.update", value }),
        updateButton: (button, value) => dispatch({ type: "buttons.update", button, value }),
    })
)(Menu);
