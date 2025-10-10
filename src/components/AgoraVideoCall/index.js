import React, { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { joinRoomVideoCall } from "../../redux/actions/createRoom";

export default function AgoraCall({ messageApi }) {
    const { state } = useLocation();
    const dispatch = useDispatch();

    const clientRef = useRef(null);
    const localAudioTrackRef = useRef(null);

    const localVideoTrackRef = useRef(null);
    const localPlayerRef = useRef(null);

    const remoteContainerRef = useRef(null);
    const [joined, setJoined] = useState(false);

    const [mutedAudio, setMutedAudio] = useState(false);
    const [mutedVideo, setMutedVideo] = useState(false);

    const [remoteUsers, setRemoteUsers] = useState([]);

    // const APP_ID = '611227230#1418219';
    // const TOKEN = "007eJxTYPhTG7k57Ouib/OetWrYT6/mMHq4np13ouTiurc89y6FKu9SYDBIMkgzN7U0SrQwTjIxME+xtDA2SEtJMzU2MExKS7Ww4H59IaMhkJFh6Z1VrIwMEAjiczMkZyTm5aXmlKQWlzAwAACkViPv";

    // const CHANNEL = "channeltest";
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

    const joinChannel = async (TOKEN, APP_ID, CHANNEL) => {
        if (joined) return;
        const client = clientRef.current;
        try {
            const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, null);
            localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
            localVideoTrackRef.current = await AgoraRTC.createCameraVideoTrack();
            const localDiv = document.createElement("div");
            localDiv.id = "local-player";
            localDiv.style.width = "320px";
            localDiv.style.height = "240px";
            localDiv.style.margin = "8px";
            if (!localPlayerRef.current) {
                localPlayerRef.current = document.getElementById("local-player-container");
            };
            localPlayerRef.current.appendChild(localDiv);
            localVideoTrackRef.current.play(localDiv);
            await client.publish([localAudioTrackRef.current, localVideoTrackRef.current]);
            setJoined(true);
            setMutedAudio(false);
            setMutedVideo(false);
        } catch (err) {
            console.error("Agora join error:", err);
            alert("Failed to join channel: " + err.message);
        };
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
        } catch (err) {
            console.error("Agora leave error:", err);
        };
    };

    const toggleAudio = async () => {
        if (!localAudioTrackRef.current) return;
        const newMuted = !mutedAudio;
        await localAudioTrackRef.current.setEnabled(!newMuted);
        setMutedAudio(newMuted);
    };

    const toggleVideo = async () => {
        if (!localVideoTrackRef.current) return;
        const newMuted = !mutedVideo;
        await localVideoTrackRef.current.setEnabled(!newMuted);
        setMutedVideo(newMuted);
        if (!newMuted) {
            const el = document.getElementById("local-player");
            if (el) localVideoTrackRef.current.play(el);
        };
    };

    const handleJoinVideoCall = () => {
        console.log({ state: state?.data });
        const callback = (response) => {
            if (response?.agora_token) {
                joinChannel(response?.agora_token, response?.agora_app_id, response?.agora_channel)
            };
        };
        const data = {
            room_id: state?.data?.id
        };
        dispatch(joinRoomVideoCall({ payload: data, messageApi, callback }));
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Agora Video Call (React)</h2>
            <div className="flex gap-4 mb-4">
                <button
                    onClick={handleJoinVideoCall}
                    className="px-4 py-2 rounded shadow bg-green-500 text-white disabled:opacity-50"
                    disabled={joined}
                >
                    Join
                </button>
                <button
                    onClick={leaveChannel}
                    className="px-4 py-2 rounded shadow bg-red-500 text-white"
                    disabled={!joined}
                >
                    Leave
                </button>
                <button
                    onClick={toggleAudio}
                    className="px-4 py-2 rounded shadow bg-gray-200"
                    disabled={!joined}
                >
                    {mutedAudio ? "Unmute Audio" : "Mute Audio"}
                </button>
                <button
                    onClick={toggleVideo}
                    className="px-4 py-2 rounded shadow bg-gray-200"
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
    );
};