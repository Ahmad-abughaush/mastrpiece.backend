const Service = require("../models/servicemodel");
const errorHandler = require("../middleware/500");

const allServices = (req, res) => {
    Service.find({ is_delete: false, active: true, available: true })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const allServicesNotActive = (req, res) => {
    Service.find({ is_delete: false, active: false })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const oneServiceById = async (req, res) => {
    const id = req.params.id;
    const Service = await Service.find({ _id: id, is_delete: false, active: true });
    res.json(Service);
};

const AllServiceByEmail = async (req, res) => {
    const { email } = req.body;

    const Service = await Service.find({ email: email, is_delete: false, active: true });
    res.json(Service);
};

const newService = async (req, res) => {


    const formData = req.body;

    const newService = new Service({
        attachments: formData.attachment,
        description: formData.description,
        address: formData.address,
        name: formData.name,
        phone: formData.phone,
        price: formData.price,
        available: true,
        active: false
    });
    const Service = await newService.save();
    res.json(Service);
    console.log(formData);
};

const updateService = async (req, res) => {
    const ServiceId = req.params.id;
    const updatedServiceData = req.body;

    const Service = await Service.findByIdAndUpdate(ServiceId, updatedServiceData, { new: true });
    const updatedService = await Service.save();
    res.json(updatedService);
};

const deleteService = async (req, res) => {
    try {
        const ServiceId = req.params.id;
        const updatedServiceData = req.body;

        updatedServiceData.is_delete = true;

        const Service = await Service.findByIdAndUpdate(ServiceId, updatedServiceData, {
            new: true,
        });

        const updatedService = await Service.save();

        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Service' });
    }
};


module.exports = {
    allServices,
    allServicesNotActive,
    oneServiceById,
    AllServiceByEmail,
    newService,
    updateService,
    deleteService,
}; 
