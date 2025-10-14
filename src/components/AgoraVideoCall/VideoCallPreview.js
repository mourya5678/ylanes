import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from "agora-rtc-sdk-ng";

const VideoCallPreview = ({ mutedAudio, remoteContainerRef, toggleAudio, joined, toggleVideo, localAudioTrackRef, mutedVideo, localVideoTrackRef, onClick }) => {

    // Initialize camera preview
    useEffect(() => {
        const startPreview = async () => {
            localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
            localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
            if (remoteContainerRef.current) {
                localVideoTrackRef.current.play(remoteContainerRef.current);
            }
        };
        startPreview();
        return () => {
            localAudioTrackRef.current && localAudioTrackRef.current.close();
            localVideoTrackRef.current && localVideoTrackRef.current.close();
        };
    }, []);

    return (
        <div className="p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Video Call Preview</h2>
            <div
                id="local-preview"
                ref={remoteContainerRef}
                style={{
                    width: "320px",
                    height: "240px",
                    backgroundColor: "#000",
                    margin: "0 auto",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            ></div>
            <div className="flex justify-center gap-4 mt-4 mb-2">
                <button
                    onClick={toggleAudio}
                    className="px-4 py-2 rounded shadow bg-gray-200 me-2"
                >
                    {mutedAudio ? "Unmute Audio" : "Mute Audio"}
                </button>
                <button
                    onClick={toggleVideo}
                    className="px-4 py-2 rounded shadow bg-gray-200"
                >
                    {mutedVideo ? "Enable Video" : "Disable Video"}
                </button>
            </div>

            <div className="mt-6">
                <button
                    onClick={onClick}
                    className="px-4 py-2 rounded shadow bg-gray-200"
                >
                    {joined ? "Joined" : "Join Call"}
                </button>
            </div>
        </div>
    );
};

export default VideoCallPreview;