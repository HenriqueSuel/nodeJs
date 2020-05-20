import { Router } from 'express';
const usersRouter = Router();

const listUser = [];
const listAddress = [];
let id = 0;

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  id = id + 1;
  listUser.push({ id, name, email, password });
  response.json({ name, email, password, id })
});

usersRouter.get('/', async (request, response) => {
  response.json(listUser);
});


usersRouter.post('/address/:idUser', async (request, response) => {
  const {
    street,
    neighborhood,
    zip_code,
    number,
    city,
    state,
  } = request.body

  const { idUser } = request.params
  const user = listUser.find(user => user.id == idUser);

  if (user) {
    listAddress.push({
      street,
      neighborhood,
      zip_code,
      number,
      city,
      state,
      idUser
    })
    response.json({
      street,
      neighborhood,
      zip_code,
      number,
      city,
      state,
      idUser
    })
  } else {
    response.status(400).json({
      status: 'error',
      message: 'Usuario nao encontrado, verifique email e senha',
    });
  }
})

usersRouter.get('/address/:idUser', async (request, response) => {
  const { idUser } = request.params
  const address = listAddress.filter(address => address.idUser == idUser);
  if (address) {
    response.json(address);
  } else {
    response.status(400).json({
      status: 'error',
      message: 'Id de user nao encontrado',
    });
  }
})


export default usersRouter;
