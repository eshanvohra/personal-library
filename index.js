console.log("inside library");

//constructor

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
//display constructor

function Display() {

}

//add methods to diaplay prototype
Display.prototype.add = function (Book) {
    console.log("adding to ui");
    let tablebody = document.getElementById('tableBody');
    let uiString = `
                         <tr>
                                      
                                        <td>${Book.name}</td>
                                        <td>${Book.author}</td>
                                        <td>${Book.type}</td>
                        </tr>
    `;
    tablebody.innerHTML += uiString;
}
//implament the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}
//implament the clear function
Display.prototype.validate = function (book) {
    if(book.name.length<2|| book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}
//implament the clear function
Display.prototype.show = function (type,info) {
    let message=document.getElementById('message');
    
    message.innerHTML=`
    <div class="alert alert-${type} alert-dismissible fade show" role="alert" >
    <strong>Message:</strong> ${info}
    
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
  setTimeout(function(){
   message.innerHTML='';   
  },2000)
    
}


//add submit event listener to form libraryform

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('authorname').value;


    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let travel = document.getElementById('travel');

    let type;
    if (fiction.checked) {
        type = fiction.value;
    }

    else if (programming.checked) {
        type = programming.value;
    }

    else {
        type = travel.value;
    }

    let book = new Book(name, author, type);

    console.log(book);
    e.preventDefault();
    let display = new Display();

    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success',"Your book has been successfully added.");
    }
    else{
        display.show('danger',"Sorry, your book cannot be added");
    }
    console.log("you have submitted form");

}