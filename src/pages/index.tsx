import styles from "./style.module.scss";

import {
  FC,
  useState,
  useRef,
  MouseEvent,
  WheelEvent,
  Fragment,
  useEffect,
} from "react";
// import Link from "next/link";

const IndexPage: FC = () => {
  const [scale, setScale] = useState(0.75);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offsetPosition, setOffsetPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const onMouseDawn = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const tmpOffset = {
      x: position.x - e.clientX,
      y: position.y - e.clientY,
    };

    setOffsetPosition(tmpOffset);
  };

  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    console.log(e);
    setIsDragging(false);
  };

  const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const dragItem = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!isDragging) {
      return;
    }
    const x = offsetPosition.x + e.clientX;
    const y = offsetPosition.y + e.clientY;

    const tmpPosition = {
      x,
      y,
    };

    setPosition(tmpPosition);
  };

  const onWheel = (e: WheelEvent<HTMLElement>) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
    // console.log({
    //   e
    // })

    // const x = position.x + (e.deltaX * -2);
    // const y = position.y + (e.deltaY * -2);

    // const tmpPosition = {
    //   x,
    //   y,
    // };

    // setPosition(tmpPosition);
    let deltaScale = scale + e.deltaY * -0.01;
    let tmpScale = Math.min(Math.max(0.125, deltaScale), 8);

    console.log("whell", e.deltaY);
    setScale(tmpScale);
  };

  useEffect(() => {
    document.body.addEventListener("mousewheel", function (e) {
      e.preventDefault();
    });
  }, []);

  return (
    <main
      className={styles.main}
      style={{ touchAction: "none" }}
      onWheel={onWheel}
    >
      <article
        ref={itemRef}
        onMouseDown={onMouseDawn}
        onMouseUp={onMouseUp}
        onMouseMove={dragItem}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? "" : "transform 0.25s",
        }}
      >
        <div className={styles.content}>
          <div style={{ opacity: scale }}>
            {scale}
            {scale > 0.5 && (
              <Fragment>
                <div>{JSON.stringify(position)}</div>
                <div>{JSON.stringify(offsetPosition)}</div>
              </Fragment>
            )}
            <div>{itemRef.current?.offsetLeft}</div>
            <div>{itemRef.current?.offsetTop}</div>
            <div>{itemRef.current?.offsetHeight}</div>
            <div>{itemRef.current?.offsetWidth}</div>
          </div>
        </div>
      </article>

      <footer>
        <button
          onClick={() => {
            setPosition({ x: 0, y: 0 });
          }}
        >
          reset position
        </button>

        <button
          onClick={() => {
            setScale(1);
          }}
        >
          reset scale
        </button>
      </footer>
    </main>
  );
};

export default IndexPage;
