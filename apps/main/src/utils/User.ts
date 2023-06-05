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
        email: undefined,
        avatar: undefined
    },
    {
        username: "dio.brando",
        fullname: "Dio Brando",
        email: undefined,
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
        email: undefined,
        avatar: undefined
    },
    {
        username: "jotaro.kujo",
        fullname: "Jotaro Kujo",
        email: undefined,
        avatar: undefined
    },
    {
        username: "joseph.joestar",
        fullname: "Joseph Joestar",
        email: undefined,
        avatar: undefined
    },
    {
        username: "muhammad.avdol",
        fullname: "Muhammad Avdol",
        email: undefined,
        avatar: undefined
    },
    {
        username: "josuke.higashikata",
        fullname: "Josuke Higashikata",
        email: undefined,
        avatar: undefined
    },
    {
        username: "jolyne.cujoh",
        fullname: "Jolyne Cujoh",
        email: undefined,
        avatar: undefined
    },
    {
        username: "yoshikage.kira",
        fullname: "Yoshikage Kira",
        email: undefined,
        avatar: undefined
    },
    {
        username: "rohan.kishibe",
        fullname: "Rohan Kishibe",
        email: undefined,
        avatar: undefined
    }
]

export const createRandomUser = () => {
    return defaultUsers.at(Math.floor(Math.random() * defaultUsers.length));
}