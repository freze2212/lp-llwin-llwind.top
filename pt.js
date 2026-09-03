(function () {
  const css = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-user-select: none;
      user-select: none;
    }

    body {
      background-color: #000000;
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center; 
      align-items: center;     
      overflow: hidden; 
      position: relative;       
    }

    .grid-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
      background-image: 
        linear-gradient(to right, rgba(255, 140, 0, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 140, 0, 0.07) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0.2) 85%);
      -webkit-mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0.2) 85%);
    }

    .spot {
      position: fixed;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.25;
      z-index: 0;
      pointer-events: none;
      animation: floatGlow 8s ease-in-out infinite alternate;
    }

    .spot-1 {
      top: 20%;
      left: 20%;
      width: 320px;
      height: 320px;
      background: #ff8c00;
      animation-delay: 0s;
    }

    .spot-2 {
      bottom: 15%;
      right: 20%;
      width: 380px;
      height: 380px;
      background: #ffaa00;
      animation-delay: -3s;
    }

    .spot-3 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 500px;
      background: #ff4500;
      opacity: 0.15;
      animation-delay: -5s;
    }

    @keyframes floatGlow {
      0% {
        transform: scale(0.8) translate(0, 0);
        opacity: 0.15;
      }
      100% {
        transform: scale(1.2) translate(20px, -20px);
        opacity: 0.35;
      }
    }

    #bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    }

    video {
      position: relative;
      z-index: 1;
      height: 100%;
      width: auto;
      max-width: 100%;
      object-fit: cover;
      pointer-events: none !important;
      -webkit-touch-callout: none;
    }

    .click-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999999;
      cursor: pointer;
      background: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
    }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  function getTargetUrl() {
    return window.REDIRECT_URL || "https://www.31llwin.com/?id=470458166";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const gridBg = document.createElement("div");
    gridBg.className = "grid-bg";
    document.body.appendChild(gridBg);

    ["spot-1", "spot-2", "spot-3"].forEach((cls) => {
      const spot = document.createElement("div");
      spot.className = `spot ${cls}`;
      document.body.appendChild(spot);
    });

    const canvas = document.createElement("canvas");
    canvas.id = "bg-canvas";
    document.body.appendChild(canvas);

    const video = document.createElement("video");
    video.id = "myVideo";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.controls = false;
    video.removeAttribute("controls");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-video-player-type", "h5-page");
    video.setAttribute("x5-video-player-fullscreen", "true");
    video.setAttribute("disablePictureInPicture", "true");
    video.setAttribute("controlsList", "nodownload nofullscreen noremoteplayback");
    video.preload = "auto";

    const source = document.createElement("source");
    source.src = "uploads/video.mp4";
    source.type = "video/mp4";
    video.appendChild(source);

    document.body.appendChild(video);

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.className = "click-overlay";
    document.body.appendChild(overlay);

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();

    let isRedirected = false;
    const redirect = () => {
      if (!isRedirected) {
        isRedirected = true;
        window.location.replace(getTargetUrl());
      }
    };

    const autoRedirectTimer = setTimeout(redirect, 10000);

    const handleInteraction = () => {
      clearTimeout(autoRedirectTimer);
      redirect();
    };

    overlay.addEventListener("click", handleInteraction);
    overlay.addEventListener("touchend", handleInteraction);

    document.addEventListener("touchstart", playVideo, { once: true });
    document.addEventListener("click", playVideo, { once: true });

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        speedY: -(Math.random() * 0.3 + 0.1)
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 0, ${p.alpha})`;
        ctx.fill();

        p.y += p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  });
})();
