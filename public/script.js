var lisTask = document.createElement('ol');
lisTask.className='lisTask';
let list = document.getElementById("MyList");
for (var i=1; i < 8; i++) {
    var row=document.createElement('li');
    var divClose=document.createElement('div');
    var rowTextClose = document.createTextNode('X');
    var rowText = document.createTextNode(i +'дело');
    divClose.className='rowTextClose';
    row.classList='rowCheckIn';
    divClose.append(rowTextClose);
    row.append(divClose);
    lisTask.append(row);
};
list.append(lisTask);
list.addEventListener("click", DOevent, false);
function DOevent(){
    var target = event.target;
    var appTarget=target.className;
    if (appTarget=='rowTextClose'){//alert("Будем удалять");
        lisTask.removeChild(target.parentNode);
    }
    else if (appTarget=='rowCheckIn'){alert("Будем помечать");
    }
    else if (appTarget=='rowCheckOut') {alert("Будем изменять");}
};





