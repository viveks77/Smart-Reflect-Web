const noticeContainer = document.querySelector('#datacontainer');
const deleteNotice = document.querySelector('#datacontainer');

const viewNotices = (data, id) => {

    const html = `
    <div id="${id}" data-id= "${id}"  class = "noticeContainer">
                        <button type="button" class="collapses">${data.title}</button>
                        <div class="content hide" id="${id}content">
                            <p>${data.content}</p>
                                <p>- ${data.author}</p>
                            <button class = "btn btn-danger deleteNotice" type ="click">Delete</button>
                        </div>
                    </div>
    `;
    noticeContainer.insertAdjacentHTML('beforeend', html);
}

const removeNotice = (id) => {
    const notices = document.querySelectorAll('.noticeContainer');
    notices.forEach(notice => {
        if (notice.getAttribute('data-id') === id) {
            notice.remove();
        }
    })
}


db.collection('notices').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            viewNotices(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            removeNotice(change.doc.id);
        }
    })
})

deleteNotice.addEventListener('click', e => {
    if (e.target.classList.contains('deleteNotice')) {
       
        var dataId = e.target.parentElement.parentElement.getAttribute('data-id');
        db.collection('notices').doc(dataId).delete().then(e => console.log('Deleted Successfully')).catch(err => console.log(err));
    }
})

noticeContainer.addEventListener("click", (e) => {
    
    const btn = e.target
    if(btn.classList.contains("collapses")){
        const parent = btn.parentElement.id;
        if(!document.getElementById(parent).classList.contains("expanded")){
        $("#"+parent+"content").slideDown(200,"linear",function(){
            document.getElementById(parent).classList.add("expanded")
        })
        }
        else if(document.getElementById(parent).classList.contains("expanded")){
            $("#"+parent+"content").slideUp(200,"linear",function(){
                document.getElementById(parent).classList.remove("expanded")
            })
        }
    }
})