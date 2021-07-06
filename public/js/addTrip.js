const newTripFormHandler = async (event) => {
  event.preventDefault();

  const start_date = document.querySelector('#start-date').value;
  const end_date = document.querySelector('#end-date').value;
  const trip_budget = document.querySelector('#trip-budget').value;
  const hotel_cost = document.querySelector('#hotel-cost').value;
  const food_cost = document.querySelector('#food-cost').value;
  const ent_cost = document.querySelector('#ent-cost').value;
  const misc_cost = document.querySelector('#misc-cost').value;
  const transport_cost = document.querySelector('#transport-cost').value;
  const destination_id = document.querySelector('#trip-destination_ID').value;
  
  if (start_date && end_date && trip_budget && destination_id) {

    const response = await fetch('/api/trips', {
      method: 'POST',
      body: JSON.stringify({
        start_date,
        end_date,
        trip_budget,
        hotel_cost,
        food_cost,
        ent_cost,
        misc_cost,
        transport_cost,
        destination_id
      }),  
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/trips/${userId}/CAD`);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.form-add')
  .addEventListener('submit', newTripFormHandler);
