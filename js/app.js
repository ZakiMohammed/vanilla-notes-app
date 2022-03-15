const dvNotesList = document.querySelector('.notes-list')
const dvNotesEmpty = document.querySelector('.notes-empty')
const txtNotes = document.getElementById('txtNotes')
const btnAdd = document.getElementById('btnAdd')

const onRemove = function (e, id) {
    const index = notes.findIndex(i => i.id == id)
    notes.splice(index, 1)

    const dvNotesItem = e.closest('.notes-item')
    dvNotesItem.remove()

    if (notes.length == 0) {
        dvNotesEmpty.removeAttribute('hidden')
    }
}

const notes = []

for (const note of notes) {
    dvNotesList.innerHTML += `
        <div class="notes-item">
            <div><button class="btn-remove" onclick="onRemove(this, ${note.id})"><i class="fa-solid fa-trash-can"></i></button></div>
            <p>${note.body}</p>
        </div>
    `
}

if (notes.length == 0) {
    dvNotesEmpty.removeAttribute('hidden')
}

btnAdd.addEventListener('click', function (e) {
    e.preventDefault()

    if (txtNotes.value == '') {
        alert('Please enter your notes!')
        return
    }

    const note = {
        id: parseInt((Math.random() * 10000).toFixed(0)),
        body: txtNotes.value
    }

    notes.unshift(note)

    const noteElement = `
        <div class="notes-item">
            <div><button class="btn-remove" onclick="onRemove(this, ${note.id})"><i class="fa-solid fa-trash-can"></i></button></div>
            <p>${note.body}</p>
        </div>
    `

    dvNotesList.innerHTML = noteElement + dvNotesList.innerHTML

    txtNotes.value = ''
    
    if (notes.length != 0) {
        dvNotesEmpty.setAttribute('hidden', '')
    }
})