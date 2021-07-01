const tripDetailsFormHandler = async (event) => {
  event.preventDefault();
  
  const destination_id = document.querySelector('#trip-destination_ID').value;
  const trip_budget = document.querySelector('#trip-budget').value;
  const hotel_cost = document.querySelector('#hotel-cost').value;
  const food_cost = document.querySelector('#food-cost').value;
  const ent_cost = document.querySelector('#entertainment-cost').value;
  const misc_cost = document.querySelector('#misc-cost').value;

  if (destination_id && trip_budget && hotel_cost && food_cost && ent_cost && misc_cost) {
    
    console.log('sending POST request to the API endpoint to create a blog post');
    
    const response = await fetch('/api/trips', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postContent }), //req.body.postTitle, req.body.postContent
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
  .querySelector('.tripDetails-form')
  .addEventListener('submit', tripDetailsFormHandler);