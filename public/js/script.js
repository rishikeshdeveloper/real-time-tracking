const socket = io();
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      socket.emit("send-location", { latitude, longitude });
    },
    (error) => {
      console.log(error);
    },
    {
      enableHighAccuracy: true,
      timeout: 200000,
      maximumAge: 0,
    }
  );
}
const map = L.map("map").setView([28.6611904, 77.0091364], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "Rishikesh Singh",
}).addTo(map);

const marker = {};

map.setView([0, 0], 20);

socket.on("receiveLocation", (data) => {
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 16);
  if (marker[id]) {
    marker[id] = L.marker([latitude, longitude]);
  } else {
    marker[id] = L.marker([latitude, longitude]).addTo(map);
  }
});
