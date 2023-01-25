
$(document).ready(function(){
let bookRecommendation = $("#bookRecommendations")
let bookSearch = $("#searchBox")
let imgReview = $(".reviewImage")
let textReview = $(".reviewText")
let mainPart = $(".mainPart")
let sBtn = $('.sBtn')


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

            if (data.items[i].volumeInfo.authors[0]) {
                let bookRecommend = '<li class="text-center"><button>' + data.items[i].volumeInfo.title + '   By:  ' + data.items[i].volumeInfo.authors[0] + '</button></li>';
                bookRecommendation.append(bookRecommend);
            } else {
                let bookRecommend = '<li class="text-center"><button>' + data.items[i].volumeInfo.title + '   By:  ' + '</button></li>';
                bookRecommendation.append(bookRecommend);
            }
            bookRecommendation.children().eq(i).children("button").attr("id", i)
            data.items[i].volumeInfo.authors[0]
            console.log(data.items[i].volumeInfo.title);
            i++;
        } while (i < 10);
        bookRecommendation.children().children("button").addClass('clickThrough')
        
        $('.clickThrough').click(function() {
            bookRecommendation.html("");
            let x = ($(this).attr("id"))
            if (data.items[x].volumeInfo.authors[0]) {
                let drillThrough = '<li><button>Title:  ' + data.items[x].volumeInfo.title + '</button></li><li>Author: ' + data.items[x].volumeInfo.authors[0] + '</li><li> Description: ' + data.items[x].volumeInfo.description + '</li>    ';
                bookRecommendation.append(drillThrough);
            } else {
                let drillThrough = '<li><button>Title:  ' + data.items[x].volumeInfo.title + '</button></li><li>Author: ' + '</li><li> Description: ' + data.items[x].volumeInfo.description + '</li>    ';    
                bookRecommendation.append(drillThrough);
            }
        
        })
        
    })
}



sBtn.click(function() {
    topics = $(this).attr("id")
    console.log(topics);
    bookSearch.value = topics;
    searchBooks();
    appendCat(topics);
})


})

