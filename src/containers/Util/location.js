const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition, showError, options);
    } else { 
        alert("Geolocation is not supported by this browser.");
    }
    return loca;
}
  
const updatePosition = position => {

    loca[0] = parseFloat(position.coords.latitude.toFixed(3))
    loca[1] = parseFloat(position.coords.longitude.toFixed(3))
}

// Displays the different error messages
const showError = error => {
    switch (error.code) {
    case error.PERMISSION_DENIED:
        alert("You denied the request for your location.");
        break;
    case error.POSITION_UNAVAILABLE:
        alert("Your Location information is unavailable.");
        break;
    case error.TIMEOUT:
        alert("Your request timed out. Please try again");
        break;
    case error.UNKNOWN_ERROR:
        alert("An unknown error occurred please try again after some time.");
        break;
    }
}


//Makes sure location accuracy is high
const options = {
    enableHighAccuracy: true
}

const loca = [];

export default getLocation;