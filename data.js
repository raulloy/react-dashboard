import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Raul Loyola',
      email: 'rloyola@hogaresunion.mx',
      password: bcrypt.hashSync('HogaresUnion23'),
      isAdmin: true,
    },
    {
      name: 'Juan Buffa',
      email: 'jpablo@hogaresunion.mx',
      password: bcrypt.hashSync('HogaresUnion23'),
      isAdmin: true,
    },
    {
      name: 'Gerardo Magaña',
      email: 'jmaganag@hogaresunion.mx',
      password: bcrypt.hashSync('HogaresUnion23'),
      isAdmin: true,
    },
    {
      name: 'Sergio Sánchez',
      email: 'ssancheza@hogaresunion.mx',
      password: bcrypt.hashSync('HogaresUnion23'),
      isAdmin: true,
    },
  ],
};

export default data;
