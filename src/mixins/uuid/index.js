import uuidGenerator from "src/util/misc/uuid";

export default {
    beforeCreate() {
        this.uuid = uuidGenerator();
    },
};
