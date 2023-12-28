import { Box,Text } from "@chakra-ui/react";
import { FC } from "react";

export const CollaboratingUser: FC<{
    colorScheme: string,
    name: string,
}> = ({
    colorScheme,
    name
}) => {
    return (
        <Box
            data-group
            className={"workspace__user-cursor"}
            cursor={"pointer"}
            pointerEvents={"auto"}
        >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_bdi_5117_25893)">
                    <path d="M9.22882 13.3352C8.72642 14.4655 8.47523 15.0307 8.14422 15.19C7.84429 15.3344 7.49221 15.32 7.20503 15.1517C6.8881 14.966 6.68377 14.3822 6.27513 13.2146L3.09092 4.11691C2.74536 3.12961 2.57259 2.63596 2.68243 2.31033C2.78223 2.01449 3.01449 1.78223 3.31033 1.68243C3.63596 1.57259 4.12961 1.74536 5.11691 2.09092L14.2146 5.27513C15.3822 5.68377 15.966 5.8881 16.1517 6.20503C16.32 6.49221 16.3344 6.84429 16.19 7.14422C16.0307 7.47523 15.4655 7.72642 14.3352 8.22882L11.3588 9.55163C11.1543 9.64252 11.0521 9.68796 10.9645 9.75245C10.8836 9.81208 10.8121 9.88358 10.7524 9.96454C10.688 10.0521 10.6425 10.1543 10.5516 10.3588L9.22882 13.3352Z" fill="#2D2F30"/>
                    <path d="M8.77192 13.1321C8.51679 13.7061 8.33852 14.1061 8.1845 14.3851C8.02143 14.6806 7.93965 14.7336 7.92741 14.7395C7.77745 14.8116 7.60141 14.8045 7.45782 14.7203C7.4461 14.7134 7.36891 14.6539 7.23044 14.3462C7.09967 14.0556 6.95458 13.6424 6.74706 13.0495L3.56285 3.95173C3.38683 3.44883 3.26653 3.10366 3.20066 2.84299C3.13256 2.57349 3.14984 2.48902 3.1562 2.47015C3.2061 2.32223 3.32223 2.2061 3.47015 2.1562C3.48902 2.14984 3.57349 2.13256 3.84299 2.20066C4.10366 2.26653 4.44883 2.38683 4.95174 2.56285L14.0495 5.74706C14.6424 5.95458 15.0556 6.09967 15.3462 6.23044C15.6539 6.36891 15.7134 6.4461 15.7203 6.45782C15.8045 6.60141 15.8116 6.77745 15.7395 6.92741C15.7336 6.93965 15.6806 7.02143 15.3851 7.18451C15.1061 7.33852 14.7061 7.51679 14.1321 7.77192L11.1558 9.09473C11.1441 9.09991 11.1325 9.10505 11.121 9.11014C10.9507 9.18566 10.8005 9.25225 10.668 9.34987C10.5466 9.43932 10.4393 9.54657 10.3499 9.66801C10.2522 9.80055 10.1857 9.95071 10.1102 10.121C10.1051 10.1325 10.0999 10.1441 10.0947 10.1558L8.77192 13.1321Z" stroke="url(#paint0_linear_5117_25893)" stroke-linejoin="bevel"/>
                </g>
                <defs>
                    <filter id="filter0_bdi_5117_25893" x="-1.34961" y="-2.35044" width="21.6387" height="21.6394" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_5117_25893"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="1"/>
                        <feGaussianBlur stdDeviation="1"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                        <feBlend mode="normal" in2="effect1_backgroundBlur_5117_25893" result="effect2_dropShadow_5117_25893"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_5117_25893" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="3"/>
                        <feGaussianBlur stdDeviation="1.5"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
                        <feBlend mode="normal" in2="shape" result="effect3_innerShadow_5117_25893"/>
                    </filter>
                    <linearGradient id="paint0_linear_5117_25893" x1="10" y1="1" x2="10" y2="17" gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"/>
                        <stop offset="1" stopColor="white" stopOpacity="0.5"/>
                    </linearGradient>
                </defs>
            </svg>
            <Text
                backgroundColor={`${colorScheme}.200`}
                backdropFilter={"blur(32px)"}
                boxShadow={"0px 2px 4px 0px rgba(0, 0, 0, 0.10), 12px 12px 16px 0px rgba(0, 0, 0, 0.10) inset, -12px -12px 16px 0px rgba(255, 255, 255, 0.02) inset"}
                borderRadius={8}
                color={`${colorScheme}.900`}
                textOverflow={"ellipsis"}
                textStyle={"b5"}
                maxWidth={"124px"}
                display={"none"}
                position={"absolute"}
                paddingX={2}
                paddingY={1}
                top={"15px"}
                left={"15px"}
                _groupHover={{ display: "inline-block" }}
            >
                {name}
            </Text>
        </Box>
    )
}