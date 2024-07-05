// function to transform GeoJSON MultiPolygon coordinates into Google Maps compatible paths
export const extractPolygons = (geoJSON, style, name) => {
  const features = geoJSON.features
  const styledPaths = []

  features.forEach((feature) => {
    const paths = []
    if (feature.geometry.type === "MultiPolygon") {
      feature.geometry.coordinates.forEach((polygon) => {
        const path = []
        polygon[0].forEach((coordinatePair) => {
          path.push({ lat: coordinatePair[1], lng: coordinatePair[0] })
        })
        paths.push(path)
      })
    } else if (feature.geometry.type === "Polygon") {
      feature.geometry.coordinates.forEach((polygon) => {
        const path = []
        polygon.forEach((coordinatePair) => {
          path.push({ lat: coordinatePair[1], lng: coordinatePair[0] })
        })
        paths.push(path)
      })
    }
    paths.forEach((path) => {
      styledPaths.push({ path, style, name })
    })
  })

  return styledPaths
}

export const extractCenterPoint = (geoJSON, name) => {
  const features = geoJSON.features

  let point = features[0].geometry.coordinates // point is an array of coordinates
  console.log("point", point)

  return { lat: point[1], lng: point[0] }
}
