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
 })
// Todo on form submission

// Load Todos

// Complete Todo