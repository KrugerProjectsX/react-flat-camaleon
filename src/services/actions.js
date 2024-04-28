export default function checkUserLogged() {

    const userId = JSON.parse(localStorage.getItem('user_logged')) || false;
    console.log('dddd',userId)
    if (!userId) {
        window.location.href = '/';
    }
}