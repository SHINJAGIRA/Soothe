'use client';
import { useParams } from 'next/navigation';

const ChatRoom = () => {
    const params = useParams();
    const roomId = params.slug;

    return (
        <div>
            Room open {roomId}
        </div>
    );
};

export default ChatRoom;