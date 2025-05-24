globalThis.ExampleListener ??= class ExampleListener {
    static onMoused(data) {
        console.log('onMoused (from ExampleListener (not a component)', data);
    }
}

