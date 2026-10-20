import { redirectToAuthCodeFlow, getAccessToken } from "./auth";
import {fetchSavedTracks} from "./spotify";
import {populateSavedTracks} from "./ui";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);

    const liked = await fetchSavedTracks(accessToken);
    populateSavedTracks(liked);

    poll(accessToken);
}

async function poll(token){
    while(true){
        try{
            const spotifyData = await fetchSavedTracks(token);
            const currSongs = spotifyData.total;

            const result = await fetch("http://localhost:5000/api/spotify-data");

            if(result.status === 404){
                const response = await fetch("http://localhost:5000/api/spotify-data",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "numSongs" : currSongs
                    })
                }
                );
            }
            else if(!result.ok){
                throw new Error(`Failed to load data: ${result.status}`);
            }
            else{
                const savedData = await result.json();


                const numSongs = savedData.numSongs;
                const change = currSongs - numSongs;

                if(change > 0){
                    //Filter logic
                }

                const response = await fetch("http://localhost:5000/api/spotify-data",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "numSongs" : currSongs
                    })
                }
                );
            }    
        }
        catch(error){
            console.error(`Attempt failed: `, error.message);
        }

        await new Promise(resolve => setTimeout(resolve,30000));
    }
}