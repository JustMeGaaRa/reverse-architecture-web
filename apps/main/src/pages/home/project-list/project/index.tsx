import { useDisclosure } from "@chakra-ui/react";
import {
    Page,
    PageBody,
    PageContent,
    PageHeader,
    PageHomeButton,
    PageSidebar,
} from "@reversearchitecture/ui";
import { HomeSimple } from "iconoir-react";
import { FC } from "react";
import { useNavigate } from "react-router";

export const ProjectPage: FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const navigate = useNavigate();

    return (
        <Page>
            <PageSidebar isOpen={isOpen}>
                <PageHomeButton
                    icon={<HomeSimple />}
                    onClick={() => navigate("/")}
                />
                
            </PageSidebar>
            <PageBody>
                <PageHeader>
                        
                </PageHeader>
                <PageContent>

                </PageContent>
            </PageBody>
        </Page>
    )
}