const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#new-comment').value;
  
  var pageURL = window.location.href;
  var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);

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
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);