"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export function ClickPopup({ name, open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Clicked on {name}</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
