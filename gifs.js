let topics = ["Dog", "Cat", "Bear", "Bat", "Boar", "Caribou", "Deer", "Fish",
    "Human", "Lion", "Lobster", "Mole", "Owl", "Quail", "Reindeer", "Sheep", "Shark", "Squirrel", "Squid",];

// adding a new button for each topics array
function addnew() {
    $(".arrayList").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("animals");
        a.attr("data-topic", topics[i]);
        a.text(topics[i]);
        $(".arrayList").append(a);
    }
}

// adding more topic to view
$("#addTopic").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    var b = $("#newTopics").val();
    topics.push(b);
    addnew();
})

// What happen when a button is click
function displayGifs() {
    var selectedTopic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=UJUhLfos8iqrSpCCKiFCJQ2fJSM25l0X&q=" + selectedTopic;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var c = 0; c < 10; c++) {
            console.log(response);
            var rating = response.data[c].rating;
            var newImage = $("<img>");
            newImage.addClass("gifs-image");
            newImage.attr("data-state", "animated");
            newImage.attr("animatedURL", response.data[c].images.fixed_width.url);
            newImage.attr("stillURL", response.data[c].images.fixed_width_still.url);
            newImage.attr("src", newImage.attr("animatedURL"));
            newImage.attr("alt", "Gifs");            
            var p = $("<p>").text("Rating: " + rating);
            
            // add a new div to call smallContainer to store the img and rating
            var contain = $("<div>");
            contain.addClass("smallContainer");
            $(contain).prepend(newImage);
            $(contain).prepend(p);

            //prepend the newly create smallContaienr to showResult
            $(".showResult").prepend(contain);
        }
    })
}


$(document).on("click", ".animals", displayGifs);
$(document).on("click", ".gifs-image", function () {
    var state = $(this).attr("data-state");
    if (state === "animated") {
        // alert("gif is animated");
        $(this).attr("src", $(this).attr("stillURL"));
        $(this).attr("data-state", "still");
    }
    if (state === "still") {
        // alert("gif is still");
        $(this).attr("src", $(this).attr("animatedURl"));
        $(this).attr("data-state", "animated");
    }
});










