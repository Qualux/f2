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
  
  

const field = document.getElementById('z-field_name');
field.addEventListener('input', ( e ) => {
    console.log('field save...')
    const value = e.currentTarget.value;
    const name = e.currentTarget.getAttribute('z-name');
    postData("http://zero1.local/wp-json/zero/v1/field/value", { value, name }).then((data) => {
        console.log(data);
    });
});

const field2 = document.getElementById('z-field_storage');
field2.addEventListener('input', ( e ) => {
    console.log('field 2 save...')
    const value = e.currentTarget.value;
    const name = e.currentTarget.getAttribute('z-name');
    postData("http://zero1.local/wp-json/zero/v1/field/value", { value, name }).then((data) => {
        console.log(data);
    });
});