const edit = document.querySelectorAll('.edit-content');
const cnl = document.querySelectorAll('.btn-cancel');
const btn = document.querySelectorAll('.edit-btn');

for (var i = 0; i < 3; i++) {
    collapse(i);
}

function collapse(i) {
    btn[i].addEventListener("click", () => {
        console.log(btn.parentElement);
        btn[i].parentElement.classList.add("hide");
        edit[i].classList.remove('hide');
    })

    cnl[i].addEventListener("click", () => {
        edit[i].classList.add('hide');
        btn[i].parentElement.classList.remove("hide");
    })
}

const pass = document.querySelector('.password');

document.querySelector('.btn-pass').addEventListener('click', function () {
    pass.classList.add('hide');
    document.querySelector('.pass-form').classList.remove('hide')
})


const passForm = document.querySelector("#pass-update");
const btnsubmit = document.querySelector('.btnSubmit');
passForm.addEventListener("submit", e => {
    const oldPass = passForm.confirmPassword.value;
    const newPass = passForm.password.value;
    if(oldPass !== newPass){
        alert("Password doesnot match");
        e.preventDefault();
    }
})