const defaultUsers = [
    {
        username: "jonathen.joestar",
        fullname: "Jonathan Joestar",
        email: "joseph.joestar@rvrs.io",
    },
    {
        username: "will.zeppeli",
        fullname: "Will A. Zeppeli",
        email: undefined,
    },
    {
        username: "robert.speedwagon",
        fullname: "Robert E. O. Speedwagon",
        email: undefined,
    },
    {
        username: "dio.brando",
        fullname: "Dio Brando",
        email: undefined,
    },
    {
        username: "erina.pendleton",
        fullname: "Erina Pendleton",
        email: undefined,
    },
    {
        username: "george.joestar.i",
        fullname: "George Joestar I",
        email: undefined,
    },
    {
        username: "poco",
        fullname: "Poco",
        email: undefined,
    },
    {
        username: "pocos.sister",
        fullname: "Poco's Sister",
        email: undefined,
    },
    {
        username: "mary.joestar",
        fullname: "Mary Joestar",
        email: undefined,
    },
    {
        username: "joseph.joestar",
        fullname: "Joseph Joestar",
        email: undefined,
    },
    {
        username: "caesar.zeppeli",
        fullname: "Caesar Anthonio Zeppeli",
        email: undefined,
    },
    {
        username: "lisa.lisa",
        fullname: "Lisa Lisa",
        email: undefined,
    },
    {
        username: "rudol.von.stroheim",
        fullname: "Rudol von Stroheim",
        email: undefined,
    },
    {
        username: "messina",
        fullname: "Messina",
        email: undefined,
    },
    {
        username: "loggins",
        fullname: "Loggins",
        email: undefined,
    },
    {
        username: "suzi.q",
        fullname: "Suzi Q",
        email: undefined,
    },
    {
        username: "kars",
        fullname: "Kars",
        email: undefined,
    },
    {
        username: "esidisi",
        fullname: "Esidisi",
        email: undefined,
    },
    {
        username: "wamuu",
        fullname: "Wamuu",
        email: undefined,
    },
    {
        username: "santana",
        fullname: "Santana",
        email: undefined,
    },
    {
        username: "mario.zeppeli",
        fullname: "Mario Zeppeli",
        email: undefined,
    },
    {
        username: "george.joestar.ii",
        fullname: "George Joestar II",
        email: undefined,
    },
    {
        username: "jotaro.kujo",
        fullname: "Jotaro Kujo",
        email: undefined,
    },
    {
        username: "muhammad.avdol",
        fullname: "Muhammad Avdol",
        email: undefined,
    },
    {
        username: "noria.kakyoin",
        fullname: "Noriaki Kakyoin",
        email: undefined,
    },
    {
        username: "jean.pierre.polnareff",
        fullname: "Jean Pierre Polnareff",
        email: undefined,
    },
    {
        username: "iggy",
        fullname: "Iggy",
        email: undefined,
    },
    {
        username: "holy.kujo",
        fullname: "Holy Kujo",
        email: undefined,
    },
    {
        username: "josuke.higashikata",
        fullname: "Josuke Higashikata",
        email: undefined,
    },
    {
        username: "koihi.hirose",
        fullname: "Koichi Hirose",
        email: undefined,
    },
    {
        username: "okuyasu.nijimura",
        fullname: "Okuyasu Nijimura",
        email: undefined,
    },
    {
        username: "rohan.kishibe",
        fullname: "Rohan Kishibe",
        email: undefined,
    },
    {
        username: "keicho.nijimura",
        fullname: "Keicho Nijimura",
        email: undefined,
    },
    {
        username: "tomoko.higashikata",
        fullname: "Tomoko Higashikata",
        email: undefined,
    },
    {
        username: "ayana.hirose",
        fullname: "Ayana Hirose",
        email: undefined,
    }
]

const colorSchemes = [
    "blue",
    "green",
    "red",
    "orange",
    "yellow",
    "purple",
]

export const createRandomUser = () => {
    return {
        ...defaultUsers.at(Math.floor(Math.random() * defaultUsers.length)),
        color: colorSchemes.at(Math.floor(Math.random() * colorSchemes.length))
    };
}