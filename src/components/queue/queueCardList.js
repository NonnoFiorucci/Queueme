import React from 'react';

import SimpleQueue from './queueCard';

const QueueCardList = ({
    queues,
    currentUserEnqueue,
    onAddUser,
    onRemoveUser,
}) => (
    queues.map(queue => (
        <SimpleQueue
            key={queue.idQueue}
            queue={queue}
            currentUserEnqueue = {currentUserEnqueue}
            onAddUser={onAddUser}
            onRemoveUser={onRemoveUser}
        />
    ))

);

export default QueueCardList;
