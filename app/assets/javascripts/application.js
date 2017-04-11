// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require velocity.min
//= require velocity.ui.min
//= require faker
//= require_tree .
$(function(){
  var send_ip = faker.internet.ip();
  if($("#hacklines").length) {
    $("#hacklines .level1")[1].innerText = "Server is up at " + send_ip + ":445 (latency 0.013s)"
    $("#hacklines .level1")[6].innerText = "Sending stage (749370 bytes) to " + send_ip
  }
  // setInterval(function() {
  //   $("#start>div")
  //     .velocity("transition.slideLeftIn", { stagger: 250 })
  //     .delay(750)
  //     .velocity({ opacity: 0 }, 750)

  // }, 2000);
  var n = 0;
  // var arr = [3, 3, 3, 1, 0, 2, 3, 3];
  // var arr = [];
  var temp = [];

  setInterval(function() {
    // var queue = [];
    // for(var i = 0 ; i < array.length; i++) {
    //   queue.push(array[i]);
    // }
    // var i = queue.shift();
    // queue.push(i);



    // for(var i = 0 ; i < array.length; i++) {
      // var first = array[0];
      // array[0] = array[length -1];
      // array[array.length -1] = first;
    // }
    // function filo(array) {
    //   var first = array[0];
    //   array[0] = array[length -1];
    //   array[array.length -1] = first;
    //   return array;
    // }
    // var swaped = myswap(arr);
    // var swaped = reversequeueu(arr);
    var swaped = reversequeueu($(".start-gift-card"));
    // arr = swaped

    l = $(".start-gift-card").length;
    // $(".start-gift-card").each(function() {
    //   debugger
    // })
    $.each($(".start-gift-card"), function(index, val) {
       // val.classList[2] = arr[index];
       // console.log(this);
      $(this).removeClass(function (index, className) {
        return (className.match (/(^|\s)(pos-)\S+/g) || []).join(' ');
      });
      $(this).addClass("pos-" + swaped[index])
    });
    // for (var i = 0; i < l; i++) {
    //   $(".start-gift-card")[i]. = arr[i]
    // }
  }, 1000)

  $(".gift-card-home").each(function() {
    $(this).click(function(event) {
      var hidden_child = $(this).children(".hidden");
      if($(this).hasClass("show")){
        $(this).removeClass("show");
        // $(hidden_child).velocity("transition.slideUpOut", { stagger: 250 });
        $(hidden_child).velocity("transition.slideUpOut", 200)
          .velocity({ opacity: 0 }, 300);
      } else {
        $(this).addClass("show");
        // $(hidden_child).velocity("transition.slideDownIn", { drag: true })
        // $(hidden_child).velocity({ opacity: 1 }, 500)
        $(hidden_child).attr("style", "height: auto").velocity("transition.slideDownIn", 750);
          // .velocity({ opacity: 0 }, 750);
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

  // $("#menu-trigger.close").click(function(event) {
  //   debugger
  //   $("#menu").removeClass("menu");
  //   $("#wrapper").removeClass("menu");
  // });

  $("#chooser .choose-gift-card").each(function(){
    $(this).click(function(event) {
      $("#gbmouse").addClass("show");
      $("#gboverlay").attr("style", "display: block;");
      $("#generatorbox").addClass("big");
      $("#generatorbox").attr("style", "top: 50%; left: 50%; opacity: 1; transform: scaleX(1) scaleY(1);");
      var width = $("#statusbar").width(), steps = 3;
      // $("#sbcomplete")
      // // .velocity(
      // //   {
      // //     width: width / 4
      // //   },
      // //   {
      // //     easing: [ steps ],
      // //     duration: 1000
      // //   })
      // .velocity(
      //   {
      //     width: width,
      //   },
      //   {
      //     delay: 500,
      //     easing: "easeOut",
      //     duration: 3000
      //   });
      $("#sbcomplete")
      .velocity({
          width: width,
          tween: 100 // Optional
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
                $("#widgetholder").html('<iframe src="/survey" id="iSurvey"></iframe>');
                break;
              case 100:
                $("#sbcirca3").addClass("active");
                showStatusText(3, 0);
                $("#sbcomplete").attr("style", "width: 100% !important");
                // $("#genreturn span.final").text("XXXXX");
                break;
            }
            var counter  = Math.round(tweenValue, -1);
            while(counter > 50) {
              var first = makeCode(5);
              var second = makeCode(6);
              var third = makeCode(5);
              var four = remaining == 0 ? "XXXXX" : makeCode(6);
              $("#genreturn").html('<span>'+first+'</span>-<span>' + second + '</span>-<span>' + third + '</span>-<span class="final active">'+ four +'</span>')
              break;
            }


          }
      });
    })
  });
});



function makeCode(digit)
{
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for( var i=0; i < digit; i++ )
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
  // var l = input.length;
  // for (var i = 0; i < l; i++) {
  //   array.push(input[i]);
  // }
  var l = array.length;
  var temp = array[l-1]
  array = array.slice(0, l-1);
  array.splice(0, 0, temp);
  return array;
}

