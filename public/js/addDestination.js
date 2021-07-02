const newDestinationFormHandler = async (event) => {
  event.preventDefault();

  const location_name = document.querySelector('#new-destination').value;

  if (location_name) {
    
    const response = await fetch('/api/destinations', {
      method: 'POST',
      body: JSON.stringify({
        location_name
      }),  
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.new-destination-form')
  .addEventListener('submit', newDestinationFormHandler);