import React, { FC, PropsWithChildren } from "react";

type ErrorBoundaryProps = PropsWithChildren<{
    fallback: React.ReactElement;
}>;

type ErrorBoundaryState = {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // NOTE: update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        
        return this.props.children;
    }
}