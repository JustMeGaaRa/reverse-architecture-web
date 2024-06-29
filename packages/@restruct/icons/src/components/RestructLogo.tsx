import { FC, memo } from "react";
import { IconProps } from "../types";

export const RestructLogo: FC = memo(function Logo(props: IconProps) {
    const { boxSize = 8, color, height, width } = props;

    return (
        <svg width={width ?? boxSize * 4} height={height ?? boxSize * 4} viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.8121 10.6667H26.2093C24.5782 10.6667 23.2559 12.0088 23.2559 13.6643V18.3358C23.2559 19.9914 24.5782 21.3334 26.2093 21.3334H30.8121C32.4432 21.3334 33.7655 19.9914 33.7655 18.3358V13.6643C33.7655 12.0088 32.4432 10.6667 30.8121 10.6667Z" fill="white"/>
            <path d="M21.2409 7.6691V2.99757C21.2409 1.33658 19.924 0 18.2874 0H13.6847C12.0481 0 10.7312 1.33658 10.7312 2.99757V7.6691C10.7312 9.33009 9.41432 10.6667 7.77779 10.6667H3.18781C1.55128 10.6667 0.234375 12.0032 0.234375 13.6642V18.3358C0.234375 19.9968 1.55128 21.3333 3.18781 21.3333H7.77779C9.41432 21.3333 10.7312 22.6699 10.7312 24.3309V29.0024C10.7312 30.6634 12.0481 32 13.6847 32H18.2874C19.924 32 21.2409 30.6634 21.2409 29.0024V24.3309C21.2409 22.6699 19.924 21.3333 18.2874 21.3333H13.6974C12.0609 21.3333 10.744 19.9968 10.744 18.3358V13.6642C10.744 12.0032 12.0609 10.6667 13.6974 10.6667H18.2874C19.924 10.6667 21.2409 9.33009 21.2409 7.6691Z" fill="#E3FB51"/>
        </svg>
    )
})