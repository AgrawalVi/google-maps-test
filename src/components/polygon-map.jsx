"use client"
import React, { useEffect } from "react"
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api"

import { ClickPopup } from "./click-popup"
import { useState } from "react"

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

const containerStyle = {
  width: "800px",
  height: "800px",
}

const mapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
]

const PolygonMap = ({ paths, center }) => {
  const [open, setOpen] = useState(false)
  const [pathName, setPathName] = useState([])
  const [zipCode, setZipCode] = useState([])

  const handleClick = (name, zipCode) => {
    setPathName(name)
    setZipCode(zipCode)
    console.log("clicked on polygon", name)
    setOpen(true)
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={7}
        options={{ styles: mapStyle }}
      >
        {paths.map((path, index) => (
          <Polygon
            key={index}
            paths={path.path}
            options={path.style}
            onClick={() => handleClick(path.name, path.postal_code)}
          />
        ))}
        <ClickPopup
          name={pathName}
          zipCode={zipCode}
          open={open}
          setOpen={setOpen}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default PolygonMap
