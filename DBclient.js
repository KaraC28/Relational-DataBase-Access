"use strict";
(function () {
window.addEventListener("load", getData);
window.addEventListener("load", postData);
window.addEventListener("load", deleteData);
function getData() {
    document.getElementById("get-btn").addEventListener("click", requestGet);
}
function postData() {
    document.getElementById("post-btn").addEventListener("click", requestPost);
}
function deleteData() {
    document.getElementById("delete-btn").addEventListener("click", requestDelete);
}
function checkStatus(response) {
    if (!response.ok) {
    throw Error("Error in request: " + response.statusText);
    }
    return response;
    }
    function requestGet() {
        const contents = document.getElementById("what-to-get").value;
        fetch("get?input=" + contents)
        .then(checkStatus)
        .then(resp => resp.text())
        .catch(console.error);
    }
    function requestPost() {
        const contents = document.getElementById("what-to-post").value;
        fetch("post?input=" + contents)
        .then(checkStatus)
        .then(resp => resp.text())
        .catch(console.error);
    }
    function requestDelete() {
        const contents = document.getElementById("what-to-delete").value;
        fetch("delete?input=" + contents)
        .then(checkStatus)
        .then(resp => resp.text())
        .catch(console.error);
    }
    })();