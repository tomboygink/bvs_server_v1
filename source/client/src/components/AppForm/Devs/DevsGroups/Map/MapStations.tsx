import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import React from "react";
//import MarkerClusterGroup from "./MarkerClusterGroup";
import { APP_STORAGE } from "../../../../../storage/AppStorage";
import { toJS } from "mobx";
import { Icon } from "leaflet";

interface IProps {
  longitude: any;
  latitude: any;
}

//ToDo Компонент не используется - удалить?

// function MapStations(props: any) {
//   const iconSettings = {
//     mapIconUrl:
//       '<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="{fillColor}" stroke="{strokeColor}  d="{path}"/></svg>'
//   };

//   const position = [
//     props.latitude.replace(/\,/g, "."),
//     props.longitude.replace(/\,/g, ".")
//   ] as [number, number];
//   return (
//     <MapContainer
//       attributionControl={false}
//       center={position}
//       zoom={12}
//       style={{ width: "100%", height: "400px" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">ООО Севербуринструмент</a>'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {/* <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker> */}
//       <MarkerClusterGroup>
//         {APP_STORAGE.devs.getChangeSensors2().map((row: any) => (
//           <React.Fragment key={"_map" + row.id}>
//             <Marker
//               position={[
//                 row.latitude.replace(/\,/g, "."),
//                 row.longitude.replace(/\,/g, ".")
//               ]}
//             >
//               <Popup>{row.number}</Popup>
//             </Marker>
//           </React.Fragment>
//         ))}
//       </MarkerClusterGroup>
//     </MapContainer>
//   );
// }
// export default MapStations;
