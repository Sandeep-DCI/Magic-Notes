console.log("Welcome");
showNotes();
// if user add a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", (e) => {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);

    showNotes()
})

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach((element, index) => {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text"> ${element} </p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
          </div>
        </div>  `;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h2>Nothing to show! Use "Add a Note" section above to add notes!</h2>`
    }
}



// Function to delete a note
let deleteNote = (index) => {
    // console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", () => {

    let inputVal = searchTxt.value.toLowerCase();
    // console.log("Input event fired!" , inputVal);

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach((element) => {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }
        // console.log(cardTxt);
    })
})

/* 
Further Features to add this App:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server
*/