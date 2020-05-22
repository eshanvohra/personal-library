console.log("this is es6 version of project 2");
showBooks();

class Book
{
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display{
    add(book){
        
            console.log("adding to ui");
            let tablebody = document.getElementById('tableBody');
            let uiString = `
                                 <tr id ='tableRow'>
                                              
                                                <td>${book.name}</td>
                                                <td>${book.author}</td>
                                                <td>${book.type}</td>
                                                <td><button  onclick="deleteBook(this.id)"class="btn btn-danger">Delete Book</button><td>
                                </tr>
            `;
            tablebody.innerHTML += uiString;
        }
    clear(){
        let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
    }
    validate(book){
        if(book.name.length<2|| book.author.length<2){
            return false;
        }
        else{
            return true;
        }
    }
    show(type,info){
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
}
//show books function
function showBooks(){
    let storedBooks = localStorage.getItem("books");
  if (storedBooks == null) {
    booksObj = [];
  } else {
    booksObj = JSON.parse(storedBooks);
}
console.log(booksObj);
let tablebody = document.getElementById('tableBody');
tablebody.innerHTML='';
booksObj.forEach(function(book,index){
            let uiString = `
                                 <tr id ='tableRow'>
                                              
                                                <td>${book.name}</td>
                                                <td>${book.author}</td>
                                                <td>${book.type}</td>
                                                <td><button id="${index}" onclick="deleteBook(this.id)"class="btn btn-danger">Delete Book</button><td>
                                </tr>
            `;
            tablebody.innerHTML += uiString;
})
}


function deleteBook(index) {
    //   console.log("I am deleting", index);
    
      let books = localStorage.getItem("books");
      if (books == null) {
        booksObj = [];
      } else {
        booksObj = JSON.parse(books);
      }
    
      booksObj.splice(index, 1);
      localStorage.setItem("books", JSON.stringify(booksObj));
      showBooks();
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
        
        // console.log("new added" ,newbook);
        let booksq = localStorage.getItem("books");
        if (booksq == null) {
            booksObj = [];
          } else {
            booksObj = JSON.parse(booksq);
          }
          let newbook=book;
           
        booksObj.push(newbook);
        localStorage.setItem("books",JSON.stringify(booksObj)); 
        display.clear();
        display.show('success',"Your book has been successfully added.");
    }
    else{
        display.show('danger',"Sorry, your book cannot be added");
    }
    console.log("you have submitted form");

}

