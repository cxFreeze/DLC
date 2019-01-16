search()
$('#searchbar').on('keypress',function(e) {
    if(e.which == 13) {
        search();
    }
});
function search(){
	$('#movietable').empty()
	let res = ""
	$('#movietable').append("<tr><td colspan='6'><img style='height:350px' src='app/spinner.svg'></td></tr>");
	$.post("app/searchMovie", JSON.stringify({movie: $("#searchMovie").val()}), async function (data, status) {
		for (let movie in data) {
			let poster = await getImage(data[movie].originalTitle)
			if (poster == ''){
				poster = 'app/no-poster.jpg'
			}
			let note =''
			let i = 0
			for (; i<(Math.round(data[movie].averageRating))/2;i++){
				note+="<span class='fa fa-star checked'></span>"
			}
			for (; i<5;i++){
				note+="<span class='fa fa-star'></span>"
			}
			let genre = ""
			if (data[movie].genres){
				genre = data[movie].genres.replace(/,/g, ", ")
			}
			let cast = ""
			if (data[movie].cast){
				cast = data[movie].cast.replace(/,/g, ", ")
			}
			res+= "<tr class='movie'><td><img style='height:150px' src='"+poster+"'></td><td>"+data[movie].originalTitle+"</td><td>"+data[movie].startYear+"</td><td>"+genre+"</td><td>"+cast+"</td><td>"+note+"</td></tr>"
		}
		$('#movietable').empty()
		$('#movietable').append(res);
		if (res == ""){
			$('#movietable').append("<tr><td colspan='6'><h1>NO RESULTS</h1></td></tr>");
		} 
	}).fail(function(){ 
		console.log('something went wrong please try again');
	});
}

function getImage(film){
		return new Promise((resolve,reject) => {
			$.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", (json) => {
				if (!json.results[0] || json.results[0].poster_path==null) {
					resolve('')	
					return
				}
				resolve('http://image.tmdb.org/t/p/w200/' + json.results[0].poster_path)				
				}).fail(function(){ 
					resolve('');
				});	
			})
}
