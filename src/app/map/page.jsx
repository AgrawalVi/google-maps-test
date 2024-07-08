import wisconsin_data from "@/data/parsed-data-by-state/wisconsin_data.json"
import illinois_data from "@/data/parsed-data-by-state/illinois_data.json"
import PolygonMap from "@/components/polygon-map"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MapPage({ searchParams }) {
  const state = searchParams.state
  console.log(state)
  if (
    state.toUpperCase().trim() !== "WI" &&
    state.toUpperCase().trim() !== "IL"
  ) {
    return <div className="w-full flex justify-center p-10">No state data</div>
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-10">
      {state === "WI" && <div className="text-5xl">Wisconsin</div>}
      {state === "IL" && <div className="text-5xl">Illinois</div>}
      <Link href="/">
        <Button variant="link" className="absolute top-5 left-5">
          go back
        </Button>
      </Link>
      <PolygonMap
        paths={state === "WI" ? wisconsin_data : illinois_data}
        center={
          state === "WI"
            ? { lat: 43.7844, lng: -88.7879 }
            : { lat: 40.6331, lng: -89.3985 }
        }
      />
    </div>
  )
}
