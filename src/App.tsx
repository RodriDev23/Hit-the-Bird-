import { useState, useRef, useEffect } from 'react'
import Figure from './components/Figure'

function App() {
  const [status, setStatus] = useState<'initial' | 'playing' | 'finish'>('initial');
  const [timer, setTimer] = useState<number>(0);
  const [position, setPosition] = useState<[number, number]>([
    Math.floor(Math.random() * 40),
    Math.floor(Math.random() * 15),
  ]);
  const [score, setScore] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleClick() {
    const updatedScore = score + 1;
    setScore(updatedScore);
    if (updatedScore === 10) {
      setStatus('finish');
    }
    setPosition([Math.floor(Math.random() * 90), Math.floor(Math.random() * 60)]);
    if (audioRef.current) {
      audioRef.current.currentTime = 0; 
    }
  }


  useEffect(() => {
    if (position && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [position]);


  useEffect(() => {
    let intervalId: number;
  
    if (status === 'playing') {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 100);
    }
  
    return () => clearInterval(intervalId);
  }, [status]);




  return (
    <main
      className="container justify-center m-auto 0 text-center grid h-full w-full grid-rows-4 bg-black md:max-w-[600px] sm:max-w-[600px]"
      style={{ backgroundImage: "url('../imgs/bg.gif')", backgroundRepeat: 'repeat', height: 'full' }}
      >
        
    <header>
   
    { status === 'initial' &&
      <div className="nes-container is-dark with-title text-xl">
        <h2 className='nes-text text-white'>Welcome to the game</h2>
        <p>You gonna have 10 seconds to hit the bird 10 times!</p>
     </div>

     } 




   { status === 'playing' &&
      <div className="nes-container is-dark with-title text-xl mt-5">
        <h2 className='nes-text text-white'>{Math.round((timer / 10) * 100) / 100} Seconds</h2>
        <p>You hit the bird {score} times!</p>
     </div>

     }

{ status === 'finish' &&
      <div className="nes-container is-dark with-title text-xl">
        <p>You Won the Game!</p>
     </div>

     } 



    </header>
      <section className="relative">
        {status === 'playing' && (
          <Figure style={position && { top: `${position[0]}%`, left: `${position[1]}%` }} onClick={handleClick} />
        )}
        <audio ref={audioRef} src="../sounds/punch.wav" />
      </section>
      <footer>
        {status === 'initial' && (
          <button onClick={() => setStatus('playing')} className="nes-btn py-5 px-10 rounded-md mt-[23vh]">
            Play
          </button>
        )}
        {status === 'playing' && (
          <button onClick={() => setStatus('finish')} className="nes-btn py-5 px-10 rounded-md mt-[23vh]">
            Stop
          </button>
        )}
        {status === 'finish' && (
          <button
            onClick={() => {
              setStatus('initial');
              setTimer(0);
              setScore(0); 
            }}
            className="nes-btn py-5 px-10 rounded-md mt-[23vh]">
            Restart
          </button>
        )}
      </footer>
      <style>
    @media screen and (min-width: 768px)
    </style>
    </main>
  );
}

export default App;
