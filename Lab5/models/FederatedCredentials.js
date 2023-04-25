const mongoose = require('mongoose');
const { Schema } = mongoose;

const federatedCredentialsSchema = new mongoose.Schema({
    provider: {
        type: String
    },
    subject: {
        type: String
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('FederatedCredentials', federatedCredentialsSchema);