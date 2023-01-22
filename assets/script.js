$(document).ready(function(){
// var cat = $(".recommendation")
var cat = $(".reviewImage")
var catReview = $(".reviewText")
// var requestUrl = 'https://cataas.com/cat/says/read%20more';
var requestUrl = 'https://cataas.com/cat?width=100';
// var requestUrl = 'https://cataas.com/api/cats?limit=10&skip=0';
fetch(requestUrl)
// .then(function (response) {
//     return response.json();
//   })    
// .then(function (data) {
//       console.log(data)
//       cat.append(data)
// });

    var image = new Image();
    image.src = requestUrl;
    cat.append(image);

    var textArr = ["10/10 Would read again!", "I couldn't put it down, it was amazing!", "This book made me cry happy tears", "Nothing is better than a good book, and no book is better than this one!"]
    catReview.text(textArr[Math.floor(Math.random() * 4)]);

})