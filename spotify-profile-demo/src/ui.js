function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
    
}

function populateList(list,hId){
    const container = document.getElementById(hId);
    container.innerHTML = "";

    if(list.length === 0){
        container.innerText = "Empty list";
        return;
    }

    list.forEach(item => {
        const card = document.createElement("div");
        const name = document.createElement("h3");

        name.innerText = item.name;

        card.appendChild(name);
        container.appendChild(card);
    });
}

function populateArtist(artists){
    populateList(artists,"artists");
}

function populatePlaylists(playlists){
    populateList(playlists,"playlists");
}

function populateSavedTracks(like){
    const liked = like.items;
    const container = document.getElementById("liked");
    container.innerHTML = "";

    if(liked.length === 0){
        container.innerText = "Empty list";
        return;
    }

    liked.forEach(item => {
        const card = document.createElement("div");
        const name = document.createElement("h3");

        name.innerText = item.track.name;

        card.appendChild(name);
        container.appendChild(card);
    });
}

export {populateArtist, populateUI,populatePlaylists, populateSavedTracks};