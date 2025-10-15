// import React, { useEffect, useRef, useState } from 'react';
// import AgoraRTC from "agora-rtc-sdk-ng";

// const VideoCallPreview = ({ mutedAudio, messageApi, remoteContainerRef, toggleAudio, joined, toggleVideo, localAudioTrackRef, mutedVideo, localVideoTrackRef, onClick }) => {

//     useEffect(() => {
//         const startPreview = async () => {
//             try {
//                 const devices = await AgoraRTC.getDevices();
//                 const hasAudio = devices.some(device => device.kind === 'audioinput');
//                 const hasVideo = devices.some(device => device.kind === 'videoinput');
//                 if (!hasAudio && !hasVideo) {
//                     messageApi.error("No audio or video devices found. Please connect a microphone or camera.");
//                     return;
//                 } else if (!hasAudio) {
//                     messageApi.error("No microphone found. Please connect one to enable audio.");
//                 } else if (!hasVideo) {
//                     messageApi.error("No camera found. Please connect one to enable video.");
//                 };
//                 if (hasAudio) {
//                     localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
//                 };
//                 if (hasVideo) {
//                     localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
//                     if (remoteContainerRef.current) {
//                         localVideoTrackRef.current.play(remoteContainerRef.current);
//                     };
//                 };
//             } catch (error) {
//                 console.error("Error starting preview:", error);
//                 alert("Unable to access audio/video devices. Please check your browser permissions.");
//             };
//         };
//         startPreview();
//         return () => {
//             if (localAudioTrackRef.current) {
//                 localAudioTrackRef.current.close();
//             }
//             if (localVideoTrackRef.current) {
//                 localVideoTrackRef.current.close();
//             }
//         };
//     }, []);

//     return (
//         <div className="p-4 text-center">
//             <h2 className="text-xl font-semibold mb-4">Video Call Preview</h2>
//             <div
//                 id="local-preview"
//                 ref={remoteContainerRef}
//                 style={{
//                     width: "320px",
//                     height: "240px",
//                     backgroundColor: "#000",
//                     margin: "0 auto",
//                     borderRadius: "8px",
//                     overflow: "hidden",
//                 }}
//             ></div>
//             <div className="flex justify-center gap-4 mt-4 mb-2">
//                 <button
//                     onClick={toggleAudio}
//                     className="px-4 py-2 rounded shadow bg-gray-200 me-2"
//                 >
//                     {mutedAudio ? "Unmute Audio" : "Mute Audio"}
//                 </button>
//                 <button
//                     onClick={toggleVideo}
//                     className="px-4 py-2 rounded shadow bg-gray-200"
//                 >
//                     {mutedVideo ? "Enable Video" : "Disable Video"}
//                 </button>
//             </div>

//             <div className="mt-6">
//                 <button
//                     onClick={onClick}
//                     className="px-4 py-2 rounded shadow bg-gray-200"
//                 >
//                     {joined ? "Joined" : "Join Call"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default VideoCallPreview;

import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const VideoCallPreview = ({
    mutedAudio,
    messageApi,
    remoteContainerRef,
    toggleAudio,
    joined,
    toggleVideo,
    localAudioTrackRef,
    mutedVideo,
    localVideoTrackRef,
    onClick,
}) => {
    useEffect(() => {
        let mounted = true;
        const startPreview = async () => {
            try {
                const devices = await AgoraRTC.getDevices();
                const hasAudio = devices.some((d) => d.kind === "audioinput");
                const hasVideo = devices.some((d) => d.kind === "videoinput");
                if (!hasAudio && !hasVideo) {
                    messageApi?.error?.(
                        "No audio or video devices found. Please connect a microphone or camera."
                    );
                    return;
                } else if (!hasAudio) {
                    messageApi?.error?.("No microphone found. Please connect one to enable audio.");
                } else if (!hasVideo) {
                    messageApi?.error?.("No camera found. Please connect one to enable video.");
                };
                if (hasAudio && !localAudioTrackRef.current) {
                    try {
                        localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
                    } catch (err) {
                        console.warn("Preview: microphone create failed", err);
                    }
                }

                if (hasVideo && !localVideoTrackRef.current) {
                    try {
                        localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
                        if (mounted && remoteContainerRef.current && localVideoTrackRef.current) {
                            // play preview video into the preview container
                            localVideoTrackRef.current.play(remoteContainerRef.current);
                        }
                    } catch (err) {
                        console.warn("Preview: camera create failed", err);
                    }
                }
            } catch (error) {
                console.error("Error starting preview:", error);
                alert("Unable to access audio/video devices. Please check your browser permissions.");
            }
        };
        startPreview();
        return () => {
            // NOTE: we intentionally DO NOT close tracks here so the parent can reuse preview tracks when joining.
            // If you want to free devices when leaving preview, uncomment the lines below.
            // if (localAudioTrackRef.current) { localAudioTrackRef.current.close(); localAudioTrackRef.current = null; }
            // if (localVideoTrackRef.current) { localVideoTrackRef.current.close(); localVideoTrackRef.current = null; }
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            />
            <div className="flex justify-center gap-4 mt-4 mb-2">
                <button onClick={toggleAudio} className="px-4 py-2 rounded shadow bg-gray-200 me-2">
                    {mutedAudio ? "Unmute Audio" : "Mute Audio"}
                </button>
                <button onClick={toggleVideo} className="px-4 py-2 rounded shadow bg-gray-200">
                    {mutedVideo ? "Enable Video" : "Disable Video"}
                </button>
            </div>

            <div className="mt-6">
                <button onClick={onClick} className="px-4 py-2 rounded shadow bg-gray-200">
                    {joined ? "Joined" : "Join Call"}
                </button>
            </div>
        </div>
    )
}

export default VideoCallPreview;