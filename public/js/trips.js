const updateButtonHandler = async (event) => {
  const id = event.target.getAttribute('data-id');
  document.location.replace(`/update-trip/${id}`);
};

const delButtonHandler = async (event) => {
  const id = event.target.getAttribute('data-id');
  const response = await fetch(`/api/trips/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete trip');
    }
};
  
delBtns = document.querySelectorAll(".deleteBtn");
delBtns.forEach(function(btn) {
  btn.addEventListener('click', delButtonHandler)
});

updateBtns = document.querySelectorAll(".updateBtn");
updateBtns.forEach(function(btn) {
  btn.addEventListener('click', updateButtonHandler)
});