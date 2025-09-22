import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = '611227230#1418219';
const TOKEN = "007eJxTYPhTG7k57Ouib/OetWrYT6/mMHq4np13ouTiurc89y6FKu9SYDBIMkgzN7U0SrQwTjIxME+xtDA2SEtJMzU2MExKS7Ww4H59IaMhkJFh6Z1VrIwMEAjiczMkZyTm5aXmlKQWlzAwAACkViPv";

const CHANNEL = "testChannel";

let client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoCall = () => {
    const [localTracks, setLocalTracks] = useState([]);
    const [remoteUsers, setRemoteUsers] = useState({});

    useEffect(() => {
        const init = async () => {
            const uid = await client.join(APP_ID, CHANNEL, TOKEN || null, null);
            const [micTrack, camTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
            setLocalTracks([micTrack, camTrack]);
            camTrack.play("local-player");
            await client.publish([micTrack, camTrack]);
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    user.videoTrack.play(`remote-player-${user.uid}`);
                };
                if (mediaType === "audio") {
                    user.audioTrack.play();
                };
                setRemoteUsers((prev) => ({ ...prev, [user.uid]: user }));
            });
            client.on("user-unpublished", (user) => {
                setRemoteUsers((prev) => {
                    const copy = { ...prev };
                    delete copy[user.uid];
                    return copy;
                });
            });
        };
        init();
        return () => {
            localTracks.forEach((track) => track.stop() && track.close());
            client.leave();
        };
    }, []);

    return (
        <div>
            <h2>Agora Video Call (Web)</h2>
            {/* Local Video */}
            <div id="local-player" style={{ width: 300, height: 200, background: "#000" }}></div>

            {/* Remote Videos */}
            {Object.keys(remoteUsers).map((uid) => (
                <div key={uid} id={`remote-player-${uid}`} style={{ width: 300, height: 200, background: "#111" }}></div>
            ))}
        </div>
    );
};

export default VideoCall;