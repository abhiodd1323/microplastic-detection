const detectMicroplastics = async (req, res) => {

    try {

        console.log(req.file);

        return res.status(200).json({
            success: true,
            filename: req.file.filename,
            message: "Image uploaded successfully"
        });

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