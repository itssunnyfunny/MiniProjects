//signup form handling
 document.getElementById('signup-form').addEventListener('submit',async(e)=>{
    e.preventDefault()
   const username=  document.getElementById('signup-username').value;
   const password = document.getElementById('signup-password').value;
  try {
   const response = await fetch('http//:localhost:3000/signup',{
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
   });
    const result = await response.json();

    if (response.ok) {
      document.getElementById('response-message').innerText = result.message || 'signup successful, try to signin ';
      document.getElementById('signup-container').style.display = 'none';
      document.getElementById('signin-container').style.display = 'block';
    } else {
      document.getElementById('response-message').innerText = result.message || 'signup failed';
    }

  } catch (error) {
     document.getElementById('response-message').innerText = 'Error during signing Up'
  }
 })

// signin form handling
 document.getElementById('signin-form').addEventListener('submit',async (e) => {
   e.preventDefault();
 const username =   document.getElementById('signin-username').value;
 const password =   document.getElementById('signin-password').value;
 try {
   const response = await fetch('http//:localhost:3000/signin',{
      method: 'POST',
      headers: {
         'Content-Type' : 'application/json',
      },
      body: JSON.stringify({username, password})
   });
   const result = await response.json();

   if (response.ok) {
      localStorage.setItem('token', result.token);
      document.getElementById('signin-container').style.display = 'none';
      document.getElementById('todo-container').style.display =
      'block';
      document.getElementById('response-message').innerHTML = `Logged in successfully. <a href="#" id="logout-link">Logout</a>`;
      loadTodos();
   }else{
      document.getElementById('response-message').innerText = result.message || 'signIn failed';
   }
 } catch (error) {
   document.getElementById('response-message').innerText = 'Error during signIn'
 }
 });

 document.getElementById('logout-link').addEventListener('click',(e)=>{
   e.preventDefault();
   localStorage.removeItem('token');
   document.getElementById('todo-container').style.display = "none";
   document.getElementById('signin-container').style.display = 
   "block";
   document.getElementById('response-message').innerText = ' '
 })
// Todo on form submission
 document.getElementById('todo-form').addEventListener('submit',async (e) => {
   e.preventDefault();
   const token = localStorage.getItem('token')
   const todoInput = document.getElementById('todo-input');
   const todoText = todoInput.value.trim();

   try {
      const response = await fetch('http://localhost:3000/todo',{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body : JSON.stringify({title: todoText})
      });
      const result = await response.json();
      if (response.ok) {
         todoInput.value = '';
         loadTodos()
      }else {
        console.error(result.message);
      }
   } catch (error) {
      console.error('Error during todo: ',error)
   }
  

 })
// Load Todos
async function loadTodos() {
   const token = localStorage.getItem('token');
   try {
      const response = await fetch('http://localhost:3000/todo',{
         headers: {
            'Authorization': `Bearer ${token}`
         }
      });

      const {todos} = await response.json();
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';

      todos.forEach(todo => {
         const li = document.createElement('li');
         li.textContent = todo.title;

         
      if (todo.completed) {
         li.style.textDecoration = 'line-through';
      }

      const completeButton = document.createElement('button')
      completeButton.textContent = 'Complete';
      completeButton.onclick =  () => {
         completeTodo(todo._id, !todo.completed)
      };

      if (!todo.completed) {
         li.appendChild(completeButton)
      }

      todoList.appendChild(li)
      });

   } catch (error) {
      console.error('error loading todos: ',error)
   }
}

// Complete Todo

async function completeTodo(id, completed){
 const token = localStorage.getItem('token');

 try {
   const response = await fetch(`http://localhost:3000/todo/${id}`,{
      method: 'PUT',
      headers: {
         'Content-Type' : 'application/json',
         'Authorization': `Bearer ${token}`
      }
   });

   if (response.ok) {
      loadTodos()
   };

 } catch (error) {
   console.error('Error completing todo: ',error)
 }
}