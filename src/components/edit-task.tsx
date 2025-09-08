import { SquarePenIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import { Input } from './ui/input'

const EditTask = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <SquarePenIcon className="h-5 w-5 cursor-pointer hover:stroke-zinc-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2">
          <Input placeholder="Editar tarefa" />
          <Button className="cursor-pointer">Editar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
