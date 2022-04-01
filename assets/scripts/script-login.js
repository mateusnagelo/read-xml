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
        return e.preventDefault();
    }else if(validEmail !== email && validPassword === password){
        alert('E-mail incorreto!')
        return e.preventDefault();
    }
    else{
        alert('Preencha os dados corretamente!')
        return e.preventDefault();
    }
}

const id = (elem) => {
    return document.getElementById(elem);
}

let acessarIndex = id('button');

acessarIndex.addEventListener('click', entrar, false);


