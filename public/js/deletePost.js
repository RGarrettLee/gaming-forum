const deletePost = async function(event) {
    event.preventDefault();

    const slug = document.location.pathname.replace('/post/', '');

    const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete post');
    }
}

document
    .querySelector('#deletePost')
    .addEventListener('click', deletePost);