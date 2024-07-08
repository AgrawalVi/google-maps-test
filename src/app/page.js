import StateDropdownPicker from "@/components/state-dropdown-picker"

export default function Home() {
  return (
    <div className="flex flex-col space-y-1 justify-center w-full items-center p-10">
      <h1>Please select a state whose data you would like to visualize</h1>
      <StateDropdownPicker />
    </div>
  )
}
