import 'leaflet/dist/leaflet.css'
import './Map.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconRed from '../../assets/images/pin.png'

import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet'
import L from 'leaflet'

const blueIcon = L.icon({
  iconUrl: markerIcon,
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
})

const redIcon = L.icon({
    iconUrl: 'https://img.icons8.com/color/48/000000/marker.png',
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
  })

  const circle = (location) => L.circle(location, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  });

  const fillGreenOptions = { color: '#008000', fillColor: 'green', fillOpacity: 0.5 }

const handleClick = (value) => {
  // const { lat, lng } = event.latlng
  alert(`marker clicked ${value}`)
}

  
const Map = (props) => {
  console.log("Props location ", props.location);
  // [6.432, 3.525]
  return (
    <MapContainer center={[6.432, 3.525]} zoom={13} scrollWheelZoom={false} style={{ height: '500px' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={[6.432, 3.525]} pathOptions={fillGreenOptions} radius={200} >
        <Popup>
          You Are Here
        </Popup>
      </Circle>
            {props.requests.map((value, key) => {
                return (
                    <Marker position={value.latlng} icon={value.request_type == "one_time" ? redIcon : blueIcon} key={key} eventHandlers={{
                            click: () => {
                              props.clicked(value)
                            },
                          }} >
                    </Marker>
                )
            })}
    </MapContainer>
  );
}

export default Map;