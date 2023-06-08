import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Raul Loyola',
      email: 'rloyola@hogaresunion.mx',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'User',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
};

export default data;
