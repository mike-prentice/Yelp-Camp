
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3dpbGxlciIsImEiOiJja2xmZzNlc3owNm10MnhzNzc3dHFzNjVpIn0.O5NqCD-TSmisxZFcL-6m0A";
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  map.addControl(new mapboxgl.NavigationControl());

  
  new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(
      `<h3?${campground.title}</h3><p>${campground.location}</P>`
    )
  )
  .addTo(map);