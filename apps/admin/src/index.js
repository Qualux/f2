const { render } = wp.element;

function App() {
    return(
        <div>
            ADMIN F3 APP
        </div>
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const renderEl = document.getElementById('f3-admin');
    if (renderEl) {
        render(<App />, renderEl);
    }
});
