"use client"
import React from "react"
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api"
import pewaukee from "../data/pewaukee.json"
import brookfield from "../data/brookfield.json"
import { extractPolygons } from "@/lib/map-util"
import { ClickPopup } from "./click-popup"
import { useState } from "react"

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const styles = {
  pewaukee: {
    fillColor: "red",
    fillOpacity: 0.6,
    strokeColor: "red",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  },
  brookfield: {
    fillColor: "orange",
    fillOpacity: 0.8,
    strokeColor: "orange",
    strokeOpacity: 0.8,
    strokeWeight: 2,
  },
}

const containerStyle = {
  width: "100%",
  height: "600px",
}

const center = {
  lat: 43,
  lng: -88.3,
}

// Dummy data for example purposes
const pewaukeePaths = extractPolygons(pewaukee, styles.pewaukee, "pewaukee")
const brookfieldPaths = extractPolygons(
  brookfield,
  styles.brookfield,
  "brookfield"
)
console.log("brookfieldPaths", brookfieldPaths)

const paths = [...pewaukeePaths, ...brookfieldPaths]

const PolygonMap = () => {
  const [open, setOpen] = useState(false)
  const [pathName, setPathName] = useState([])

  const handleClick = (name) => {
    setPathName(name)
    console.log("clicked on polygon", name)
    setOpen(true)
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {paths.map((path, index) => (
          <Polygon
            key={index}
            paths={path.path}
            options={path.style}
            onClick={() => handleClick(path.name)}
          />
        ))}
        <ClickPopup name={pathName} open={open} setOpen={setOpen} />
      </GoogleMap>
    </LoadScript>
  )
}

export default PolygonMap
