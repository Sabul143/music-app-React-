import React from 'react';
import './App.css';

import Playlist from "../Playlist/Playlist";
import SearchBar from ".//SearchBar/SearchBar";
import SearchResult from "../SearchResults/SearchResults";
import Spotify from "../ultl/Spotify";

class App extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
         SearchResult:[],
         PlaylistName:"New Playlist",
         PlaylistTracks:[]
      };
      this.search = this.search.bind(this);
      this.addTrack=this.addTrack.bind(this);
      this.removeTrack=this.removeTrack.bind(this);
      this.updatePlaylistName=this.updatePlaylistName.bind(this);
      this.savePlaylist=this.savePlaylist.bind(this);
      this.removeTrackSearch=this.removeTrackSearch.bind(this);
      this.doThese=this.doThese.bind(this);
    }
 search(term){
    Spotify.search(term).then(SearchResult => {
        this.setState({SearchResult: SearchResult});
    });
 }
 addTrack(track){
    let tracks=this.state.PlaylistTracks;
    if(tracks.find(savedTrack=> savedTrack.id == track.id)){
        return;
    }
    tracks.push(track);
    this.setState({PlaylistTracks: tracks});
 }
 removeTrack(track) {
    let tracks = this.state.PlaylistTracks;
    let trackSearch=this.state.SearchResult;
    tracks=tracks.filter(currentTrack => currentTrack.id !== track.id)
    trackSearch.unshift(track);
    this.setState({playlistTracks: tracks});
 }
 removeTrackSearch(track){
    let track = this.state.SearchResult;
    tracks=tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({SearchResult:tracks});
 }
 doThese(track){
    this.addTrack(track);
    this.removeTrackSearch(track);
 }
 updatePlaylistName(name){
    this.setState({updatePlaylistName:name});
 }
 savePlaylist(){
    const trackUrls = this.state.playlistTracks.map(trak => track.url);
    Spotify.savePlaylist(this.state.PlaylistName,trackUrls).then( () => {
        this.setState({
            updatePlaylistName:"New Playlist",
            playlistTracks:[]
        });
    });
 }
}
function App(){
    return(
        <div>
            <h1>
                <a href='http://localhost:3000'>Musicprofile</a>
            </h1>
            <div className='App'>
                <SearchBar onSeacrh={this.search}/>
                <div className='App-playlist'>
                    <SearchResult SearchResult={this.state.SearchResult} onAdd={this.doThese}/>
                    <Playlist playlistTracks={this.state.PlaylistTracks} 
                    onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} 
                    onSave={this.savePlayliat}/>
                </div>
            </div>
        </div>
    );
}
export default App;