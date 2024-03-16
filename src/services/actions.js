export default function checkUserLogged() {
    const userId = JSON.parse(localStorage.getItem('user_logger')) || false;
    if(!userId){
        window.location.href='/';
    }
}