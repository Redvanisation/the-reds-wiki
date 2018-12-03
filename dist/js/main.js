'use strict';

var init = function init() {

    // GETTING THE NEEDED HTML ELEMENTS FOR LATER USE:
    var input = document.querySelector('#input');
    var submit = document.querySelector('#btn-search');
    var content = document.querySelector('#content-div');

    // DECLARING A FUNCTION TO HANDLE THE API CALL AND SHOW ITS DATA:
    var getData = function getData() {

        // GETTING THE INPUT VALUE:
        var keyword = input.value;

        // DELETING THE INPUT DATA AFTER EACH SEARCH:
        input.value = '';

        // DELETING THE HTML RESULTS AFTER EACH NEW SEARCH:
        content.innerHTML = '';

        // DECLARING THE API URL LINK:
        var api = 'https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=' + keyword;

        // FETCHING THE API DATA FROM THE API SERVER:
        fetch(api).then(function (data) {
            return data.json();
        }).then(function (resp) {

            // LOOPING THROUGH THE RESULTS AND SHOWING EACH PIECE ON ITS RELATED HTML TAG:
            for (var i in resp) {

                // CHECKING IF THE SEARCH QUERY IS CORRECT THEN SHOW THE RESULT IF NOT THEN SHOW AN ERROR MESSAGE:
                if (resp[1][i] != undefined) {
                    content.innerHTML += '\n                    <div class="content-section__second--result-container">\n                        <hr class="content-section__second--hr">\n                        <h2 class="content-section__second--h2">' + resp[1][i] + '</h2>\n                        <p class="content-section__second--text">\n                        ' + resp[2][i] + '\n                        <a href="' + resp[3][i] + '" class="content-section__second--link" target="_blank">Read more...</a>\n                        </p>\n                    </div>';
                } else {
                    content.innerHTML = '\n                        <hr class="content-section__second--hr">\n                        <h2 class="content-section__second--h2">Please Enter a Valid Search Query</h2>\n                ';
                }
            }
        }).catch(function (err) {
            return console.log(err);
        });
    };

    // CALLING THE GET DATA FUNCTION ON EACH CLICK OF THE SUBMIT BUTTON:
    submit.addEventListener('click', function () {
        return getData();
    });

    // CALLING THE GET DATA FUNCTION ON EACH PRESS OF ENTER KEY:
    input.addEventListener('keypress', function (e) {
        if (e.which == 13) {
            getData();
        }
    });
};