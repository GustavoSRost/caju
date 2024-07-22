import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loaderSvg">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="8%" style={{ stopColor: 'rgb(255, 117, 0)', stopOpacity: 1 }} />
            <stop offset="53%" style={{ stopColor: 'rgba(232, 5, 55, 1)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <style>
          {`
            .loaderSvg {
              position: fixed;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              display: flex;
              background-color: #000000a8;
              justify-content: center;
              align-items: center;
            }
            .loaderSvg > svg {
              z-index: 1000;
            }
            .spinner_z9k8 {
              transform-origin: center;
              animation: spinner_StKS .75s infinite linear;
            }
            @keyframes spinner_StKS {
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <path
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          opacity=".25"
          fill="url(#gradient1)"
        />
        <path
          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          className="spinner_z9k8"
          fill="url(#gradient1)"
        />
      </svg>
    </div>
  );
};

export default Loading;
