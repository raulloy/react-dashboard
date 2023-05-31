import express from 'express';
import config from './config.js';
import {
  getAccountInsights,
  getAdSetsInsights,
  getAllAdSetsInsights,
  getAllAdsInsights,
  getCampaignInsights,
} from './api.js';
import path from 'path';
import Contact from './models/contactModel.js';
import mongoose from 'mongoose';
// import { campaigns } from './google-api.js';

mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
const accessToken = config.FB_API_TOKEN;

const accounts = [
  {
    name: 'HU LOMAS DE LA PLATA',
    id: 'act_930432200705578',
  },
  {
    name: 'HU AQUASOL',
    id: 'act_562909907769407',
  },
  {
    name: 'HU PALMAS TURQUESA',
    id: 'act_1087088964961886',
  },
  {
    name: 'HU LAS TROJES',
    id: 'act_1256683497854234',
  },
  {
    name: 'HU PALMAS YUCATÁN',
    id: 'act_195882471564062',
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
  {
    name: 'HU BDI',
    id: 'act_793700688385551',
  },
  {
    name: 'TRES LAGOS LIFESTYLE',
    id: 'act_177341126950476',
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
    name: 'BALI LIFESTYLE',
    id: 'act_2190256254410586',
  },
  {
    name: 'COSMOPOL LIFESTYLE',
    id: 'act_268790700756542',
  },
  {
    name: 'SUMMIT PARK LIFESTYLE',
    id: 'act_2573491999594759',
  },
  {
    name: 'BONZA LIFESTYLE',
    id: 'act_220463320629102',
  },
  {
    name: 'BASALTO LIFESTYLE',
    id: 'act_258816553273090',
  },
  {
    name: 'ABETO LIFESTYLE',
    id: 'act_611616064341722',
  },
  {
    name: 'MERIDEN',
    id: 'act_2499601070366586',
  },
  {
    name: 'CENTRAL PARK',
    id: 'act_265576294404103',
  },
];

app.get('/', (req, res) => {
  res.send([{ message: 'Hello World!' }]);
});

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

app.get('/api/campaign-insights/:id', async (req, res) => {
  const { since, until } = req.query;
  const CampaignInsightsObj = await getCampaignInsights(
    accessToken,
    req.params.id,
    since,
    until
  );

  res.send(CampaignInsightsObj);
});

app.get('/api/adsets-insights/:id', async (req, res) => {
  const { since, until } = req.query;
  const AccountInsights = await getAllAdSetsInsights(
    accessToken,
    req.params.id,
    since,
    until
  );

  res.send(AccountInsights.campaigns);
});

app.get('/api/ads-insights/:id', async (req, res) => {
  const { since, until } = req.query;
  const AccountInsights = await getAllAdsInsights(
    accessToken,
    req.params.id,
    since,
    until
  );

  res.send(AccountInsights.campaigns);
});

app.get('/api/contacts-by-time-range', async (req, res) => {
  const { since, until } = req.query;

  try {
    const contacts = await Contact.find({
      'properties.hubspot_owner_assigneddate': {
        $gte: new Date(since),
        $lte: new Date(until),
      },
    });

    res.send(contacts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get('/api/google-campaigns', async (req, res) => {
//   res.send(campaigns);
// });

// Body Parser Middleware
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(config.PORT, () => {
  console.log(`Server is listening on port ${config.PORT}`);
});

// [
//   {
//     properties: {
//       canal_de_captacion: 'DIGIN',
//       createdate: '2023-02-01T19:27:02.000Z',
//       facilitador_compra_contacto: '254740026',
//       sub_canal_de_captacion: 'FACE',
//     },
//     _id: '6425ab393a4a7b046f368045',
//     createdAt: '2023-02-01T19:27:02.000Z',
//   },
//   {
//     properties: {
//       canal_de_captacion: 'DIGIN',
//       createdate: '2023-02-01T19:17:18.000Z',
//       facilitador_compra_contacto: '256237624',
//       sub_canal_de_captacion: 'FACE',
//     },
//     _id: '6425ab393a4a7b046f368057',
//     createdAt: '2023-02-01T19:17:18.000Z',
//   },
//   {
//     properties: {
//       canal_de_captacion: 'DIGIN',
//       createdate: '2023-02-01T18:48:06.000Z',
//       facilitador_compra_contacto: '254740024',
//       sub_canal_de_captacion: 'FACE',
//     },
//     _id: '6425ab393a4a7b046f3680b1',
//     createdAt: '2023-02-01T18:48:06.000Z',
//   },
//   {
//     properties: {
//       canal_de_captacion: 'DIGIN',
//       createdate: '2023-02-01T18:39:13.000Z',
//       facilitador_compra_contacto: '144053855',
//       sub_canal_de_captacion: 'FACE',
//     },
//     _id: '6425ab393a4a7b046f3680db',
//     createdAt: '2023-02-01T18:39:13.000Z',
//   },
// ];
