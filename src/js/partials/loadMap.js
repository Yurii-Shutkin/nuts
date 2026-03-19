function loadGoogleMaps() {
  return new Promise((resolve) => {
    window.initMap = () => resolve();

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBpqYsjcBEbun3cyh83r3TMiP6UBMXpabY&callback=initMap`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
  });
}

async function start() {
  await loadGoogleMaps();

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 46.423948, lng: 30.724762 },
    zoom: 16,
    styles: [
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        { visibility: "on" },
        { color: "#C6E2FF" }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        { color: "#C5E3BF" }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
        { color: "#D1D1B8" }
      ]
    }
  ]
  });

  new google.maps.Marker({
  position: { lat: 46.423948, lng: 30.724762 },
  map: map,
  icon: {
    url: "/img/icons/map-marker.svg",
  }
});

window.addEventListener('resize', () => {
    const center = { lat: 46.423948, lng: 30.724762 };
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
});
}

start();

