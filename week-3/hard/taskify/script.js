// taskify
// add task button
// input feild on clicking button the class of hidden is on/off
// new todo is added 
// in the todo bar

const todoField = document.getElementById('todo-field');
const addBtn  = document.getElementById('add-todo');
const inputField = document.getElementById('input-field');
const tilte = document.getElementById('title-todo');
const description = document.getElementById('description-todo');
const submit    = document.getElementById('submit')

function createNewTOdo() {
    const tilteIn = tilte.value;
    const descriptionIn = description.value;


    tilte.value = " ";
    description.value= " " ;
    const todoCard = document.createElement('div');
    todoCard.classList.add('card');

    const todoTitle  = document.createElement('h3');
    todoTitle.textContent = tilteIn;

    const todoDescription = document.createElement('p');
    todoDescription.textContent = descriptionIn;

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDescription);

   todoField.appendChild(todoCard);

   
   inputField.classList.add('hidden')
}


submit.addEventListener('click',createNewTOdo)


addBtn.addEventListener('click',()=>{
    inputField.classList.remove('hidden')
   
    
});



