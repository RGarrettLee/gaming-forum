const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#username-signup').value.trim();
    const emailEl = document.querySelector('#email-signup').value.trim();
    const passwordEl = document.querySelector('#password-signup').value.trim();
    
    if (usernameEl && emailEl && passwordEl) {
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        email: emailEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up');
    }
  };
};
const signupbtn =   document.querySelector('#signUpBtn');

   document.addEventListener('submit', signupFormHandler);