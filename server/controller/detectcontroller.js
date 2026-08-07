const { detectImage } = require("../services/roboflowService");
const service = require("../services/roboflowService");
console.log("Detect endpoint called");
console.log(service);

const detectMicroplastics = async (req, res) => {

    try {

        const result = await detectImage(req.file.path);

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    detectMicroplastics
};