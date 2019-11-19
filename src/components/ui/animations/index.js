import produce from "immer";
import queue from "async.queue";

export default class Animations {
    constructor() {
        this.animations = {};
        this.queue = queue((task, done) => {
            new Promise((resolve, reject) => {
              // TODO: How to get the buttons in here?
                task.callback(task.from, task.to, task.options, resolve);
            })
                .then(() => done())
                .catch(done);
        });
    }

    on(targets, callback) {
        if (targets instanceof Array) {
            targets.forEach(this.on.bind(this));
        } else {
            const { from, to } = targets;
            this.animations = produce(this.animations, data => {
                data[[from, to]] = callback;
            });
        }
    }

    play(from, to, options = {}) {
        if (this.has(from, to)) {
            this.queue.push({});
        }
    }

    has(from, to) {
        return Boolean(this.animations[[from, to]]);
    }
}
