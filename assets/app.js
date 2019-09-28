// Initial array of things
var teams = ["Seahawks", "Packers", "Ravens", "Raiders", "Saints", "Bengals", "Jaguars"];



$(document).ready(function () {

    function displayGif() {

        for (var i = 0; i < teams.length; i++) {
            console.log(i);
            var newTeam = $("<button>");
            newTeam.addClass("team");
            newTeam.attr("team-name", teams[i]); // set team name to team in array
            newTeam.text(teams[i]);
            $("#buttons-view").append(newTeam);
        }


        $("button").on("click", function () {

            var specificTeam = $(this).attr("team-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + specificTeam + "&api_key=e8WnTD7iI6NKElGDHHTY45ikLjLNFC7K&limit=10";

            $.ajax({

                url: queryURL,
                method: "GET",

            }).then(function (response) {

                $("#buttons-view").empty();
                console.log(response);

                var rating = response.data[0].rating;

                var newP = $("<p>");
                newP.text("Rating:" + rating);
                

                var newGif = $("<img>");
                newGif.addClass("addedGif");
                newGif.attr("src", response.data[0].url);

                $("#main-view").append(newP);
                $("#main-view").append(newGif);
                
            });

        });

    }
    displayGif();
});


/*  NEED TO ADD THIS LATER WHEN I'M USING BUTTONS TO ADD TEAMS
            for (var j = 0; j < teams.length; j++) {
                var newTeam = $("<button>");
                newTeam.addClass("team");
                newTeam.attr("team-name", teams[i]); // set team name to team in array
                newTeam.text(teams[i]);
                $("#buttons-view").append(newTeam);
            }
*/  









    
            
        
    










/*
// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function (event) {
                event.preventDefault();
                // This line of code will grab the input from the textbox
                var movie = $("#movie-input").val().trim();

                // The movie from the textbox is then added to our array
                movies.push(movie);

                // Calling renderButtons which handles the processing of our movie array
                renderButtons();

            });

        // Adding click event listeners to all elements with a class of "movie"
        $(document).on("click", ".movie", displayMovieInfo); // ***THIS displayMovieInfo has the "this", and this would have referred to document, if we didn't have ".movie" there which says
        // the thing that I am clicking is ONLY movie


        // Calling the renderButtons function to display the intial buttons
        renderButtons();*/