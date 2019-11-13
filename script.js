const getLocationButton = document.querySelector(`#get-location`);
const searchDistance = document.querySelector(`#search-by-location`);
const searchPrice = document.querySelector(`#search-by-price`);
const searchRating = document.querySelector(`#search-by-rating`);
const restaurantsReturned = document.querySelector(`#restaurant-returned`);
const restaurantInfoModal = document.querySelector("#modal-restaurant-info");
const modalToggle = document.querySelector("#open-modal");
const modalClose = document.querySelector("#close-modal");
let currentLat;
let currentLong;

function initMap() {
    let location = new Object();
    navigator.geolocation.getCurrentPosition(function(pos) {
        location.lat = pos.coords.latitude;
        location.long = pos.coords.longitude;
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: location.lat, lng: location.long },
            zoom: 15
        });

        currentLat = location.lat
        currentLong = location.long
        console.log(currentLat)
        console.log(currentLong)
        var currentLocation = { lat: location.lat, lng: location.long };
        const searchButton = document.querySelector('#search-by-location');
        var marker = new google.maps.Marker({ position: currentLocation, map: map });
    });
};

function clearResults (){
    if (restaurantsReturned.hasChildNodes()){
        while (restaurantsReturned.firstChild) {
            restaurantsReturned.removeChild(restaurantsReturned.firstChild);
        };      
}};

function openModal(event) {
    const targetID = event.target.getAttribute("data-id");
    const restaurantCard = document.querySelector(`#${targetID}`);
    console.log(restaurantCard);
    const restaurantContent = restaurantCard.querySelector(
        ".inside-restaurant-info"
    ).cloneNode(true);
    const modalContent = document.querySelector("#modal-content");
    modalContent.append(restaurantContent);
    restaurantInfoModal.classList.add("modal-open");
}

function closeModal() {
    restaurantInfoModal.classList.remove("modal-open");
    const modalContent = document.querySelector("#modal-content");
    modalContent.innerHTML = "";
}

document.addEventListener("click", function(event) {
    if (!event.target.matches(".open-more-info")) return;
    event.preventDefault();
    openModal(event);
});

modalClose.addEventListener("click", function(event) {
    event.preventDefault();
    closeModal();
});

searchDistance.addEventListener(`click`, event => {
    clearResults ()
    fetch(
            `https://developers.zomato.com/api/v2.1/search?lat=${currentLat}&lon=${currentLong}&apikey=969dccb114a560b6d4df35b25a8e6418&sort=real-distance`
        )
        .then(repsonse => repsonse.json())
        .then(({ restaurants }) => {
            console.log(restaurants);
            restaurants.map(({ restaurant }) => {
                const {
                    name,
                    featured_image,
                    cuisines,
                    average_cost_for_two,
                    location,
                    timings,
                    phone_numbers,
                    user_rating,
                    id
                } = restaurant;

                const restaurantNode = `
                <div class="restaurant-card" id="restaurant-${id}">
                <img src="${featured_image}" class="photo" title="Photo of ${name}" />
                    <div class="content">
                        <h2 class="card-text card-title">${name}</h2>
                        <p class="card-text phone">Call on : ${phone_numbers}</p>
                        <p class="card-text rating">Avg.Rating ${user_rating.aggregate_rating}</p>
                        <button class="open-more-info button" data-id="restaurant-${id}">View more</button>                </div>
                    <div class="restaurant-info">
                        <div class="inside-restaurant-info">
                            <p class="couisine">Type: ${cuisines}</p>
                            <p class="cost-for-two">Avg. cost for two: ${average_cost_for_two}</p>
                            <p class="address">${location.address}</p>
                            <p class="timings">${timings}</p>
                        </div>
                    </div>
                </div>
        `;
                restaurantsReturned.innerHTML += restaurantNode;
            });
        });
});

searchPrice.addEventListener(`click`, event => {
    clearResults ()
    fetch(
            `https://developers.zomato.com/api/v2.1/search?lat=${currentLat}&lon=${currentLong}&apikey=969dccb114a560b6d4df35b25a8e6418&sort=cost`
        )
        .then(repsonse => repsonse.json())
        .then(({ restaurants }) => {
            console.log(restaurants);
            restaurants.map(({ restaurant }) => {
                const {
                    name,
                    featured_image,
                    cuisines,
                    average_cost_for_two,
                    location,
                    timings,
                    phone_numbers,
                    user_rating,
                    id
                } = restaurant;

                const restaurantNode = `
                <div class="restaurant-card" id="restaurant-${id}">
                <img src="${featured_image}" class="photo" title="Photo of ${name}" />
                    <div class="content">
                        <h2 class="card-text card-title">${name}</h2>
                        <p class="card-text phone">Call on : ${phone_numbers}</p>
                        <p class="card-text rating">Avg.Rating ${user_rating.aggregate_rating}</p>
                        <button class="open-more-info button" data-id="restaurant-${id}">View more</button>                </div>
                    <div class="restaurant-info">
                        <div class="inside-restaurant-info">
                            <p class="couisine">Type: ${cuisines}</p>
                            <p class="cost-for-two">Avg. cost for two: ${average_cost_for_two}</p>
                            <p class="address">${location.address}</p>
                            <p class="timings">${timings}</p>
                        </div>
                    </div>
                </div>
        `;
                restaurantsReturned.innerHTML += restaurantNode;
            });
        });
});

searchRating.addEventListener(`click`, event => {
    clearResults ()
    fetch(
            `https://developers.zomato.com/api/v2.1/search?lat=${currentLat}&lon=${currentLong}&apikey=969dccb114a560b6d4df35b25a8e6418&sort=rating`
        )
        .then(repsonse => repsonse.json())
        .then(({ restaurants }) => {
            console.log(restaurants);
            restaurants.map(({ restaurant }) => {
                const {
                    name,
                    featured_image,
                    cuisines,
                    average_cost_for_two,
                    location,
                    timings,
                    phone_numbers,
                    user_rating,
                    id
                } = restaurant;

                const restaurantNode = `
                <div class="restaurant-card" id="restaurant-${id}">
                <img src="${featured_image}" class="photo" title="Photo of ${name}" />
                    <div class="content">
                        <h2 class="card-text card-title">${name}</h2>
                        <p class="card-text phone">Call on : ${phone_numbers}</p>
                        <p class="card-text rating">Avg.Rating ${user_rating.aggregate_rating}</p>
                        <button class="open-more-info button" data-id="restaurant-${id}">View more</button>                </div>
                    <div class="restaurant-info">
                        <div class="inside-restaurant-info">
                            <p class="couisine">Type: ${cuisines}</p>
                            <p class="cost-for-two">Avg. cost for two: ${average_cost_for_two}</p>
                            <p class="address">${location.address}</p>
                            <p class="timings">${timings}</p>
                        </div>
                    </div>
                </div>
        `;
                restaurantsReturned.innerHTML += restaurantNode;
            });
        });
});