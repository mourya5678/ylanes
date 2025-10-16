import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { joinRoomVideoCall } from "../../redux/actions/createRoom";
import VideoCallPreview from "./VideoCallPreview";
import { getUserDetailsForVideoCall } from "../../redux/actions/authActions";
import { pipGetAccessToken } from "../../auth/Pip";

// export default function AgoraCall({ messageApi }) {
//     const { state } = useLocation();
//     const dispatch = useDispatch();

//     const clientRef = useRef(null);
//     const localAudioTrackRef = useRef(null);

//     const [isPreview, setIsPreView] = useState(true)

//     const localVideoTrackRef = useRef(null);
//     const localPlayerRef = useRef(null);

//     const remoteContainerRef = useRef(null);
//     const [joined, setJoined] = useState(false);

//     const [mutedAudio, setMutedAudio] = useState(false);
//     const [mutedVideo, setMutedVideo] = useState(false);

//     const [isAudio, setIsAudio] = useState(true);
//     const [isVideo, setIsVideo] = useState(true);

//     const [remoteUsers, setRemoteUsers] = useState([]);
//     const makeRemoteId = (uid) => `remote-player-${uid}`;

//     // useEffect(() => {
//     //     clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//     //     const client = clientRef.current;
//     //     const handleUserPublished = async (user, mediaType) => {
//     //         console.log({ useruser: user })
//     //         await client.subscribe(user, mediaType);
//     //         if (mediaType === "video") {
//     //             const remoteDiv = document.createElement("div");
//     //             remoteDiv.id = makeRemoteId(user.uid);
//     //             remoteDiv.style.width = "320px";
//     //             remoteDiv.style.height = "240px";
//     //             remoteDiv.style.margin = "8px";
//     //             remoteContainerRef.current.appendChild(remoteDiv);
//     //             user.videoTrack.play(remoteDiv.id);
//     //         };
//     //         if (mediaType === "audio") {
//     //             user.audioTrack.play();
//     //         };
//     //         setRemoteUsers((prev) => {
//     //             if (prev.find((u) => u.uid === user.uid)) return prev;
//     //             return [...prev, user];
//     //         });
//     //     };
//     //     const handleUserUnpublished = (user, mediaType) => {
//     //         console.log({ disbale: user })
//     //         if (mediaType === "video") {
//     //             const id = makeRemoteId(user.uid);
//     //             const el = document.getElementById(id);
//     //             if (el && el.parentNode) el.parentNode.removeChild(el);
//     //         };
//     //         setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
//     //     };
//     //     // client.on("user-published", handleUserPublished);
//     //     client.on("user-unpublished", handleUserUnpublished);
//     //     client.on("user-left", (user) => {
//     //         setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
//     //     });
//     //     return () => {
//     //         client.off("user-published", handleUserPublished);
//     //         client.off("user-unpublished", handleUserUnpublished);
//     //     };
//     // }, []);

//     useEffect(() => {
//         clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
//     }, []);

//     useEffect(() => {
//         const client = clientRef.current;
//         if (!client) return;

//         const handleUserJoined = (user) => {
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
//             await client.subscribe(user, mediaType);

//             setRemoteUsers((prev) =>
//                 prev.map((u) =>
//                     u.uid === user.uid
//                         ? {
//                             ...u,
//                             audio: mediaType === "audio" ? true : u.audio,
//                             video: mediaType === "video" ? true : u.video,
//                             [mediaType === "audio" ? "audioTrack" : "videoTrack"]:
//                                 mediaType === "audio" ? user.audioTrack : user.videoTrack,
//                         }
//                         : u
//                 )
//             );
//         };

//         const handleUserUnpublished = (user, mediaType) => {
//             setRemoteUsers((prev) =>
//                 prev.map((u) =>
//                     u.uid === user.uid
//                         ? {
//                             ...u,
//                             audio: mediaType === "audio" ? false : u.audio,
//                             video: mediaType === "video" ? false : u.video,
//                             [mediaType === "audio" ? "audioTrack" : "videoTrack"]: null,
//                         }
//                         : u
//                 )
//             );
//         };

//         const handleUserLeft = (user) => {
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
//     }, []);

//     // const joinChannel = async (TOKEN, APP_ID, CHANNEL, USER_UID = null) => {
//     //     if (joined) return;

//     //     const client = clientRef.current;

//     //     try {
//     //         // Join the channel first
//     //         const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, USER_UID || null);

//     //         // Create local tracks only if NOT muted
//     //         if (!mutedAudio) {
//     //             localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
//     //         } else {
//     //             localAudioTrackRef.current = null;
//     //         }

//     //         if (!mutedVideo) {
//     //             localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
//     //         } else {
//     //             localVideoTrackRef.current = null;
//     //         }

//     //         // Create the local video container
//     //         const localDiv = document.createElement("div");
//     //         localDiv.id = "local-player";
//     //         localDiv.style.width = "320px";
//     //         localDiv.style.height = "240px";
//     //         localDiv.style.margin = "8px";

//     //         if (!localPlayerRef.current) {
//     //             localPlayerRef.current = document.getElementById("local-player-container");
//     //         }
//     //         localPlayerRef.current.appendChild(localDiv);

//     //         // Only play video if it's active
//     //         if (localVideoTrackRef.current) {
//     //             localVideoTrackRef.current.play(localDiv);
//     //         }

//     //         // Prepare list of active tracks to publish
//     //         const tracksToPublish = [];
//     //         if (localAudioTrackRef.current) tracksToPublish.push(localAudioTrackRef.current);
//     //         if (localVideoTrackRef.current) tracksToPublish.push(localVideoTrackRef.current);

//     //         // Publish only if any active track exists
//     //         if (tracksToPublish.length > 0) {
//     //             await client.publish(tracksToPublish);
//     //         }

//     //         // Update state
//     //         setJoined(true);
//     //         setMutedAudio(!!mutedAudio);
//     //         setMutedVideo(!!mutedVideo);
//     //     } catch (err) {
//     //         alert("Failed to join channel: " + err.message);
//     //         console.error(err);
//     //     }
//     // };

//     const joinChannel = async (TOKEN, APP_ID, CHANNEL, USER_UID = null) => {
//         if (!clientRef.current) {
//             console.error("Agora client not initialized yet");
//             return;
//         }
//         if (joined) return;
//         const client = clientRef.current;
//         try {
//             const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, null);
//             // Try to create audio/video tracks
//             try {
//                 localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
//             } catch (err) {
//                 console.warn("No microphone found, joining without audio.");
//                 localAudioTrackRef.current = null;
//             }
//             try {
//                 localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
//             } catch (err) {
//                 console.warn("No camera found, joining without video.");
//                 localVideoTrackRef.current = null;
//             }
//             // Publish only available tracks
//             const tracks = [];
//             if (localAudioTrackRef.current) tracks.push(localAudioTrackRef.current);
//             if (localVideoTrackRef.current) tracks.push(localVideoTrackRef.current);
//             if (tracks.length > 0) await client.publish(tracks);
//             setJoined(true);
//         } catch (err) {
//             console.error("Failed to join channel:", err);
//             alert("Failed to join: " + err.message);
//         }
//     };

//     // const leaveChannel = async () => {
//     //     const client = clientRef.current;
//     //     try {
//     //         if (localAudioTrackRef.current) {
//     //             localAudioTrackRef.current.stop();
//     //             localAudioTrackRef.current.close();
//     //             localAudioTrackRef.current = null;
//     //         };
//     //         if (localVideoTrackRef.current) {
//     //             localVideoTrackRef.current.stop();
//     //             localVideoTrackRef.current.close();
//     //             localVideoTrackRef.current = null;
//     //         };
//     //         const localEl = document.getElementById("local-player");
//     //         if (localEl && localEl.parentNode) localEl.parentNode.removeChild(localEl);
//     //         await client.leave();
//     //         if (remoteContainerRef.current) remoteContainerRef.current.innerHTML = "";
//     //         setRemoteUsers([]);
//     //         setJoined(false);
//     //         setIsPreView(true);
//     //     } catch (err) {
//     //         console.error("Agora leave error:", err);
//     //     };
//     // };

//     const leaveChannel = async () => {
//         const client = clientRef.current;
//         if (!client) return;

//         if (localAudioTrackRef.current) {
//             localAudioTrackRef.current.stop();
//             localAudioTrackRef.current.close();
//         }
//         if (localVideoTrackRef.current) {
//             localVideoTrackRef.current.stop();
//             localVideoTrackRef.current.close();
//         }

//         await client.leave();

//         setRemoteUsers([]);
//         setJoined(false);
//     };


//     const toggleAudio1 = async () => {
//         if (!localAudioTrackRef.current) return;
//         const newMuted = !mutedAudio;
//         await localAudioTrackRef.current.setEnabled(!newMuted);
//         setMutedAudio(newMuted);
//         setIsAudio(!isAudio);
//     };

//     const toggleVideo1 = async () => {
//         if (!localVideoTrackRef.current) return;
//         const newMuted = !mutedVideo;
//         await localVideoTrackRef.current.setEnabled(!newMuted);
//         setMutedVideo(newMuted);
//         setIsVideo(!isVideo);
//         if (!newMuted) {
//             const el = document.getElementById("local-player");
//             if (el) localVideoTrackRef.current.play(el);
//         };
//     };

//     const toggleAudio = async () => {
//         if (!isAudio) {
//             setIsAudio(true)
//             const client = clientRef.current;
//             if (localAudioTrackRef.current) {
//                 const enabled = !mutedAudio;
//                 await localAudioTrackRef.current.setEnabled(enabled);
//                 setMutedAudio(!enabled);
//             } else {
//                 try {
//                     localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
//                     await client.publish([localAudioTrackRef.current]);
//                     setMutedAudio(false);
//                 } catch (err) {
//                     console.error("Failed to turn on mic:", err);
//                 }
//             }
//         } else {
//             toggleAudio1()
//         }
//     };

//     const toggleVideo = async () => {
//         if (!isVideo) {
//             setIsVideo(true)
//             const client = clientRef.current;
//             if (localVideoTrackRef.current) {
//                 const enabled = !mutedVideo;
//                 await localVideoTrackRef.current.setEnabled(enabled);
//                 setMutedVideo(!enabled);
//             } else {
//                 try {
//                     localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
//                     const localDiv = document.getElementById("local-player");
//                     if (localDiv) localVideoTrackRef.current.play(localDiv);
//                     await client.publish([localVideoTrackRef.current]);
//                     setMutedVideo(false);
//                 } catch (err) {
//                     console.error("Failed to turn on camera:", err);
//                 }
//             }
//         } else {
//             toggleVideo1();
//         };
//     };

//     const handleJoinVideoCall = () => {
//         setIsPreView(false);
//         const callback = (response) => {
//             if (response?.agora_token) {
//                 console.log({ response });
//                 joinChannel(response?.agora_token, response?.agora_app_id, response?.agora_channel, response?.agora_user_uid)
//             };
//         };
//         const data = {
//             room_id: state?.data?.id
//         };
//         dispatch(joinRoomVideoCall({ payload: data, messageApi, callback }));
//     };

//     console.log({ remoteUsers });

//     return (
//         <>
//             {isPreview ?
//                 <VideoCallPreview
//                     remoteContainerRef={remoteContainerRef}
//                     onClick={handleJoinVideoCall}
//                     toggleAudio={toggleAudio1}
//                     toggleVideo={toggleVideo1}
//                     messageApi={messageApi}
//                     mutedAudio={mutedAudio}
//                     mutedVideo={mutedVideo}
//                     localAudioTrackRef={localAudioTrackRef}
//                     localVideoTrackRef={localVideoTrackRef}
//                     joined={joined}
//                 />
//                 :
//                 // <div className="p-4 max-w-4xl mx-auto">
//                 //     <h2 className="text-xl font-semibold mb-4">Agora Video Call (React)</h2>
//                 //     <div className="flex gap-4 mb-4">
//                 //         <button
//                 //             onClick={leaveChannel}
//                 //             className="px-4 py-2 rounded shadow bg-red-500 text-white me-2"
//                 //             disabled={!joined}
//                 //         >
//                 //             Leave
//                 //         </button>
//                 //         <button
//                 //             onClick={toggleAudio}
//                 //             className="px-4 py-2 rounded shadow bg-gray-200 me-2"
//                 //             disabled={!joined}
//                 //         >
//                 //             {mutedAudio ? "Unmute Audio" : "Mute Audio"}
//                 //         </button>
//                 //         <button
//                 //             onClick={toggleVideo}
//                 //             className="px-4 py-2 rounded shadow bg-gray-200 me-2"
//                 //             disabled={!joined}
//                 //         >
//                 //             {mutedVideo ? "Enable Video" : "Disable Video"}
//                 //         </button>
//                 //     </div>
//                 //     <div className="flex gap-4 items-start">
//                 //         <div>
//                 //             <h3 className="mb-2">Local</h3>
//                 //             <div
//                 //                 id="local-player-container"
//                 //                 ref={localPlayerRef}
//                 //                 className="rounded border p-2"
//                 //                 style={{ width: 340 }}
//                 //             />
//                 //         </div>
//                 //         {/* <div>
//                 //             <h3 className="mb-2">Remote</h3>
//                 //             <div
//                 //                 id="remote-player-container"
//                 //                 ref={remoteContainerRef}
//                 //                 className="flex flex-wrap border rounded p-2"
//                 //                 style={{ minWidth: 340, minHeight: 260 }}
//                 //             />
//                 //         </div> */}
//                 //     </div>
//                 //     <div className="flex gap-4 items-start">
//                 //         {/* Local User */}
//                 //         {/* <div>
//                 //             <h3 className="mb-2">Local</h3>
//                 //             <div
//                 //                 id="local-player-container"
//                 //                 ref={localPlayerRef}
//                 //                 className="rounded border p-2 relative"
//                 //                 style={{ width: 340, height: 260 }}
//                 //             >
//                 //                 {!localUser.cameraOn && localUser.profileImage && (
//                 //                     <img
//                 //                         src={localUser.profileImage}
//                 //                         alt={localUser.name}
//                 //                         className="absolute top-0 left-0 w-full h-full object-cover rounded"
//                 //                     />
//                 //                 )}
//                 //                 <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
//                 //                     {localUser.name}
//                 //                 </div>
//                 //             </div>
//                 //         </div> */}

//                 //         {/* Remote Users */}
//                 //         <div>
//                 //             <h3 className="mb-2">Remote</h3>
//                 //             <div
//                 //                 id="remote-player-container"
//                 //                 ref={remoteContainerRef}
//                 //                 className="flex flex-wrap border rounded p-2"
//                 //                 style={{ minWidth: 340, minHeight: 260 }}
//                 //             >
//                 //                 {console.log({ remoteUsers: remoteUsers })}
//                 //                 {remoteUsers?.map((user) => (
//                 //                     <div
//                 //                         key={user.uid}
//                 //                         className="relative rounded m-1"
//                 //                         style={{ width: 150, height: 120 }}
//                 //                     >
//                 //                         {console.log({ user })}
//                 //                         {user.cameraOn && user.videoTrack ? (
//                 //                             <div
//                 //                                 ref={(el) => user.videoTrack && user.videoTrack.play(el)}
//                 //                                 className="w-full h-full"
//                 //                             />
//                 //                         ) : (
//                 //                             user.profileImage && (
//                 //                                 <img
//                 //                                     src={user.profileImage}
//                 //                                     alt={user.name}
//                 //                                     className="w-full h-full object-cover rounded"
//                 //                                 />
//                 //                             )
//                 //                         )}
//                 //                         <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white px-1 rounded text-xs">
//                 //                             {user.name}
//                 //                         </div>
//                 //                     </div>
//                 //                 ))}
//                 //             </div>
//                 //         </div>
//                 //     </div>
//                 // </div>
//                 <div className="p-4">
//                     <div className="mb-3 flex gap-2">
//                         {!joined ? (
//                             <button onClick={joinChannel} className="btn btn-primary">
//                                 Join Call
//                             </button>
//                         ) : (
//                             <button onClick={leaveChannel} className="btn btn-danger">
//                                 Leave Call
//                             </button>
//                         )}
//                     </div>

//                     <div className="grid grid-cols-3 gap-4">
//                         {/* Local user */}
//                         {joined && (
//                             <div className="border rounded p-2 text-center">
//                                 <h4>Me</h4>
//                                 {localVideoTrackRef.current ? (
//                                     <div id="local-player" />
//                                 ) : (
//                                     <img
//                                         src="https://via.placeholder.com/150"
//                                         alt="No video"
//                                         className="rounded-full mx-auto"
//                                     />
//                                 )}
//                             </div>
//                         )}
//                         {/* Remote users */}
//                         {remoteUsers.map((u) => (
//                             <div key={u.uid} className="border rounded p-2 text-center">
//                                 <h4>{u.name}</h4>
//                                 {u.video ? (
//                                     <div id={`remote-player-${u.uid}`} />
//                                 ) : (
//                                     <img
//                                         src="https://via.placeholder.com/150"
//                                         alt="User"
//                                         className="rounded-full mx-auto"
//                                     />
//                                 )}
//                                 <div className="mt-1 text-sm">
//                                     🎤 {u.audio ? "On" : "Off"} | 📷 {u.video ? "On" : "Off"}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="mt-3">
//                         Total users in call: {remoteUsers.length + (joined ? 1 : 0)}
//                     </div>
//                 </div>
//             }
//         </>
//     );
// };

export default function AgoraCall({ messageApi }) {
    const { state } = useLocation();
    const dispatch = useDispatch();

    const clientRef = useRef(null);

    const localAudioTrackRef = useRef(null);
    const localVideoTrackRef = useRef(null);

    const remoteContainerRef = useRef(null);
    const localPlayerRef = useRef(null);

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
    const publishedRef = useRef({ audio: false, video: false });

    const makeRemoteId = (uid) => `remote-player-${uid}`;

    useEffect(() => {
        clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        return () => {
            // cleanup on unmount
            if (clientRef.current) {
                try {
                    clientRef.current.removeAllListeners();
                } catch (e) { }
            };
        };
    }, []);

    const playRemoteVideo = (uid, videoTrack) => {
        try {
            const id = makeRemoteId(uid);
            const remoteDiv = document.getElementById(id);
            if (!remoteDiv) {
                console.warn(`Remote container for user ${uid} not found`);
                return;
            }
            videoTrack?.play(remoteDiv);
        } catch (err) {
            console.error("playRemoteVideo error:", err);
        }
    };

    const removeRemoteVideo = (uid) => {
        const el = document.getElementById(makeRemoteId(uid));
        if (el) el.innerHTML = ""; // clear content, not remove
    };

    useEffect(() => {
        userDataVideo.forEach((u) => {
            console.log({ uuuuuuuu: u })
            if (u.video && u.videoTrack) {
                const el = document.getElementById(makeRemoteId(u.uid));
                if (el && el.childNodes.length === 0) {
                    playRemoteVideo(u.uid, u.videoTrack);
                }
            }
        });
    }, [userDataVideo]);

    const attachRemoteHandlers = (client) => {
        if (!client) return;
        const handleUserJoined = (user) => {
            const callback = (response) => {
                setUserDataVideo((prev) => {
                    const exists = prev.find((u) => u.uid === user.uid);
                    if (exists) return prev;
                    return [
                        ...prev,
                        {
                            uid: user.uid,
                            audio: user?._audio_enabled_,
                            video: user?._video_enabled_,
                            name: response?.data?.name,
                            profile_image_url: response?.data?.profile_image_url,
                            videoTrack: user?.videoTrack
                        },
                    ];
                });
            };
            const data = {
                uid: user?.uid,
                phone_number: user?.uid,
            };
            // playRemoteVideo(user.uid,)
            dispatch(getUserDetailsForVideoCall({ callback, payload: data }));
            setRemoteUsers((prev) => {
                const exists = prev.find((u) => u.uid === user.uid);
                if (exists) return prev;
                return [
                    ...prev,
                    { uid: user.uid, audio: false, video: false, name: `User ${user.uid}` },
                ];
            });
        };

        const handleUserPublished = async (user, mediaType) => {
            try {
                await client.subscribe(user, mediaType);
            } catch (err) {
                console.error("Subscribe failed:", err);
                return;
            }
            console.log({ object: user })
            if (mediaType === "video") playRemoteVideo(user.uid, user.videoTrack);
            if (mediaType === "audio") user.audioTrack?.play();

            setUserDataVideo((prev) =>
                prev.map((u) =>
                    u.uid === user.uid
                        ? {
                            ...u,
                            audio: mediaType === "audio" ? true : u.audio,
                            video: mediaType === "video" ? true : u.video,
                            audioTrack: mediaType === "audio" ? user.audioTrack : u.audioTrack,
                            videoTrack: mediaType === "video" ? user.videoTrack : u.videoTrack,
                        }
                        : u
                )
            );
        };

        const handleUserUnpublished = (user, mediaType) => {
            if (mediaType === "video") removeRemoteVideo(user.uid);
            setUserDataVideo((prev) =>
                prev.map((u) =>
                    u.uid === user.uid
                        ? {
                            ...u,
                            audio: mediaType === "audio" ? false : u.audio,
                            video: mediaType === "video" ? false : u.video,
                        }
                        : u
                )
            );
        };

        const handleUserLeft = (user) => {
            const el = document.getElementById(`remote-player-${user.uid}`);
            if (el && el.parentNode) el.parentNode.removeChild(el);
            setUserDataVideo((prev) => prev.filter((u) => u.uid !== user.uid));
            setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
        };

        client.on("user-joined", handleUserJoined);
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        client.on("user-left", handleUserLeft);

        return () => {
            client.off("user-joined", handleUserJoined);
            client.off("user-published", handleUserPublished);
            client.off("user-unpublished", handleUserUnpublished);
            client.off("user-left", handleUserLeft);
        };
    };

    const joinChannel = async (TOKEN, APP_ID, CHANNEL, USER_UID = null) => {
        if (!clientRef.current) {
            console.error("Agora client not initialized yet");
            return;
        };
        if (joined) return;
        const client = clientRef.current;
        try {
            // join with null UID to avoid UID_CONFLICT
            const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, USER_UID);
            console.log("Joined channel uid:", uid);
            // create local player container ref if not present
            if (!localPlayerRef.current) {
                const container = document.getElementById("local-player-container");
                if (container) localPlayerRef.current = container;
            };
            // If preview created tracks already, we reuse them.
            // Try to create tracks if they don't exist (user may have no devices).
            try {
                if (!localAudioTrackRef.current) {
                    localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
                };
            } catch (err) {
                console.warn("No microphone found / permission denied, joining without audio.");
                localAudioTrackRef.current = null;
            };
            try {
                if (!localVideoTrackRef.current) {
                    localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
                };
            } catch (err) {
                console.warn("No camera found / permission denied, joining without video.");
                localVideoTrackRef.current = null;
            };
            // play local video into local-player container if exists
            if (localVideoTrackRef.current && localPlayerRef.current) {
                let localDiv = document.getElementById("local-player");
                if (!localDiv) {
                    localDiv = document.createElement("div");
                    localDiv.id = "local-player";
                    localDiv.style.width = "320px";
                    localDiv.style.height = "240px";
                    localDiv.style.margin = "8px";
                    localPlayerRef.current.appendChild(localDiv);
                };
                try {
                    localVideoTrackRef.current.play(localDiv);
                } catch (e) {
                    console.warn("play local video failed", e);
                };
            };
            // publish tracks if available
            const toPublish = [];
            if (localAudioTrackRef.current) toPublish.push(localAudioTrackRef.current);
            if (localVideoTrackRef.current) toPublish.push(localVideoTrackRef.current);
            if (toPublish.length > 0) {
                await client.publish(toPublish);
                publishedRef.current = {
                    audio: !!localAudioTrackRef.current,
                    video: !!localVideoTrackRef.current,
                };
            } else {
                publishedRef.current = { audio: false, video: false };
            };
            // attach remote handlers (register and keep cleanup function)
            const cleanupHandlers = attachRemoteHandlers(client);
            // store cleanup function on clientRef so leaveChannel can call it
            clientRef.current._cleanupHandlers = cleanupHandlers;
            setJoined(true);
            setIsPreView(false);
        } catch (err) {
            console.error("Failed to join channel:", err);
            alert("Failed to join: " + (err?.message || err));
        };
    };

    const leaveChannel = async () => {
        const client = clientRef.current;
        if (!client) return;
        try {
            // unpublish if published
            try {
                if (publishedRef.current.audio && localAudioTrackRef.current) {
                    await client.unpublish([localAudioTrackRef.current]);
                };
                if (publishedRef.current.video && localVideoTrackRef.current) {
                    await client.unpublish([localVideoTrackRef.current]);
                };
            } catch (e) {
                // ignore unpublish errors
            };
            // stop & close local tracks
            if (localAudioTrackRef.current) {
                try { localAudioTrackRef.current.stop(); } catch (e) { }
                try { localAudioTrackRef.current.close(); } catch (e) { }
                localAudioTrackRef.current = null;
            };
            if (localVideoTrackRef.current) {
                try { localVideoTrackRef.current.stop(); } catch (e) { }
                try { localVideoTrackRef.current.close(); } catch (e) { }
                localVideoTrackRef.current = null;
            };
            // remove local DOM player
            const localEl = document.getElementById("local-player");
            if (localEl && localEl.parentNode) localEl.parentNode.removeChild(localEl);
            // remove remote DOM players
            if (document.getElementById("remote-player-container")) {
                document.getElementById("remote-player-container").innerHTML = "";
            };
            // detach handlers if stored
            if (clientRef.current && clientRef.current._cleanupHandlers) {
                try { clientRef.current._cleanupHandlers(); } catch (e) { }
                clientRef.current._cleanupHandlers = null;
            };
            await client.leave();
            setUserDataVideo([]);
            setRemoteUsers([]);
            setJoined(false);
            publishedRef.current = { audio: false, video: false };
            setIsPreView(true);
        } catch (err) {
            console.error("Agora leave error:", err);
        };
    };

    const toggleAudio = async () => {
        const client = clientRef.current;
        try {
            if (localAudioTrackRef.current) {
                const willMute = !mutedAudio === false ? false : !mutedAudio;
                const newMuted = !mutedAudio;
                if (newMuted) {
                    if (joined && client) {
                        try { await client.unpublish([localAudioTrackRef.current]); } catch (e) { }
                        publishedRef.current.audio = false;
                    };
                    try { await localAudioTrackRef.current.setEnabled(false); } catch (e) { }
                    setMutedAudio(true);
                    setIsAudio(false);
                } else {
                    try { await localAudioTrackRef.current.setEnabled(true); } catch (e) { }
                    if (joined && client) {
                        try { await client.publish([localAudioTrackRef.current]); publishedRef.current.audio = true; } catch (e) { console.warn("publish audio failed", e); }
                    };
                    setMutedAudio(false);
                    setIsAudio(true);
                };
                return;
            };
            try {
                localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
                setMutedAudio(false);
                setIsAudio(true);
                if (joined && client) {
                    try { await client.publish([localAudioTrackRef.current]); publishedRef.current.audio = true; } catch (e) { console.warn("publish audio failed", e); }
                } else {
                    // preview-only: nothing else to do
                };
            } catch (err) {
                console.error("Failed to create mic:", err);
                alert("Unable to access microphone. Please check permissions or device.");
            };
        } catch (err) {
            console.error("toggleAudio error:", err);
        };
    };

    const toggleVideo = async () => {
        const client = clientRef.current;
        try {
            if (localVideoTrackRef.current) {
                const newMuted = !mutedVideo;
                if (newMuted) {
                    // turning off video -> unpublish (so remote sees video off) and disable
                    if (joined && client) {
                        try { await client.unpublish([localVideoTrackRef.current]); } catch (e) { }
                        publishedRef.current.video = false;
                    };
                    try { await localVideoTrackRef.current.setEnabled(false); } catch (e) { }
                    setMutedVideo(true);
                    setIsVideo(false);
                } else {
                    // turning on -> enable and publish (if joined), and play into local-player
                    try { await localVideoTrackRef.current.setEnabled(true); } catch (e) { }
                    if (joined && client) {
                        try { await client.publish([localVideoTrackRef.current]); publishedRef.current.video = true; } catch (e) { console.warn("publish video failed", e); }
                    };
                    // ensure playing in local-player
                    if (!localPlayerRef.current) {
                        const container = document.getElementById("local-player-container");
                        if (container) localPlayerRef.current = container;
                    };
                    let localDiv = document.getElementById("local-player");
                    if (!localDiv && localPlayerRef.current) {
                        localDiv = document.createElement("div");
                        localDiv.id = "local-player";
                        localDiv.style.width = "320px";
                        localDiv.style.height = "240px";
                        localDiv.style.margin = "8px";
                        localPlayerRef.current.appendChild(localDiv);
                    };
                    try { localVideoTrackRef.current.play(localDiv); } catch (e) { }
                    setMutedVideo(false);
                    setIsVideo(true);
                };
                return;
            };

            // if no video track exists, try to create and publish/play
            try {
                localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
                setMutedVideo(false);
                setIsVideo(true);
                // play preview or local player depending on joined
                if (joined) {
                    if (!localPlayerRef.current) {
                        const container = document.getElementById("local-player-container");
                        if (container) localPlayerRef.current = container;
                    };
                    let localDiv = document.getElementById("local-player");
                    if (!localDiv && localPlayerRef.current) {
                        localDiv = document.createElement("div");
                        localDiv.id = "local-player";
                        localDiv.style.width = "320px";
                        localDiv.style.height = "240px";
                        localDiv.style.margin = "8px";
                        localPlayerRef.current.appendChild(localDiv);
                    };
                    if (localDiv) {
                        try { localVideoTrackRef.current.play(localDiv); } catch (e) { }
                    };
                    if (client) {
                        try { await client.publish([localVideoTrackRef.current]); publishedRef.current.video = true; } catch (e) { console.warn("publish video failed", e); }
                    };
                } else {
                    // preview-only play inside preview container
                    if (remoteContainerRef.current) {
                        try { localVideoTrackRef.current.play(remoteContainerRef.current); } catch (e) { }
                    };
                };
            } catch (err) {
                console.error("Failed to create camera:", err);
                alert("Unable to access camera. Please check permissions or device.");
            };
        } catch (err) {
            console.error("toggleVideo error:", err);
        };
    };

    const handleJoinVideoCall = () => {
        setIsPreView(false);
        const callback = (response) => {
            if (response?.agora_token) {
                joinChannel(response?.agora_token, response?.agora_app_id, response?.agora_channel, response?.agora_user_uid);
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
                    setIsVideoAvailable={(val) => setIsVideoAvailable(val)}
                    setIsAudioAvailable={(val) => setIsAudioAvailable(val)}
                    isVideoAvailable={isVideoAvailable}
                    isAudioAvailable={isAudioAvailable}
                />
            ) : (
                <div className="p-4">
                    <div className="ct_video_call_main_bg_3">
                        <div className="mb-3 d-flex gap-2 justify-content-end">
                            {!joined ? (
                                <button onClick={handleJoinVideoCall} className="ct_yellow_btn ct_border_radius_10">
                                    Join Call
                                </button>
                            ) : (
                                <button onClick={leaveChannel} className="btn btn-danger">
                                    Leave Call
                                </button>
                            )}
                        </div>

                        <div className="ct_video_call_grid">
                            {joined && (
                                <div className="ct_signle_video_call">
                                    <h4>{userData?.attributes?.full_name ?? ""}</h4>
                                    {localVideoTrackRef.current ? (
                                        <div id="local-player" />
                                    ) : (
                                        <img src={userData?.attributes?.profile_image ? userData?.attributes?.profile_image : "assets/img/dummy_user_img.png"} alt="No video" className="rounded-full mx-auto" />
                                    )}
                                    <div className="mt-1 text-sm">🎤 {isAudio ? "On" : "Off"} | 📷 {isVideo ? "On" : "Off"}</div>
                                </div>
                            )}

                            <div className="ct_grid_4_234">
                                {userDataVideo.map((u) => (
                                    <div key={u.uid} className="ct_signle_video_call">
                                        <h4 className="ct_fs_20 ct_fw_600 mb-2">{u.name}</h4>
                                        {u.video ? (
                                            <div id={makeRemoteId(u.uid)} style={{ width: "100%", height: "240px", background: "#000" }} />
                                        ) : (
                                            <img src={u.profile_image_url || "assets/img/dummy_user_img.png"} alt={u.name} className="rounded-full mx-auto" />
                                        )}
                                        <div className="mt-1 text-sm">🎤 {u.audio ? "On" : "Off"} | 📷 {u.video ? "On" : "Off"}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-3 ct_fs_20 text-center">Total users in call: {userDataVideo.length + (joined ? 1 : 0)}</div>

                        <div className="mt-4 d-flex gap-2 justify-content-center">
                            <button onClick={toggleAudio} className={`ct_video_action_btn ${!isAudioAvailable && "ct_disable_call"}`}>
                                {mutedAudio ? <i class="fa-solid fa-microphone"></i> : <i class="fa-solid fa-microphone-slash"></i>}
                            </button>
                            <button onClick={toggleVideo} className={`ct_video_action_btn ${!isVideoAvailable && "ct_disable_call"}`}>
                                {mutedVideo ? <i class="fa-solid fa-video"></i> : <i class="fa-solid fa-video-slash"></i>}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}