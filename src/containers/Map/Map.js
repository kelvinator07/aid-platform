import 'leaflet/dist/leaflet.css'
import './Map.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIconRed from '../../assets/images/pin.png'

import { MapContainer, TileLayer, Marker } from 'react-leaflet'
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


const handleClick = (value) => {
  // const { lat, lng } = event.latlng
  alert(`marker clicked ${value}`)
}

  
const Map = (props) => {
  // console.log("Props check ", props.requests);
  // [51.505, -0.09]
  return (
    <MapContainer center={[6.557, 3.349]} zoom={13} scrollWheelZoom={false} style={{ height: '500px' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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