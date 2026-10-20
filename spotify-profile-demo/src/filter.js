const response = await fetch("http://localhost:5000/api/spotify-data");

if(!response.ok){
    throw new Error("Failed to load saved data");
}

const savedData = await response.json();
const numSongs = savedData.numSongs;


export {numSongs};