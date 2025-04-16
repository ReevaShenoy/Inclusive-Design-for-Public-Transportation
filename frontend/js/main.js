let map;
let routeControl;

function initMap() {
  console.log("Initializing map...");
  map = L.map("map").setView([12.9716, 77.5946], 13); // Bangalore default

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  console.log("Map initialized.");
}

function startRoute() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  // Validate inputs
  if (!from || !to) {
    alert("Please enter both start and end points.");
    return;
  }

  console.log('From:', from, 'To:', to); // Log the user inputs

  // Show loading indicator
  document.getElementById("loadingIndicator").style.display = 'block';

  // Use Nominatim API for address lookup
  Promise.all([
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${from}`),
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${to}`),
  ])
    .then(async ([res1, res2]) => {
      const fromData = await res1.json();
      const toData = await res2.json();
      console.log("From data:", fromData);
      console.log("To data:", toData);

      // Check if locations were found
      if (!fromData.length || !toData.length) {
        alert("Could not find location(s). Try being more specific.");
        document.getElementById("loadingIndicator").style.display = 'none';
        return;
      }

      const fromCoords = [fromData[0].lat, fromData[0].lon];
      const toCoords = [toData[0].lat, toData[0].lon];

      console.log('From Coordinates:', fromCoords, 'To Coordinates:', toCoords); // Log the coordinates

      // Plot the route on the map
      routeControl = L.Routing.control({
        waypoints: [
          L.latLng(fromCoords[0], fromCoords[1]),
          L.latLng(toCoords[0], toCoords[1]),
        ],
        routeWhileDragging: false,
        show: false,
        createMarker: function () { return null; }, // No draggable markers
      }).addTo(map);

      map.setView(fromCoords, 13);  // Center the map on the start point

      // Wait until the route is available
      routeControl.on('routesfound', function(event) {
        console.log("Routes found:", event.routes);
        if (event.routes.length > 0) {
          const directions = event.routes[0].instructions;
          console.log('Directions:', directions);
          if (directions && directions.length > 0) {
            displayDirections(directions);
          } else {
            console.error("No directions returned in the route.");
            alert("No directions found. Please try again.");
          }
        } else {
          console.error("No routes found.");
          alert("No routes found. Please try again.");
        }

        // Hide loading indicator
        document.getElementById("loadingIndicator").style.display = 'none';
      });

    })
    .catch(err => {
      alert("Error getting directions. Try again.");
      console.error(err);
      document.getElementById("loadingIndicator").style.display = 'none';
    });
}

function displayDirections(instructions) {
  const stepsList = document.getElementById("direction-steps");
  stepsList.innerHTML = ''; // Clear previous directions

  instructions.forEach(instruction => {
    const li = document.createElement("li");
    li.classList.add('direction-step');
    li.innerHTML = instruction;
    stepsList.appendChild(li);
  });
}
window.onload = initMap;


