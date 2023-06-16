import { subNewsletter } from '../../helpers/api-util';

// will allow to send request to https://domainname.com/api/emails
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // check email ipput
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }



    try {
      await subNewsletter(userEmail);
    
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    // status 201 means success
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
