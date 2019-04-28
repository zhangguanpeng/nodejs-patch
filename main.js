$(document).ready(function() {

    $("#inputPath textarea").focus();

    $("#excute").click(function() {
        var inputText = $("#inputText").val();

        var sendObj = {
            "inputText": inputText
        };

        $.ajax({
			url: 'http://127.0.0.1:8081/excute',
            type: 'POST',
            data: sendObj,
			success: function(data) {
                console.log(data);     
                $("#outputPath").html(data.outputInfo.join("<br>"));
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
			    var s1=XMLHttpRequest;
			    var s2=textStatus;
			    var s3=errorThrown;
			    alert("error message : "+errorThrown.toString())
		    },
		});
    });
});