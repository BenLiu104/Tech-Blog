const commentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const comment = document.querySelector('#new-comment').value.trim();
  const postID = document
    .querySelector('#new-comment')
    .getAttribute('data-post');

  if (comment) {
    console.log(comment);
    console.log(postID);
    const response = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ post_id: postID, comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(`/post/${postID}`);
    } else {
      // console.log((await response.json()).message);
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
