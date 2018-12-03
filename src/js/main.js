const init = () => {
    
    // GETTING THE NEEDED HTML ELEMENTS FOR LATER USE:
    const input = document.querySelector('#input');
    const submit = document.querySelector('#btn-search');
    const content = document.querySelector('#content-div');

    // DECLARING A FUNCTION TO HANDLE THE API CALL AND SHOW ITS DATA:
    const getData = () => {

        // GETTING THE INPUT VALUE:
        let keyword = input.value;

        // DELETING THE INPUT DATA AFTER EACH SEARCH:
        input.value = '';

        // DELETING THE HTML RESULTS AFTER EACH NEW SEARCH:
        content.innerHTML = '';

        // DECLARING THE API URL LINK:
        const api = `https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${keyword}`;

        // FETCHING THE API DATA FROM THE API SERVER:
        fetch(api)
        .then((data) => data.json())
        .then((resp) => {

            // LOOPING THROUGH THE RESULTS AND SHOWING EACH PIECE ON ITS RELATED HTML TAG:
            for (let i in resp) {

                // CHECKING IF THE SEARCH QUERY IS CORRECT THEN SHOW THE RESULT IF NOT THEN SHOW AN ERROR MESSAGE:
                if (resp[1][i] != undefined) {
                    content.innerHTML += `
                    <div class="content-section__second--result-container">
                        <hr class="content-section__second--hr">
                        <h2 class="content-section__second--h2">${resp[1][i]}</h2>
                        <p class="content-section__second--text">
                        ${resp[2][i]}
                        <a href="${resp[3][i]}" class="content-section__second--link" target="_blank">Read more...</a>
                        </p>
                    </div>`;
                } else {
                    content.innerHTML = `
                        <hr class="content-section__second--hr">
                        <h2 class="content-section__second--h2">Please Enter a Valid Search Query</h2>
                `;
                }
            }
        })
        .catch((err) => console.log(err));
    }

    // CALLING THE GET DATA FUNCTION ON EACH CLICK OF THE SUBMIT BUTTON:
    submit.addEventListener('click', () => getData());

    // CALLING THE GET DATA FUNCTION ON EACH PRESS OF ENTER KEY:
    input.addEventListener('keypress', (e) => {
        if (e.which == 13) {
            getData();
        }
    })
    

    
}