import { Button } from "@chakra-ui/react";
import { ErrorMessage } from "@reversearchitecture/ui";
import React, { PropsWithChildren, ReactNode } from "react";

export class ErrorBoundaryPage extends React.Component<PropsWithChildren, { hasError: boolean, error?: Error }> {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        this.setState(state => ({ ...state, error: error }));
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <ErrorMessage
                    errorTitle={"An error occurred"}
                    errorDescription={this.state.error?.message}
                    action={(
                        <Button
                            onClick={() => {}}
                        >
                            Reload Page
                        </Button>
                    )}
                />
            )
        }
        
        return this.props.children;
    }
}