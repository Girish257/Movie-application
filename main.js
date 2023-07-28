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

            const colInner1 = List.querySelector('.col');

            let tenFive = data.results.slice(0, 20)
            // console.log("tenFive",tenFive)
            tenFive.forEach((allData, index) => {
                const carouselItem1 = document.createElement('div');
                carouselItem1.classList.add('card', 'h-100');


                const imageElement1 = document.createElement('img');
                imageElement1.classList.add('card-img-top');

                imageElement1.src = 'https://image.tmdb.org/t/p/w500' + allData.poster_path;


                // const carouselItem2 = document.createElement('h5');
                // carouselItem2.classList.add('card-title');


                // const carouselItem3 = document.createElement('p');
                // carouselItem3.classList.add('card-text');



                carouselItem1.appendChild(imageElement1);
                colInner1.appendChild(carouselItem1);
                // carouselItem1.appendChild(carouselItem2);
                // carouselItem1.appendChild(carouselItem3);



            });
        })
        .catch((error) => {
            console.error('Error fetching data from the API:', error);
        });
}

MovieList();







