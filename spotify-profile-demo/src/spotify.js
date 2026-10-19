async function fetchSpotify(token,endpoint){
    const result = await fetch(`https://api.spotify.com/v1/${endpoint}`,{
        method: "GET", headers: {Authorization: `Bearer ${token}`}
    });

    const data = await result.json();

    if (!result.ok) {
        throw new Error(`Spotify API error: ${result.status} - ${JSON.stringify(data)}`);
    }

    return data;
}


async function fetchProfile(token) {
    return await fetchSpotify(token,"me");
}

async function fetchFollowedArtists(token){
    const data = await fetchSpotify(token,"me/following?type=artist");
    return data.artists.items;
}

async function fetchPlaylists(token){
    const data = await fetchSpotify(token,"me/playlists");
    return data.items;
}

async function fetchSavedTracks(token){
    const data = await fetchSpotify(token,"me/tracks?limit=50");
    return data.items;
}

export {fetchFollowedArtists, fetchProfile, fetchPlaylists,fetchSavedTracks};