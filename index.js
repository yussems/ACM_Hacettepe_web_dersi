function fetchStudent() {
    var inputName = document.getElementById('myInput');
    var studentName = inputName.value;

    var inputSurname = document.getElementById('myInputSurname');
    var studentSurname = inputSurname.value

    var inputFrom = document.getElementById('myInputFrom');
    var studentFrom = inputFrom.value

    fetch("http://localhost:3001/students",{
        method :'POST',
        headers:{
            'accept' : 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:studentName, surname:studentSurname, from:studentFrom})
    })
    .then((response) => response.json())
    .then((student) => {
        addStudent(student);
        inputName.value = '';
        inputSurname.value = '';
        inputFrom.value = '';
    });
}

function addStudent(student) {
    var div = document.getElementById("studentcontainer");
    var name = student.name + " " + student.surname + " " + student.from;
    var template = getTemplate(student);
    div.innerHTML += template;
}

function getStudents(){
    fetch("http://localhost:3001/students")
    .then((response) => response.json())
    .then((data) => initStudents(data));
}

function initStudents(myList) {
  var div = document.getElementById("studentcontainer");
  var template = "";
  for (var i = 0; i < myList.length; i++) {
    var student = myList[i];
    template += getTemplate(student);
  }
  div.innerHTML = template;
};

function getTemplate(student) {

   return `<li>${student.name} ${student.surname} ${student.from}
    <button onClick="deleteStudent(${student.id})">Delete</button>
    </li>`
}

function deleteStudent(studentId) {
    fetch(`http://localhost:3001/students/${studentId}`,{
        method :'DELETE'
    })
    .then((response) => response.json())
    .then((data) => {
        getStudents();
    });
}

document.addEventListener('DOMContentLoaded', function(event){
    getStudents();
})