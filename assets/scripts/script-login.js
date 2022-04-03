function entrar(e) {

    const email = 'sacolaobompreco.lapa@gmail.com';
    const password = '123456';

    const id = (elem) => {
       return document.getElementById(elem);
    }

    const validEmail = id('email').value;
    const validPassword = id('password').value;

    if(validEmail === email && validPassword === password){
        return true;
    }else if(validEmail === email && validPassword !== password){
        alert('Senha incorreta!')
        id('password').style.borderBottom = '1px solid #FF0000';
        return e.preventDefault();
    }else if(validEmail !== email && validPassword === password){
        alert('E-mail incorreto!')
        id('email').style.borderBottom = '1px solid #FF0000';
        return e.preventDefault();
    }
    else{
        id('password').style.borderBottom = '1px solid #FF0000';
        id('email').style.borderBottom = '1px solid #FF0000';
        alert('Preencha os dados corretamente!')
        return e.preventDefault();
    }
}

    const id = (elem) => {
       return document.getElementById(elem);
    }


document.addEventListener('keypress', function(e){
    if(e.key == 'Enter'){
        return entrar();
    }
});


let acessarIndex = id('button');

acessarIndex.addEventListener('click', entrar, false);








