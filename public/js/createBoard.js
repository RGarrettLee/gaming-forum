const createBoard = async function(event) {
    event.preventDefault();
    
    const boardName = document.querySelector('#board-name').value.trim();

    const response = await fetch('/api/home', {
        method: 'POST',
        body: JSON.stringify({name: boardName }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to create a board')
    }
}

const boardSubBtn = document.querySelector('#boardSubmit');

document
    .querySelector('#boardSubmit')
    .addEventListener('click', createBoard);