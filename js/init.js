// Helpers
Promise.all([
    import('./base/Base.js'),
    import('./helpers/Api.js'),
    import('./helpers/ExampleListener.js')
])
.catch(err => console.error('Failed to load module:', err))
.then(() => {
    // Components
    import('./components/ex-element.js').catch(err => console.error('Failed to load component:', err));
});