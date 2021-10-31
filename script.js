let raw = document.getElementById('raw');
let student = document.getElementById('student');
let stud_arr = document.getElementById('stud_arr');

getData();

insertData();

displayData();

function getData(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        //convert to json obj
        data = JSON.parse(this.responseText);

        //display raw json
        raw.innerHTML = this.responseText;
        
        //display json conversion
        student.innerHTML = data;

        //display json array object
        stud_arr.innerHTML = student_array(data);

        //search in json array object
        search_student_array(data);
    }

    xhttp.open("POST", "load.php");
    //no need this if using GET
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("load=true");
}

function student_array(stud_arr){
    txt = "";
    thead = '<tr>'+
                '<th>ID</th>'+
                '<th>Name</th>'+
                '<th>Email</th>'+
                '<th>Address</th>'+
            '</tr>';

    for(i=0;i<stud_arr.length;i++){
        txt = txt + 
        '<tr>'+
            '<td>'+ stud_arr[i].id +'</td>'+
            '<td>'+ stud_arr[i].name  +'</td>'+
            '<td>'+ stud_arr[i].email +'</td>'+
            '<td>'+ stud_arr[i].address +'</td>'+
        '</tr>';
    }
    
    return thead + txt;
}

function search_student_array(stud_arr){
    let txt_stud_name = document.getElementById("txt_stud_name");
    let search_result = document.getElementById("search_result");

    txt_stud_name.addEventListener("input",function(){
        //change input value to uppercase to search without case sensetive. 
        //remove it for case sensetive.
        //change all input to uppercase

        search = txt_stud_name.value.toUpperCase();

        txt= "";
        for(i=0;i<stud_arr.length;i++){

            //change stud_arr name to uppercase
            toUpperObjName = stud_arr[i].name.toUpperCase();
        
            //get index of the input value. if more than -1 display
            if (toUpperObjName.indexOf(search) > -1) {

                //check if input value blank
                if(search == ""){
                    search_result.innerHTML = "";
                }else{
                    //display result in table
                    txt = txt + 
                    '<tr>'+
                        '<td>'+ stud_arr[i].id +'</td>'+
                        '<td>'+ stud_arr[i].name  +'</td>'+
                        '<td>'+ stud_arr[i].email +'</td>'+
                        '<td>'+ stud_arr[i].address +'</td>'+
                    '</tr>';
    
                    search_result.innerHTML = txt;
                }

            } else {
                //no result display blank
                search_result.innerHTML = txt;
            }
        }
    });

}

function insertData(){

    let btn_insert = document.getElementById("btn_insert");
    let message = document.getElementById("message");

    btn_insert.addEventListener("click",function(){

        let txt_stud_name = document.getElementsByName("txt_stud_name")[0].value;
        let txt_stud_email = document.getElementsByName("txt_stud_email")[0].value;
        let txt_stud_address = document.getElementsByName("txt_stud_address")[0].value;

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            message.innerHTML = this.responseText;

            //empty input text
            document.getElementsByName("txt_stud_name")[0].value = "";
            document.getElementsByName("txt_stud_email")[0].value = "";
            document.getElementsByName("txt_stud_address")[0].value = "";
        }

        xhttp.open("POST", "load.php");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("insert=true&name="+txt_stud_name+"&email="+txt_stud_email+"&address="+txt_stud_address);
        
        //refresh
        displayData();
    });
}

function displayData(){
    let display = document.getElementById("display");

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        //convert to json obj
        data = JSON.parse(this.responseText);

        txt = "";
        thead = '<tr>'+
                    '<th>Id</th>'+
                    '<th>Name</th>'+
                    '<th>Email</th>'+
                    '<th>Address</th>'+
                    '<th>Option</th>'+
                    '<th>Option</th>'+
                '</tr>';

        for(i=0;i<data.length;i++){
            txt =  txt +
            '<tr>'+
                '<td>'+ data[i].id +'</td>'+
                '<td>'+ data[i].name +'</td>'+
                '<td>'+ data[i].email +'</td>'+
                '<td>'+ data[i].address +'</td>'+
                '<td><input type="button" name="edit" id="'+ data[i].id +'" value="Edit"></td>'+
                '<td><input type="button" name="delete" id="'+ data[i].id +'" value="Delete"></td>'+
            '</tr>';
        }

        display.innerHTML = thead +txt;
        editData();
        deleteData();
    }

    xhttp.open("POST", "load.php");
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("load=true");
}

function editData(){
    let edit = document.getElementsByName("edit");
    let stud_edit = document.getElementById("stud_edit");

    for(i=0;i<edit.length;i++){
        let btn_edit = document.getElementsByName("edit")[i];

        btn_edit.addEventListener("click",function(){
            id = btn_edit.id;

            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                data = JSON.parse(this.responseText);

                stud_edit.innerHTML = 
                '<input type="text" name="txt_edit_stud_id" value="'+ data[0].id +'" disabled>'+
                '<input type="text" name="txt_edit_stud_name" value="'+ data[0].name +'">'+
                '<input type="email" name="txt_edit_stud_email" value="'+ data[0].email  +'">'+
                '<input type="text" name="txt_edit_stud_address" value="'+ data[0].address +'">'+
                '<input type="button" id="btn_update" value="Update">';

                updateData();
            }

            xhttp.open("POST", "load.php");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("edit=true&id="+id);
        });
    }
}

function updateData(){

    let btn_update = document.getElementById("btn_update");
    let update_message = document.getElementById("update_message");
    let stud_edit = document.getElementById("stud_edit");

    btn_update.addEventListener("click", function(){
        let stud_id = document.getElementsByName("txt_edit_stud_id")[0].value;
        let stud_name = document.getElementsByName("txt_edit_stud_name")[0].value;
        let stud_email = document.getElementsByName("txt_edit_stud_email")[0].value;
        let stud_address = document.getElementsByName("txt_edit_stud_address")[0].value;

        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            update_message.innerHTML = this.responseText;
            
            //empty edit data
            stud_edit.innerHTML = "";
            
            displayData();
        }

        xhttp.open("POST", "load.php");
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("update=true&id="+ stud_id +"&name="+ stud_name +"&email="+ stud_email +"&address="+stud_address);

    });
}

function deleteData(){
    let deletes = document.getElementsByName("delete");

    for(i=0;i<deletes.length;i++){
        let btn_delete = document.getElementsByName("delete")[i];
        let delete_message =document.getElementById("delete_message");

        btn_delete.addEventListener("click",function(){
            id = btn_delete.id;

            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                delete_message.innerHTML = this.responseText;
                displayData();
            }

            xhttp.open("POST", "load.php");
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("delete=true&id="+ id);
        });
    }

}