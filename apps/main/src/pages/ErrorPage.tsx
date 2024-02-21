import { Button } from "@chakra-ui/react";
import { StateMessage } from "@reversearchitecture/ui";
import { EmojiSad } from "iconoir-react";
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
                <StateMessage
                    icon={EmojiSad}
                    title={"An error occurred"}
                    description={this.state.error?.message}
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