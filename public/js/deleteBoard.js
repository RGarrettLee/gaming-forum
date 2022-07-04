const deleteBoard = async function(event) {
    event.preventDefault();

    const slug = document.location.pathname.replace('/board/', '');

    const response = await fetch(`/api/home/${slug}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to delete board');
    }
}

document
    .querySelector('#deleteBoard')
    .addEventListener('click', deleteBoard);