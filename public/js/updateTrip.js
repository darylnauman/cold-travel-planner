const updateTripFormHandler = async (event) => {
  event.preventDefault();

  const start_date = document.querySelector('#start-date').value;
  const end_date = document.querySelector('#end-date').value;
  const trip_budget = document.querySelector('#trip-budget').value;
  const hotel_cost = document.querySelector('#hotel-cost').value;
  const food_cost = document.querySelector('#food-cost').value;
  const ent_cost = document.querySelector('#ent-cost').value;
  const misc_cost = document.querySelector('#misc-cost').value;
  const transport_cost = document.querySelector('#transport-cost').value;

  var pageURL = window.location.href;
  var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
  console.log(lastURLSegment);

  if (start_date && end_date && trip_budget) {
    
    const response = await fetch(`/api/trips/${lastURLSegment}`, {
      method: 'PUT',
      body: JSON.stringify({
        start_date,
        end_date,
        trip_budget,
        hotel_cost,
        food_cost,
        ent_cost,
        misc_cost,
        transport_cost
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
  .querySelector('.update-trip-form')
  .addEventListener('submit', updateTripFormHandler);