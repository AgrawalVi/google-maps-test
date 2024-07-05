import PolygonMap from "../components/polygon-map"

export default function Home() {
  return (
    <div className="flex flex-col space-y-10">
      <h1>Zip Code Heatmap Visualization</h1>
      <PolygonMap />
    </div>
  )
}
