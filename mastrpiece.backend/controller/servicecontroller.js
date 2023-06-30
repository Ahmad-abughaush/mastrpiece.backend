const Service = require("../models/servicemodel");
const errorHandler = require("../middleware/500");
const upload = require("../multer/module");
const Provider = require("../models/providermodel");
const Item = require("../models/itemmodel");


const newService = async (req, res) => {
    const file = await upload(req, res);

    if (!file) {
        return res.status(422).json({error: "please upload image"})
    }
    if (file.error) {
        return res.status(422).json({error: file.error})
    }


    const formData = req.body;


    if (!formData.description) {
        return res.status(422).json({error: "description is required"})
    }

    const newService = new Service({
        attachments: {
            filename: file.filename,
            url: file.path,
            type: file.mimetype
        },
        description: formData.description,
        provider_id: req.user._id.toString()
    });
    const service = await newService.save();
    return res.json(service);
};


const allServices = async (req, res) => {
    try {
        if (req.query.description) {
            req.query.description = {$regex: '.*' + req.query.description + '.*'}
        }

        const services = await Service.find(req.query)
        const result = await Promise.all(services.map(async (service) => {
            const provider = await Provider.findById(service.provider_id);
            return {
                provider,
                service
            }
        }))

        return res.json(result);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};


const oneServiceById = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({message: 'service not found'})
        }
        const provider = await Provider.findById(service.provider_id);
        return res.json({
            provider,
            service
        });
    } catch (e) {
        return errorHandler(e, req, res);
    }
};

const updateService = async (req, res) => {
    try {
        const id = req.params.id;
        let data = req.body;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({error: 'service not found'});
        }

        if (service.provider_id !== req.user._id.toString()) {
            return res.status(422).json({error: 'service dose not belong to user'});
        }

        const fillable = [
            'description',
        ];

        const updateData = {}

        fillable.forEach(function (filterItem) {
                if (data[filterItem]) {
                    updateData[filterItem] = data[filterItem];
                }
            }
        );

        updateData.updated_at = Date.now();

        const updatedItem = await Service.findByIdAndUpdate(id, updateData);

        return res.json(updatedItem);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};

const deleteService = async (req, res) => {
    try {
        const id = req.params.id;
        const service = await Service.findById(id);
        if (!service) {
            return res.status(404).json({error: 'service not found'});
        }
        if (service.provider_id !== req.user._id.toString()) {
            return res.status(422).json({error: 'service dose not belong to user'});
        }
        const deletedService = await Service.findByIdAndRemove(id);
        return res.status(200).json({message: 'service deleted successfully', deletedService});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to remove service'});
    }
};


module.exports = {
    allServices,
    oneServiceById,
    newService,
    updateService,
    deleteService,
}; 
