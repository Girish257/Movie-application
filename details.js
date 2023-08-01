

// Get the movie ID from the URL parameter

function f2() {


    const urlParams = new URLSearchParams(window.location.search);
    // const movieId = urlParams.get('id');
    return urlParams.get('id')
    // return

}

function f1() {
    let movieId = f2()

    // `https://api.themoviedb.org/3/movie/${movieId}?api_key=21d0b61bb21a1374f1b66c994663ada3&append_to_response=credits,videos`

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=21d0b61bb21a1374f1b66c994663ada3&append_to_response=credits,videos`)
        .then((response) => response.json())
        .then((movieData) => {
            // The fetched movieData object contains all the details of the selected movie
            // console.log(movieData)
            // Call a function to display the movie details on the page
            displayMovieDetails(movieData);
            let castImg = castDetails(movieData.credits.cast);
        })
        .catch((error) => {
            console.error('Error fetching movie details:', error);
        });

}


f1()

function displayMovieDetails(movieData) {
    const movieDetailsContainer = document.getElementById('movieDetails');

    // Create elements to display the movie details


    const imageElement12 = document.createElement('img');
    imageElement12.classList.add('card-img-top', 'result');

    imageElement12.src = 'https://image.tmdb.org/t/p/w500' + movieData.poster_path;


    const titleElement = document.createElement('h2');
    titleElement.textContent = movieData.original_title;

    const overviewElement = document.createElement('p');
    overviewElement.textContent = movieData.overview;

    movieDetailsContainer.appendChild(imageElement12);
    movieDetailsContainer.appendChild(titleElement);
    movieDetailsContainer.appendChild(overviewElement);



    // Watch Trailer

    const apiUrlVideos = `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=21d0b61bb21a1374f1b66c994663ada3`;
    fetch(apiUrlVideos)
        .then((response) => response.json())
        .then((data) => {
            const videos = data.results;
            if (videos.length > 0) {
                const trailer = videos.find((video) => video.type === 'Trailer');
                if (trailer) {
                    const youtubeLink = `https://www.youtube.com/watch?v=${trailer.key}`;
                    const youtubeLinkElement = document.createElement('a');
                    youtubeLinkElement.classList.add('trailerclass');
                    youtubeLinkElement.href = youtubeLink;
                    youtubeLinkElement.textContent = 'Watch Trailer';
                    movieDetailsContainer.appendChild(youtubeLinkElement);
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching video data:', error);
        });

}

function castDetails(castImg) {

    let ax = castImg.slice(0, 5)
    console.log(ax)
    console.log(ax[0])


    let cImg = document.getElementById('castImg');

    const cDiv = cImg.querySelector('.castdiv');

    const cNewDiv = document.createElement('div');
    cNewDiv.classList.add('new');

    ax.forEach((cast) => {
        const imgDiv = document.createElement('img');
        imgDiv.classList.add('imgWidth');
        imgDiv.src = 'https://image.tmdb.org/t/p/w300' + cast.profile_path;
        cNewDiv.appendChild(imgDiv);

        const namePara = document.createElement('p');
        namePara.textContent = cast.name;
        cNewDiv.appendChild(namePara);
    });

    cDiv.appendChild(cNewDiv)

}