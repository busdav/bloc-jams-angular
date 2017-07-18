(function() {
  function SongPlayer(Fixtures) {
       var SongPlayer = {};


       /**
       * @function getAlbum
       * @desc Returns appropriate album
       * @returns {Object} albumPicasso
       */
       var currentAlbum = Fixtures.getAlbum();


       /**
      * @desc Buzz object audio file
      * @type {Object}
      */
       var currentBuzzObject = null;


       /**
       * @function setSong
       * @desc Stops currently playing song and loads new audio file as currentBuzzObject
       * @param {Object} song
       */
       var setSong = function(song) {
          if (currentBuzzObject) {
              stopSong(); // QUESTION
              // currentBuzzObject.stop();
              // SongPlayer.currentSong.playing = null;
          }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
              preload: true
          });

          SongPlayer.currentSong = song;
       };


       /**
       * @function playSong
       * @desc Play the passed song and sets song.playing to true
       * @param {Object} song
       */
       var playSong = function(song) {
         currentBuzzObject.play();
         song.playing = true;
       };


        /**
        * @function stopSong
        * @desc Stop the currently playing song and sets song.playing to false
        */
        var stopSong = function() {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
          // QUESTION instruction was song.playing = null;
        };


       /**
       * @function getSongIndex
       * @desc Get index of the passed song
       * @param {Object} song
       */
       var getSongIndex = function(song) {
           return currentAlbum.songs.indexOf(song);
       };







        /**
       * @desc Active song object from list of songs
       * @type {Object}
       */
        SongPlayer.currentSong = null; // QUESTION I deleted `var = `, because with it, it threw an error. correct? 


       /**
       * @function play
       * @desc Play current or new song
       * @param {Object} song
       */
        SongPlayer.play = function(song) {
          song = song || SongPlayer.currentSong;
          if (SongPlayer.currentSong !== song) {
              setSong(song);
              playSong(song);

          } else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
                 currentBuzzObject.play();
             }
           }
        };


        /**
        * @function pause
        * @desc Pause current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
          };


        /**
        * @function previous
        * @desc Skip to previous song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
              stopSong(); // QUESTION
              // currentBuzzObject.stop();
              // SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


        /**
        * @function next
        * @desc Skip to next song
        */
        SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex > currentAlbum.songs.length - 1) {
            stopSong(); // QUESTION
            // currentBuzzObject.stop();
            // SongPlayer.currentSong.playing = null;
          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };


    return SongPlayer;
};


    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
