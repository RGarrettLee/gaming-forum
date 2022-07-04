const deleteBoard = async function(event) {
    event.preventDefault();

    const slug = document.location.pathname.replace('/board/', '');
    //slug = slug.replace('/board', '');

    const response = await fetch(`/api/home/delete/${slug}`, {
        method: 'POST',
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