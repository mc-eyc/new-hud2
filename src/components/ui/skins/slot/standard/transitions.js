import { TweenMax, TimelineMax, Back } from "gsap";

export default {
    "default > spin | freeSpin > spin": ({ auto, spin, bet }) => {
        return new TimelineMax().add(
            TweenMax.fromTo(
                spin.element,
                0.25,
                { attr: { x: 0, y: 0 } },
                { ease: Back.easeIn, opacity: 0, attr: { x: 32, y: 32, width: 0, height: 0 } }
            ),
            TweenMax.fromTo(
                [auto.element, bet.element],
                0.25,
                { attr: { x: 0, y: 0 } },
                { ease: Back.easeIn, delay: 0.125, opacity: 0, attr: { x: 24, y: 24, width: 0, height: 0 } }
            )
        );
    },
    "spin > default | freeSpin > default": ({ auto, spin, bet }) => {
        return new TimelineMax().call(spin.setSkin, ["default"]).add(
            TweenMax.to(spin.element, 0.25, {
                ease: Back.easeOut,
                opacity: 1.0,
                attr: { x: 0, y: 0, width: 64, height: 64 },
            }),
            TweenMax.fromTo(
                [auto.element, bet.element],
                0.25,
                {
                    attr: { x: 24, y: 24, width: 0, height: 0 },
                },
                {
                    ease: Back.easeOut,
                    delay: 0.125,
                    opacity: 1.0,
                    attr: { x: 0, y: 0, width: 48, height: 48 },
                }
            )
        );
    },
    "default > freeSpin | spin > freeSpin": ({ auto, spin, bet }) => {
        return new TimelineMax().call(spin.setSkin, ["freeSpin"]).add(
            TweenMax.to(spin.element, 0.25, {
                ease: Back.easeOut,
                opacity: 1.0,
                attr: { x: 0, y: 0, width: 64, height: 64 },
            }),
            TweenMax.to([auto.element, bet.element], 0, {
                opacity: 0,
                attr: { x: 0, y: 0, width: 0, height: 0 },
            })
        );
    },
};
