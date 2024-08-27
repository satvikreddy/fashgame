import React, { useEffect } from "react";
import { ErrorBoundary as ErrorBoundaryWrapper } from "react-error-boundary";

type Props = { children: any };

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      {/* <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  );
}

const ErrorBoundary = ({ children }: Props) => {
  // return children;
  return (
    <ErrorBoundaryWrapper
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.log("client error", error, info);
      }}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
};

export default ErrorBoundary;
