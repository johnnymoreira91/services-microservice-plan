import { createUserController } from '@useCases/CreateUser'
import { deleteUserController } from '@useCases/DeleteUser'
import { editUserController } from '@useCases/EditUser'
import { listUserController } from '@useCases/ListUser'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  return listUserController.handle(req, res)
})

router.post('/', (req, res) => {
  return createUserController.handle(req, res)
})

router.put('/:id', (req, res) => {
  return editUserController.handle(req, res)
})

router.delete('/:id', (req, res) => {
  return deleteUserController.handle(req, res)
})

export default router
