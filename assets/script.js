
$(document).ready(function(){
let bookRecommendation = $("#bookRecommendations")
let bookSearch = $("#searchBox")
let imgReview = $(".reviewImage")
let textReview = $(".reviewText")
let mainPart = $(".mainPart")
let sBtn = $('.sBtn')
let author = "N/A";
let description = "";


let reviews = 'https://cataas.com/cat?width=250';




fetch(reviews)

let image = new Image();
    image.src = reviews;
    imgReview.append(image);

    let textArr = ["10/10 Would read again!", "I couldn't put it down, it was amazing!", "This book made me cry happy tears", "Nothing is better than a good book, and no book is better than this one!"]
    textReview.text(textArr[Math.floor(Math.random() * textArr.length)]);


    
    
function appendCat(topics) {
    console.log(topics)
    $('img').remove('.removeImg')
    if (topics == "thriller") {
            mainPart.append("<img src='https://cataas.com/cat?type=startled' width='400' height='400'>")
    } else {
            mainPart.append("<img src='https://cataas.com/cat?type=" + topics + "' width='400' height='400'>")
    }
    mainPart.children('img').addClass("removeImg")
}





function searchBooks() {
    let book = bookSearch.value;
    let bookUrl = "https://www.googleapis.com/books/v1/volumes?q=" + book;
    bookSearch.value = "";

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
            } else if (data.items[x].searchInfo.textSnippet) {
                description = data.items[x].searchInfo.textSnippet
            } else {
                description = "N/A"
            }
            let drillThrough = '<li><button>Title:  ' + data.items[x].volumeInfo.title + '</button></li><li>Author: ' + author + '</li><li> Description: ' + description + '</li>    ';
            bookRecommendation.append(drillThrough);
        })
        
    })
}



sBtn.click(function() {
    topics = $(this).attr("id")
    bookSearch.value = topics;
    searchBooks();
    appendCat(topics);
})


})

