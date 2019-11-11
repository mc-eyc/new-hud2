import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import ThemePicker from "./theme-picker";

const StyledMenu = styled.div`
    font-family: Open Sans;
    font-size: 0.75em;
    font-weight: bold;
    color: white;
    display: grid;
    grid-template-areas: "theme ui clock title" "theme ui buttons buttons" "theme ui screens screens";

    section {
        fieldset,
        form {
            display: flex;
            align-items: center;
        }
    }

    label {
        text-transform: uppercase;
        margin-right: 1em;
    }

    .theme {
        grid-area: theme;
    }

    .ui {
        grid-area: ui;
    }

    .clock {
        grid-area: clock;
    }

    .title {
        grid-area: title;
    }

    .buttons {
        grid-area: buttons;
    }

    .screens {
        grid-area: screens;
    }
`;

export function Menu({
    clock,
    buttons,
    updateButton,
    updateClock,
    setUIAuto,
    setUIPlatform,
    setUIInverted,
    updateUILayout,
    updateTitle,
    goToScreen,
    ui,
    screens,
    title,
}) {
    return (
        <StyledMenu className="menu">
            <section className="theme">
                <fieldset>
                    <legend>Theme</legend>
                    <ThemePicker label="Background" prop="background" />
                    <ThemePicker label="Game Title" prop="gameTitle.color" />
                    <ThemePicker label="Buttons" prop="button.color" />
                    <ThemePicker label="Balance Title" prop="balance.title.color" />
                    <ThemePicker label="Balance Value" prop="balance.value.color" />
                    <ThemePicker label="Clock" prop="clock.color" />
                    <ThemePicker label="Border" prop="border.color" />
                    <ThemePicker label="UI Foreground" prop="ui.color" />
                    <ThemePicker label="UI Background" prop="ui.background" />
                </fieldset>
            </section>
            <section className="ui">
                <fieldset>
                    <legend>UI</legend>
                    <form>
                        <input type="checkbox" checked={ui.auto} onChange={e => setUIAuto(e.target.checked)} />
                        <label>Auto</label>
                        <input
                            type="checkbox"
                            checked={ui.platform === "mobile"}
                            onChange={e => setUIPlatform(e.target.checked ? "mobile" : "desktop")}
                        />
                        <label>Mobile</label>
                        <input type="checkbox" checked={ui.inverted} onChange={e => setUIInverted(e.target.checked)} />
                        <label>Inverted</label>
                    </form>
                </fieldset>
            </section>
            <section className="screens">
                <fieldset>
                    <legend>Screens</legend>
                    <form>
                        {Object.keys(screens.screens).map(screen => (
                            <>
                                <input
                                    key={`screen-${screen}`}
                                    type="radio"
                                    name="screenSelect"
                                    value={screen}
                                    onChange={e => goToScreen(e.target.value)}
                                    checked={screens.active === screen ? "checked" : ""}
                                />
                                <label>{screen}</label>
                            </>
                        ))}
                    </form>
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
            <section className="title">
                <fieldset>
                    <legend>Title</legend>
                    <form>
                        <input type="checkbox" checked={title.enabled} onChange={e => updateTitle(e.target.checked)} />
                        <label>Title</label>
                    </form>
                </fieldset>
            </section>
            <section className="buttons">
                <fieldset>
                    <legend>Buttons</legend>
                    <form>
                        {Object.keys(buttons).map(b => (
                            <ButtonManager key={`bm-${b}`} button={b} value={buttons[b]} onChange={updateButton} />
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
            <input
                name={`btn-${button}`}
                type="checkbox"
                checked={value}
                onChange={e => onChange(button, e.target.checked)}
            />
            <label htmlFor={`btn-${button}`}>{button}</label>
        </>
    );
};

export default connect(
    state => state,
    dispatch => ({
        updateClock: value => dispatch({ type: "clock.update", value }),
        updateTitle: enabled => dispatch({ type: "title.update", enabled }),
        updateButton: (button, value) => dispatch({ type: "buttons.update", button, value }),
        setUIAuto: auto => dispatch({ type: "ui.setAuto", auto }),
        setUIPlatform: platform => dispatch({ type: "ui.setPlatform", platform }),
        setUIInverted: inverted => dispatch({ type: "ui.setInverted", inverted }),
        updateUILayout: opts => dispatch({ type: "ui.updateLayout", ...opts }),
        toggleScreen: screen => dispatch({ type: "screens.toggle", screen }),
        goToScreen: screen => dispatch({ type: "screens.goToScreen", screen }),
    })
)(Menu);
