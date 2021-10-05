const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
    window.location.replace('/index.html');
};