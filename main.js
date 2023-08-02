function fetchData() {
    let imageSlide = document.getElementById('carouselExampleSlidesOnly');

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=21d0b61bb21a1374f1b66c994663ada3")
        .then((response) => response.json())
        .then((data) => {

            const carouselInner = imageSlide.querySelector('.carousel-inner');
            let onlyThree = data.results.slice(0, 3)
            
            onlyThree.forEach((dataImg, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) {
                    carouselItem.classList.add('active');
                }

                const imageElement = document.createElement('img');
                imageElement.classList.add('d-block', 'w-100');
                imageElement.src = 'https://image.tmdb.org/t/p/w500' + dataImg.poster_path;

                carouselItem.appendChild(imageElement);
                carouselInner.appendChild(carouselItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching data from the API:', error);
        });
}

fetchData();




function MovieList() {
    let List = document.getElementById('row1');

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=21d0b61bb21a1374f1b66c994663ada3")
        .then((response) => response.json())
        .then((data) => {

            const colInner1 = List.querySelector('.a1');

            let tenFive = data.results.slice(0, 17)
           
            tenFive.forEach((allData, index) => {
                const listmoviediv = document.createElement('div');
                listmoviediv.classList.add('card', 'cards');
                listmoviediv.setAttribute("data-aos-duration", "10000");
                listmoviediv.setAttribute("data-aos", "fade-up");

                const imageElement1 = document.createElement('img');
                imageElement1.classList.add('card-img-top');

                imageElement1.src = 'https://image.tmdb.org/t/p/w500' + allData.poster_path;

                const listmovieHFive = document.createElement('h5');
                listmovieHFive.classList.add('card-title');

                listmovieHFive.textContent = "Movie Name: " + allData.original_title;

                const listMoviePara = document.createElement('h6');
                listMoviePara.classList.add('card-title');
                listMoviePara.textContent = "Release Date : " + allData.release_date;

                const listMovieRating = document.createElement('h6');
                listMovieRating.classList.add('card-text');

                listMovieRating.textContent = "Movie Rating :" + allData.vote_average;

                listmoviediv.addEventListener('click', () => {

                    window.location.href = `movie_details.html?id=${allData.id}`;
                });


                listmoviediv.appendChild(imageElement1);
                colInner1.appendChild(listmoviediv);
                listmoviediv.appendChild(listmovieHFive);
                listmoviediv.appendChild(listMoviePara);
                listmoviediv.appendChild(listMovieRating);
            });
        })
        .catch((error) => {
            console.error('Error fetching data from the API:', error);
        });
}

MovieList();





const apiKey = "api_key=21d0b61bb21a1374f1b66c994663ada3";
const searchInput = document.getElementById("searchInput");
const searchList = document.getElementById("searchList");

document.getElementById("searchform").addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = searchInput.value;
    fetch(`https://api.themoviedb.org/3/search/movie?${apiKey}&query=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            const movies = data.results;
            let output = '';
            if (movies.length > 0) {
                const movie = movies[0];
                output += `<div>
                <h2>${movie.title}</h2>
                <img class="abc" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
            </div>`;
            } else {
                output = '<p>No movies found for the given search term.</p>';
            }
            searchList.innerHTML = output;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});