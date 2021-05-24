    
function searchNote(){
    const searchNoteInput = document.getElementById("notesearchinput");
    if(searchNoteInput.value){
        const parentNotes = document.getElementsByClassName("parent-note-container");
        for (let i = 0; i < parentNotes.length; i++) {
            const noteContents = parentNotes[i].getElementsByClassName("note-content");
            let searchFound = false;
            for (let j = 0; j < noteContents.length; j++) {
                if(noteContents[j].innerText.includes(searchNoteInput.value)){
                    searchFound = true;
                    break;
                }
            }
            if(!searchFound)
                parentNotes[i].classList.add("inactive-note");
        }
    }
    else{
        const inactiveNotes = document.getElementsByClassName("inactive-note");
        for (let i = 0; i < inactiveNotes.length; i++)
            inactiveNotes[i].classList.remove("inactive-note");
    }
}
    
function addParentNote(){
    const parentNoteInput = document.getElementById("parentnoteinput"),
    notesRendererBlock = document.getElementById("notesblock"),
        newNote = getNoteBlock(parentNoteInput.value);
    newNote.classList.add("parent-note-container");
    notesRendererBlock
        .appendChild(newNote);
    parentNoteInput.value = "";
}
    
function getNoteBlock(content){
    const noteContainer = document.createElement("div"),
            noteContent = document.createElement("div"),
            subNotesContainer = document.createElement("div");
    noteContainer.classList.add("note-container");
    noteContent.classList.add("note-content");
    subNotesContainer.classList.add("sub-notes-container");
    noteContent.innerText = content;
    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(getNoteModificationBlock(noteContainer, subNotesContainer));
    noteContainer.appendChild(subNotesContainer);
    return noteContainer;
}

function getNoteModificationBlock(noteContainer, subNotesContainer){
    const noteModificationBlock = document.createElement("div"),
            subNoteAdditionInput = document.createElement("input");
    noteModificationBlock.classList.add("note-modification-block");
    subNoteAdditionInput.classList.add("sub-note-addition-input");
    noteModificationBlock
        .appendChild(subNoteAdditionInput);
    noteModificationBlock
        .appendChild(getNoteModificationBtnContainer("sub-note-addition", "New Note", () => {
        subNotesContainer.appendChild(getNoteBlock(subNoteAdditionInput.value));
        subNoteAdditionInput.value = "";
    }));
    noteModificationBlock
        .appendChild(getNoteModificationBtnContainer("note-delete", "Delete", (() => noteContainer.remove())));
    return noteModificationBlock;
}

function getNoteModificationBtnContainer(classPrefix, btnText, onClick){
    const noteModificationBtnContainer = document.createElement("div"),
            noteModificationBtn = document.createElement("button");
    noteModificationBtnContainer.classList.add(classPrefix +"-btn-container");
    noteModificationBtn.classList.add(classPrefix +"-btn");
    noteModificationBtnContainer.appendChild(noteModificationBtn);
    noteModificationBtn.addEventListener("click", onClick);
    noteModificationBtn.innerText = btnText;
    return noteModificationBtnContainer;
}