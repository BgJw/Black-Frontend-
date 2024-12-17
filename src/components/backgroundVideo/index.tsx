'use client'
import { useEffect, useRef, useState } from "react";

const BackgroundVideo = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const stopTime = 2;

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.play();

            const timer = setTimeout(() => {
                video.pause();
                video.style.zIndex = '1';
                video.style.filter = 'blur(10px)'
            }, stopTime * 1000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, []);

    return (
        <video
            ref={videoRef}
            muted
            style={{
                zIndex: 15,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transition: "filter .5s ease-in-out",
            }}
        >
            {/* <source src="/video/video7.mp4" type="video/mp4" /> */}
            Your browser does not support the video tag.
        </video>
    );
};

export default BackgroundVideo;