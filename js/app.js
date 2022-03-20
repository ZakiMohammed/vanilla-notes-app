const dvNotesList = document.querySelector('.notes-list')
const dvNotesEmpty = document.querySelector('.notes-empty')
const dvLoader = document.querySelector('.loader-holder')
const txtNotes = document.getElementById('txtNotes')
const btnAdd = document.getElementById('btnAdd')

// const apiUrl = `https://jsonplaceholder.typicode.com/todos/`
const apiUrl = `https://vanillax-todo-api.herokuapp.com/api/todos/`

let notes = []

const onRemove = function (e, _id) {

    // remove note from server
    showLoader()
    fetch(apiUrl + _id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            const index = notes.findIndex(i => i._id == _id)
            notes.splice(index, 1)

            const dvNotesItem = e.closest('.notes-item')
            dvNotesItem.remove()

            if (notes.length == 0) {
                dvNotesEmpty.removeAttribute('hidden')
            }
        })
        .catch(error => {
            alert('Something went wrong')
        })
        .finally(() => hideLoader())
}
const showLoader = () => dvLoader.style.display = 'flex'
const hideLoader = () => dvLoader.style.display = 'none'

// get notes listing
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        notes = data

        for (const note of notes) {
            dvNotesList.innerHTML += `
                <div class="notes-item">
                    <div><button class="btn-remove" onclick="onRemove(this, '${note._id}')"><i class="fa-solid fa-trash-can"></i></button></div>
                    <p>${note.title}</p>
                </div>
            `
        }

        // for empty message
        if (notes.length == 0) {
            dvNotesEmpty.removeAttribute('hidden')
        }
    })
    .catch(error => {
        alert('Something went wrong')
    })
    .finally(() => hideLoader())

btnAdd.addEventListener('click', function (e) {
    e.preventDefault()

    if (txtNotes.value == '') {
        alert('Please enter your notes!')
        return
    }

    let note = {
        // _id: parseInt((Math.random() * 10000).toFixed(0)),
        title: txtNotes.value
    }

    // add to server
    showLoader()
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            note = data

            notes.unshift(note)

            const noteElement = `
                <div class="notes-item">
                    <div><button class="btn-remove" onclick="onRemove(this, '${note._id}')"><i class="fa-solid fa-trash-can"></i></button></div>
                    <p>${note.title}</p>
                </div>
            `

            dvNotesList.innerHTML = noteElement + dvNotesList.innerHTML

            txtNotes.value = ''

            if (notes.length != 0) {
                dvNotesEmpty.setAttribute('hidden', '')
            }
        })
        .catch(error => {
            alert('Something went wrong')
        })
        .finally(() => hideLoader())
})