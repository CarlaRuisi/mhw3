//richiesta token
const client_id='d37601bace9e463f9cbc3009daee36f2';
const client_secret='7b207bc2184e49ec9596240528a4ad12';
let artist_id;
const api_key='4b5c972bf8f693498af3881a1b0ad609';



function onJsonid(json){
    console.log(json);
    let result=json.tracks;
    let result_length=result.length;
    if (result_length>5){
        result_length=5;
    }
    const Artisti=document.querySelector("#Album_Artisti");
    Artisti.innerHTML='';
    for( let i=0;i<result_length;i++){
        const element=document.createElement('div');
        let image=document.createElement('img');
        image.src= result[i].album.images[0].url;
        let artist_1=document.createElement('h2');
        artist_1.textContent=result[i].artists[0].name;
        let title=document.createElement('h1');
        title.textContent=result[i].name;
        let duration=document.createElement('h5');
        duration.textContent=result[i].duration_ms;
        element.classList.add('Album');
        element.append(image);
        artist_1.classList.add('text_result');
        element.append(artist_1);
        title.classList.add('text_result');
        element.append(title);
        duration.classList.add('text_result');
        element.append(duration);
        Artisti.append (element);
    }
}

function onResponseid(response){
    return response.json();
}

function onJsonSongs(json){
    console.log("Json Song ricevuto");
    console.log(json);   
    let result=json.artists.items;
    let result_length=result.length;
    console.log(result_length);
    if(result_length>1){
        result_length=1;
    }
    for(let i=0;i<result_length;i++){
        artist_id=result[i].id;
        console.log(artist_id);
        fetch("https://api.spotify.com/v1/artists/"+artist_id+"/top-tracks",
        {
            headers:
            {
                'Authorization': 'Bearer ' + token
             }
        }).then(onResponseid).then(onJsonid);
       }
    }

function onResponseSongs(response){
    return response.json();
}

function onJsonArtist(json){
    console.log('Json ricevuto');
    console.log(json);
    let result=json.artists.items;
    console.log(result);
    let num_result=result.length;
    if(num_result>1){
        num_result=1;
    }
    const Artisti=document.querySelector("#Album_Artisti");
    Artisti.innerHTML='';
    for(let i=0;i<num_result;i++){
        const element=document.createElement('div');
        const immagine=document.createElement('img');
        immagine.src=result[i].images[0].url;
        const follower=document.createElement('h2');
        follower.textContent='followers:'+result[i].followers.total;
        name_artist=document.createElement('h1');
        name_artist.textContent=result[i].name;
        const gener=document.createElement('h3');
        gener.textContent=result[i].genres[0];
        const id=result[i].id;
        element.classList.add('Album');
        element.append(name_artist);
        element.append(immagine);
        element.append(gener);
        element.append(follower);
        Artisti.append(element);    
        }
    }

function onResponseArtist(response){
    return response.json();
}
function onJsonAlbum(json){
    console.log('Json ricevuto');
    console.log(json);
    let result=json.albums.items;
    console.log(result);
    const Album=document.querySelector("#Album_Artisti");
    Album.innerHTML='';
    let num_length=result.length;
    console.log(num_length);
    if(num_length>=20){
        num_length=8;
    }
    for(let i=0;i<num_length;i++){
        const element=document.createElement('div');
        let immagine=result[i].images[0].url;
        let title=result[i].name;
        let num_total=result[i].total_tracks;
        let date=result[i].release_date;
        const copertina=document.createElement('img');
        copertina.src=immagine;
        const titolo=document.createElement('h1');
        titolo.textContent=title;
        const num_canzoni=document.createElement('p');
        num_canzoni.textContent=num_total;
        const data=document.createElement('p');
        data.textContent=date;
        element.classList.add('Album_Artisti');
        element.appendChild(copertina);
        element.appendChild(titolo);
        element.appendChild(num_canzoni);
        element.appendChild(data);
        Album.appendChild(element);
    }
    Album.classList.add("scroll")
}
function onResponseAlbum(response){
    console.log("Richiesta Album ricevuta");
    return response.json();
}
function onResponseMusic(response){
    return response.json();
}

function onJsonMusic(json){
console.log(json);
}

function search(event){
    event.preventDefault();
    const valore=document.querySelector('#valore').value;
    if(valore){
        const text=encodeURIComponent(valore);//trasformo il valore di val in un testo comprensibile per API
        console.log('eseguo la ricerca per:'+ text);
        console.log(valore);
        const tipo=document.querySelector('#val').value;
        console.log('Il tipo scelto è:'+tipo);
        if(tipo=='artista'){
            fetch("https://api.spotify.com/v1/search?type=artist&q="+text,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                 }
            }).then(onResponseArtist).then(onJsonArtist);
            fetch("https://api.mu  https://api.musixmatch.com/ws/v1.1/track.get?apikey="+api_key)
            .then(onResponseMusic).then(onJsonMusic);
           }
        else if(tipo =='album') {
            fetch("https://api.spotify.com/v1/search?type=album&q="+text,
                {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
                }).then(onResponseAlbum).then(onJsonAlbum);
            }
        else if(tipo =='song'){
            fetch("https://api.spotify.com/v1/search?type=artist&q="+text,
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }).then(onResponseSongs).then(onJsonSongs);
            info_genius();
        }
    }
}

function onJson(json){
    token=json.access_token;//restituisce il token
    console.log(token)
}
function onResponse(response){
    return response.json();
}

fetch('https://accounts.spotify.com/api/token',{
    method:"POST",
    body:"grant_type=client_credentials",
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+btoa(client_id+':'+client_secret),
        }
    }
).then(onResponse).then(onJson);


const form= document.querySelector('.form_context');
form.addEventListener('submit',search);

