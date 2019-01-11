function search(){
	$.post("app/searchMovie", JSON.stringify({movie: $("#searchMovie").val()}), function (data, status) {
		$('#movietable').empty()
		for (let movie in data) {
			/*
			let poster = await getImage(data[movie].originalTitle)
			if (poster == ''){
				poster = 'app/no-poster.jpg'
			}
			*/
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
			$('#movietable').append("<tr class='movie'><td><img style='height:150px' src='"+data[movie].poster+"'></td><td>"+data[movie].originalTitle+"</td><td>"+data[movie].startYear+"</td><td>"+genre+"</td><td></td><td>"+note+"</td></tr>")		
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
				resolve('http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path)				
				}).fail(function(){ 
					resolve('');
				});	
			})

}
