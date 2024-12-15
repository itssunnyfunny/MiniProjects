
const fieldType = document.getElementById('input-type');
const fieldLabel = document.getElementById('input-label');
const renderField = document.getElementById('form-preview');
const addBtn = document.getElementById('submit-btn')



function CreateForm() {

    const inType = fieldType.value;
    const inLabel = fieldLabel.value;

     const wrapperEl = document.createElement('div');
     wrapperEl.classList.add('input-card');

     const newInput = document.createElement('input');

     newInput.type = inType;
     newInput.id = inLabel;

     const breaker = document.createElement('br');


     const newLabel = document.createElement('label')
     newLabel.htmlFor = inLabel
     newLabel.textContent = inLabel
     
     wrapperEl.appendChild(newLabel);
     wrapperEl.appendChild(breaker);
     
     wrapperEl.appendChild(newInput);

 
     renderField.appendChild(wrapperEl)
}
addBtn.addEventListener('click',CreateForm);




