var selCitta = [];
var selRegioni;

function setArrayCitta(){
    for(var i=0; i<110; i++){
        selCitta[i] = 0;
    }
}

$(document).ready(function(){
    loadRegioni();
    loadCitta();
    setArrayCitta();
    $(document).on('click','.btn-citta',function(){
        var id = $(this).val();
        var checked = $(this).attr("bool");
        if(checked == "false"){
            $(this).addClass("btn-success");
            $(this).removeClass("btn-primary");
            $(this).attr("bool", true);
            selCitta[id] = 1;
        }
        else{
            $(this).addClass("btn-primary");
            $(this).removeClass("btn-success");
            $(this).attr("bool", false);
            selCitta[id] = 0;
        }
        console.log(selCitta, selCitta.length);

    });
    
    $(document).on('click','.btn-regioni',function(){
        var id = $(this).val();
        var checked = $(this).attr("bool");
        if(checked == "false"){
            $(".btn-regioni.btn-success").addClass("btn-danger");
            $(".btn-danger").removeClass("btn-success");
            $(this).addClass("btn-success");
            $(this).removeClass("btn-danger");
            $(this).attr("bool", true);
            selRegioni = id;
        }
        else{
            $(this).addClass("btn-danger");
            $(this).removeClass("btn-success");
            $(this).attr("bool", false);
            selRegioni = null;
        }
        console.log(selRegioni);
    });
    
    
    $("#check").click(function(){
        var arr = [];
        for(var i=0; i<110; i++){
            if(selCitta[i] !== 0) arr.push(i);
        }
        
        var correct = '<div class="alert alert-success" role="alert"><b>Giusto</b></div>';
        var error = '<div class="alert alert-danger" role="alert"><b>Sbagliato</b></div>';
        $.ajax({
            method: "GET",
            url: "parserCitta.php",
            data: { data: JSON.stringify(arr), regione: selRegioni },
            //dataType: "json",    //se fosse semplice testo userei dataType: "html"
            success: function(data){
                if(data == 1){
                    $(".res").html(correct);
                    $("#r"+selRegioni).remove();
                    for(i=0; i<arr.length;i++){
                        selCitta[arr[i]] = 0;
                        $("#c"+arr[i]).remove();
                    }
                    arr = null;
                    console.log("arr vuoto:" + arr);
                }
                else $(".res").html(error);
            },
            error: function(error){
                alert("<b>error</b>");
            }
        });
    });
});


function loadRegioni(){
    $.get("loadRegioni.php", function(data){
        for(i=0; i<data.length; i++){
            var tmp = '<button type="button" id="r'+i+'" bool="false" value='+i+' class="btn btn-regioni btn-danger btn-lg">'+data[i]+'</button>';
            $(".regione").append(tmp);
        }
    });
}

function loadCitta(){
    $.get("loadCitta.php", function(data){
        for(i=0; i<data.length; i++){
            var tmp = '<button type="button" id="c'+i+'" bool="false" value='+i+' class="btn btn-primary btn-lg btn-citta">'+data[i].Citta+'</button>';
            $(".citta").append(tmp);
        }
    });
}