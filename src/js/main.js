const init = () => {
    
    const input = document.querySelector('#input');
    const submit = document.querySelector('#btn-search');

    submit.addEventListener('click', () => {
        let keyword = input.value;
        input.value = '';

        let api = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${keyword}&format=json&callback=?`;

        fetch(api, {// mode: "no-cors",
            method: 'get',
            headers: {
            "Content-Type": "application/json; charset=UTF-8"}
        })
        .then((data) => data.json())
        .then((resp) => console.log(resp));
    });
    

    
}