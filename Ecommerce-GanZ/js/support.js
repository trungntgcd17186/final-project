var supportApi = "http://localhost:3000/support-request";

// START
function start() {
    getList();
    handleSendRequest();
  }
start();

// GET DATA FORM JSON
function getList(callback) {
    fetch(supportApi)
      .then(function (response) {
        return response.json();
      })
      .then(callback);
  }

  // CREATE NEW manage
function createRequest(data, callback) {
    var options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(supportApi, options)
    .then(function (response) {
    return response.json();
    })
    .then(callback);
}
function handleSendRequest() {
    let sendRequestBtn = document.querySelector("#send-request");

    sendRequestBtn.onclick = async function (event) {
        event.preventDefault();
  
      // Chức năng lấy NGÀY THÁNG NĂM 
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      // Get Time if nessesary
      // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      today = dd + '/' + mm + '/' + yyyy;
  
  
      // Pick form Select
      var selectUser = document.getElementById('user');
      var selectTopic = document.getElementById('topic');
      // Định nghĩa mỗi option
      var optionUser = selectUser.options[selectUser.selectedIndex];
      var optionTopic = selectTopic.options[selectTopic.selectedIndex];
      
      let user = optionUser.value
      let topic = optionTopic.value;
      
      let supportemail = document.querySelector('input[name="support-email"]').value;
      let supportcontent = document.querySelector('input[name="support-content"]').value;
      // Value của Option được chọn bởi <Select>
    
      let data = {
          day: today,
          user: user,
          topic: topic, 
          supportemail: supportemail,
          supportcontent: supportcontent,
      };

      // Neu user nhap day du
    if (supportemail != "" && supportcontent != "" ) {
        //Kiem tra Neu User nhap thieu field
        if (supportemail == "" || supportcontent == "") {
          alert("Vui lòng nhập đầy đủ thông tin!");
          return false;
        }
        else {
          createRequest(data, function () {
            getList();
          });
          alert("Thêm vào danh sách thành công!");
        }
      } else {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return false;
      }
    }
}