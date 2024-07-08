"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"

export function ClickPopup({ name, zipCode, open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {zipCode === "60660" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${name}, IL`}</DialogTitle>
            <DialogDescription>{zipCode}</DialogDescription>
          </DialogHeader>
          <div>378 Searches This week</div>
          <div>Top Categories:</div>
          <ol className="list-decimal px-8">
            <li>Health Insurance - 103</li>
            <li>Student Loan Counseling - 84</li>
            <li>Mental Health Services - 53</li>
            <li>Rental Resources - 28</li>
            <li>Heating/Utility Costs - 24</li>
          </ol>
        </DialogContent>
      )}
      {zipCode === "60450" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${name}, IL`}</DialogTitle>
            <DialogDescription>{zipCode}</DialogDescription>
          </DialogHeader>
          <div>129 Searches This week</div>
          <div>Top Categories:</div>
          <ol className="list-decimal px-8">
            <li>Home Repair - 32</li>
            <li>Food Savings - 23</li>
            <li>Rental Resources - 17</li>
            <li>Healthcare Savings - 11</li>
            <li>Heating/Utility Costs - 8</li>
          </ol>
        </DialogContent>
      )}
      {zipCode === "53072" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${name}, WI`}</DialogTitle>
            <DialogDescription>{zipCode}</DialogDescription>
          </DialogHeader>
          <div>No searches have been made here</div>
        </DialogContent>
      )}
      {zipCode === "53058" && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`${name}, WI`}</DialogTitle>
            <DialogDescription>{zipCode}</DialogDescription>
          </DialogHeader>
          <div>67 Searches This week</div>
          <div>Top Categories:</div>
          <ol className="list-decimal px-8">
            <li>Food Savings - 17</li>
            <li>Senior Citizen Services - 13</li>
            <li>Student Loan Counseling - 11</li>
            <li>Healthcare Savings - 9</li>
            <li>Rental Resources - 5</li>
          </ol>
        </DialogContent>
      )}
      {zipCode !== "60660" &&
        zipCode !== "60450" &&
        zipCode !== "53072" &&
        zipCode !== "53058" && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{`${name}, ${
                zipCode > 60000 ? "IL" : "WI"
              }`}</DialogTitle>
              <DialogDescription>{zipCode}</DialogDescription>
            </DialogHeader>
            <div>No information available for this zip code</div>
          </DialogContent>
        )}
    </Dialog>
  )
}
