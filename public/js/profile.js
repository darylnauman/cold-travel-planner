const renderProfile = async () => {

const nameInfo = document.querySelector('.profile-header');
const tripCards = document.querySelector('.previous-trips');

if (req.session.logged_in) {
    const response = await fetch('/api/users', {
        body: JSON.stringify({
            name,
            trips
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
        document.location.replace(nameInfo);
    } else {
        alert(response.statusText);
    }
}

}
renderProfile();