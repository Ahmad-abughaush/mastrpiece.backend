const Item = require("../models/itemmodel");
const Provider = require("../models/providermodel");
const errorHandler = require("../middleware/500");
const upload = require("../multer/module");

const newItem = async (req, res) => {
    const file = await upload(req, res);

    if (!file) {
        return res.status(422).json({error: "please upload image"})
    }
    if (file.error) {
        return res.status(422).json({error: file.error})
    }

    const formData = req.body;


    if (!formData.itemName) {
        return res.status(422).json({error: "itemName is required"})
    }

    if (!formData.description) {
        return res.status(422).json({error: "description is required"})
    }

    if (!formData.price) {
        return res.status(422).json({error: "price is required"})
    }

    if (isNaN(parseInt(formData.price))) {
        return res.status(422).json({error: "price have to be number"})
    }

    if (!formData.quantity) {
        return res.status(422).json({error: "quantity is required"})
    }

    if (isNaN(parseInt(formData.quantity))) {
        return res.status(422).json({error: "quantity have to be number"})
    }

    const newItem = new Item({
        attachments: {
            filename: file.filename,
            url: file.path,
            type: file.mimetype
        },
        itemName: formData.itemName,
        description: formData.description,
        price: parseInt(formData.price),
        quantity: parseInt(formData.quantity),
        provider_id: req.user._id
    });

    const item = await newItem.save();
    res.status(201).json(item);
};

const allItems = async (req, res) => {
    try {
        if (req.query.itemName) {
            req.query.itemName = {$regex: '.*' + req.query.itemName + '.*'}
        }

        const items = await Item.find(req.query);
        const result = await Promise.all(items.map(async (item) => {
            const provider = await Provider.findById(item.provider_id);
            return {
                provider,
                item
            }
        }))
        return res.json(result);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};

const oneItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({message: 'item not found'})
        }
        const provider = await Provider.findById(item.provider_id);
        return res.json({
            provider,
            item
        });
    } catch (e) {
        return errorHandler(e, req, res);
    }
}


const updateItem = async (req, res) => {
    const id = req.params.id;
    let data = req.body;

    const item = await Item.findById(id);

    if (!item) {
        return res.status(404).json({error: 'items not found'});
    }

    if (item.provider_id !== req.user._id.toString()) {
        return res.status(422).json({error: 'items dose not belong to user'});
    }

    const fillable = [
        'itemName',
        'description',
        'price',
        'quantity',
    ];

    const updateData = {}

    fillable.forEach(function (filterItem) {
            if (data[filterItem]) {
                updateData[filterItem] = data[filterItem];
            }
        }
    );
    updateData.updated_at = Date.now();
    const updatedItem = await Item.findByIdAndUpdate(id, updateData);

    res.json(updatedItem);
};

const deleteItem = async (req, res) => {
    try {

        const id = req.params.id;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({error: 'items not found'});
        }
        if (item.provider_id !== req.user._id.toString()) {
            return res.status(422).json({error: 'items dose not belong to user'});
        }
        const deletedItem = await Item.findByIdAndRemove(id);
        return res.status(200).json({message: 'item deleted successfully', removedItem: deletedItem});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Failed to remove Item'});
    }
};


module.exports = {
    allItems,
    oneItemById,
    newItem,
    updateItem,
    deleteItem,
}; 
