import 'leaflet/dist/leaflet.css'
import './Map.css'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet'
import L from 'leaflet'

const blueIcon = L.icon({
  iconUrl: markerIcon,
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
})

const redIcon = L.icon({
    iconUrl: markerIcon,
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
 
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}  style={{ height: '500px' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
            {props.places.map((value, key) => {
                return (
                      <Marker position={value} icon={redIcon} key={key} eventHandlers={{
                              click: () => {
                                props.clicked(value)
                              },
                            }} >
                          <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                          </Popup>
                      </Marker>
                    
                )
            })}
    </MapContainer>
  );
}

export default Map;