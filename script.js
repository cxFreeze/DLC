function search(){
	$.post("/searchMovie", JSON.stringify({movie: $("#searchMovie").val()}), function (data, status) {
		console.log(data);
	}).fail(function(){ 
		alert('something went wrong please try again');
	});
}

