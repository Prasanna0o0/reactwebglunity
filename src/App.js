// import React, { useRef } from "react";
// import { Unity, useUnityContext } from "react-unity-webgl";

// function App() {
//   const unityRef = useRef(null);

//   const handleToggleVR = () => {
//     const unityContent = unityRef.current?.getUnityContent();
//     if (
//       unityContent &&
//       unityContent.unityInstance &&
//       unityContent.unityInstance.Module
//     ) {
//       unityContent.unityInstance.Module.WebXR.toggleVR();
//     } else {
//       console.error("Unity instance or Module not available.");
//     }
//   };
//   const { unityProvider } = useUnityContext({
//     loaderUrl: "/webxr2030/Build/webxr2030.loader.js",
//     dataUrl: "/webxr2030/Build/webxr2030.data.unityweb",
//     frameworkUrl: "/webxr2030/Build/webxr2030.framework.js.unityweb",
//     codeUrl: "/webxr2030/Build/webxr2030.wasm.unityweb",
//   });

//   // We'll round the loading progression to a whole number to represent the
//   // percentage of the Unity Application that has loaded.

//   return (
//     <div className="container">
//       <h1>hi</h1>

//       <Unity
//         style={{ width: "2000px", height: "1000px" }}
//         unityProvider={unityProvider}
//       />
//       <button onClick={handleToggleVR}>Toggle VR Mode</button>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function App() {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: "/webxr2030/Build/webxr2030.loader.js",
    dataUrl: "/webxr2030/Build/webxr2030.data.unityweb",
    frameworkUrl: "/webxr2030/Build/webxr2030.framework.js.unityweb",
    codeUrl: "/webxr2030/Build/webxr2030.wasm.unityweb",
  });

  // We'll use a state to store the device pixel ratio.
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  useEffect(
    function () {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

  return (
    <Unity
      unityProvider={unityProvider}
      style={{ width: 800, height: 600 }}
      devicePixelRatio={devicePixelRatio}
    />
  );
}

export default App;
