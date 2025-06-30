import axios from "axios";

export default {
  sendMessage: async (message, contact, trx, org, campaign, contactMessage) => {
    const {
      TEXTING_AUTH_TOKEN,
      TEXTING_SERVICESID // sender phone number
    } = process.env;

    const payload = {
      from: TEXTING_SERVICESID,
      to: contact.cell,
      text: message
    };

    const telnyxApi = axios.create({
      baseURL: "https://api.telnyx.com/v2",
      headers: {
        Authorization: `Bearer ${TEXTING_AUTH_TOKEN}`
      }
    });

    try {
      const result = await telnyxApi.post("/messages", payload);
      return {
        result,
        service: "telnyx"
      };
    } catch (err) {
      console.error("Telnyx sendMessage error:", err.response?.data || err);
      throw new Error("Failed to send message via Telnyx");
    }
  }
};
