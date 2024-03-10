async function tranx() {
  try {

    const urltrans = 'https://chika-backend.onrender.com/api/user/transactions';

    const reqtrans = await fetch(urltrans, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'ip': localStorage.getItem('ip'),
      }
    });

    const restrans = await reqtrans.json();
    const list_tranx = restrans.transactions

    for (let i = 0; i < 50; i++) {
      const element = list_tranx[i];
      console.log(element);
      let amount;

      if (element.amount === null) {
        amount = 0;
      } else {
        amount = element.amount;
      }

      const dateString = element.date;
      const date = new Date(dateString);

      // Format the date to a readable string
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const readableDate = date.toLocaleDateString('en-US', options);

      const tr = document.createElement('tr');

      const td1 = document.createElement('td');
      const text_td1 = document.createTextNode(`$${amount}`);
      td1.appendChild(text_td1);

      const td2 = document.createElement('td');
      const text_td2 = document.createTextNode(`${element.receiver.name}`);
      td2.appendChild(text_td2);

      const td3 = document.createElement('td');
      const text_td3 = document.createTextNode(`${element.ref}`);
      td3.appendChild(text_td3);

      const td4 = document.createElement('td');
      const text_td4 = document.createTextNode(`${readableDate}`);
      td4.appendChild(text_td4);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      document.getElementById("tb1").appendChild(tr)
      // document.getElementById("UserTable_wrapper").appendChild(tr);

    }
  } catch (error) {
    console.log(error);
    console.log(error);
  }
};

tranx();
