async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}
  
  

const field = document.getElementById('zero-field');
field.addEventListener('input', ( e ) => {
    console.log('field save...')
    const value = e.currentTarget.value;
    const name = e.currentTarget.getAttribute('z-name');
    postData("http://zero1.local/wp-json/zero/v1/field/value", { value, name }).then((data) => {
        console.log(data);
    });
});