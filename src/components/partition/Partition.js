import React from 'react';
import './Partition.css';

/**
 *
 * @param partition {id, type, size}
 * @returns {*}
 * @constructor
 */
function Partition({partition}) {
    return(
        <div className={'partition'}>
            <div className={'partition-size'}>{partition.size}</div>
        </div>);
}

export default Partition;
