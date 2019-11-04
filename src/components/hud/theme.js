import styled from "styled-components";

/**
 * Returns the themed styles for all components that are considered "themable". This is *directly* coupled to the chosen
 * class names in the HUD for the selected elements. This returned component will automatically update as the style changes
 * so this function does not need to be called again.
 *
 * Again, this is *only* compatible with the HUD Component and its property structure.
 */
export default function StyledTheme(HUD) {
    return styled(HUD)`
        font-family: Open Sans, sans-serif;

        .body {
            fill: ${props => props.theme.background};
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
    `;
}
