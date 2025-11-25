// import React, { useEffect, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { useNavigate } from "react-router";
// import { pageRoutes } from "../../routes/PageRoutes";

// const VideoCallPreview = ({
//     mutedAudio,
//     messageApi,
//     remoteContainerRef,
//     toggleAudio,
//     joined,
//     toggleVideo,
//     localAudioTrackRef,
//     mutedVideo,
//     localVideoTrackRef,
//     onClick,
//     setIsVideoAvailable,
//     setIsAudioAvailable,
//     isAudioAvailable,
//     isVideoAvailable
// }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         let mounted = true;
//         const startPreview = async () => {
//             try {
//                 const devices = await AgoraRTC.getDevices();
//                 const hasAudio = devices.some((d) => d.kind === "audioinput");
//                 const hasVideo = devices.some((d) => d.kind === "videoinput");
//                 setIsAudioAvailable(hasAudio);
//                 setIsVideoAvailable(hasVideo);
//                 if (!hasAudio && !hasVideo) {
//                     messageApi?.error?.(
//                         "No audio or video devices found. Please connect a microphone or camera."
//                     );
//                     return;
//                 } else if (!hasAudio) {
//                     messageApi?.error?.("No microphone found. Please connect one to enable audio.");
//                 } else if (!hasVideo) {
//                     messageApi?.error?.("No camera found. Please connect one to enable video.");
//                 };
//                 if (hasAudio && !localAudioTrackRef.current) {
//                     try {
//                         localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
//                     } catch (err) {
//                         console.warn("Preview: microphone create failed", err);
//                     }
//                 }

//                 if (hasVideo && !localVideoTrackRef.current) {
//                     try {
//                         localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
//                         if (mounted && remoteContainerRef.current && localVideoTrackRef.current) {
//                             // play preview video into the preview container
//                             localVideoTrackRef.current.play(remoteContainerRef.current);
//                         }
//                     } catch (err) {
//                         console.warn("Preview: camera create failed", err);
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error starting preview:", error);
//                 messageApi.error("Unable to access audio/video devices. Please check your browser permissions.");
//             }
//         };
//         startPreview();
//         return () => {
//             mounted = false;
//         };
//     }, []);

//     return (
//         <div className="p-4 text-center">
//             <div className="ct_video_call_main_bg_3">
//                 <div className="d-flex align-items-center gap-3 mb-4">
//                     <div className="ct_back_btn34" onClick={() => navigate(pageRoutes.myRoom)}>
//                         <i className="fa-solid fa-chevron-left"></i>Back
//                     </div>
//                     <h2 className="ct_fs_20 ct_fw_600 text-center mb-0 mx-auto">Video Call Preview</h2>
//                 </div>
//                 <div
//                     id="local-preview"
//                     ref={remoteContainerRef}
//                     style={{
//                         width: "100%",
//                         maxWidth: "800px",
//                         height: "calc(100vh - 300px)",
//                         backgroundColor: "#000",
//                         margin: "0 auto",
//                         borderRadius: "8px",
//                         overflow: "hidden",
//                     }}
//                 />
//                 <div className="d-flex justify-content-center gap-2 mt-4 mb-2">
//                     <button onClick={toggleAudio} className={`ct_video_action_btn ${!isAudioAvailable && "ct_disable_call"}`}>
//                         {!mutedAudio ? <i className="fa-solid fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}
//                     </button>
//                     <button onClick={toggleVideo} className={`ct_video_action_btn ${!isVideoAvailable && "ct_disable_call"}`}>
//                         {!mutedVideo ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-video-slash"></i>}
//                     </button>
//                 </div>

//                 <div className="mt-6">
//                     <button onClick={onClick} className="ct_yellow_btn ct_border_radius_10 mt-4">
//                         {joined ? "Joined" : "Join Call"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default VideoCallPreview;


import React, { useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useNavigate } from "react-router";
import { pageRoutes } from "../../routes/PageRoutes";

const VideoCallPreview = ({
    mutedAudio,
    messageApi,
    remoteContainerRef,
    toggleAudio,
    joined,
    toggleVideo,
    mutedVideo,
    localAudioTrackRef,
    localVideoTrackRef,
    onClick,
    setIsVideoAvailable,
    setIsAudioAvailable,
    isAudioAvailable,
    isVideoAvailable
}) => {

    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const startPreview = async () => {
            try {
                const devices = await AgoraRTC.getDevices();
                const hasAudio = devices.some((d) => d.kind === "audioinput");
                const hasVideo = devices.some((d) => d.kind === "videoinput");

                setIsAudioAvailable(hasAudio);
                setIsVideoAvailable(hasVideo);

                if (hasAudio && !localAudioTrackRef.current) {
                    try {
                        localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
                    } catch { }
                }

                if (hasVideo && !localVideoTrackRef.current) {
                    try {
                        localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
                        if (mounted && remoteContainerRef.current) {
                            localVideoTrackRef.current.play(remoteContainerRef.current);
                        }
                    } catch { }
                }
            } catch (error) {
                console.error("Preview Error:", error);
                messageApi.error("Please allow camera and mic access.");
            }
        };

        startPreview();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="p-4 text-center">
            <div className="ct_video_call_main_bg_3">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="ct_back_btn34" onClick={() => navigate(pageRoutes.myRoom)}>
                        <i className="fa-solid fa-chevron-left"></i> Back
                    </div>
                    <h2 className="ct_fs_20 ct_fw_600 text-center mb-0 mx-auto">Video Call Preview</h2>
                </div>

                <div
                    ref={remoteContainerRef}
                    style={{
                        width: "100%",
                        maxWidth: "800px",
                        height: "calc(100vh - 300px)",
                        backgroundColor: "#000",
                        margin: "0 auto",
                        borderRadius: "8px",
                        overflow: "hidden"
                    }}
                />

                <div className="d-flex justify-content-center gap-2 mt-4 mb-2">
                    <button onClick={toggleAudio} className={`ct_video_action_btn ${!isAudioAvailable && "ct_disable_call"}`}>
                        {!mutedAudio ? <i className="fa-solid fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}
                    </button>
                    <button onClick={toggleVideo} className={`ct_video_action_btn ${!isVideoAvailable && "ct_disable_call"}`}>
                        {!mutedVideo ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-video-slash"></i>}
                    </button>
                </div>

                <div className="mt-6">
                    <button onClick={onClick} className="ct_yellow_btn ct_border_radius_10 mt-4">
                        {joined ? "Joined" : "Join Call"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallPreview;