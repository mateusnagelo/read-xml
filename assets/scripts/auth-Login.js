function login(){
    if (firebase.auth().currentUser){
        firebase.auth().signOut()
    }
    const getId = (elem) => {
        return document.getElementById(elem)
     }

    const email = getId('email').value
    const password = getId('password').value

    firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then(() => {
         swal
         .fire({
             icon: 'Sucess',
             title: 'Login efetuado com sucesso',
         })
         .then(() => {
             setTimeout(() => {
                 window.location.replace('page-home.html')
             }, 2000)
         })
     })
     .catch((error) => {
         swal.fire({
             icon: 'Error',
             title: error.message,
         })
     })
}