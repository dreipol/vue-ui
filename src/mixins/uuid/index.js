import uuidGenerator from '../../util/misc/uuid';

export default {
    beforeCreate() {
        this.uuid = uuidGenerator();
    },
};
