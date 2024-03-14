import { playlists } from '@/lib/data';
import { Pause, Play } from './Player';
import { useplayerStore } from '@/store/playerStore';

export function CardPlayButton({ id, size = 'small' }) {

  const {
    currentMusic,
    isPlaying,
    setIsPlaying,
    setCurrentMusic
  } = useplayerStore(state => state);
  
  const isPLayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {

    if(isPLayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({songs, playlist, song: songs[0]})
        console.log({playlist, songs})
      });
  }

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-5 h-5'


  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-3 hover:scale-105 transition hover:bg-green-400">
      { isPLayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName}/>}
    </button>
  );
}