const noteForm = document.getElementById('note-form');
const notesContainer = document.getElementById('notes-container');
let isEditMode = false;
let selectedNote = null;

noteForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const titleInput = document.getElementById('title-input');
  const descriptionInput = document.getElementById('description-input');
  
  const title = titleInput.value;
  const description = descriptionInput.value;
  
  if (title.trim() !== '' && description.trim() !== '') {
    if (isEditMode && selectedNote) {
      updateNote(selectedNote, title, description);
      selectedNote = null;
      isEditMode = false;
    } else {
      createNoteElement(title, description);
    }
    
    titleInput.value = '';
    descriptionInput.value = '';
  }
});

function createNoteElement(title, description) {
  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  
  const titleElement = document.createElement('h2');
  titleElement.textContent = title;
  
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description;
  
  noteElement.appendChild(titleElement);
  noteElement.appendChild(descriptionElement);
  
  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  editButton.addEventListener('click', function() {
    editNoteElement(noteElement, titleElement, descriptionElement);
  });
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.addEventListener('click', function() {
    noteElement.remove();
  });
  
  noteElement.appendChild(editButton);
  noteElement.appendChild(deleteButton);
  
  notesContainer.insertBefore(noteElement, notesContainer.firstChild);
}

function editNoteElement(noteElement, titleElement, descriptionElement) {
  const editButton = noteElement.querySelector('button');

  if (!isEditMode) {
    isEditMode = true;
    selectedNote = noteElement;

    editButton.textContent = 'Actualizar';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = titleElement.textContent;

    const descriptionInput = document.createElement('textarea');
    descriptionInput.value = descriptionElement.textContent;

    noteElement.replaceChild(titleInput, titleElement);
    noteElement.replaceChild(descriptionInput, descriptionElement);
  } else {
    // Actualizar nota
    const titleInput = noteElement.querySelector('input');
    const descriptionInput = noteElement.querySelector('textarea');

    titleElement.textContent = titleInput.value;
    descriptionElement.textContent = descriptionInput.value;

    editButton.textContent = 'Editar';

    isEditMode = false;
    selectedNote = null;

    noteElement.replaceChild(titleElement, titleInput);
    noteElement.replaceChild(descriptionElement, descriptionInput);
  }
}

function updateNote(noteElement, newTitle, newDescription) {
  const titleElement = noteElement.querySelector('h2');
  const descriptionElement = noteElement.querySelector('p');

  titleElement.textContent = newTitle;
  descriptionElement.textContent = newDescription;
}
