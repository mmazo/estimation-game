const TYPE_PARTITION_ITEM = 'type_partition_item';

class PartitionItem {
    constructor(size) {
        this.id = size;
        this.type = TYPE_PARTITION_ITEM;
        this.size = size;
    }
}

export {PartitionItem as default, TYPE_PARTITION_ITEM};
