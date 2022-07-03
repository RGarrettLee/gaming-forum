const loginFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#username-login').value.trim();
    const passwordEl = document.querySelector('#password-login').value.trim();
    
    if (usernameEl && passwordEl) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
        document.location.replace('/');
        document.location.reload();
    } else {
      alert('Failed to login');
    }
  };
};

const loginBtn = document.querySelector('#loginBtn');

document
    .addEventListener('submit', loginFormHandler);