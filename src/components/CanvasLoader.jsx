import { Html } from "@react-three/drei";

const CanvasLoader = () => {
  return (
    <Html
      as="div"
      portal={document.body} // Portal to body to break out of canvas stacking context
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#050816",
        zIndex: 100000,
        overflow: "hidden", 
      }}
    >
      <div className="loader-container">
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>

      <style>
        {`
          .loader-container {
            perspective: 1000px;
            width: 100px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .cube {
            width: 50px;
            height: 50px;
            position: relative;
            transform-style: preserve-3d;
            animation: rotateCube 2s infinite linear;
          }
          .face {
            position: absolute;
            width: 50px;
            height: 50px;
            background: rgba(145, 94, 255, 0.2);
            border: 2px solid #915eff;
            box-shadow: 0 0 10px #915eff;
          }
          .front  { transform: rotateY(0deg) translateZ(25px); }
          .back   { transform: rotateY(180deg) translateZ(25px); }
          .right  { transform: rotateY(90deg) translateZ(25px); }
          .left   { transform: rotateY(-90deg) translateZ(25px); }
          .top    { transform: rotateX(90deg) translateZ(25px); }
          .bottom { transform: rotateX(-90deg) translateZ(25px); }

          @keyframes rotateCube {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
          }
        `}
      </style>

      <p
        style={{
          fontSize: 16,
          color: "#F1F1F1",
          fontWeight: 600,
          marginTop: 40,
          textAlign: "center",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Loading assets for smoother experience...
      </p>
    </Html>
  );
};

export default CanvasLoader;
