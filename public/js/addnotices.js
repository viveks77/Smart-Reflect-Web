const form = document.querySelector("#addNotice");

form.addEventListener("submit", e => {
    e.preventDefault();
    const date = new Date(form.date.value);
    const notice = {
        author : form.author.value,
        title : form.title.value,
        content : form.content.value,
        date
    }
    console.log(notice);
    db.collection('notices').add(notice)
        .then( () => {
            alert("Notice added Successfully");
            form.reset();
        })
        .catch(() => console.log(err));
})