const updatePostHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const content = document.querySelector('#content').value.trim();
  const postID = document.querySelector('#content').getAttribute('data-postID');
  const title = document.querySelector('#title').value.trim();

  if (event.submitter.name == 'update') {
    if (content && title) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/posts/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({ content, title }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace(`/dashboard`);
      } else {
        alert(response.statusText);
      }
    }
  }

  if (event.submitter.name == 'delete') {
    const response = await fetch(`/api/posts/${postID}`, {
      method: 'DELETE',
      body: JSON.stringify({ content, title }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.update-form')
  .addEventListener('submit', updatePostHandler);
