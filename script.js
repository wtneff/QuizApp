var $questionTemplate = $("#questionTemplate");
var $categories = $("#categories");
var $difficulty = $("#difficulty");
var counter = 0;
var categoryVal;
var difficultyVal;
var categoryName;

// function to get quiz question categories
$("document").ready(function getCategories() {
  var categoriesUrl = "https://opentdb.com/api_category.php";

  $.getJSON(categoriesUrl, function(categories) {
    var category = categories.trivia_categories;
    //console.log(category);
    for (var i = 0; i < category.length; i++) {
      var categoryName = category[i].name;
      var categoryId = category[i].id;
      $categories.append(
        '<option value="' + categoryId + '">' + categoryName + "</option>"
      );
    }
  });
  return false;
});

// function to get quiz form selection values
$("#startQuiz").click(function getValues() {
  categoryVal = $categories.val();
  difficultyVal = $difficulty.val();
  //console.log(categoryVal);
  //console.log(difficultyVal);
});

// function to get quiz questions
$("#startQuiz").click(function getQuestions() {
  $questionTemplate.empty();
  $("#counter").text("Points: " + counter);
  console.log(categoryVal);
  $("#navigation")
    .removeClass("hidden")
    .addClass("visible");
  //console.log(difficultyVal);
  var triviaUrl =
    "https://opentdb.com/api.php?amount=10&category=" +
    categoryVal +
    "&difficulty=" +
    difficultyVal +
    "&type=multiple";
  $.getJSON(triviaUrl, function(data) {
    console.log(triviaUrl);
    console.log(data.response_code);
    if (data.response_code == 1) {
      $questionTemplate.append(
        "Error! Not enough questions in database for this category and difficulty combination!" +
          '<div id="quizForm questionTemplate" class="quizAnswerTab"><a href="" onclick="location.reload()"><li class="quizAnswer">Reset</li></a></div>'
      );
    } else {
      var questions = data.results;
      $questionTemplate.append(
        "<table>" +
          "<tr>" +
          "<td>Category:</td>" +
          "<td><b>" +
          questions[0].category.toUpperCase() +
          "</b></td>" +
          "</tr>" +
          "<tr>" +
          "<td>Difficulty:</td>" +
          "<td><b>" +
          difficultyVal.toUpperCase() +
          "</b></td>" +
          "</tr>" +
          "</table>" +
          '<div id="quizForm questionTemplate" class="quizAnswerTab"><a href="" onclick="location.reload()"><li class="quizAnswer">Reset</li></a></div>'
      );
      for (var i = 0; i < 10; i++) {
        //console.log(questions);
        var question = questions[i].question;
        //console.log(question);
        var incorrectAnswer1 = questions[i].incorrect_answers[0];
        var incorrectAnswer2 = questions[i].incorrect_answers[1];
        var incorrectAnswer3 = questions[i].incorrect_answers[2];
        var correctAnswer = questions[i].correct_answer;
        questionText = [i + 1] + ". " + question;

        $questionTemplate.append(
          "<div id=" +
            [i] +
            ' class="question hidden">' +
            '<div class="quizQuestion">' +
            questionText +
            "</div>" +
            '<div class="quizAnswerTab">' +
            "<a>" +
            '<li class="quizAnswer">' +
            incorrectAnswer1 +
            "</li>" +
            "</a>" +
            "</div>" +
            '<div class="quizAnswerTab">' +
            "<a>" +
            '<li class="quizAnswer">' +
            incorrectAnswer2 +
            "</li>" +
            "</a>" +
            "</div>" +
            '<div class="quizAnswerTab">' +
            "<a>" +
            '<li class="quizAnswer">' +
            incorrectAnswer3 +
            "</li>" +
            "</a>" +
            "</div>" +
            '<div class="quizAnswerTab">' +
            '<a onclick="addPoint()">' +
            '<li class="quizAnswer">' +
            correctAnswer +
            "</li>" +
            "</a>" +
            "</div>" +
            "<br>" +
            "</div>"
        );

        $("#0")
          .removeClass("hidden")
          .addClass("visible");
      }
    }
    // function to show an answer has been marked
  }).done(function() {
    var i = 0;
    $("a").on("click", function() {
      $(this).addClass("clicked");
    });

    // next navigation function
    $("#next").on("click", function() {
      if ([i] >= 0 && [i] < 9) {
        $("#" + [i])
          .removeClass("visible")
          .addClass("hidden");
        i = i + 1;
        $("#" + [i])
          .removeClass("hidden")
          .addClass("visible");
        $("#nxt").removeClass("clicked");
        console.log([i]);
      } else {
        alert("No more questions!");
        i = 9;
      }
    });

    // back navigation function
    $("#back").on("click", function() {
      if ([i] > 0) {
        $("#" + [i])
          .removeClass("visible")
          .addClass("hidden");
        i = i - 1;
        $("#" + [i])
          .removeClass("hidden")
          .addClass("visible");
        $("#bck").removeClass("clicked");
        console.log([i]);
      } else {
        alert("Can't go back any further!");
      }
    });
  });
  return false;
});

// function to add points to counter
function addPoint() {
  counter = counter + 1;
  $("#counter").empty();
  $("#counter").append("Points: " + counter);
  console.log(counter);
  return counter;
}

//$('#startQuiz').click(getQuiz);
