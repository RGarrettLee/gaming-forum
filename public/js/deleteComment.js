const deleteComment = async function(event) {
    event.preventDefault();

    const content = event.target.dataset.content;

    console.log(content);

    const response = await fetch(`/api/comment`, {
        method: 'DELETE',
        body: JSON.stringify({ 'content': content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to delete comment');
    }
}

const btn = document.querySelector('.deleteComment');
btn.addEventListener('click', deleteComment);

document
    .querySelectorAll('.deleteComment').forEach((comment) => {
        comment.addEventListener('click', deleteComment);
    });