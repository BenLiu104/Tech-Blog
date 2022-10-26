const newPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#new-title').value.trim();
  // const postID = document.querySelector('#content').getAttribute('data-postID');
  const content = document.querySelector('#new-content').value.trim();

  if (content && title) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({ content, title }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/dashboard`);
    } else {
      // console.log((await response.json()).message);
      alert(response.statusText);
    }
  }
};
document.querySelector('.post-form').addEventListener('submit', newPostHandler);
