import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { joinRoomVideoCall } from "../../redux/actions/createRoom";
import VideoCallPreview from "./VideoCallPreview";

export default function AgoraCall({ messageApi }) {
    const { state } = useLocation();
    const dispatch = useDispatch();

    const clientRef = useRef(null);
    const localAudioTrackRef = useRef(null);

    const [isPreview, setIsPreView] = useState(true)

    const localVideoTrackRef = useRef(null);
    const localPlayerRef = useRef(null);

    const remoteContainerRef = useRef(null);
    const [joined, setJoined] = useState(false);

    const [mutedAudio, setMutedAudio] = useState(false);
    const [mutedVideo, setMutedVideo] = useState(false);

    const [isAudio, setIsAudio] = useState(true);
    const [isVideo, setIsVideo] = useState(true);

    const [remoteUsers, setRemoteUsers] = useState([]);
    const makeRemoteId = (uid) => `remote-player-${uid}`;

    useEffect(() => {
        clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        const client = clientRef.current;
        const handleUserPublished = async (user, mediaType) => {
            await client.subscribe(user, mediaType);
            if (mediaType === "video") {
                const remoteDiv = document.createElement("div");
                remoteDiv.id = makeRemoteId(user.uid);
                remoteDiv.style.width = "320px";
                remoteDiv.style.height = "240px";
                remoteDiv.style.margin = "8px";
                remoteContainerRef.current.appendChild(remoteDiv);
                user.videoTrack.play(remoteDiv.id);
            };
            if (mediaType === "audio") {
                user.audioTrack.play();
            };
            setRemoteUsers((prev) => {
                if (prev.find((u) => u.uid === user.uid)) return prev;
                return [...prev, user];
            });
        };
        const handleUserUnpublished = (user, mediaType) => {
            if (mediaType === "video") {
                const id = makeRemoteId(user.uid);
                const el = document.getElementById(id);
                if (el && el.parentNode) el.parentNode.removeChild(el);
            };
            setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
        };
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        return () => {
            client.off("user-published", handleUserPublished);
            client.off("user-unpublished", handleUserUnpublished);
        };
    }, []);

    // const joinChannel = async (TOKEN, APP_ID, CHANNEL, USER_UID = null) => {
    //     if (joined) return;
    //     const client = clientRef.current;
    //     try {
    //         const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, USER_UID || null);
    //         localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
    //         localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
    //         if (mutedAudio) {
    //             await localAudioTrackRef.current.setEnabled(false);
    //         }
    //         if (mutedVideo) {
    //             await localVideoTrackRef.current.setEnabled(false);
    //         }
    //         const localDiv = document.createElement("div");
    //         localDiv.id = "local-player";
    //         localDiv.style.width = "320px";
    //         localDiv.style.height = "240px";
    //         localDiv.style.margin = "8px";
    //         if (!localPlayerRef.current) {
    //             localPlayerRef.current = document.getElementById("local-player-container");
    //         }
    //         localPlayerRef.current.appendChild(localDiv);
    //         localVideoTrackRef.current.play(localDiv);
    //         await client.publish([localAudioTrackRef.current, localVideoTrackRef.current]);
    //         setJoined(true);
    //         setMutedAudio(mutedAudio || false);
    //         setMutedVideo(mutedVideo || false);
    //     } catch (err) {
    //         alert("Failed to join channel: " + err.message);
    //     }
    // };

    const joinChannel = async (TOKEN, APP_ID, CHANNEL, USER_UID = null) => {
        if (joined) return;

        const client = clientRef.current;

        try {
            // Join the channel first
            const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, USER_UID || null);

            // Create local tracks only if NOT muted
            if (!mutedAudio) {
                localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
            } else {
                localAudioTrackRef.current = null;
            }

            if (!mutedVideo) {
                localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
            } else {
                localVideoTrackRef.current = null;
            }

            // Create the local video container
            const localDiv = document.createElement("div");
            localDiv.id = "local-player";
            localDiv.style.width = "320px";
            localDiv.style.height = "240px";
            localDiv.style.margin = "8px";

            if (!localPlayerRef.current) {
                localPlayerRef.current = document.getElementById("local-player-container");
            }
            localPlayerRef.current.appendChild(localDiv);

            // Only play video if it's active
            if (localVideoTrackRef.current) {
                localVideoTrackRef.current.play(localDiv);
            }

            // Prepare list of active tracks to publish
            const tracksToPublish = [];
            if (localAudioTrackRef.current) tracksToPublish.push(localAudioTrackRef.current);
            if (localVideoTrackRef.current) tracksToPublish.push(localVideoTrackRef.current);

            // Publish only if any active track exists
            if (tracksToPublish.length > 0) {
                await client.publish(tracksToPublish);
            }

            // Update state
            setJoined(true);
            setMutedAudio(!!mutedAudio);
            setMutedVideo(!!mutedVideo);
        } catch (err) {
            alert("Failed to join channel: " + err.message);
            console.error(err);
        }
    };

    const leaveChannel = async () => {
        const client = clientRef.current;
        try {
            if (localAudioTrackRef.current) {
                localAudioTrackRef.current.stop();
                localAudioTrackRef.current.close();
                localAudioTrackRef.current = null;
            };
            if (localVideoTrackRef.current) {
                localVideoTrackRef.current.stop();
                localVideoTrackRef.current.close();
                localVideoTrackRef.current = null;
            };
            const localEl = document.getElementById("local-player");
            if (localEl && localEl.parentNode) localEl.parentNode.removeChild(localEl);
            await client.leave();
            if (remoteContainerRef.current) remoteContainerRef.current.innerHTML = "";
            setRemoteUsers([]);
            setJoined(false);
            setIsPreView(true);
        } catch (err) {
            console.error("Agora leave error:", err);
        };
    };

    const toggleAudio1 = async () => {
        if (!localAudioTrackRef.current) return;
        const newMuted = !mutedAudio;
        await localAudioTrackRef.current.setEnabled(!newMuted);
        setMutedAudio(newMuted);
        setIsAudio(!isAudio);
    };

    const toggleVideo1 = async () => {
        if (!localVideoTrackRef.current) return;
        const newMuted = !mutedVideo;
        await localVideoTrackRef.current.setEnabled(!newMuted);
        setMutedVideo(newMuted);
        setIsVideo(!isVideo);
        if (!newMuted) {
            const el = document.getElementById("local-player");
            if (el) localVideoTrackRef.current.play(el);
        };
    };

    const toggleAudio = async () => {
        if (!isAudio) {
            setIsAudio(true)
            const client = clientRef.current;
            if (localAudioTrackRef.current) {
                const enabled = !mutedAudio;
                await localAudioTrackRef.current.setEnabled(enabled);
                setMutedAudio(!enabled);
            } else {
                try {
                    localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
                    await client.publish([localAudioTrackRef.current]);
                    setMutedAudio(false);
                } catch (err) {
                    console.error("Failed to turn on mic:", err);
                }
            }
        } else {
            toggleAudio1()
        }
    };

    const toggleVideo = async () => {
        if (!isVideo) {
            setIsVideo(true)
            const client = clientRef.current;
            if (localVideoTrackRef.current) {
                const enabled = !mutedVideo;
                await localVideoTrackRef.current.setEnabled(enabled);
                setMutedVideo(!enabled);
            } else {
                try {
                    localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
                    const localDiv = document.getElementById("local-player");
                    if (localDiv) localVideoTrackRef.current.play(localDiv);
                    await client.publish([localVideoTrackRef.current]);
                    setMutedVideo(false);
                } catch (err) {
                    console.error("Failed to turn on camera:", err);
                }
            }
        } else {
            toggleVideo1();
        };
    };

    const handleJoinVideoCall = () => {
        setIsPreView(false);
        const callback = (response) => {
            if (response?.agora_token) {
                console.log({ response });
                joinChannel(response?.agora_token, response?.agora_app_id, response?.agora_channel, response?.agora_user_uid)
            };
        };
        const data = {
            room_id: state?.data?.id
        };
        dispatch(joinRoomVideoCall({ payload: data, messageApi, callback }));
    };

    return (
        <>
            {isPreview ?
                <VideoCallPreview
                    remoteContainerRef={remoteContainerRef}
                    onClick={handleJoinVideoCall}
                    toggleAudio={toggleAudio1}
                    toggleVideo={toggleVideo1}
                    mutedAudio={mutedAudio}
                    mutedVideo={mutedVideo}
                    localAudioTrackRef={localAudioTrackRef}
                    localVideoTrackRef={localVideoTrackRef}
                    joined={joined}
                />
                :
                <div className="p-4 max-w-4xl mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Agora Video Call (React)</h2>
                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={leaveChannel}
                            className="px-4 py-2 rounded shadow bg-red-500 text-white me-2"
                            disabled={!joined}
                        >
                            Leave
                        </button>
                        <button
                            onClick={toggleAudio}
                            className="px-4 py-2 rounded shadow bg-gray-200 me-2"
                            disabled={!joined}
                        >
                            {mutedAudio ? "Unmute Audio" : "Mute Audio"}
                        </button>
                        <button
                            onClick={toggleVideo}
                            className="px-4 py-2 rounded shadow bg-gray-200 me-2"
                            disabled={!joined}
                        >
                            {mutedVideo ? "Enable Video" : "Disable Video"}
                        </button>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div>
                            <h3 className="mb-2">Local</h3>
                            <div
                                id="local-player-container"
                                ref={localPlayerRef}
                                className="rounded border p-2"
                                style={{ width: 340 }}
                            />
                        </div>
                        <div>
                            <h3 className="mb-2">Remote</h3>
                            <div
                                id="remote-player-container"
                                ref={remoteContainerRef}
                                className="flex flex-wrap border rounded p-2"
                                style={{ minWidth: 340, minHeight: 260 }}
                            />
                        </div>
                    </div>
                </div>
            }
        </>
    );
};