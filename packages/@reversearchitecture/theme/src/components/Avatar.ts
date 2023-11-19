import { avatarAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(avatarAnatomy.keys);

export const Avatar = defineMultiStyleConfig({
    baseStyle: definePartsStyle((props) => ({
        container: {
            backgroundColor: `${props.colorScheme}.100`,
            borderColor: `${props.colorScheme}.600`,
            color: `${props.colorScheme}.600`,
            _hover: {
                backgroundColor: `${props.colorScheme}.200`,
            },
            _active: {
                backgroundColor: `${props.colorScheme}.300`,
            },
            _disabled: {
                backgroundColor: `${props.colorScheme}.100`,
                borderColor: `${props.colorScheme}.300`,
                color: `${props.colorScheme}.300`,
            }
        },
        excessLabel: {
            backgroundColor: "gray.100",
            borderColor: "gray.600",
            color: "gray.600",
            _hover: {
                backgroundColor: "gray.200",
            },
            _active: {
                backgroundColor: "gray.300",
            },
            _disabled: {
                backgroundColor: "gray.100",
                borderColor: "gray.300",
                color: "gray.300",
            }
        }
    })),
    sizes: {
        sm: {
            container: {
                borderRadius: "12px",
                borderWidth: "1px",
                height: "32px",
                width: "32px",
            },
            excessLabel: {
                borderRadius: "12px",
                borderWidth: "1px",
                height: "32px",
                width: "32px",
            }
        },
        md: {
            container: {
                borderRadius: "16px",
                borderWidth: "1px",
                height: "40px",
                width: "40px",
            },
            excessLabel: {
                borderRadius: "16px",
                borderWidth: "1px",
                height: "40px",
                width: "40px",
            }
        },
        lg: {
            container: {
                borderRadius: "16px",
                borderWidth: "1px",
                height: "48px",
                width: "48px",
            },
            excessLabel: {
                borderRadius: "16px",
                borderWidth: "1px",
                height: "48px",
                width: "48px",
            }
        }
    },
    defaultProps: {
        size: "md"
    }
})