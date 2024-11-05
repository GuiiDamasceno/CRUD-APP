'use client'

import { useUserProfile } from '@/contexts/user-profile-provider'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog'
import { AddUserForm } from './add-user-form'

export function AddUserButton() {
  const { userProfile } = useUserProfile()

  return (
    <>
      {userProfile?.role === 'admin' && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar membro</Button>
          </DialogTrigger>
          <DialogContent className="text-foreground">
            <DialogTitle>Adicionar novo membro</DialogTitle>
            <AddUserForm />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
