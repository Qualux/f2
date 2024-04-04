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
    const postId = document.getElementById('post_ID').value;
    const value  = e.currentTarget.value;
    const name   = e.currentTarget.getAttribute('z-name');
    const id     = parseInt( e.currentTarget.getAttribute('z-id') );
    postData("http://zero1.local/wp-json/zero/v1/field/value", { id, value, name, post_id: postId }).then((data) => {
        console.log(data);
    });
});

const field2 = document.getElementById('z-field_storage');
field2.addEventListener('input', ( e ) => {
    console.log('field 2 save...')
    const postId = document.getElementById('post_ID').value;
    const value  = e.currentTarget.value;
    const name   = e.currentTarget.getAttribute('z-name');
    const id     = parseInt( e.currentTarget.getAttribute('z-id') );
    postData("http://zero1.local/wp-json/zero/v1/field/value", { id, value, name, post_id: postId }).then((data) => {
        console.log(data);
    });
});