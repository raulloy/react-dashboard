import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getContacts } from '../api.js';
import Contact from '../models/contactModel.js';

const contactRouter = express.Router();

contactRouter.get(
  '/create-contacts',
  expressAsyncHandler(async (req, res) => {
    const paginationLimit = (startValue, numElements) => {
      return Array(numElements)
        .fill(0)
        .map((_, index) => startValue + index * 100);
    };

    for (const value of paginationLimit(0, 100)) {
      const contacts = await getContacts(100, value);

      for (const contact of contacts) {
        const existingContact = await Contact.findOne({ id: contact.id });
        if (existingContact) {
          console.log(
            `Contact with id ${contact.id} already exists. Skipping...`
          );
          continue;
        }

        const newContact = new Contact(contact);
        try {
          await newContact.save();
        } catch (error) {
          console.error(`Error saving contact: ${error}`);
        }
      }
    }

    console.log("We're done!");
  })
);

export default contactRouter;
