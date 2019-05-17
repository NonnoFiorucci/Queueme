import React from 'react';

import queueCard from '.queueCard';

const QueueCardList = ({
    queues,
    onAddUser,
    onRemoveUser,
}) => (
    queues.map(queue => (
        <queueCard
            key={queue.idQueue}
            queue={queue}
            onAddUser={onAddUser}
            onRemoveUser={onRemoveUser}
        />
    ))

);

export default QueueCardList;
