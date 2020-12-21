var cards = $(".card");
var cards_length = cards.length;

// greeting -> q1 -> q2 = cases
var cases = {
    "problem_1": [q3, q6, q7, q_finish],
    "problem_2": [q4, q6, q7, q_finish],
    "problem_3": [q_finish],
    "problem_4": [q5, q7, q_finish]
};

//Selected in q2 path
var branch;


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
        if(active_card.attr("id") === "q_finish") {
            //Changes value in progress bar
            progress(66, 33);
         }
    });

    $(".card a.btn").click(function(event) {
        event.preventDefault();

        var active_card = $(".card_active");

        //Saves user name
        if(active_card.attr("id") === "q1") {
            var name = active_card.find("input").val(); 
            
            $("#hello_name").html(name);
            $("#hello_name_2").html(name);

            //Changes value in progress bar
            progress(100, 50);
        }

        //Changes active card (selected path or simply next card)
        if(branch) {
            branch[1] += 1;
            var next_card = cases[branch[0]][branch[1]];
            var next_card_index = cards.index(next_card);

            nextCard(active_card, next_card_index, true);
        } else {
            nextCard(active_card, 1, false);
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

    //Shows/hides button on input
    $("input.card-input").on("input", function(event) {
        if($(this).val()) {
            $(".card_active .btn-block")[0].classList.add("btn-block_shown");
        } else {
            $(".card_active .btn-block")[0].classList.remove("btn-block_shown");
        }
    });

    //q2
    $(".card-radio-label").click(function(event) {
        event.stopPropagation();
        event.preventDefault();

        $(".card_active .card-radio-label").each(function() {
            $(this)[0].classList.remove("card-radio-label_active");
        });

        $(this)[0].classList.add("card-radio-label_active");

        $(this).find("input").prop("checked", true);
        
        var id = $(this).find("input").attr("id"); //Selected radio button

        var active_card = $(".card_active");
        
        //Finds next card
        var el = cases[id];
        var next_card_index = cards.index(el[0]);
        branch = [id, 0];
        
        setTimeout(function() {
            //Changes active card
            nextCard(active_card, next_card_index, true);
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

//Changes active card
function nextCard(active_card, n, q2) {
    var active_index = cards.index(active_card);

    if(q2) {
        n -= active_index;
    }

    if(active_index + n < cards_length) {
        active_card.removeClass("card_active");
        cards.get(active_index + n).classList.add("card_active");
    }
}