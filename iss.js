const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544";

const latitudeSpan = document.querySelector(".lat");
const longitudeSpan = document.querySelector(".lon");
const altitudeSpan = document.querySelector(".alt");
const velocitySpan = document.querySelector(".vel");
const velocitySpan2 = document.querySelector(".vel2");
const btn = document.querySelector(".center");

let firstTime = true;

//ISS icon
const issIcon = L.icon({
  iconUrl: "iss.png",
  iconSize: [78, 50],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
let mymap = L.map("mapid").setView([0, 0], 0.5);
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

// Getting data
async function getData() {
  //fetch api
  const response = await fetch(ISS_API);
  const data = await response.json();

  const { altitude, latitude, longitude, velocity } = data;
  marker.setLatLng([latitude, longitude]);
  btn.addEventListener("click", () => {
    mymap.setView([latitude, longitude]);
  });

  //Leaflet map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 9,
    minZoom: 1.5,
  }).addTo(mymap);

  //update UI
  latitudeSpan.textContent = latitude.toFixed(4);
  longitudeSpan.textContent = longitude.toFixed(4);
  altitudeSpan.textContent = altitude.toFixed(3);
  velocitySpan.textContent = velocity.toFixed(3);
  velocitySpan2.textContent = (velocity / 3600).toFixed(2);
}

setInterval(() => {
  getData();
}, 1500);
