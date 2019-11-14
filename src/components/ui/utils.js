export function calcAnchor({ parent, child }) {
    if (child.y + child.height / 2 < parent.height / 2 && child.width > parent.width / 2) {
        return "top";
    } else if (child.y + child.height / 2 > parent.height / 2 && child.width > parent.width / 2) {
        return "bottom";
    } else if (child.x + child.width / 2 > parent.width / 2) {
        return "right";
    } else {
        return "left";
    }
}

export function calcNormals({ parent, child }) {
    return {
        parent: {
            width: parent.width,
            height: parent.height,
            x: parent.x || parent.left,
            y: parent.y || parent.top,
        },
        child: {
            width: child.width,
            height: child.height,
            x: child.x - parent.x,
            y: child.y - parent.y,
        },
    };
}

export function calcSafeArea(targets) {
    const { parent, child } = calcNormals(targets);
    switch (calcAnchor({ parent, child })) {
        case "top":
            return {
                width: parent.width,
                height: parent.height - (child.y + child.height),
                x: 0,
                y: child.y + child.height,
            };
        case "right":
            return {
                width: parent.width - (parent.width - child.x),
                height: parent.height,
                x: 0,
                y: 0,
            };
        case "bottom":
            return {
                width: parent.width,
                height: parent.height - (parent.height - child.y),
                x: 0,
                y: 0,
            };
        case "left":
            return {
                width: parent.width - (child.x + child.width),
                height: parent.height,
                x: child.x + child.width,
                y: 0,
            };
        default:
            return { width: 0, height: 0, x: 0, y: 0 };
    }
}

export function calcStageGlobal(viewport, stage) {
    return {
        width: stage.width,
        height: stage.height,
        x: viewport.x + stage.x,
        y: viewport.y + stage.y,
    };
}
