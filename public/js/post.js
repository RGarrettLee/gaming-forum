const createPost = async function(event) {
    event.preventDefault();

    const title = document.querySelector('#postTitle').value.trim();
    const genre = document.querySelector('#genre').value.trim();
    const content = document.querySelector('#postInput').value.trim();

    fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            genre: genre,
            content: content,
            board_slug: document.location.pathname
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert('Failed to create a post!')
        }
    })
    .then((data) => {
        console.log(data);
        document.location.replace(`/post/${data.slug}`);
    })
    .catch((err) => {
        alert('Something went wrong');
    });
}

document
    .querySelector('#postBtnBoard')
    .addEventListener('click', createPost);