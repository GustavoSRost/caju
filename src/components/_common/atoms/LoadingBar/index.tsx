import styled from "styled-components";

export const LoadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  background-color: #f3f3f3;
  border-radius: 2px;
  overflow: hidden;
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    258deg,
    rgba(255, 117, 0, 1) 8%,
    rgba(232, 5, 55, 1) 53%
  );
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const LoadingBarComponent: React.FC = () => {
  return (
    <LoadingContainer>
      <LoadingBar />
    </LoadingContainer>
  );
};

export default LoadingBarComponent;
