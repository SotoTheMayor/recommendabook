$(document).ready(function(){
let bookRecommendation = $("#bookRecommendations")
let bookSearch = $("#searchBox")
let mainPart = $(".mainPart")
let sBtn = $('.sBtn')
let author = "N/A";
let description = "";
var listHistory = $("#history")

//appends a random cat image when a topic is selected from the available list, as well as randomized text using the API to overlay it on the cat image
function topicCat(topics) {
    catStatement = ["I like", "Good choice.  I love", "Great choice with", "All day I dream about"]
    catWords = catStatement[Math.floor(Math.random() * catStatement.length)]
    $('img').remove('.removeImg')
    if (topics == "thriller") {
            mainPart.append("<img src='https://cataas.com/cat/startled/says/" + catWords + " " + topics + "' width='400' height='400'>")
    } else {
            mainPart.append("<img src='https://cataas.com/cat/cat/says/" + catWords + " " + topics + "' width='400' height='400'>")
    }
    mainPart.children('img').addClass("removeImg relative inset-1/4 rounded-lg items-center")
}

//appends a random cat and a random recommendation once a book is selected from the list pulled by the topic choice
function reviewCat() {
    let reviews = 'https://cataas.com/cat';
    let reviewArr = ['"10/10 Would read again!"', '"I could hardly put it down, it was amazing!"', '"This book made me cry happy tears"', '"Nothing is better than a good book, and no book is better than this one!"', '"Purrfect book for a lazy afternoon"']
    textReview = (reviewArr[Math.floor(Math.random() * reviewArr.length)]);
    $('img').remove('.removeImg')
    fetch(reviews, {
        cache: "reload"
    })
    bookRecommendation.append("<img src=" + reviews + " width='200' height='200'/>")
    bookRecommendation.children('img').addClass("removeImg relative inset-1/4 rounded-lg")
    bookRecommendation.append("<p>" + textReview + "</p>")
}


//API call to Google books, utilized for searching both by topic and by keyword
function searchBooks() {
    let book = bookSearch;
    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + book;

    fetch(bookUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        i = 0;
        bookRecommendation.html("");
        //do/while loop to append 10 titles and authors from the API call
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
            //adjusts localstorage to keep only the most recent 5 searches in the history
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
            //adjusts id's associated with history and keeps only 5 displaying
            listHistory.prepend('<li><button><b><i>Title:  </b></i>' + title + '  <b><i>Author:</b></i> ' + author + '</button></li>')
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
            
            buttonCall()

        })
        
    })
}

//function that is called to set button values each time the history is changed 
function buttonCall() {
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
        reviewCat();
    })
    
    $('#hBtn4').click(function(){
        title = bookHistory.h4[0];
        author = bookHistory.h4[1];
        description = bookHistory.h4[2];
        bookRecommendation.html("");
        bookRecommendation.append(bookHistory.Display4)
        reviewCat();
    
    })
    
    $('#hBtn5').click(function(){
        title = bookHistory.h5[0];
        author = bookHistory.h5[1];
        description = bookHistory.h5[2];
        bookRecommendation.html("");
        bookRecommendation.append(bookHistory.Display5)
        reviewCat();
    
    })
}


//creates local storage if it doesn't already exist, so when it is called later there isn't an error even if it is empty, or parses it if it does exist
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


//based on info saved in local storage, appends buttons on page refresh
listHistory.append('<li><button><b><i>Title:</b></i>  ' + bookHistory.h1[0] + '  <b><i>Author:</b></i> ' + bookHistory.h1[1] + '</button></li>')
listHistory.append('<li><button><b><i>Title:</b></i>  ' + bookHistory.h2[0] + '  <b><i>Author:</b></i> ' + bookHistory.h2[1] + '</button></li>')
listHistory.append('<li><button><b><i>Title:</b></i>  ' + bookHistory.h3[0] + '  <b><i>Author:</b></i> ' + bookHistory.h3[1] + '</button></li>')
listHistory.append('<li><button><b><i>Title:</b></i>  ' + bookHistory.h4[0] + '  <b><i>Author:</b></i> ' + bookHistory.h4[1] + '</button></li>')
listHistory.append('<li><button><b><i>Title:</b></i>  ' + bookHistory.h5[0] + '  <b><i>Author:</b></i> ' + bookHistory.h5[1] + '</button></li>')
listHistory.children().addClass("list-group-item text-start list-none rounded-md shadow-lg bg-color3 hover:bg-color5 active:bg-color4 text-md font-medium p-1 m-2")
listHistory.children().children().addClass("rounded bg-dark-subtle my-2")
listHistory.children().eq(0).children().attr("id", "hBtn1");
listHistory.children().eq(1).children().attr("id", "hBtn2");
listHistory.children().eq(2).children().attr("id", "hBtn3");
listHistory.children().eq(3).children().attr("id", "hBtn4");
listHistory.children().eq(4).children().attr("id", "hBtn5");

buttonCall()



//search button function for searching books by topic
sBtn.click(function() {
    topics = $(this).attr("id")
    bookSearch = topics;
    searchBooks();
    topicCat(topics);
})

// searchbutton function for searching books by name
$("#searchbutton").on("click", function() {
    bookSearch = $('#Bookname:text').val();
    searchBooks();
    $('#Bookname:text').val("");
})

})

