const socket = io();
if(navigator.geolocation){
    navigator.geolocation.watchPosition(
        (position)=>{
            const {latitude, longitude} = position.coords
            socket.emit('location', {latitude,longitude});
        },(error)=>{
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    )
}
const map = L.map('map').setView([0,0],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution: "Rishikesh Singh"}).addTo(map);

const marker = {};  

socket.on('receiveLocation', (data)=>{
    const {id,latitude,longitude} = data;
    console.log(latitude,latitude);
     map.setView([latitude,longitude],20);
     if(marker[id]){
        marker[id].setLatLng([latitude,longitude]);
    }else{
        marker[id] = L.marker([latitude,longitude]).addTo(map)
    }

})

