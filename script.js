function search(){
	$.post("/searchMovie", JSON.stringify({movie: $("#searchMovie").val()}), async function (data, status) {
		$('#movietable').empty()
		console.log(data)
		for (let movie in data) {
			let poster = await getImage(data[movie].originalTitle)
			if (poster == ''){
				poster = 'no-poster.jpg'
			}
			let note =''
			let i = 0
			for (; i<(Math.round(data[movie].averageRating))/2;i++){
				note+="<span class='fa fa-star checked'></span>"
			}
			for (; i<5;i++){
				note+="<span class='fa fa-star'></span>"
			}
			$('#movietable').append("<tr class='movie'><td><img style='height:200px' src='"+poster+"'></td><td>"+data[movie].originalTitle+"</td><td>"+data[movie].startYear+"</td><td>"+data[movie].genres+"</td><td></td><td>"+note+"</td></tr>")		
		}			
	}).fail(function(){ 
		alert('something went wrong please try again');
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
