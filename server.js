import express from 'express';
import config from './config.js';
import { getAccountInsights } from './api.js';
import path from 'path';

const app = express();
const accessToken = config.FB_API_TOKEN;

const accounts = [
  {
    name: 'HU LOMAS DE LA PLATA',
    id: 'act_930432200705578',
  },
  {
    name: 'TRES LAGOS LIFESTYLE',
    id: 'act_177341126950476',
  },
  {
    name: 'HU AQUASOL',
    id: 'act_562909907769407',
  },
  {
    name: 'VILLAS DEL CAMPO LIFESTYLE',
    id: 'act_225593191779506',
  },
  {
    name: 'SANTA FE LIFESTYLE',
    id: 'act_2480551222261700',
  },
  {
    name: 'ADARA LIFESTYLE',
    id: 'act_159175185508724',
  },
  {
    name: 'CENTRAL PARK',
    id: 'act_265576294404103',
  },
  {
    name: 'HU PALMAS TURQUESA',
    id: 'act_1087088964961886',
  },
  {
    name: 'MERIDEN',
    id: 'act_2499601070366586',
  },
  {
    name: 'HU LAS TROJES',
    id: 'act_1256683497854234',
  },
  {
    name: 'BALI LIFESTYLE',
    id: 'act_2190256254410586',
  },
  {
    name: 'HU PALMAS YUCATÁN',
    id: 'act_195882471564062',
  },
  {
    name: 'COSMOPOL LIFESTYLE',
    id: 'act_268790700756542',
  },
  // {
  //   name: 'HU PASEOS DE LA LAGUNA',
  //   id: 'act_3642982019076030',
  // },
  {
    name: 'SUMMIT PARK LIFESTYLE',
    id: 'act_2573491999594759',
  },
  {
    name: 'HU CIUDAD NATURA',
    id: 'act_176055110376237',
  },
  {
    name: 'HU CASCOS AZULES',
    id: 'act_175324893748729',
  },
  {
    name: 'HU MARINA TURQUESA',
    id: 'act_3671037146254618',
  },
  {
    name: 'HU JARDINES DE LA LAGUNA',
    id: 'act_1116629645809089',
  },
  {
    name: 'HU PASEOS DE LOS VIRREYES',
    id: 'act_3064079737176705',
  },
  // {
  //   name: 'HU BDI',
  //   id: 'act_793700688385551',
  // },
];

app.get('/api/account-insights', (req, res) => {
  const AccountInsights = accounts.map(async (account) => {
    const { since, until } = req.query;

    const data = await getAccountInsights(
      accessToken,
      account.id,
      since,
      until
    );

    return data.data[0];
  });

  Promise.all(AccountInsights)
    .then((results) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Something went wrong');
    });
});

// Body Parser Middleware
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});
