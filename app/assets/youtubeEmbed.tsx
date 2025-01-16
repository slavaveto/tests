
import React from 'react';

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
    return (
        <div className="video-container rounded-small border-default -border-medium px-[1px]"
             style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            ></iframe>
        </div>
    );
};

export default YouTubeEmbed;
