interface FigureProps {
    style: React.CSSProperties;
    onClick: () => void;
  }


function Figure({ style, onClick }: FigureProps) {
  return (
    <div
    className={`
      rounded-full p-3 h-20 w-20 flex items-center justify-center absolute cursor-pointer
    `}
    style={style}
    onClick={onClick}
  ><img className="h-full w-full" src="../imgs/bird.gif" alt="bird" /></div>
);
}

export default Figure