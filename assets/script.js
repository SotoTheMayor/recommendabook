let bookSearch = $("#searchBox")
let bookRecommendation = $("#bookRecommendations")
$(document).ready(function(){
// var cat = $(".recommendation")
let imgReview = $(".reviewImage")
let textReview = $(".reviewText")
let mainPart = $(".mainPart")

let reviews = 'https://cataas.com/cat?width=250';
let romance = 'https://cataas.com/cat?type=bubble';
let history = 'https://cataas.com/cat?type=creation';
let thriller = 'https://cataas.com/cat?type=startled';
let religion = 'https://cataas.com/cat?type=christmas';
let kids = 'https://cataas.com/cat?type=tiny-baby';

// function openpart(type){
//     mainPart.append("<img src=" + type + " width='500' height='600'>")
// }

fetch(reviews)

    let image = new Image();
    image.src = reviews;
    imgReview.append(image);

    let textArr = ["10/10 Would read again!", "I couldn't put it down, it was amazing!", "This book made me cry happy tears", "Nothing is better than a good book, and no book is better than this one!"]
    textReview.text(textArr[Math.floor(Math.random() * 4)]);









})

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
            let bookRecommend = '<li>Title:  ' + data.items[i].volumeInfo.title + '</li>';
            bookRecommendation.append(bookRecommend);
            console.log(data.items[i].volumeInfo.title);
            i++;
        } while (i < 10);
    })
}


function openpart(topics) {
    console.log(topics);
    bookSearch.value = (topics);
    searchBooks();
}

