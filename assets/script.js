
$(document).ready(function(){
let bookRecommendation = $("#bookRecommendations")

let bookSearch = $("#searchBox")

let mainPart = $(".mainPart")
let sBtn = $('.sBtn')
let author = "N/A";
let description = "";
var listHistory = $("#history")


function topicCat(topics) {
    catStatement = ["I like", "Good choice.  I love", "Great choice with", "All day I dream about"]
    catWords = catStatement[Math.floor(Math.random() * catStatement.length)]
    console.log(topics)
    $('img').remove('.removeImg')
    if (topics == "thriller") {
            mainPart.append("<img src='https://cataas.com/cat/startled/says/" + catWords + " " + topics + "' width='400' height='400'>")
    } else {
            mainPart.append("<img src='https://cataas.com/cat/cat/says/" + catWords + " " + topics + "' width='400' height='400'>")
    }
    mainPart.children('img').addClass("removeImg relative inset-1/4 rounded-lg")
}


function reviewCat() {
    let reviews = 'https://cataas.com/cat';
    let reviewArr = ['"10/10 Would read again!"', '"I could hardly put it down, it was amazing!"', '"This book made me cry happy tears"', '"Nothing is better than a good book, and no book is better than this one!"']
    textReview = (reviewArr[Math.floor(Math.random() * reviewArr.length)]);
    console.log()
    $('img').remove('.removeImg')
    bookRecommendation.append("<img src=" + reviews + " width='200' height='200'/>")
    bookRecommendation.children('img').addClass("removeImg relative inset-1/4 rounded-lg")
    bookRecommendation.append("<p>" + textReview + "</p>")
}



function searchBooks() {
    let book = bookSearch;
    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + book;

    fetch(bookUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        i = 0;
        bookRecommendation.html("");
        do {
            if (data.items[i].volumeInfo.authors) {
                author = data.items[i].volumeInfo.authors
            } else {
                author = "N/A"
            }
            let bookRecommend = '<li class="text-center"><button>' + data.items[i].volumeInfo.title + '   By:  ' + author + '</button></li>';
            bookRecommendation.append(bookRecommend);
            bookRecommendation.children().eq(i).children("button").attr("id", i)
  
            i++;
        } while (i < 10);
        bookRecommendation.children().children("button").addClass('clickThrough')
        
        $('.clickThrough').click(function() {
            bookRecommendation.html("");
            let x = ($(this).attr("id"))
            if (data.items[x].volumeInfo.authors) {
                author = data.items[x].volumeInfo.authors
            } else {
                author = "N/A";
            }
            if (data.items[x].volumeInfo.description) {
                description = data.items[x].volumeInfo.description
            } else if (data.items[x].searchInfo) {
                if (data.items[x].searchInfo.textSnippet) {
                    description = data.items[x].searchInfo.textSnippet
                }
            } else {
                description = "N/A"
            }
            let title = data.items[x].volumeInfo.title;
            let drillThrough = '<li><button>Title:  ' + title + '</button></li><li>Author: ' + author + '</li><li> Description: ' + description + '</li>    ';
            storageAdjust(data.items[x]);
            bookRecommendation.append(drillThrough);
            reviewCat();
            function storageAdjust() {
                bookHistory.h5 = bookHistory.h4
                bookHistory.Display5 = bookHistory.Display4
                bookHistory.h4 = bookHistory.h3
                bookHistory.Display4 = bookHistory.Display3
                bookHistory.h3 = bookHistory.h2
                bookHistory.Display3 = bookHistory.Display2
                bookHistory.h2 = bookHistory.h1
                bookHistory.Display2 = bookHistory.Display1
                bookHistory.h1 = [title, author, description]
                bookHistory.Display1 = '<li><button>Title:  ' + title + '</button></li><li>Author: ' + author + '</li><li> Description: ' + description + '</button></li>'
                localStorage.setItem("bookHistory", JSON.stringify(bookHistory));
            }
            listHistory.prepend('<li><button>Title:  ' + title + 'Author: ' + author + '</button></li>')
            listHistory.children().eq(0).children().attr("id", "hBtn1")
            listHistory.children().eq(1).children().remove("id", "hBtn1")
            listHistory.children().eq(1).children().attr("id", "hBtn2")
            listHistory.children().eq(2).children().remove("id", "hBtn2")
            listHistory.children().eq(2).children().attr("id", "hBtn3")
            listHistory.children().eq(3).children().remove("id", "hBtn3")
            listHistory.children().eq(3).children().attr("id", "hBtn4")
            listHistory.children().eq(4).children().remove("id", "hBtn4")
            listHistory.children().eq(4).children().attr("id", "hBtn5")
            listHistory.children().eq(5).children().remove()
            listHistory.children().eq(5).remove()
            listHistory.children().addClass("list-group-item text-start list-none rounded-md shadow-lg bg-color3 hover:bg-color5 active:bg-color4 text-md font-medium p-1 m-2")
            listHistory.children().children().addClass("rounded bg-dark-subtle my-2")
        })
        
    })
}


//creates local storage if it doesn't already exist, so when it is called later there isn't an error even if it is empty
if (!localStorage.getItem("bookHistory")) {
    var bookHistory = {
        h1: [],
        Display1: "",
        h2: [],
        Display2: "",
        h3: [],
        Display3: "",
        h4: [],
        Display4: "",
        h5: [],
        Display5: "",
    }
    localStorage.setItem("bookHistory", JSON.stringify(bookHistory));
} else {
    var bookHistory = JSON.parse(localStorage.getItem("bookHistory"));
};


//if history exists in local storage, appends buttons on page refresh
listHistory.append('<li><button>Title:  ' + bookHistory.h1[0] + 'Author: ' + bookHistory.h1[1] + '</button></li>')
listHistory.append('<li><button>Title:  ' + bookHistory.h2[0] + 'Author: ' + bookHistory.h2[1] + '</button></li>')
listHistory.append('<li><button>Title:  ' + bookHistory.h3[0] + 'Author: ' + bookHistory.h3[1] + '</button></li>')
listHistory.append('<li><button>Title:  ' + bookHistory.h4[0] + 'Author: ' + bookHistory.h4[1] + '</button></li>')
listHistory.append('<li><button>Title:  ' + bookHistory.h5[0] + 'Author: ' + bookHistory.h5[1] + '</button></li>')
listHistory.children().addClass("list-group-item text-start list-none rounded-md shadow-lg bg-color3 hover:bg-color5 active:bg-color4 text-md font-medium p-1 m-2")
listHistory.children().children().addClass("rounded bg-dark-subtle my-2")
listHistory.children().eq(0).children().attr("id", "hBtn1");
listHistory.children().eq(1).children().attr("id", "hBtn2");
listHistory.children().eq(2).children().attr("id", "hBtn3");
listHistory.children().eq(3).children().attr("id", "hBtn4");
listHistory.children().eq(4).children().attr("id", "hBtn5");


$('#hBtn1').click(function(){ 
    title = bookHistory.h1[0];
    author = bookHistory.h1[1];
    description = bookHistory.h1[2];
    bookRecommendation.html("");
    bookRecommendation.append(bookHistory.Display1)
    reviewCat();
    
})

$('#hBtn2').click(function(){
    title = bookHistory.h2[0];
    author = bookHistory.h2[1];
    description = bookHistory.h2[2];
    bookRecommendation.html("");
    bookRecommendation.append(bookHistory.Display2)
    reviewCat();
})

$('#hBtn3').click(function(){
    title = bookHistory.h3[0];
    author = bookHistory.h3[1];
    description = bookHistory.h3[2];
    bookRecommendation.html("");
    bookRecommendation.append(bookHistory.Display3)
})

$('#hBtn4').click(function(){
    title = bookHistory.h4[0];
    author = bookHistory.h4[1];
    description = bookHistory.h4[2];
    bookRecommendation.html("");
    bookRecommendation.append(bookHistory.Display4)
})

$('#hBtn5').click(function(){
    title = bookHistory.h5[0];
    author = bookHistory.h5[1];
    description = bookHistory.h5[2];
    bookRecommendation.html("");
    bookRecommendation.append(bookHistory.Display5)
})



sBtn.click(function() {
    topics = $(this).attr("id")
    bookSearch = topics;
    searchBooks();
    topicCat(topics);
})

// searchbutton function
$("#searchbutton").on("click", function() {
    bookSearch = $('#Bookname:text').val();
    console.log(bookSearch);
    searchBooks();
})

})

