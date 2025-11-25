// import React, { useEffect, useRef, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { useLocation, useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { joinRoomVideoCall } from "../../redux/actions/createRoom";
// import VideoCallPreview from "./VideoCallPreview";
// import { getUserDetailsForVideoCall } from "../../redux/actions/authActions";
// import { pipGetAccessToken } from "../../auth/Pip";
// import { pageRoutes } from "../../routes/PageRoutes";

// export default function AgoraCall({ messageApi }) {
//     const { state } = useLocation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const clientRef = useRef(null);

//     const localAudioTrackRef = useRef(null);
//     const localVideoTrackRef = useRef(null);

//     const remoteContainerRef = useRef(null);
//     const localPlayerRef = useRef(null);

//     const [isPreview, setIsPreView] = useState(true);
//     const [joined, setJoined] = useState(false);

//     const [mutedAudio, setMutedAudio] = useState(false);
//     const [mutedVideo, setMutedVideo] = useState(false);

//     const [isAudio, setIsAudio] = useState(true);
//     const [isVideo, setIsVideo] = useState(true);

//     const [isAudioAvailable, setIsAudioAvailable] = useState(true);
//     const [isVideoAvailable, setIsVideoAvailable] = useState(true);

//     const [remoteUsers, setRemoteUsers] = useState([]);
//     const [userDataVideo, setUserDataVideo] = useState([]);

//     const userData = pipGetAccessToken("user_data");
//     const publishedRef = useRef({ audio: false, video: false });

//     const makeRemoteId = (uid) => `remote-player-${uid}`;

//     useEffect(() => {
//         clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//         return () => {
//             if (clientRef.current) {
//                 try {
//                     clientRef.current.removeAllListeners();
//                 } catch (e) { }
//             };
//         };
//     }, []);

//     const playRemoteVideo = (uid, videoTrack) => {
//         try {
//             const id = makeRemoteId(uid);
//             const remoteDiv = document.getElementById(id);
//             if (!remoteDiv) {
//                 console.warn(`Remote container for user ${uid} not found`);
//                 return;
//             }
//             videoTrack?.play(remoteDiv);
//         } catch (err) {
//             console.error("playRemoteVideo error:", err);
//         }
//     };

//     const removeRemoteVideo = (uid) => {
//         const el = document.getElementById(makeRemoteId(uid));
//         if (el) el.innerHTML = ""; // clear content, not remove
//     };

//     useEffect(() => {
//         userDataVideo.forEach((u) => {
//             if (u.video && u.videoTrack) {
//                 const el = document.getElementById(makeRemoteId(u.uid));
//                 if (el && el.childNodes.length === 0) {
//                     playRemoteVideo(u.uid, u.videoTrack);
//                 }
//             }
//         });
//     }, [userDataVideo]);

//     const attachRemoteHandlers = (client) => {
//         if (!client) return;
//         const handleUserJoined = (user) => {
//             const callback = (response) => {
//                 setUserDataVideo((prev) => {
//                     const exists = prev.find((u) => u.uid === user.uid);
//                     if (exists) return prev;
//                     return [
//                         ...prev,
//                         {
//                             uid: user.uid,
//                             audio: user?._audio_enabled_,
//                             video: user?._video_enabled_,
//                             name: response?.data?.name,
//                             profile_image_url: response?.data?.profile_image_url,
//                             videoTrack: user?.videoTrack
//                         },
//                     ];
//                 });
//             };
//             const data = {
//                 uid: user?.uid,
//                 phone_number: user?.uid,
//             };
//             dispatch(getUserDetailsForVideoCall({ callback, payload: data }));
//             setRemoteUsers((prev) => {
//                 const exists = prev.find((u) => u.uid === user.uid);
//                 if (exists) return prev;
//                 return [
//                     ...prev,
//                     { uid: user.uid, audio: false, video: false, name: `User ${user.uid}` },
//                 ];
//             });
//         };

//         const handleUserPublished = async (user, mediaType) => {
//             try {
//                 await client.subscribe(user, mediaType);
//             } catch (err) {
//                 console.error("Subscribe failed:", err);
//                 return;
//             }
//             if (mediaType === "video") playRemoteVideo(user.uid, user.videoTrack);
//             if (mediaType === "audio") user.audioTrack?.play();

//             setUserDataVideo((prev) =>
//                 prev.map((u) =>
//                     u.uid === user.uid
//                         ? {
//                             ...u,
//                             audio: mediaType === "audio" ? true : u.audio,
//                             video: mediaType === "video" ? true : u.video,
//                             audioTrack: mediaType === "audio" ? user.audioTrack : u.audioTrack,
//                             videoTrack: mediaType === "video" ? user.videoTrack : u.videoTrack,
//                         }
//                         : u
//                 )
//             );
//         };

//         const handleUserUnpublished = (user, mediaType) => {
//             if (mediaType === "video") removeRemoteVideo(user.uid);
//             setUserDataVideo((prev) =>
//                 prev.map((u) =>
//                     u.uid === user.uid
//                         ? {
//                             ...u,
//                             audio: mediaType === "audio" ? false : u.audio,
//                             video: mediaType === "video" ? false : u.video,
//                         }
//                         : u
//                 )
//             );
//         };

//         const handleUserLeft = (user) => {
//             const el = document.getElementById(`remote-player-${user.uid}`);
//             if (el && el.parentNode) el.parentNode.removeChild(el);
//             setUserDataVideo((prev) => prev.filter((u) => u.uid !== user.uid));
//             setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
//         };

//         client.on("user-joined", handleUserJoined);
//         client.on("user-published", handleUserPublished);
//         client.on("user-unpublished", handleUserUnpublished);
//         client.on("user-left", handleUserLeft);

//         return () => {
//             client.off("user-joined", handleUserJoined);
//             client.off("user-published", handleUserPublished);
//             client.off("user-unpublished", handleUserUnpublished);
//             client.off("user-left", handleUserLeft);
//         };
//     };

//     const joinChannel = async (TOKEN, APP_ID, CHANNEL, USER_UID = null) => {
//         if (!clientRef.current) {
//             console.error("Agora client not initialized yet");
//             return;
//         };
//         if (joined) return;
//         const client = clientRef.current;
//         try {
//             const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, USER_UID);
//             if (!localPlayerRef.current) {
//                 const container = document.getElementById("local-player-container");
//                 if (container) localPlayerRef.current = container;
//             };
//             try {
//                 if (!localAudioTrackRef.current) {
//                     localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
//                 };
//             } catch (err) {
//                 console.warn("No microphone found / permission denied, joining without audio.");
//                 localAudioTrackRef.current = null;
//             };
//             try {
//                 if (!localVideoTrackRef.current) {
//                     localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
//                 };
//             } catch (err) {
//                 console.warn("No camera found / permission denied, joining without video.");
//                 localVideoTrackRef.current = null;
//             };
//             if (localVideoTrackRef.current && localPlayerRef.current) {
//                 let localDiv = document.getElementById("local-player");
//                 if (!localDiv) {
//                     localDiv = document.createElement("div");
//                     localDiv.id = "local-player";
//                     localDiv.style.width = "320px";
//                     localDiv.style.height = "240px";
//                     localDiv.style.margin = "8px";
//                     localPlayerRef.current.appendChild(localDiv);
//                 };
//                 try {
//                     localVideoTrackRef.current.play(localDiv);
//                 } catch (e) {
//                     console.warn("play local video failed", e);
//                 };
//             };
//             // publish tracks if available
//             const toPublish = [];
//             if (localAudioTrackRef.current) toPublish.push(localAudioTrackRef.current);
//             if (localVideoTrackRef.current) toPublish.push(localVideoTrackRef.current);
//             if (toPublish.length > 0) {
//                 await client.publish(toPublish);
//                 publishedRef.current = {
//                     audio: !!localAudioTrackRef.current,
//                     video: !!localVideoTrackRef.current,
//                 };
//             } else {
//                 publishedRef.current = { audio: false, video: false };
//             };
//             // attach remote handlers (register and keep cleanup function)
//             const cleanupHandlers = attachRemoteHandlers(client);
//             // store cleanup function on clientRef so leaveChannel can call it
//             clientRef.current._cleanupHandlers = cleanupHandlers;
//             setJoined(true);
//             setIsPreView(false);
//         } catch (err) {
//             console.error("Failed to join channel:", err);
//             messageApi.error("Failed to join: " + (err?.message || err));
//         };
//     };

//     const leaveChannel = async () => {
//         const client = clientRef.current;
//         if (!client) return;
//         try {
//             try {
//                 if (publishedRef.current.audio && localAudioTrackRef.current) {
//                     await client.unpublish([localAudioTrackRef.current]);
//                 };
//                 if (publishedRef.current.video && localVideoTrackRef.current) {
//                     await client.unpublish([localVideoTrackRef.current]);
//                 };
//             } catch (e) {
//             };
//             if (localAudioTrackRef.current) {
//                 try { localAudioTrackRef.current.stop(); } catch (e) { }
//                 try { localAudioTrackRef.current.close(); } catch (e) { }
//                 localAudioTrackRef.current = null;
//             };
//             if (localVideoTrackRef.current) {
//                 try { localVideoTrackRef.current.stop(); } catch (e) { }
//                 try { localVideoTrackRef.current.close(); } catch (e) { }
//                 localVideoTrackRef.current = null;
//             };
//             const localEl = document.getElementById("local-player");
//             if (localEl && localEl.parentNode) localEl.parentNode.removeChild(localEl);
//             if (document.getElementById("remote-player-container")) {
//                 document.getElementById("remote-player-container").innerHTML = "";
//             };
//             if (clientRef.current && clientRef.current._cleanupHandlers) {
//                 try { clientRef.current._cleanupHandlers(); } catch (e) { }
//                 clientRef.current._cleanupHandlers = null;
//             };
//             await client.leave();
//             setUserDataVideo([]);
//             setRemoteUsers([]);
//             setJoined(false);
//             publishedRef.current = { audio: false, video: false };
//             navigate(pageRoutes.myRoom)
//             setIsPreView(true);
//         } catch (err) {
//             console.error("Agora leave error:", err);
//         };
//     };

//     const toggleAudio = async () => {
//         const client = clientRef.current;
//         try {
//             if (localAudioTrackRef.current) {
//                 const willMute = !mutedAudio === false ? false : !mutedAudio;
//                 const newMuted = !mutedAudio;
//                 if (newMuted) {
//                     if (joined && client) {
//                         try { await client.unpublish([localAudioTrackRef.current]); } catch (e) { }
//                         publishedRef.current.audio = false;
//                     };
//                     try { await localAudioTrackRef.current.setEnabled(false); } catch (e) { }
//                     setMutedAudio(true);
//                     setIsAudio(false);
//                 } else {
//                     try { await localAudioTrackRef.current.setEnabled(true); } catch (e) { }
//                     if (joined && client) {
//                         try { await client.publish([localAudioTrackRef.current]); publishedRef.current.audio = true; } catch (e) { console.warn("publish audio failed", e); }
//                     };
//                     setMutedAudio(false);
//                     setIsAudio(true);
//                 };
//                 return;
//             };
//             try {
//                 localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
//                 setMutedAudio(false);
//                 setIsAudio(true);
//                 if (joined && client) {
//                     try { await client.publish([localAudioTrackRef.current]); publishedRef.current.audio = true; } catch (e) { console.warn("publish audio failed", e); }
//                 } else {
//                     // preview-only: nothing else to do
//                 };
//             } catch (err) {
//                 console.error("Failed to create mic:", err);
//                 messageApi.error("Unable to access microphone. Please check permissions or device.");
//             };
//         } catch (err) {
//             console.error("toggleAudio error:", err);
//         };
//     };

//     const toggleVideo = async () => {
//         const client = clientRef.current;
//         try {
//             if (localVideoTrackRef.current) {
//                 const newMuted = !mutedVideo;
//                 if (newMuted) {
//                     // turning off video -> unpublish (so remote sees video off) and disable
//                     if (joined && client) {
//                         try { await client.unpublish([localVideoTrackRef.current]); } catch (e) { }
//                         publishedRef.current.video = false;
//                     };
//                     try { await localVideoTrackRef.current.setEnabled(false); } catch (e) { }
//                     setMutedVideo(true);
//                     setIsVideo(false);
//                 } else {
//                     // turning on -> enable and publish (if joined), and play into local-player
//                     try { await localVideoTrackRef.current.setEnabled(true); } catch (e) { }
//                     if (joined && client) {
//                         try { await client.publish([localVideoTrackRef.current]); publishedRef.current.video = true; } catch (e) { console.warn("publish video failed", e); }
//                     };
//                     // ensure playing in local-player
//                     if (!localPlayerRef.current) {
//                         const container = document.getElementById("local-player-container");
//                         if (container) localPlayerRef.current = container;
//                     };
//                     let localDiv = document.getElementById("local-player");
//                     if (!localDiv && localPlayerRef.current) {
//                         localDiv = document.createElement("div");
//                         localDiv.id = "local-player";
//                         localDiv.style.width = "320px";
//                         localDiv.style.height = "240px";
//                         localDiv.style.margin = "8px";
//                         localPlayerRef.current.appendChild(localDiv);
//                     };
//                     try { localVideoTrackRef.current.play(localDiv); } catch (e) { }
//                     setMutedVideo(false);
//                     setIsVideo(true);
//                 };
//                 return;
//             };

//             // if no video track exists, try to create and publish/play
//             try {
//                 localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
//                 setMutedVideo(false);
//                 setIsVideo(true);
//                 // play preview or local player depending on joined
//                 if (joined) {
//                     if (!localPlayerRef.current) {
//                         const container = document.getElementById("local-player-container");
//                         if (container) localPlayerRef.current = container;
//                     };
//                     let localDiv = document.getElementById("local-player");
//                     if (!localDiv && localPlayerRef.current) {
//                         localDiv = document.createElement("div");
//                         localDiv.id = "local-player";
//                         localDiv.style.width = "320px";
//                         localDiv.style.height = "240px";
//                         localDiv.style.margin = "8px";
//                         localPlayerRef.current.appendChild(localDiv);
//                     };
//                     if (localDiv) {
//                         try { localVideoTrackRef.current.play(localDiv); } catch (e) { }
//                     };
//                     if (client) {
//                         try { await client.publish([localVideoTrackRef.current]); publishedRef.current.video = true; } catch (e) { console.warn("publish video failed", e); }
//                     };
//                 } else {
//                     // preview-only play inside preview container
//                     if (remoteContainerRef.current) {
//                         try { localVideoTrackRef.current.play(remoteContainerRef.current); } catch (e) { }
//                     };
//                 };
//             } catch (err) {
//                 console.error("Failed to create camera:", err);
//                 messageApi.error("Unable to access camera. Please check permissions or device.");
//             };
//         } catch (err) {
//             console.error("toggleVideo error:", err);
//         };
//     };

//     const handleJoinVideoCall = () => {
//         setIsPreView(false);
//         const callback = (response) => {
//             if (response?.agora_token) {
//                 joinChannel(response?.agora_token, response?.agora_app_id, response?.agora_channel, response?.agora_user_uid);
//             }
//         };
//         const data = { room_id: state?.data?.id };
//         dispatch(joinRoomVideoCall({ payload: data, messageApi, callback }));
//     };

//     return (
//         <>
//             {isPreview ? (
//                 <VideoCallPreview
//                     remoteContainerRef={remoteContainerRef}
//                     onClick={handleJoinVideoCall}
//                     toggleAudio={toggleAudio}
//                     toggleVideo={toggleVideo}
//                     messageApi={messageApi}
//                     mutedAudio={mutedAudio}
//                     mutedVideo={mutedVideo}
//                     localAudioTrackRef={localAudioTrackRef}
//                     localVideoTrackRef={localVideoTrackRef}
//                     joined={joined}
//                     setIsVideoAvailable={(val) => setIsVideoAvailable(val)}
//                     setIsAudioAvailable={(val) => setIsAudioAvailable(val)}
//                     isVideoAvailable={isVideoAvailable}
//                     isAudioAvailable={isAudioAvailable}
//                 />
//             ) : (
//                 <div className="p-4">
//                     <div className="ct_video_call_main_bg_3">
//                         <div className="mb-3 d-flex gap-2 justify-content-end">
//                             {!joined ? (
//                                 <button onClick={handleJoinVideoCall} className="ct_yellow_btn ct_border_radius_10">
//                                     Join Call
//                                 </button>
//                             ) : (
//                                 <button onClick={leaveChannel} className="btn btn-danger">
//                                     Leave Call
//                                 </button>
//                             )}
//                         </div>
//                         <div className={`ct_video_call_grid ${userDataVideo?.length == 0 ? "ct_video_call_grid_full" : userDataVideo?.length == 1 ? "ct_grid_2_234" : userDataVideo?.length == 2 && "ct_grid_2_234"}`}>
//                             <div className="ct_signle_video_call">
//                                 <h4>{userData?.attributes?.full_name ?? ""}</h4>
//                                 {console.log({ localVideoTrackRef })}
//                                 {localVideoTrackRef.current ? (
//                                     <div id="local-player" />
//                                 ) : (
//                                     <img src={"assets/img/dummy_user_img.png"} alt="No video" className="rounded-full mx-auto" />
//                                 )}
//                                 <div className="mt-1 d-flex align-items-center gap-3 ct_overlay_video_btn_455">
//                                     <button onClick={toggleAudio} className="ct_video_action_btn"> {isAudio ? <i className="fa-solid fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}</button>
//                                     <button onClick={toggleVideo} className="ct_video_action_btn">
//                                         {isVideo ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-video-slash"></i>}
//                                     </button>
//                                 </div>
//                             </div>
//                             {/* )} */}
//                             {/* ct_grid_2_234 ct_grid_1_234 */}
//                             {userDataVideo?.length != 0 &&
//                                 <div className={`ct_grid_4_234 ${userDataVideo?.length == 1 ? "ct_grid_1_234" : userDataVideo?.length == 2 && "ct_grid_1_234"}`}>
//                                     {userDataVideo.map((u) => (
//                                         <div key={u.uid} className={`ct_multiple_video_call ${userDataVideo?.length == 1 ? "single" : userDataVideo?.length == 2 && "double"}`}>
//                                             <h4 className="ct_fs_20 ct_fw_600 mb-2">{u.name}</h4>
//                                             {u.video ? (
//                                                 <div id={makeRemoteId(u.uid)} style={{ width: "100%", height: "calc(100vh - 200px)" }} />
//                                             ) : (
//                                                 <img src={u.profile_image_url || "assets/img/dummy_user_img.png"} alt={u.name} className="rounded-full mx-auto" />
//                                             )}
//                                             <div className="mt-1 d-flex align-items-center gap-3 ct_overlay_video_btn_455">
//                                                 <button className="ct_video_action_btn bg-transparent border-0 w-auto h-auto" style={{ color: "#333" }}> {u.audio ? <i className="fa-solid fa-microphone"></i> : <i className="fa-solid fa-microphone-slash" style={{ color: "#333" }}></i>} </button>
//                                                 <button className="ct_video_action_btn bg-transparent border-0 w-auto h-auto">
//                                                     {u.video ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-video-slash"></i>}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             }
//                         </div>
//                     </div>
//                 </div >
//             )
//             }
//         </>
//     );
// }

import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { joinRoomVideoCall } from "../../redux/actions/createRoom";
import VideoCallPreview from "./VideoCallPreview";
import { getUserDetailsForVideoCall } from "../../redux/actions/authActions";
import { pipGetAccessToken } from "../../auth/Pip";
import { pageRoutes } from "../../routes/PageRoutes";

export default function AgoraCall({ messageApi }) {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clientRef = useRef(null);
    const localAudioTrackRef = useRef(null);
    const localVideoTrackRef = useRef(null);

    const remoteContainerRef = useRef(null);

    const [isPreview, setIsPreView] = useState(true);
    const [joined, setJoined] = useState(false);

    const [mutedAudio, setMutedAudio] = useState(false);
    const [mutedVideo, setMutedVideo] = useState(false);

    const [isAudio, setIsAudio] = useState(true);
    const [isVideo, setIsVideo] = useState(true);

    const [isAudioAvailable, setIsAudioAvailable] = useState(true);
    const [isVideoAvailable, setIsVideoAvailable] = useState(true);

    const [remoteUsers, setRemoteUsers] = useState([]);
    const [userDataVideo, setUserDataVideo] = useState([]);

    const userData = pipGetAccessToken("user_data");

    const makeRemoteId = (uid) => `remote-player-${uid}`;

    useEffect(() => {
        clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        return () => {
            clientRef.current?.removeAllListeners?.();
        };
    }, []);

    const playRemoteVideo = (uid, videoTrack) => {
        const element = document.getElementById(makeRemoteId(uid));
        if (element) {
            videoTrack?.play(element);
        }
    };

    const attachRemoteHandlers = (client) => {
        if (!client) return;

        const handleUserJoined = (user) => {
            const callback = (response) => {
                setUserDataVideo((prev) => [
                    ...prev,
                    {
                        uid: user.uid,
                        audio: user?._audio_enabled_,
                        video: user?._video_enabled_,
                        name: response?.data?.name,
                        profile_image_url: response?.data?.profile_image_url,
                        videoTrack: user?.videoTrack
                    },
                ]);
            };

            const data = { uid: user?.uid, phone_number: user?.uid };
            dispatch(getUserDetailsForVideoCall({ callback, payload: data }));
        };

        const handleUserPublished = async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            if (mediaType === "video") playRemoteVideo(user.uid, user.videoTrack);
            if (mediaType === "audio") user.audioTrack?.play();
        };

        const handleUserLeft = (user) => {
            setUserDataVideo((prev) => prev.filter((u) => u.uid !== user.uid));
        };

        client.on("user-joined", handleUserJoined);
        client.on("user-published", handleUserPublished);
        client.on("user-left", handleUserLeft);

        return () => {
            client.off("user-joined", handleUserJoined);
            client.off("user-published", handleUserPublished);
            client.off("user-left", handleUserLeft);
        };
    };

    const joinChannel = async (TOKEN, APP_ID, CHANNEL, USER_UID = null) => {
        const client = clientRef.current;
        if (!client) return;

        try {
            await client.join(APP_ID, CHANNEL, TOKEN || null, USER_UID);

            try {
                if (!localAudioTrackRef.current) {
                    localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
                }
            } catch {
                localAudioTrackRef.current = null;
            }

            try {
                if (!localVideoTrackRef.current) {
                    localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
                }
            } catch {
                localVideoTrackRef.current = null;
            }

            // Play on in-call container
            if (localVideoTrackRef.current) {
                const container = document.getElementById("local-player");
                if (container) {
                    localVideoTrackRef.current.play(container);
                }
            }

            const publishTracks = [];
            if (localAudioTrackRef.current) publishTracks.push(localAudioTrackRef.current);
            if (localVideoTrackRef.current) publishTracks.push(localVideoTrackRef.current);

            if (publishTracks.length) {
                await client.publish(publishTracks);
            }

            clientRef.current._cleanup = attachRemoteHandlers(client);

            setJoined(true);
            setIsPreView(false);

        } catch (err) {
            console.error("Join Error:", err);
            messageApi.error("Failed to join");
        }
    };

    const leaveChannel = async () => {
        const client = clientRef.current;
        if (!client) return;

        try {
            if (localAudioTrackRef.current) {
                localAudioTrackRef.current.stop();
                localAudioTrackRef.current.close();
                localAudioTrackRef.current = null;
            }

            if (localVideoTrackRef.current) {
                localVideoTrackRef.current.stop();
                localVideoTrackRef.current.close();
                localVideoTrackRef.current = null;
            }

            await client.leave();
            setJoined(false);
            setIsPreView(true);
            navigate(pageRoutes.myRoom);

        } catch (e) { }
    };

    const toggleAudio = async () => {
        if (!localAudioTrackRef.current) return;

        if (!mutedAudio) {
            await localAudioTrackRef.current.setEnabled(false);
        } else {
            await localAudioTrackRef.current.setEnabled(true);
        }

        setMutedAudio(!mutedAudio);
        setIsAudio(!isAudio);
    };

    const toggleVideo = async () => {
        const track = localVideoTrackRef.current;

        // If track exists → enable/disable
        if (track) {
            const turningOn = mutedVideo;

            if (turningOn) {
                await track.setEnabled(true);

                if (joined) {
                    const el = document.getElementById("local-player");
                    if (el) track.play(el);
                } else {
                    if (remoteContainerRef.current) {
                        track.play(remoteContainerRef.current);
                    }
                }
            } else {
                await track.setEnabled(false);
            }

            setMutedVideo(!mutedVideo);
            setIsVideo(!isVideo);
            return;
        }

        // If NO track → recreate & play
        try {
            localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();

            if (joined) {
                const el = document.getElementById("local-player");
                if (el) localVideoTrackRef.current.play(el);
                await clientRef.current.publish([localVideoTrackRef.current]);
            } else {
                localVideoTrackRef.current.play(remoteContainerRef.current);
            }

            setMutedVideo(false);
            setIsVideo(true);

        } catch (err) {
            messageApi.error("Camera permission denied");
        }
    };

    // const handleJoinVideoCall = () => {
    //     const callback = (response) => {
    //         joinChannel(response.agora_token, response.agora_app_id, response.agora_channel, response.agora_user_uid);
    //     };

    //     const data = { room_id: state?.data?.id };
    //     dispatch(joinRoomVideoCall({ payload: data, messageApi, callback }));
    // };
    const handleJoinVideoCall = () => {
        // STOP preview playback first
        if (localVideoTrackRef.current) {
            try { localVideoTrackRef.current.stop(); } catch (e) { }
        }

        setIsPreView(false);

        const callback = (response) => {
            if (response?.agora_token) {
                joinChannel(
                    response?.agora_token,
                    response?.agora_app_id,
                    response?.agora_channel,
                    response?.agora_user_uid
                );
            }
        };
        const data = { room_id: state?.data?.id };
        dispatch(joinRoomVideoCall({ payload: data, messageApi, callback }));
    };

    return (
        <>
            {isPreview ? (
                <VideoCallPreview
                    remoteContainerRef={remoteContainerRef}
                    onClick={handleJoinVideoCall}
                    toggleAudio={toggleAudio}
                    toggleVideo={toggleVideo}
                    messageApi={messageApi}
                    mutedAudio={mutedAudio}
                    mutedVideo={mutedVideo}
                    localAudioTrackRef={localAudioTrackRef}
                    localVideoTrackRef={localVideoTrackRef}
                    joined={joined}
                    setIsVideoAvailable={setIsVideoAvailable}
                    setIsAudioAvailable={setIsAudioAvailable}
                    isVideoAvailable={isVideoAvailable}
                    isAudioAvailable={isAudioAvailable}
                />
            ) : (
                <div className="p-4">
                    <div className="ct_video_call_main_bg_3">
                        <div className="mb-3 d-flex gap-2 justify-content-end">
                            {joined ? (
                                <button onClick={leaveChannel} className="btn btn-danger">Leave Call</button>
                            ) : (
                                <button onClick={handleJoinVideoCall} className="ct_yellow_btn">Join Call</button>
                            )}
                        </div>

                        <div className="ct_signle_video_call">
                            <h4>{userData?.attributes?.full_name ?? ""}</h4>

                            {/* LOCAL PLAYER */}
                            <div id="local-player-container" style={{ width: "100%", height: "300px", background: "#000" }}>
                                <div id="local-player" style={{ width: "100%", height: "100%" }} />
                            </div>

                            <div className="mt-2 d-flex align-items-center gap-3 ct_overlay_video_btn_455">
                                <button onClick={toggleAudio} className="ct_video_action_btn">
                                    {isAudio ? <i className="fa-solid fa-microphone"></i> : <i className="fa-solid fa-microphone-slash"></i>}
                                </button>

                                <button onClick={toggleVideo} className="ct_video_action_btn">
                                    {isVideo ? <i className="fa-solid fa-video"></i> : <i className="fa-solid fa-video-slash"></i>}
                                </button>
                            </div>
                        </div>

                        {/* REMOTE USERS */}
                        {userDataVideo.length > 0 &&
                            <div className="mt-4">
                                {userDataVideo.map((u) => (
                                    <div key={u.uid}>
                                        <h4>{u.name}</h4>
                                        {u.video ? (
                                            <div id={makeRemoteId(u.uid)} style={{ width: "100%", height: "300px", background: "#000" }} />
                                        ) : (
                                            <img src={u.profile_image_url} alt="" width="100" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            )}
        </>
    );
};