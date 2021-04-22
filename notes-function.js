
//Read existing notes from local storage
const getSavedNotes=function(){
    const noteJson=localStorage.getItem('notes')

      if(noteJson!=null){
      return JSON.parse(noteJson)
    }else{
        return []
    }
}

//remove note from the list
const removeNote=function(id){
    const noteIndex=notes.findIndex(function(note){
        return note.id===id
    })
    if(noteIndex>-1){
        notes.splice(noteIndex,1)
    }

}

//Generate the dom structure

const generateNoteDOM=function(note){
    const noteEl=document.createElement('div')
    const textEl=document.createElement('a')
    const button=document.createElement('button')
    button.textContent='x'
    noteEl.appendChild(button)
    button.addEventListener('click',function(){
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filters)
    })
         if(note.title.length>0){
            textEl.textContent=note.title
         }
         else{
             textEl.textContent="Unnamed Note"
         }
        textEl.setAttribute('href',`/edit.html#${note.id}`)
        noteEl.appendChild(textEl)

         return noteEl
}



//save the notes to local storage
const saveNotes=function(notes){
    localStorage.setItem('notes',JSON.stringify(notes))
}





//Render application notes
const renderNotes = function(notes,filters){
    const filteredNotes = notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    console.log(filteredNotes)
    document.querySelector('#notes').innerHTML=''

    filteredNotes.forEach(function(note){
         const noteEl=generateNoteDOM(note)

        document.querySelector('#notes').appendChild(noteEl)
     })
}
