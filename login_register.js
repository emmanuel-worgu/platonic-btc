async function login () {
  try {

    console.log('working!!!');
    document.getElementById('btn-text').textContent = 'Please Wait...';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const url = 'https://crypto-backend1.herokuapp.com/api/user/login/';

    const url = 'https://chika-backend.onrender.com/api/user/login/';

    const body = {
      email,
      password,
    }

    const req = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const res = await req.json();
    console.log(res);

    if (req.status !==200) {
      document.getElementById('btn-text').textContent = 'Sign In';
      alert(res.message || res.errMessage);
    } else {
      localStorage.setItem('token', res.token);
      document.location.href = '/dash.html';
    }
  } catch (error) {
    console.log(error);
    document.getElementById('btn-text').textContent = 'Sign In';
    alert('Check Your Internet Connection!');
  }
};


async function register() {
  try {
    if (document.location.origin === 'https://meta30trader.com') {
      alert('Cannot register at this time. Please try again later');
      return;
    }

    document.getElementById('btn-text').textContent = 'Please Wait...';

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const url = 'https://chika-backend.onrender.com/api/user/register';
    const body = { name, email, password };

    const req = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const res = await req.json();

    if (req.status !== 200) {
      document.getElementById('btn-text').textContent = 'Sign In';
      alert(res.message);
      return;
    }

    // Save token
    localStorage.setItem('token', res.token);

    // ----------------------------
    // Send email to USER
    // ----------------------------
    const userEmailBody = {
      service_id: 'service_iy30y8f',      // Updated service ID
      template_id: 'USER_TEMPLATE_ID',    // Replace with your actual user template ID
      user_id: 'IZOHUTgaW-CBFWRjQ',            // Replace with your actual EmailJS user ID
      template_params: {
        user_name: name,
        user_email: email,
        message: 'Welcome! Your registration was successful.',
      },
    };

    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userEmailBody),
    });

    // ----------------------------
    // Send email to ADMIN
    // ----------------------------
    const adminEmailBody = {
      service_id: 'service_iy30y8f',      // Updated service ID
      template_id: 'template_457ih2r',   // Replace with your actual admin template ID
      user_id: 'IZOHUTgaW-CBFWRjQ',            // Replace with your actual EmailJS user ID
      template_params: {
        user_name: name,
        user_email: email,
        registration_date: new Date().toLocaleString(),
        current_year: new Date().getFullYear(),
        message: `New user registered: ${name} (${email})`,
      },
    };

    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminEmailBody),
    });

    // Redirect to dashboard AFTER emails are sent
    document.location.href = '/dash.html';

  } catch (error) {
    document.getElementById('btn-text').textContent = 'Sign In';
    alert('Check Your Internet Connection');
    console.error(error);
  }
}
