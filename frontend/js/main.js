let map = L.map('map').setView([12.9716, 77.5946], 13);
let control;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19
}).addTo(map);

const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');

function setupAutocomplete(inputElement) {
  const dropdown = document.createElement('ul');
  dropdown.className = 'autocomplete-dropdown';
  inputElement.parentNode.appendChild(dropdown);

  inputElement.addEventListener('input', async () => {
    const query = inputElement.value;
    if (!query) return (dropdown.innerHTML = '');

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
    const results = await response.json();

    dropdown.innerHTML = '';
    results.slice(0, 5).forEach(place => {
      const item = document.createElement('li');
      item.textContent = place.display_name;
      item.addEventListener('click', () => {
        inputElement.value = place.display_name;
        inputElement.dataset.lat = place.lat;
        inputElement.dataset.lon = place.lon;
        dropdown.innerHTML = '';
      });
      dropdown.appendChild(item);
    });
  });
}

setupAutocomplete(fromInput);
setupAutocomplete(toInput);

function startRoute() {
  const fromLat = fromInput.dataset.lat;
  const fromLon = fromInput.dataset.lon;
  const toLat = toInput.dataset.lat;
  const toLon = toInput.dataset.lon;

  if (!fromLat || !toLat) {
    alert("Please select a valid location from the suggestions.");
    return;
  }

  if (control) map.removeControl(control);

  control = L.Routing.control({
    waypoints: [
      L.latLng(fromLat, fromLon),
      L.latLng(toLat, toLon)
    ],
    routeWhileDragging: false,
    show: false
  }).addTo(map);
}
