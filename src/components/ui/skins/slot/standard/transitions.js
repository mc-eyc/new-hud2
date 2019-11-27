import { TweenMax, TimelineMax, Back } from "gsap";

export default {
    "default > spin | autoSpinConfig > spin | autoSpinSelected > spin | betConfig > spin": (
        { auto, spin, bet },
        data
    ) => {
        return new TimelineMax()
            .add(
                TweenMax.to(spin.target, 0.25, {
                    ease: Back.easeIn,
                    transformOrigin: "center",
                    opacity: 0,
                    scale: 0,
                    rotation: 360,
                }),
                TweenMax.to([auto.target, bet.target], 0.25, {
                    ease: Back.easeIn,
                    delay: 0.125,
                    transformOrigin: "center",
                    opacity: 0,
                    scale: 0,
                })
            )
            .call(spin.setSkin, ["stop"])
            .call(spin.setToggle, ["spins", true])
            .add(
                TweenMax.fromTo(
                    spin.target,
                    0.25,
                    { rotation: 0 },
                    {
                        ease: Back.easeOut,
                        transformOrigin: "center",
                        opacity: 1,
                        scale: 1,
                    }
                )
            );
    },
    "spin > default | freeSpin > default | autoSpinConfig > default | autoSpinSelected > default": ({
        auto,
        spin,
        bet,
    }) => {
        return new TimelineMax()
            .call(auto.setSkin, ["default"])
            .call(bet.setSkin, ["default"])
            .call(spin.setSkin, ["default"])
            .call(spin.setToggle, ["spins", false])
            .add(
                TweenMax.fromTo(
                    spin.target,
                    0.25,
                    { scale: 0, rotation: 0 },
                    {
                        ease: Back.easeOut,
                        transformOrigin: "center",
                        opacity: 1.0,
                        scale: 1.0,
                    }
                ),
                TweenMax.to([auto.target, bet.target], 0.25, {
                    ease: Back.easeOut,
                    transformOrigin: "center",
                    delay: 0.125,
                    opacity: 1.0,
                    scale: 1.0,
                })
            );
    },
    "default > freeSpin": ({ auto, spin, bet }) => {
        return new TimelineMax()
            .call(spin.setSkin, ["freeSpin"])
            .call(spin.setToggle, ["spins", true])
            .add(
                TweenMax.fromTo(
                    spin.target,
                    0.25,
                    { rotation: 0 },
                    {
                        ease: Back.easeOut,
                        transformOrigin: "center",
                        opacity: 1.0,
                        scale: 1.0,
                        rotation: 0,
                    }
                ),
                TweenMax.to([auto.target, bet.target], 0, {
                    transformOrigin: "center",
                    opacity: 0,
                    scale: 0,
                })
            );
    },
    "spin > freeSpin": ({ auto, spin, bet }) => {
        return new TimelineMax()
            .add(
                TweenMax.fromTo(
                    spin.target,
                    0.125,
                    { rotation: 0 },
                    {
                        transformOrigin: "center",
                        opacity: 0,
                        rotation: 0,
                        y: "+25%",
                    }
                )
            )
            .call(spin.setSkin, ["freeSpin"])
            .call(spin.setToggle, ["spins", true])
            .add(
                TweenMax.fromTo(
                    spin.target,
                    0.125,
                    { y: "-25%" },
                    { ease: Back.easeOut, y: "0%", opacity: 1, scale: 1 }
                )
            );
    },
    "freeSpin > spin": ({ auto, spin, bet }) => {
        return new TimelineMax()
            .add(
                TweenMax.fromTo(
                    spin.target,
                    0.125,
                    { rotation: 0 },
                    {
                        transformOrigin: "center",
                        opacity: 0,
                        rotation: 0,
                        y: "+25%",
                    }
                )
            )
            .call(spin.setSkin, ["stop"])
            .call(spin.setToggle, ["spins", true])
            .add(
                TweenMax.fromTo(
                    spin.target,
                    0.125,
                    { y: "-25%" },
                    { ease: Back.easeOut, y: "0%", opacity: 1, scale: 1 }
                )
            );
    },
    autoSpinConfig: ({ auto, spin, bet }) => {
        return new TimelineMax()
            .call(auto.setSkin, ["close"])
            .call(bet.setSkin, ["default"])
            .call(spin.setSkin, ["default"])
            .call(spin.setToggle, ["spins", false]);
    },
    autoSpinSelected: ({ auto, spin, bet }) => {
        return new TimelineMax()
            .call(auto.setSkin, ["close"])
            .call(bet.setSkin, ["default"])
            .call(spin.setSkin, ["autoSpin"])
            .call(spin.setToggle, ["spins", true]);
    },
    betConfig: ({ auto, spin, bet }) => {
        return new TimelineMax()
            .call(auto.setSkin, ["default"])
            .call(bet.setSkin, ["close"])
            .call(spin.setSkin, ["default"])
            .call(spin.setToggle, ["spins", false]);
    },
};
