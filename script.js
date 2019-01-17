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
			let poster = await getMoviePoster(data[movie].tconst)
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
				castTab = data[movie].cast.split(",")
				for (i in castTab){
					tmp = castTab[i].split("$")
					if (i != 0 ){
						cast+= ", "
					}
					cast+= "<a class='text-hover' onclick='openActor(`"+tmp[0]+"`)'>"+tmp[1]+"</a>"
				}
			}
			res+= "<tr class='movie'><td><img style='height:125px' src='"+poster+"'></td><td>"+data[movie].originalTitle+" ("+data[movie].startYear+")</td><td>"+data[movie].runtimeMinutes+" min.</td><td>"+genre+"</td><td>"+cast+"</td><td>"+note+"</td></tr>"
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

function getMoviePoster(film){
		return new Promise((resolve,reject) => {
			$.getJSON("https://api.themoviedb.org/3/find/"+film+"?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&external_source=imdb_id", (json) => {
				if (!json.movie_results[0] || json.movie_results[0].poster_path==null) {
					resolve('')	
					return
				}
				resolve('http://image.tmdb.org/t/p/w200/' + json.movie_results[0].poster_path)				
				}).fail(function(){ 
					resolve('');
				});	
			})
}

function getPersonImage(person){
		return new Promise((resolve,reject) => {
			$.getJSON("https://api.themoviedb.org/3/find/"+person+"?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&external_source=imdb_id", (json) => {
				if (!json.person_results[0] || json.person_results[0].profile_path==null) {
					resolve('')	
					return
				}
				resolve('http://image.tmdb.org/t/p/w200/' + json.person_results[0].profile_path)				
				}).fail(function(){ 
					resolve('');
				});	
			})
}

function openActor(person){
	$.post("app/getPersonDetails", JSON.stringify({person: person}), async function (data, status) {
		let image = await getPersonImage(data[0].nconst)
		data[0].deathYear = data[0].deathYear || "?"
		data[0].primaryProfession = data[0].primaryProfession.replace(/,/g, ", ")
		let knownFor = ""
		for (movie of data[0].movieNames){
			knownFor += "<div style='font-size:17px' class='text-hover'>"+movie.originalTitle+" </div>"
		}
		$("<div class='modal-cont'><div class='movie-modal'><div class='modal-left'><img style='width:180px;' src='"+image+"'></div><div class='modal-right'><h2>"+data[0].primaryName+"</h2><div>"+data[0].birthYear+" - "+data[0].deathYear+"</div><div>"+data[0].primaryProfession+"</div><div style='margin:15px 0 7px 0;'>Known for:</div><div>"+knownFor+"</div></div></div></div>").appendTo('body').modal({fadeDuration: 100});
	})
}
