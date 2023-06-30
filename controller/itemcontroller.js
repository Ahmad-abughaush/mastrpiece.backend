const Item = require("../models/itemmodel");
const errorHandler = require("../middleware/500");

const allItems = (req, res) => {
    Item.find({ is_delete: false, active: true, available: true })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const allItemsNotActive = (req, res) => {
    Item.find({ is_delete: false, active: false })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            errorHandler(error, req, res);
        });
};

const oneItemById = async (req, res) => {
    const id = req.params.id;
    const Item = await Item.find({ _id: id, is_delete: false, active: true });
    res.json(Item);
};

const AllItemByEmail = async (req, res) => {
    const { email } = req.body;

    const item = await Item.find({ email: email, is_delete: false, active: true });
    res.json(item);
};

const newItem = async (req, res) => {


    const formData = req.body;

    const newItem = new Item({
        attachments: formData.attachment,
        description: formData.description,
        address: formData.address,
        name: formData.name,
        phone: formData.phone,
        price: formData.price,
        available: true,
        active: false
    });
    const item = await newItem.save();
    res.json(item);
    console.log(formData);
};

const updateItem = async (req, res) => {
    const ItemId = req.params.id;
    const updatedItemData = req.body;

    const Item = await Item.findByIdAndUpdate(ItemId, updatedItemData, { new: true });
    const updatedItem = await Item.save();
    res.json(updatedItem);
};

const deleteItem = async (req, res) => {
    try {
        const ItemId = req.params.id;
        const updatedItemData = req.body;

        updatedItemData.is_delete = true;

        const Item = await Item.findByIdAndUpdate(ItemId, updatedItemData, {
            new: true,
        });

        const updatedItem = await Item.save();

        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Item' });
    }
};


module.exports = {
    allItems,
    allItemsNotActive,
    oneItemById,
    AllItemByEmail,
    newItem,
    updateItem,
    deleteItem,
}; 
