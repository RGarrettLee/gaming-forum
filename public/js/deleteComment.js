const deleteComment = function(event) {
    event.preventDefault();
    console.log('running');
    const content = event.target.dataset.content;

    console.log(content);
}

const btn = document.querySelector('.deleteComment');
btn.addEventListener('click', deleteComment);

//document
//    .querySelector('.deleteComment')
//    .addEventListener('click', deleteComment);