// greeting -> q1 -> q2 = paths
// question with id=q2 defines quiz path
var paths = {
    "problem_1": [q3, q6, q7, q_finish],
    "problem_2": [q4, q6, q7, q_finish],
    "problem_3": [q5, q7, q_finish],
    "problem_4": [q_finish]
};


$(document).ready(function() {
    var cards = $(".card");

    //Selected in card with id=q2 path
    var selectedPath;
    
    //Prevents form submit by clicking enter
    $(window).keydown(function(event) {
        if(event.keyCode == 13) {
          event.preventDefault();
          return false;
        }
    });

    $(".form").submit(function(event) {
        var activeCard = $(".card_active");
        if(activeCard.attr("id") === "q_finish") {
            changeProgress(66, 33);
        }
    });

    $(".card a.btn").click(function(event) {
        event.preventDefault();

        var activeCard = $(".card_active");

        if(activeCard.attr("id") === "q1") {
            saveUserName(activeCard);

            changeProgress(100, 50);
        }

        //Changes active card (selected path or simply next card)
        if(selectedPath) {
            selectedPath[1] += 1;
            var nextCard = paths[selectedPath[0]][selectedPath[1]];
            var nextCardIndex = cards.index(nextCard);

            showNextCard(cards, activeCard, nextCardIndex, true);
        } else {
            showNextCard(cards, activeCard, 1, false);
        }
    });

    //Shows/hides button on input
    $("input.card-input").on("input", function(event) {
        if($(this).val()) {
            $(".card_active .btn-block")[0].classList.add("btn-block_shown");
        } else {
            $(".card_active .btn-block")[0].classList.remove("btn-block_shown");
        }
    });

    //Question with id=q2
    $(".card-radio-label").click(function(event) {
        event.stopPropagation();
        event.preventDefault();

        $(".card_active .card-radio-label").each(function() {
            $(this)[0].classList.remove("card-radio-label_active");
        });

        $(this)[0].classList.add("card-radio-label_active");

        $(this).find("input").prop("checked", true);
        
        var id = $(this).find("input").attr("id"); //Selected radio button

        var activeCard = $(".card_active");
        
        //Finds next card
        var el = paths[id];
        var nextCardIndex = cards.index(el[0]);
        selectedPath = [id, 0];
        
        setTimeout(function() {
            showNextCard(cards, activeCard, nextCardIndex, true);
        }, 700);

        if(activeCard.attr("id") === "q2") {
            changeProgress(34, 17);
        }
    });
});


//Changes value in progress bar
function changeProgress(px, proc) {
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
//parameter q2 defines card with id=q2, type bool
function showNextCard(cards, activeCard, step, q2) {
    var cardsLength = cards.length;
    var activeIndex = cards.index(activeCard);

    if(q2) {
        step -= activeIndex;
    }

    if(activeIndex + step < cardsLength) {
        activeCard.removeClass("card_active");
        cards.get(activeIndex + step).classList.add("card_active");
    }
}

//Saves user name
function saveUserName(activeCard) {
    var name = activeCard.find("input").val(); 
        
    $("#hello_name").html(name);
    $("#hello_name_2").html(name);
}
