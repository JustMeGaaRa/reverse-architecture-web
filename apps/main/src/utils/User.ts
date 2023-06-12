const defaultUsers = [
    {
        username: "jonathen.joestar",
        fullname: "Jonathan Joestar",
        email: "joseph.joestar@rvrs.io",
        avatarUrl: "https://static.jojowiki.com/images/a/a7/latest/20220210221643/JonathanAvAnim.png"
    },
    {
        username: "will.zeppeli",
        fullname: "Will A. Zeppeli",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/e/ec/latest/20211221222513/WillZeppeliAvAnim.png"
    },
    {
        username: "robert.speedwagon",
        fullname: "Robert E. O. Speedwagon",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/3/31/latest/20191015214319/SpeedwagonAvAnim1.png"
    },
    {
        username: "dio.brando",
        fullname: "Dio Brando",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/3/32/latest/20191015213504/DioAvAnim1.png"
    },
    {
        username: "erina.pendleton",
        fullname: "Erina Pendleton",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/a/a4/latest/20191015214245/ErinaAvAnim1.png"
    },
    {
        username: "george.joestar.i",
        fullname: "George Joestar I",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/0/0c/latest/20191015214625/GeorgeAvAnim.png"
    },
    {
        username: "poco",
        fullname: "Poco",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/3/35/latest/20191015214654/PocoAvAnim.png"
    },
    {
        username: "pocos.sister",
        fullname: "Poco's Sister",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/0/06/latest/20191015213643/PocosisAvAnim.png"
    },
    {
        username: "mary.joestar",
        fullname: "Mary Joestar",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/1/1d/latest/20200523071733/MaryAvAnim.png"
    },
    {
        username: "joseph.joestar",
        fullname: "Joseph Joestar",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/c/c1/latest/20191015215038/JosephAvAnim2.png"
    },
    {
        username: "caesar.zeppeli",
        fullname: "Caesar Anthonio Zeppeli",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/4/4a/latest/20191015220114/CaesarAvAnim.png"
    },
    {
        username: "lisa.lisa",
        fullname: "Lisa Lisa",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/4/45/latest/20200830215939/LisaAvAnim2.png"
    },
    {
        username: "rudol.von.stroheim",
        fullname: "Rudol von Stroheim",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/0/0d/latest/20191015213958/StroheimAvAnim.png"
    },
    {
        username: "messina",
        fullname: "Messina",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/0/0f/latest/20191015215421/MessinaAvAnim.png"
    },
    {
        username: "loggins",
        fullname: "Loggins",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/5/5d/latest/20191015213206/LogginsAvAnim.png"
    },
    {
        username: "suzi.q",
        fullname: "Suzi Q",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/8/85/latest/20210310120011/SuziAvAnim2.png"
    },
    {
        username: "kars",
        fullname: "Kars",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/e/e0/latest/20210310114718/KarsAvAnim.png"
    },
    {
        username: "esidisi",
        fullname: "Esidisi",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/8/83/latest/20191015215515/EsidisiAvAnim.png"
    },
    {
        username: "wamuu",
        fullname: "Wamuu",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/2/24/latest/20191015214422/WamuuAvAnim.png"
    },
    {
        username: "santana",
        fullname: "Santana",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/8/8a/latest/20191015215650/SantanaAvAnim.png"
    },
    {
        username: "mario.zeppeli",
        fullname: "Mario Zeppeli",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/3/30/latest/20191015213023/MarioAvAnim.png"
    },
    {
        username: "george.joestar.ii",
        fullname: "George Joestar II",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/d/d6/latest/20200102230710/GeorgeJoestarII2AvAnime.png"
    },
    {
        username: "jotaro.kujo",
        fullname: "Jotaro Kujo",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/8/8f/latest/20220630085205/JotaroAvAnim3.png"
    },
    {
        username: "muhammad.avdol",
        fullname: "Muhammad Avdol",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/3/37/latest/20191015213131/AvdolAvAnim.png"
    },
    {
        username: "noria.kakyoin",
        fullname: "Noriaki Kakyoin",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/5/5c/latest/20230131013941/KakyoinAvAnim.png"
    },
    {
        username: "jean.pierre.polnareff",
        fullname: "Jean Pierre Polnareff",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/7/70/latest/20191015214338/PolnareffAvAnim3.png"
    },
    {
        username: "iggy",
        fullname: "Iggy",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/1/17/latest/20191015215854/IggyAvAnim.png"
    },
    {
        username: "holy.kujo",
        fullname: "Holy Kujo",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/f/f8/latest/20191015212950/HolyAvAnim.png"
    },
    {
        username: "josuke.higashikata",
        fullname: "Josuke Higashikata",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/2/2e/latest/20220611204758/JosukeAvAnim.png"
    },
    {
        username: "koihi.hirose",
        fullname: "Koichi Hirose",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/2/2f/latest/20200930010221/KoichiAvAnim4.png"
    },
    {
        username: "okuyasu.nijimura",
        fullname: "Okuyasu Nijimura",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/1/1e/latest/20191015214139/OkuyasuAvAnim.png"
    },
    {
        username: "rohan.kishibe",
        fullname: "Rohan Kishibe",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/5/56/latest/20220310205808/RohanAvAnim.png"
    },
    {
        username: "keicho.nijimura",
        fullname: "Keicho Nijimura",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/a/a0/latest/20200808162520/KeichoAvAnim.png"
    },
    {
        username: "tomoko.higashikata",
        fullname: "Tomoko Higashikata",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/3/34/latest/20200927215702/TomokoAvAnim.png"
    },
    {
        username: "ayana.hirose",
        fullname: "Ayana Hirose",
        email: undefined,
        avatarUrl: "https://static.jojowiki.com/images/0/0c/latest/20200101163831/AyanaAvAnim.png"
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