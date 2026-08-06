const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const detectImage = async (imagePath) => {
    try {
        const form = new FormData();

        form.append("file", fs.createReadStream(imagePath));

        const response = await axios.post(
            `https://serverless.roboflow.com/${process.env.ROBOFLOW_MODEL_ID}?api_key=${process.env.ROBOFLOW_API_KEY}`,
            form,
            {
                headers: {
                    ...form.getHeaders(),
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error(error.response?.data || error.message);
        throw error;
    }
};

module.exports = {
    detectImage,
};