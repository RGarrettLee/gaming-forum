const postComment = async function(event) {
    event.preventDefault();

    const comment = document.querySelector('#postInput').value.trim();

    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                content: comment,
                post_slug: document.location.pathname
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to make a comment')
        }
    }
}

const postBtn = document.querySelector('#postBtnPost');

document
    .addEventListener('submit', postComment);