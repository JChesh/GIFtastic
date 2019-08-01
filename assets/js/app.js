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

        });
    })

}
