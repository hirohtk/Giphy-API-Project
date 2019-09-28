// Initial array of things
var teams = ["Seahawks", "Packers", "Ravens", "Raiders", "Saints", "Bengals", "Jaguars"];



$(document).ready(function () {

    displayGif(); // runs the function which creates the initial array of teams 

    function displayGif() {

        $("#add-team").on("click", function () {
            event.preventDefault();
            var inputTeam = $("#team-input").val();

            teams.push(inputTeam);

            refreshButtons(); // NEEDED THIS SO THAT YOU REFRESH YOUR BUTTONS AND APPLY ALL OF THE PREVIOUS FUNCTIONALITY ON THERE (I.E. ADDING TEAM NAME, ON CLICK FUNCTION, ETC,)
        });

        function refreshButtons() {
            $("#buttons-view").empty();
            for (var i = 0; i < teams.length; i++) {

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

                    $("#main-view").empty();

                    for (i = 0; i <= 10; i++) {

                        var rating = response.data[i].rating;

                        var newDiv = $("<div>");
                        newDiv.attr("style", "height: 15rem; width: 25rem; float:left; margin-left: 1rem; margin-right: 1rem;")

                        var newP = $("<p>");
                        newP.text("Rating:" + rating);

                        var newGif = $("<img>");
                        newGif.addClass("clickableGif");
                        newGif.attr("state", "still");
                        newGif.attr("src", response.data[i].images.fixed_height_still.url);
                        newGif.attr("gifNumber", i); // since all the images are numbered in an array, the index is the unique identifier used for knowing which gif to substitute in for the resuming below
                        newGif.attr("team-name", specificTeam); // doing this so pausing function below knows which team we're in so it can access the right team object for still/animated image

                        newDiv.append(newP);
                        newDiv.append(newGif);

                        $("#main-view").append(newDiv);
                    }
                });

            });
        }

        refreshButtons();

        // THE FUNCTION BELOW WILL ALWAYS RUN

        $(document).on("click", ".clickableGif", function state() {  // why did I have to do the middle class identifier?  When I tried referencing the object, it wouldn't run the function.  
            // is it because the object would already have to exit by the time you click it?
            console.log("gif has been clicked");
            var specificTeam = $(this).attr("team-name"); // this refers to the <img> created in function above which I named newGif
            console.log(specificTeam);
            //console.log($(this).attr("state"));
            //console.log($(this)); // *Note A this is not equal to the below

            var carryToTheResponseBelow = $(this); // *Note A :  had to store this in a variable because AJAX seems to have changed what THIS is

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + specificTeam + "&api_key=e8WnTD7iI6NKElGDHHTY45ikLjLNFC7K&limit=10";

            $.ajax({

                url: queryURL,
                method: "GET",

            }).then(function (response) {
                //console.log($(this));  // *Note A this is not equal to the above
                //console.log(carryToTheResponseBelow);

                if (carryToTheResponseBelow.attr("state") === "still") { // *Note A: did THIS become something else after AJAX?
                    console.log("animating this gif");
                    console.log(carryToTheResponseBelow.attr("gifNumber"));

                    carryToTheResponseBelow.attr("state", "animating");
                    carryToTheResponseBelow.attr("src", response.data[carryToTheResponseBelow.attr("gifNumber")].images.fixed_height.url);
                }
                else {
                    console.log("stopping this gif");
                    carryToTheResponseBelow.attr("state", "still");
                    carryToTheResponseBelow.attr("src", response.data[carryToTheResponseBelow.attr("gifNumber")].images.fixed_height_still.url);
                }

            });

        });




    }
});


























