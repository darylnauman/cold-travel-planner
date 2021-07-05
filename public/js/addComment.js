const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#new-comment').value;
  
  let pageURL = window.location.href;
  let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);

  if (content) {
    
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        content,
        destination_id: lastURLSegment
      }),  
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/destinations/${lastURLSegment}`);
    } else {
      alert(response.statusText);
    }
  }
}

const delButtonHandler = async (event) => {
  const commentdel = event.target;
  console.log(commentdel.dataset.id)
  const response = await fetch(`/api/comments/${commentdel.dataset.id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete comment');
    }
};

delBtns = document.querySelectorAll(".deleteBtn");
delBtns.forEach(btn=> {
  btn.addEventListener('click', function(event){
    delButtonHandler(event)
  })
});

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);