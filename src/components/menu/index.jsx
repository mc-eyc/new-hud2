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
    grid-template-areas: "theme ui toggles toggles" "theme buttons buttons buttons" "theme screens screens screens";
    grid-template-columns: 34em;

    section {
        fieldset,
        form {
            display: flex;
            align-items: center;
        }

        fieldset {
            border-radius: 1em;
            border-color: #0f0c29;

            legend {
                font-size: 1.25em;
                color: pink;
                background-color: rgba(0, 0, 0, 0.8);
                padding: 0.015em 0.35em 0.15em 0.35em;
                font-weight: bold;
                text-transform: uppercase;
                border-radius: 0.25em;
            }
        }
    }

    label {
        text-transform: uppercase;
        margin-right: 1em;
    }

    .theme {
        grid-area: theme;

        fieldset {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            justify-items: center;

            .theme-picker {
                display: inline-flex;
                flex-basis: 50%;
                width: 45%;
            }
        }
    }

    .ui {
        grid-area: ui;
    }

    .toggles {
        grid-area: toggles;
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
    setUIActivity,
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
                    <div>
                        <ThemePicker label="Background" prop="background" />
                        <ThemePicker label="Game Title" prop="gameTitle.color" />
                        <ThemePicker label="Buttons" prop="button.color" />
                        <ThemePicker label="Balance Title" prop="balance.title.color" />
                        <ThemePicker label="Balance Value" prop="balance.value.color" />
                        <ThemePicker label="Clock" prop="clock.color" />
                        <ThemePicker label="Border" prop="border.color" />
                        <ThemePicker label="UI Foreground" prop="ui.color" />
                        <ThemePicker label="UI Background" prop="ui.background" />
                        <ThemePicker label="Screen Background" prop="screen.background" />
                        <ThemePicker label="Screen Text" prop="screen.text" />
                        <ThemePicker label="Screen Titles" prop="screen.title" />
                        <ThemePicker label="Screen Accent" prop="screen.accent" />
                        <ThemePicker label="Button Text" prop="screen.button.color" />
                        <ThemePicker label="Button Background" prop="screen.button.background" />
                    </div>
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
                        <select value={ui.activity} onChange={e => setUIActivity(e.target.value)}>
                            {["default", "spin", "freeSpin"].map(opt => (
                                <option key={`activity-${opt}`} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </form>
                </fieldset>
            </section>
            <section className="screens">
                <fieldset>
                    <legend>Screens</legend>
                    <form>
                        {Object.keys(screens.screens).map(screen => (
                            <React.Fragment key={`screen-${screen}`}>
                                <input
                                    type="radio"
                                    name="screenSelect"
                                    value={screen}
                                    onChange={e => goToScreen(e.target.value)}
                                    checked={screens.active === screen ? "checked" : ""}
                                />
                                <label>{screen}</label>
                            </React.Fragment>
                        ))}
                    </form>
                </fieldset>
            </section>
            <section className="toggles">
                <fieldset>
                    <legend>Toggles</legend>
                    <form>
                        <input type="checkbox" checked={clock} onChange={e => updateClock(e.target.checked)} />
                        <label>Clock</label>
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
        setUIActivity: activity => dispatch({ type: "ui.setActivity", activity }),
        updateUILayout: opts => dispatch({ type: "ui.updateLayout", ...opts }),
        toggleScreen: screen => dispatch({ type: "screens.toggle", screen }),
        goToScreen: screen => dispatch({ type: "screens.setActiveScreen", screen }),
    })
)(Menu);
