Base.ExampleListener ??= class ExampleListener {
    static onMouseEnter() {
       $('status').innerHTML += 'mouse entered (listened from non-element)';
    }
}

export default Base.ExampleListener;
