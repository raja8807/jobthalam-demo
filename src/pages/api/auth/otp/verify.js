const handler = async (req, res) => {
  try {
    if (!req?.body?.otp) {
      throw new Error("Provide valid otp");
    }

    const accountSid = process.env.NEXT_PUBLIC_TWILIO_SID;
    const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    const response = await client.verify.v2
      .services(process.env.NEXT_PUBLIC_TWILIO_SERVICE)
      .verificationChecks.create({ to: "+917904236030", code: req?.body.otp });
    //   .then((verification_check) => console.log(verification_check.status));

    return res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      error: err.message,
    });
  }
};

export default handler;
