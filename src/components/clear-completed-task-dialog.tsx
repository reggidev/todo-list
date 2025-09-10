import { TrashIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from './ui/button'

interface ClearCompletedTaskDialogProps {
  deleteCompletedTasks: () => Promise<void>
}

const ClearCompletedTaskDialog = ({
  deleteCompletedTasks,
}: ClearCompletedTaskDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="cursor-pointer">
          <TrashIcon />
          Limpar tarefas concluídas
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir todas as tarefas?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="cursor-pointer bg-red-500 hover:bg-red-600"
            onClick={deleteCompletedTasks}
          >
            Excluir
          </AlertDialogAction>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ClearCompletedTaskDialog
