

const addNote = document.querySelector('.addNote');
const notesLS = JSON.parse(localStorage.getItem('notes'));

if (notesLS){
    notesLS.forEach((note) =>{
        addNewNotes(note);
    });
}


 addNote.addEventListener('click', () =>{
    addNewNotes();
 });

 function addNewNotes(textValue =''){

    

    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
            <div class="main "></div>
            <textarea class ="hidden" name="" id="" cols="30" rows="10"></textarea>
        </div>	
        `

    

    const editBtn = note.querySelector('.edit');
    
    const deleteBtn = note.querySelector('.delete');
    const notes = note.querySelector('notes');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    textArea.value = textValue;
    main.innerHTML = marked.parse(textValue);
    
    editBtn.addEventListener('click' , function(ev){
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click' , function(ev){
        note.remove();
        updateLS();
    });
    
    textArea.addEventListener("input" , (e) => {
        const {value} = e.target;
        main.innerHTML = marked.parse(value);
        
        updateLS();
    });

    document.body.appendChild(note);
 }

 function updateLS(){
    const notesText = document.querySelectorAll('textarea');
    const table = [];

    notesText.forEach((note) =>{
        if (note.value != ""){
            table.push(note.value);
        }
        
    });

    localStorage.setItem('notes', JSON.stringify(table));
 }