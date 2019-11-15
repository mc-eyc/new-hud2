export default function demo(store) {
    //store.subscribe(() => console.log(JSON.stringify(store.getState(), null, 2)));
    //store.dispatch({ type: "clock.update", value: true });

    store.dispatch({ type: "balances.add", balance: { title: "Credit", value: "$999,999,999.99" } });
    store.dispatch({ type: "balances.add", balance: { title: "Win", value: "¥ 1234" } });
    store.dispatch({ type: "balances.add", balance: { title: "Bet", value: "£56.78" } });
    //store.dispatch({ type: "balances.add", balance: { title: "Free Games", value: "1" }});

    store.dispatch({ type: "buttons.update", button: "menu", value: true });
    store.dispatch({ type: "buttons.update", button: "sound", value: true });
    store.dispatch({ type: "buttons.update", button: "home", value: true });
    store.dispatch({ type: "buttons.update", button: "cashier", value: true });
    store.dispatch({ type: "buttons.update", button: "history", value: false });
    store.dispatch({ type: "buttons.update", button: "info", value: false });

    store.dispatch({ type: "ui.updateLayout", bounds: { width: 100, height: 600 }, orientation: "vertical" });
    store.dispatch({ type: "ui.setSkin", skin: "slot.standard" });

    // Some demo screens, obviously not full components but just something to
    // get an idea of how to offset them
    store.dispatch({ type: "screens.add", name: "main", elements: [], layer: 0 });
    store.dispatch({
        type: "screens.add",
        name: "menu",
        elements: [
            { type: "button", text: "Example1" },
            { type: "button", text: "Example2" },
            { type: "button", text: "Example3" },
            { type: "button", text: "Example4" },
            { type: "button", text: "Example5" },
            { type: "button", text: "Example6" },
        ],
        align: "center",
        layer: 2,
    });
    store.dispatch({
        type: "screens.add",
        name: "auto-config",
        elements: [
            { type: "header", text: "Autoplay" },
            {
                type: "group",
                orientation: "horizontal",
                children: new Array(10).fill(0).map((e, i) => ({ type: "button", text: `${i * 25}` })),
            },
        ],
        align: "center",
        layer: 1,
    });
    store.dispatch({
        type: "screens.add",
        name: "paytable",
        elements: [
            { type: "header", text: "Paytable" },

            {
                type: "text",
                value:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt enim cursus risus consectetur, a interdum odio sodales. Donec hendrerit finibus massa ut venenatis. Nullam ullamcorper diam in gravida viverra. Praesent vitae ante in lacus consequat dapibus. Aenean sollicitudin felis ac vehicula rutrum. Phasellus neque lacus, consectetur a elementum sed, fringilla vitae lectus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque mattis risus ut magna facilisis maximus. In condimentum finibus lectus aliquet gravida. Praesent at orci sit amet metus efficitur interdum in at mauris. Proin non luctus erat, vel malesuada nisi. Mauris porta sapien augue, sed porta metus fermentum et.",
            },

            {
                type: "text",
                value:
                    "Maecenas nisl dolor, varius quis aliquam a, pellentesque id quam. Aliquam at viverra arcu. In dapibus mi eu risus luctus, in facilisis mi blandit. Ut efficitur ipsum quis lectus posuere, pulvinar bibendum elit rhoncus. Praesent et suscipit tellus. Suspendisse a lectus pharetra, fringilla mi a, auctor mauris. Vivamus nulla sapien, lacinia in massa quis, posuere sollicitudin nulla. Vestibulum commodo tempus nulla sed vehicula. Praesent maximus sem eget ligula lacinia, a tincidunt odio finibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },

            {
                type: "text",
                value:
                    "Quisque rhoncus libero velit, at aliquam metus pretium hendrerit. Sed finibus scelerisque sem, bibendum vestibulum nibh elementum sed. Praesent id pretium eros. Aenean congue volutpat libero sed vehicula. Donec tempus porta eros a euismod. Nam eleifend auctor nisi, in interdum orci porttitor eu. Proin ullamcorper consectetur urna in lacinia. Maecenas id nunc at dui commodo ultrices. Suspendisse nisi justo, bibendum ut hendrerit vel, tristique sed purus. Nulla faucibus lacus turpis, vitae auctor arcu ultricies vulputate.",
            },

            {
                type: "text",
                value:
                    "Etiam imperdiet lorem non dolor interdum, eu lacinia dolor tristique. Proin ante urna, posuere vel enim non, ornare vestibulum neque. Sed aliquet, massa vitae sollicitudin egestas, urna sem malesuada sem, id imperdiet mauris tellus non ante. Donec tempus tortor felis, at dapibus nunc efficitur id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida tincidunt nulla, at malesuada tortor pharetra id. Mauris et lacus quis ligula vulputate condimentum sed sed dui. Nam tortor neque, congue quis pellentesque at, consequat at justo. Curabitur et vestibulum nulla. Aliquam feugiat, nunc a porttitor bibendum, dolor ligula posuere nisi, sit amet dapibus tortor tortor varius magna. Ut vel viverra ipsum. Fusce fermentum orci non nisl feugiat lacinia.",
            },

            {
                type: "text",
                value:
                    "Ut commodo nisl vel interdum dignissim. Quisque venenatis diam sit amet molestie lobortis. Proin blandit nulla elementum libero pretium pellentesque. Quisque blandit vestibulum dolor. Duis aliquet ut sem vulputate egestas. Vestibulum quis est nec arcu placerat varius vitae id lacus. Curabitur suscipit diam nisi, sed sodales sapien facilisis eu. Suspendisse convallis sit amet turpis ac euismod. ",
            },
        ],
        layer: 2,
    });

    store.dispatch({ type: "screens.setActiveScreen", screen: "main" });

    store.dispatch({ type: "title.update", text: "Example Game", enabled: true });
}
