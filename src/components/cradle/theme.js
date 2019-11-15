import styled from "styled-components";

/**
 * Returns the themed styles for all components that are considered "themable". This is *directly* coupled to the chosen
 * class names in the Cradle for the selected elements. This returned component will automatically update as the style changes
 * so this function does not need to be called again.
 *
 * Again, this is *only* compatible with the Cradle Component and its property structure.
 */
export default function Theme(Cradle) {
    return styled(Cradle)`
        font-family: Open Sans, sans-serif;

        .hud {
            .body {
                fill: ${props => props.theme.background};
            }

            .game-title {
                background-color: ${props => props.theme.background};
                color: ${props => props.theme.gameTitle.color};
                fill: ${props => props.theme.gameTitle.color};
            }

            .border {
                stroke: ${props => props.theme.border.color};
            }

            .balance {
                .title {
                    color: ${props => props.theme.balance.title.color};
                    fill: ${props => props.theme.balance.title.color};
                    font-family: ${props => props.theme.balance.title.fontFamily};
                }

                .value {
                    color: ${props => props.theme.balance.value.color};
                    fill: ${props => props.theme.balance.value.color};
                    font-family: ${props => props.theme.balance.value.fontFamily};
                }
            }

            .clock {
                font-size: 0.7em;
                color: ${props => props.theme.clock.color};
                font-family: ${props => props.theme.clock.fontFamily};
            }

            .button {
                background-color: ${props => props.theme.button.color};
            }
        }

        .ui {
            .ui-fg {
                stroke: ${props => props.theme.ui.color};
            }

            .ui-bg {
                fill: ${props => props.theme.ui.background};
            }
        }

        .screens {
            .modal {
                background: ${props => props.theme.screen.background};
            }
            .screen {
                color: ${props => props.theme.screen.text};

                .button {
                    color: ${props => props.theme.screen.button.color};
                    background-color: ${props => props.theme.screen.button.background};
                }
            }
        }
    `;
}
