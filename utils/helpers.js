const { User } = require('../models');

module.exports = {
    is_owner: (ref_id, user_id) => {
        console.info(ref_id, user_id);
        if (ref_id == user_id) {
            return ''
        } else {
            return 'hidden'
        }
    }
};