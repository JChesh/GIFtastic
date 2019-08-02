// Hello
// Topics array
var topics = ["Elephants","Giraffes","Pandas","Tigers","Lions","Bears","Cheetahs","Snakes","Spiders","Sharks","Whales"]
var currentTopic = "";
var newGif;

function mainButtons() {

    $("#animalButtons").empty();

    for (v in topics) {
        var subjectButton = $("<button>");
        subjectButton.text(topics[v]);
        subjectButton.addClass("subjectButton btn btn-dark")
        $("#animalButtons").append(subjectButton);
    }

    $(".subjectButton").on("click", function () {
 
        $("#animalsDiv").empty();

        currentTopic = $(this).text();

        var url = "https://api.giphy.com/v1/gifs/search";
        url += '?' + $.param({
            'q': currentTopic,
            'api_key': "noKAZyT0GueYq6ZCpyQkrZon6MPl6zcX"
        });
        $.ajax({
            url: url,
            method: "GET"
        }).then(function(response){

            var result = response.data;

            for (var i = 0; i < result.length; i++) {

                var stillImageUrl = result[i].images.downsized_still.url;

                var animalDiv = $("<div>");
                
                animalDiv.addClass("col-sm-4")

                var divCard = $("<div>")
                divCard.addClass("card")

                var animalGif = $("<img>").attr("src", stillImageUrl);
                animalGif.attr("data-still", result[i].images.original_still.url)
                animalGif.attr("data-animate", result[i].images.original.url)
                animalGif.attr("data-state", "still")
                animalGif.addClass("card-img-top");
                divCard.append(animalGif);

                var animalName = $("<div>")
                animalName.addClass("card-body bg-dark text-white")
                var animalNameHeading = $("<h5>")
                animalNameHeading.addClass("card-title")
                animalNameHeading.append(result[i].title);
                animalName.append(animalNameHeading);
                divCard.append(animalName);

                var animalInfoList = $("<ul>");
                animalInfoList.addClass("list-group", "list-group-flush");

                var animalInfoRating = $("<li>");
                animalInfoRating.addClass("list-group-item bg-dark text-white");
                animalInfoRating.append("Rating: " + result[i].rating);
                animalInfoList.append(animalInfoRating);
                divCard.append(animalInfoList);

                animalDiv.append(divCard)
                $("#animalsDiv").append(animalDiv);
            }
            $("img").on("click", function () {

                if ($(this).attr("data-state") === "still") {

                    $(this).attr("data-state", "animated");
                    $(this).attr("src", $(this).attr("data-animate"));

                }
                else {
                    $(this).attr("data-state", "still");
                    $(this).attr("src", $(this).attr("data-still"));
                }
            });
        })
        
    })
}

mainButtons();

$("#newGif").on("click", function(){

    event.preventDefault();

    newGif = $("#userTopic").val().trim();
    $("#form")[0].reset();
    if (topics.indexOf(newGif) === -1) {
        topics.push(newGif);
        mainButtons();
    }
    
})
