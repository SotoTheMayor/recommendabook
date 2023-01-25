
$(document).ready(function(){
let bookRecommendation = $("#bookRecommendations")
let bookSearch = $("#searchBox")
let imgReview = $(".reviewImage")
let textReview = $(".reviewText")
let mainPart = $(".mainPart")
let sBtn = $('.sBtn')


let reviews = 'https://cataas.com/cat?width=250';
let romance = 'https://cataas.com/cat?type=bubble';
let history = 'https://cataas.com/cat?type=creation';
let thriller = 'https://cataas.com/cat?type=startled';
let religion = 'https://cataas.com/cat?type=christmas';
let kids = 'https://cataas.com/cat?type=tiny-baby';


fetch(reviews)

let image = new Image();
    image.src = reviews;
    imgReview.append(image);

    let textArr = ["10/10 Would read again!", "I couldn't put it down, it was amazing!", "This book made me cry happy tears", "Nothing is better than a good book, and no book is better than this one!"]
    textReview.text(textArr[Math.floor(Math.random() * 4)]);


    
    
function appendCat(topics) {
    console.log(topics)
    $('img').remove('.removeImg')
    if (topics == "romance") {
            mainPart.append("<img src=" + romance + " width='400' height='400'>")
    } else if (topics == "history") {
            mainPart.append("<img src=" + history + " width='400' height='400'>")
    } else if (topics == "thriller") {
        mainPart.append("<img src=" + thriller + " width='400' height='400'>")
    } else if (topics == "religion") {
        mainPart.append("<img src=" + religion + " width='400' height='400'>")
    } else if (topics == "kids") {
        mainPart.append("<img src=" + kids + " width='400' height='400'>")
    }
    mainPart.children().eq(2).addClass("removeImg")
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


            let bookRecommend = '<li class="text-center"><button>' + data.items[i].volumeInfo.title + '   By:  ' + data.items[i].volumeInfo.authors[0] + '</button></li>';
            bookRecommendation.append(bookRecommend);
            bookRecommendation.children().eq(i).children("button").attr("id", i)
            data.items[i].volumeInfo.authors[0]
            console.log(data.items[i].volumeInfo.title);
            i++;
        } while (i < 10);
        bookRecommendation.children().children("button").addClass('clickThrough')
        
        $('.clickThrough').click(function() {
            bookRecommendation.html("");
            let x = ($(this).attr("id"))
            let drillThrough = '<li><button>Title:  ' + data.items[x].volumeInfo.title + '</button></li><li>Author: ' + data.items[x].volumeInfo.authors[0] + '</li><li> Description: ' + data.items[x].volumeInfo.description + '</li>    ';
            bookRecommendation.append(drillThrough);
        
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

