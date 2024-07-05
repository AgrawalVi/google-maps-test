// "use client"

// import { GoogleMap, HeatmapLayer, LoadScript } from "@react-google-maps/api"
// import React, { useEffect, useState } from "react"

// const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

// const containerStyle = {
//   width: "100%",
//   height: "600px",
// }

// const center = {
//   lat: 43,
//   lng: -88.3,
// }

// // Dummy data for example purposes
// const MapComponent = () => {
//   const [heatmapData, setHeatmapData] = useState([])
//   const [radius, setRadius] = useState(20)
//   const [opacity, setOpacity] = useState(0.9)

//   useEffect(() => {
//     if (window.google && window.google.maps) {
//       console.log("window.google")
//       setHeatmapData([
//         {
//           location: new window.google.maps.LatLng(-88.2729, 43.0788),
//           weight: 5,
//         },
//         {
//           location: new window.google.maps.LatLng(-88.1469, 43.0668),
//           weight: 5,
//         },
//       ])
//     }
//   }, [])

//   return (
//     <div>
//       <LoadScript
//         googleMapsApiKey={apiKey}
//         libraries={["visualization"]} // Ensure the visualization library is loaded
//       >
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//           {heatmapData.length > 0 && (
//             <HeatmapLayer
//               data={heatmapData.map((item) => ({
//                 location: item.location,
//                 weight: item.weight,
//               }))}
//               radius={radius}
//               opacity={opacity}
//             />
//           )}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   )
// }

// export default React.memo(MapComponent)
