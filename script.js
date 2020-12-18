var cards = $(".card");
var cards_length = cards.length;

$(document).ready(function() {
    //Prevents form submit by clicking enter
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
    });

    $(".form").submit(function(event) {

        /* event.preventDefault(); */

        var active_card = $(".card_active");
        if(active_card.attr("id") === "q5") {
            //Changes value in progress bar
            progress(66, 33);
         }
    });

    $(".card a.btn").click(function(event) {
        event.preventDefault();

        //Change active card
        var active_card = $(".card_active");

        //Saves user name
        if(active_card.attr("id") === "q1") {
            var name = active_card.find("input").val(); 
            
            $("#hello_name").html(name);

            //Changes value in progress bar
            progress(100, 50);
        }

        var active_index = cards.index(active_card);
        if(active_index + 1 < cards_length) {
            active_card.removeClass("card_active");
            cards.get(active_index + 1).classList.add("card_active");
        }

        /* if(active_index === 0) {
            $("#prev_btn")[0].classList.remove("control-btn_disabled");
        }

        if(active_index === cards_length - 2) {
            $("#next_btn")[0].classList.add("control-btn_disabled");
        } */

        /* active_card = $(".card_active");
        if(active_card.attr("id") === "q1") {
            active_card.find("input").val(); 
        } */
    });

    $("input.card-input").on("input", function(event) {
        if($(this).val()) {
            $(".card_active .btn-block")[0].classList.add("btn-block_shown");
        } else {
            $(".card_active .btn-block")[0].classList.remove("btn-block_shown");
        }
    });

    $(".card-radio-label").click(function(event) {
        event.stopPropagation();
        event.preventDefault();

        $(".card_active .card-radio-label").each(function() {
            $(this)[0].classList.remove("card-radio-label_active");
        });

        $(this)[0].classList.add("card-radio-label_active");

        $(this).find("input").prop("checked", true);

        var active_card = $(".card_active");

        //Change active card
        setTimeout(function() {
            var active_index = cards.index(active_card);
            active_card.removeClass("card_active");
            cards.get(active_index + 1).classList.add("card_active");
        }, 700);

        if(active_card.attr("id") === "q2") {
            //Changes value in progress bar
            progress(34, 17);
        }
    });

    /*$("#prev_btn").click(function(event) {
        if(!$(this).hasClass("control-btn_disabled")) {
            //Change active card
            var active_card = $(".card_active");
            var active_index = cards.index(active_card);
            if(active_index - 1 >= 0) {
                active_card.removeClass("card_active");
                cards.get(active_index - 1).classList.add("card_active");
            }

            /* if(active_index === 0) {
                $("#prev_btn")[0].classList.remove("control-btn_disabled");
            }
    
            if(active_index === cards_length - 2) {
                $("#next_btn")[0].classList.add("control-btn_disabled");
            } */
       /* }
    });*/

    /* $("#next_btn").click(function(event) {
        if(!$(this).hasClass("control-btn_disabled")) {
            //Change active card
            var active_card = $(".card_active");
            var active_index = cards.index(active_card);
            if(active_index + 1 < cards_length) {
                active_card.removeClass("card_active");
                cards.get(active_index + 1).classList.add("card_active");
            }

            /* if(active_index === 0) {
                $("#prev_btn")[0].classList.remove("control-btn_disabled");
            }
    
            if(active_index === cards_length - 2) {
                $("#next_btn")[0].classList.add("control-btn_disabled");
            } */
        /*}
    });*/
});


//Changes value in progress bar
function progress(px, proc) {
    var perc = $("#perc_line").css("width");
    perc = perc.replace("px", "");
    perc = Number(perc) + px;
    $("#perc_line").css("width", perc + "px");

    perc = $("#perc_num").html();
    perc = Number(perc) + proc;
    $("#perc_num").html(perc);

    // name 50% - 100px
    // radio 17% - 34px
    // phone 33% - 66px
}