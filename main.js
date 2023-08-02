function fetchData() {
    let imageSlide = document.getElementById('carouselExampleSlidesOnly');

    fetch("https://api.themoviedb.org/3/movie/popular?api_key=21d0b61bb21a1374f1b66c994663ada3")
        .then((response) => response.json())
        .then((data) => {

            const carouselInner = imageSlide.querySelector('.carousel-inner');
            let onlyThree = data.results.slice(0, 3)
            // console.log("onlyThree",onlyThree)
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
            // console.log("tenFive",tenFive)
            tenFive.forEach((allData, index) => {
                const carouselItem1 = document.createElement('div');
                carouselItem1.classList.add('card', 'cards');
                carouselItem1.setAttribute("data-aos-duration", "10000");
                carouselItem1.setAttribute("data-aos", "fade-up");

                const imageElement1 = document.createElement('img');
                imageElement1.classList.add('card-img-top');

                imageElement1.src = 'https://image.tmdb.org/t/p/w500' + allData.poster_path;

                const carouselItem2 = document.createElement('h5');
                carouselItem2.classList.add('card-title');

                carouselItem2.textContent = "Movie Name: " + allData.original_title;

                const carouselItem4 = document.createElement('h6');
                carouselItem4.classList.add('card-title');
                carouselItem4.textContent = "Release Date : " + allData.release_date;

                const carouselItem5 = document.createElement('h6');
                carouselItem5.classList.add('card-text');

                carouselItem5.textContent = "Movie Rating :" + allData.vote_average;

                carouselItem1.addEventListener('click', () => {

                    window.location.href = `movie_details.html?id=${allData.id}`;
                });


                carouselItem1.appendChild(imageElement1);
                colInner1.appendChild(carouselItem1);
                carouselItem1.appendChild(carouselItem2);
                carouselItem1.appendChild(carouselItem4);
                carouselItem1.appendChild(carouselItem5);
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