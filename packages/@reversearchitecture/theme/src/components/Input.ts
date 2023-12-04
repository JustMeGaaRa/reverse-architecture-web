import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode, getColorVar } from "@chakra-ui/theme-tools";

const {
    definePartsStyle,
    defineMultiStyleConfig
} = createMultiStyleConfigHelpers(parts.keys);

export const Input = defineMultiStyleConfig({
    baseStyle: {

    },
    sizes: {
        md: {
            addon: {

            },
            element: {
                width: "40px",
                height: "40px",
                padding: 2,
            },
            field: {
                height: "40px",
                paddingX: 10,
                paddingY: 2,
                borderRadius: 16,
            }
        }
    },
    variants: {
        filled: (props) => ({
            addon: {

            },
            element: {
                color: mode("", "gray.500")(props),

                _invalid: {
                    color: mode("", "red.600")(props),
                },
                _groupInvalid: {
                    color: mode("", "red.600")(props),
                },
                _disabled: {
                    color: mode("", "gray.400")(props),
                },
                _groupDisabled: {
                    color: mode("", "gray.400")(props),
                }
            },
            field: {
                backgroundColor: mode("", "surface.tinted-black-40")(props),
                backdropFilter: "blur(16px)",
                borderWidth: 0,
                boxShadow: mode("", "1px 1.5px 4px 0px rgba(0, 0, 0, 0.24) inset, 1px 1.5px 4px 0px rgba(0, 0, 0, 0.16) inset, 0px -0.5px 1px 0px rgba(255, 255, 255, 0.24) inset, 0px -0.5px 1px 0px rgba(255, 255, 255, 0.32) inset")(props),
                color: mode("", "gray.900")(props),
                caretColor: mode("", `${props.colorScheme}.600`)(props),

                _placeholder: {
                    color: mode("", "gray.500")(props),
                },
                _hover: {
                    background: mode("", "linear-gradient(0deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), radial-gradient(100% 100% at 50% 100%, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.00) 66.03%)")(props)
                },
                _focus: {

                },
                _active: {
                    backgroundColor: mode("", "surface.tinted-black-60")(props),
                },
                _groupActive: {
                    backgroundColor: mode("", "surface.tinted-black-60")(props),
                },
                _invalid: {
                    color: mode("", "red.600")(props),
                },
                _groupInvalid: {
                    color: mode("", "red.600")(props),
                },
                _disabled: {
                    backgroundColor: mode("", "surface.tinted-black-10")(props),
                    color: mode("", "gray.400")(props),
                }
            }
        })
    },
    defaultProps: {
        colorScheme: "lime",
        size: "md",
        variant: "filled"
    }
})