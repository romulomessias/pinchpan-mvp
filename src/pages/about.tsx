import styles from "./style.module.scss";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const About = () => {
  return (
    <main className={styles.main} style={{ touchAction: "none" }}>
      <TransformWrapper
        options={{
          minScale: 0.125,
          maxScale: 10,
          limitToBounds: false,
        }}
        pan={{
            velocity: true,
            velocityEqualToMove: true
            

        }}

        zoomIn={{
            animation: false,
            step: 100
        }}

        zoomOut={{
            animation: false
        }}
      >
        <TransformComponent>
          <article>
            <div className={styles.content}>Hello</div>
          </article>
        </TransformComponent>
      </TransformWrapper>
      <footer>Hello</footer>
    </main>
  );
};

export default About;
