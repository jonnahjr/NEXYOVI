const body = JSON.stringify({ name: "Test", email: "test@example.com", message: "Test message", service: "Consulting" });

fetch('https://api.nexyovi.com/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: body
})
.then(res => res.text().then(text => ({ status: res.status, body: text })))
.then(console.log)
.catch(console.error);
