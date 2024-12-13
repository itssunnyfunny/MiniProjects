

// first create two short of cards fields 
// in first card you add two input fields first is for input type
// second is for label link to the input field 
// on clicking the button a new field is added with the previous fields 
// in second card the new field is added 
// thats all 

const fieldType = document.getElementById('input-type');
const fieldLabel = document.getElementById('input-label');
const renderField = document.getElementById('form-preview');
const addBtn = document.getElementById('submit-btn')



function CreateForm() {

    const inType = fieldType.value;
    const inLabel = fieldLabel.value;

     const wrapperEl = document.createElement('div');
     wrapperEl.classList.add('input-card');

     const newInput = document.createElement('input')

     newInput.type = inType;
     newInput.id = inLabel;


     const newLabel = document.createElement('label')
     newLabel.htmlFor = inLabel
     newLabel.textContent = inLabel
     
     wrapperEl.appendChild(newLabel);
     
     wrapperEl.appendChild(newInput);

 
     renderField.appendChild(wrapperEl)
}
addBtn.addEventListener('click',CreateForm);




