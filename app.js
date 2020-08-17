console.log("Welcome To QNotes..!!");

showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles")
    if (notes == null) {
        noteObj = [];
        titleObj = [];
    }

    else {
        noteObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }

    noteObj.push(addTxt.value);
    titleObj.push(addTitle.value)
    localStorage.setItem("notes", JSON.stringify(noteObj));
    localStorage.setItem("titles", JSON.stringify(titleObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log("Note Added..!!")
    showNotes();
})


function showNotes() {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles")
    if (notes == null) {
        noteObj = [];
        titleObj = [];
    }

    else {
        noteObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }

    let html = "";
    noteObj.forEach(function (element, index) {
        html += `
        <div class="notesCard card my-4 mx-2">
        <div class="card-body">
        <h5 class="card-title">${titleObj[index]}</h5>
        <p contentEditable="true" class="card-text">${element}</p>
        <button id="${index}" onclick=deleteNote(this.id) class="btn btn-primary">Delete</button>
        </div>
        </div> 
        <hr>`;
    });

    let notesEle = document.getElementById('notes');
    if (noteObj.length != 0) {
        notesEle.innerHTML = html;
    }

    else {
        notesEle.innerHTML = `<h5>Nothing to Show. Try adding a QNote..!!!</h5>`
    }
}

// let edit = document.getElementsByClassName('card-text');
// edit.addEventListener('blur', function(){
//     console.log(this.card);
//     let notes = localStorage.getItem("notes");
//     let titles = localStorage.getItem("titles")
//     if (notes == null) {
//         noteObj = [];
//         titleObj = [];
//     }

//     else {
//         noteObj = JSON.parse(notes);
//         titleObj = JSON.parse(titles);
//     }

//     noteObj.push(addTxt.value);
//     titleObj.push(addTitle.value)
//     localStorage.setItem("notes", JSON.stringify(noteObj));
//     localStorage.setItem("titles", JSON.stringify(titleObj));
//     showNotes();
// })

function deleteNote(index) {
    console.log("Deleting Note", index);
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles")
    if (notes == null) {
        noteObj = [];
        titleObj = [];
    }

    else {
        noteObj = JSON.parse(notes);
        titleObj = JSON.parse(titles);
    }

    noteObj.splice(index, 1);
    titleObj.splice(index,1)
    localStorage.setItem("notes", JSON.stringify(noteObj));
    localStorage.setItem("titles", JSON.stringify(titleObj));
    showNotes();

}   

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
  let inputVal = search.value.toLowerCase();
    let notesCard = document.getElementsByClassName('notesCard');
    Array.from(notesCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        let cardTitle = element.getElementsByTagName('h5')[0].innerText;
        if(cardTxt.includes(inputVal)||cardTitle.includes(inputVal))
        {
            element.style.display = "block";
        }

        else
        {
            element.style.display = "none";
        }
    })
})

