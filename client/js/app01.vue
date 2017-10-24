<template>
	<button>Get JSON data</button>
	<div></div>
</template>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
	$(document).ready(function(){
	    $("button").click(function(){
	        $.getJSON("demo_ajax_json.js", function(result){
	            $.each(result, function(i, field){
	                $("div").append(field + " ");
	            });
	        });
	    });
	});
</script>