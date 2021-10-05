function start() {
    checkAdmin();
}
start();
function checkAdmin() {
    const user = JSON.parse(localStorage.getItem("dataLogin"));
    if (user[0].role === "user") {
        alert("Bạn không có quyền truy cập vào trang này!");
        window.location.href = "/index.html";
    }
} 
