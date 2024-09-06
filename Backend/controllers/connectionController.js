const Connection = require('../models/connectionModel.js')

exports.sendConnectionReques = async (req, res) => {
    try {
        const { requesterId, recipientId } = req.body
        let connection = await Connection.findOne({ requesterId, recipientId })
        if (!connection) {
            connection = new Connection({ requesterId, recipientId });
            await connection.save();
        }
        res.status(200).json(connection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.acceptConnectionRequest = async (req, res) => {
    try {
        const { connectionId } = req.body
        const accepted = await Connection.findOneAndUpdate(connectionId, { status: 'accepted' }, { new: true })
        res.status(200).json(accepted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.acceptConnectionRequest = async (req, res) => {
    try {
        const { connectionId } = req.body
        const accepted = await Connection.findOneAndUpdate(connectionId, { status: 'accepted' }, { new: true })
        res.status(200).json(accepted);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.rejectConnectionRequest = async (req, res) => {
    try {
        const { connectionId } = req.body;

        const rejected = await Connection.findByIdAndUpdate(
            connectionId,
            { status: 'rejected' },
            { new: true }
        );

        res.status(200).json(rejected);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getConnections = async (req, res) => {
    try {
        const userId = req.params.id;

        const connections = await Connection.find({
            $or: [
                { requesterId: userId },
                { recipientId: userId }
            ]
        }).populate('requesterId recipientId');

        res.status(200).json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

