import { redirectToAuthCodeFlow, getAccessToken } from "./auth";
import {fetchFollowedArtists, fetchProfile,fetchPlaylists, fetchSavedTracks} from "./spotify";
import {populateArtist, populateUI,populatePlaylists, populateSavedTracks} from "./ui";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    
    const profile = await fetchProfile(accessToken);
    //populateUI(profile);

    const artists = await fetchFollowedArtists(accessToken);
    //populateArtist(artists);

    const playlists = await fetchPlaylists(accessToken);
    //populatePlaylists(playlists);

    const liked = await fetchSavedTracks(accessToken);
    populateSavedTracks(liked);
}