const defaultUsers = [
    {
        username: "joseph.joestar",
        fullname: "Joseph Joestar",
        email: "joseph.joestar@rvrs.io",
        avatar: undefined
    },
    {
        username: "erina.pendleton",
        fullname: "Erina Pendleton",
        email: "erina.pendleton@rvrs.io",
        avatar: undefined
    },
    {
        username: "robert.speedwagon",
        fullname: "Robert Speedwagon",
        email: "robert.speedwagon@rvrs.io",
        avatar: undefined
    },
    {
        username: "will.zeppeli",
        fullname: "Will Zeppeli",
        email: "",
        avatar: undefined
    },
    {
        username: "dio.brando",
        fullname: "Dio Brando",
        email: "",
        avatar: undefined
    },
    {
        username: "caesar.zeppeli",
        fullname: "Caesar Zeppeli",
        email: "caesar.zeppeli@rvrs.io",
        avatar: undefined
    },
    {
        username: "kars",
        fullname: "Kars",
        email: "",
        avatar: undefined
    },
    {
        username: "jotaro.kujo",
        fullname: "Jotaro Kujo",
        email: "",
        avatar: undefined
    },
    {
        username: "joseph.joestar",
        fullname: "Joseph Joestar",
        email: "",
        avatar: undefined
    },
    {
        username: "muhammad.avdol",
        fullname: "Muhammad Avdol",
        email: "",
        avatar: undefined
    },
    {
        username: "josuke.higashikata",
        fullname: "Josuke Higashikata",
        email: "",
        avatar: undefined
    },
    {
        username: "jolyne.cujoh",
        fullname: "Jolyne Cujoh",
        email: "",
        avatar: undefined
    },
    {
        username: "yoshikage.kira",
        fullname: "Yoshikage Kira",
        email: "",
        avatar: undefined
    },
    {
        username: "rohan.kishibe",
        fullname: "Rohan Kishibe",
        email: "",
        avatar: undefined
    }
]

export const useAccount = () => {
    return {
        account: defaultUsers[0]
    };
}