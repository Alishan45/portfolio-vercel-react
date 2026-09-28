fetch('http://localhost:3001/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: "Hello", history: [] })
}).then(res => res.text()).then(console.log).catch(console.error);
