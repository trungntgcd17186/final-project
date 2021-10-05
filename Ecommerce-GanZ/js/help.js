var counter = 1;

setInterval(function () {
    document.getElementById('slide' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
    
}, 5000);

setInterval(function () {
    setTimeout(function () {
        document.getElementById('btn1').setAttribute('id', 'is-active1')
        document.getElementById('is-active4').setAttribute('id', 'btn4')
    }, 5000);
    
    
    setTimeout(function () {
        document.getElementById('is-active1').setAttribute('id', 'btn1')
        document.getElementById('btn2').setAttribute('id', 'is-active2')
    }, 10000);
    
    setTimeout(function () {
        document.getElementById('is-active2').setAttribute('id', 'btn2')
        document.getElementById('btn3').setAttribute('id', 'is-active3')
    }, 15000)
    
    setTimeout(function () {
        document.getElementById('is-active3').setAttribute('id', 'btn3')
        document.getElementById('btn4').setAttribute('id', 'is-active4')
    }, 20000)
}, 20000);






//===================Search===========================================================//

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}


