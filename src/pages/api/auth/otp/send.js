const handler = async (req, res) => {
  try {
    if (!req?.body?.mobile || req?.body?.mobile?.length !== 10) {
      throw new Error("Invalid Mobile Number");
    }

    const accountSid = process.env.NEXT_PUBLIC_TWILIO_SID;
    const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);


    const response = await client.verify.v2
      .services(process.env.NEXT_PUBLIC_TWILIO_SERVICE)
      .verifications.create({ to: `+91${req.body?.mobile}`, channel: "sms" });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default handler;
