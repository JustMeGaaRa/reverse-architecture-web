import { Account } from "../types";

export const defaultUsers: Account[] = [
    {
        username: "jonathan.joestar",
        fullname: "Jonathan Joestar",
        email: "joseph.joestar@restruct.io",
    },
    {
        username: "will.zeppeli",
        fullname: "Will A. Zeppeli",
        email: "will.zeppeli@restruct.io",
    },
    {
        username: "robert.speedwagon",
        fullname: "Robert E. O. Speedwagon",
        email: "robert.speedwagon@restruct.io",
    },
    {
        username: "erina.pendleton",
        fullname: "Erina Pendleton",
        email: "erina.pendleton@restruct.io",
    },
    {
        username: "dio.brando",
        fullname: "Dio Brando",
        email: "dio.brando@restruct.io",
    },
    {
        username: "mary.joestar",
        fullname: "Mary Joestar",
        email: "mary.joestar@restruct.io",
    },
    {
        username: "joseph.joestar",
        fullname: "Joseph Joestar",
        email: "joseph.joestar@restruct.io",
    },
    {
        username: "caesar.zeppeli",
        fullname: "Caesar Anthonio Zeppeli",
        email: "caesar.zeppeli@restruct.io",
    },
    {
        username: "lisa.lisa",
        fullname: "Lisa Lisa",
        email: "lisa.lisa@restruct.io",
    },
    {
        username: "rudol.von.stroheim",
        fullname: "Rudol von Stroheim",
        email: "rudol.von.stroheim@restruct.io",
    },
    {
        username: "erina.joestar",
        fullname: "Erina Joestar",
        email: "erina.joestar@restruct.io",
    },
    {
        username: "suzi.q",
        fullname: "Suzi Q",
        email: "suzi.q@restruct.io",
    },
    {
        username: "mario.zeppeli",
        fullname: "Mario Zeppeli",
        email: "mario.zeppeli@restruct.io",
    },
    {
        username: "messina",
        fullname: "Messina",
        email: "messina@restruct.io",
    },
    {
        username: "loggins",
        fullname: "Loggins",
        email: "loggins@restruct.io",
    },
    {
        username: "kars",
        fullname: "Kars",
        email: "kars@restruct.io",
    },
    {
        username: "esidisi",
        fullname: "Esidisi",
        email: "esidisi@restruct.io",
    },
    {
        username: "wamuu",
        fullname: "Wamuu",
        email: "wamuu@restruct.io",
    },
    {
        username: "santana",
        fullname: "Santana",
        email: "santana@restruct.io",
    },
    {
        username: "jotaro.kujo",
        fullname: "Jotaro Kujo",
        email: "jotaro.kujo@restruct.io",
    },
    {
        username: "muhammad.avdol",
        fullname: "Muhammad Avdol",
        email: "muhammad.avdol@restruct.io",
    },
    {
        username: "noria.kakyoin",
        fullname: "Noriaki Kakyoin",
        email: "noria.kakyoin@restruct.io",
    },
    {
        username: "jean.polnareff",
        fullname: "Jean Pierre Polnareff",
        email: "jean.polnareff@restruct.io",
    },
    {
        username: "josuke.higashikata",
        fullname: "Josuke Higashikata",
        email: "josuke.higashikata@restruct.io",
    },
    {
        username: "koihi.hirose",
        fullname: "Koichi Hirose",
        email: "koihi.hirose@restruct.io",
    },
    {
        username: "okuyasu.nijimura",
        fullname: "Okuyasu Nijimura",
        email: "okuyasu.nijimura@restruct.io",
    },
    {
        username: "rohan.kishibe",
        fullname: "Rohan Kishibe",
        email: "rohan.kishibe@restruct.io",
    },
    {
        username: "yoshikage.kira",
        fullname: "Yoshikage Kira",
        email: "yoshikage.kira@restruct.io",
    },
    {
        username: "giorno.giovanna",
        fullname: "Giorno Giovanna",
        email: "giorno.giovanna@restruct.io",
    },
    {
        username: "bruno.bucciarati",
        fullname: "Bruno Bucciarati",
        email: "bruno.bucciarati@restruct.io",
    },
    {
        username: "leone.abbacchio",
        fullname: "Leone Abbacchio",
        email: "leone.abbacchio@restruct.io",
    },
    {
        username: "guido.mista",
        fullname: "Guido Mista",
        email: "guido.mista@restruct.io",
    },
    {
        username: "narancia.ghirga",
        fullname: "Narancia Ghirga",
        email: "narancia.ghirga@restruct.io",
    },
    {
        username: "pannacotta.fugo",
        fullname: "Pannacotta Fugo",
        email: "pannacotta.fugo@restruct.io",
    },
    {
        username: "trish.una",
        fullname: "Trish Una",
        email: "trish.una@restruct.io",
    },
    {
        username: "jolyne.cujoh",
        fullname: "Jolyne Cujoh",
        email: "jolyne.cujoh@restruct.io",
    },
    {
        username: "ermes.costello",
        fullname: "Ermes Costello",
        email: "ermes.costello@restruct.io",
    },
    {
        username: "foo.fighters",
        fullname: "Foo Fighters",
        email: "foo.fighters@restruct.io",
    },
    {
        username: "emporio.alnino",
        fullname: "Emporio Alnino",
        email: "emporio.alnino@restruct.io",
    },
    {
        username: "weather.report",
        fullname: "Weather Report",
        email: "weather.report@restruct.io",
    },
    {
        username: "narciso.anasui",
        fullname: "Narciso Anasui",
        email: "narciso.anasui@restruct.io",
    },
    {
        username: "enrico.pucci",
        fullname: "Enrico Pucci",
        email: "enrico.pucci@restruct.io",
    }
]

const colorSchemes = [
    "gray",
    "blue",
    "green",
    "red",
    "orange",
    "yellow",
    "purple"
]

export const createRandomUser = () => {
    return {
        ...defaultUsers.at(Math.floor(Math.random() * defaultUsers.length)),
        color: colorSchemes.at(Math.floor(Math.random() * colorSchemes.length))
    };
}

export const createDefaultUser = () => {
    return {
        ...defaultUsers.at(0),
        color: colorSchemes.at(0)
    }
}