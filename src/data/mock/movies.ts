import type { Movie, Session } from "@/types";

const TMDB = "https://image.tmdb.org/t/p/w500";

const CINEMAS = ["Magic Cinema", "Cinematica Tashkent", "Planet 9", "Westminster"];

function sessionsFor(movieId: string, titleSlug: string): Session[] {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const times = ["10:30", "13:00", "16:15", "19:00", "21:45"];
  const list: Session[] = [];
  let n = 0;
  for (let day = 0; day < 4; day++) {
    const d = new Date(base);
    d.setDate(d.getDate() + day);
    const date = d.toISOString().slice(0, 10);
    CINEMAS.forEach((cinemaName, ci) => {
      times.slice(0, day === 0 ? 3 : 2).forEach((time, ti) => {
        n += 1;
        list.push({
          id: `ses-${titleSlug}-${n}`,
          movieId,
          cinemaName,
          date,
          time,
          hallLabel: `Зал ${((ci + ti) % 4) + 1}`,
        });
      });
    });
  }
  return list;
}

export const MOVIES: Movie[] = [
  {
    id: "m1",
    title: "Дюна: Часть вторая",
    durationMin: 166,
    ageRating: "12+",
    genre: "фантастика",
    description:
      "Пол Атрейдес объединяется с фременами и стремится предотвратить ужасное будущее, которое видит в видениях.",
    posterPath: `${TMDB}/1pdfLvkbY9ohJlCjQH2CZjjYQEf.jpg`,
    sessions: sessionsFor("m1", "dune2"),
  },
  {
    id: "m2",
    title: "Оппенгеймер",
    durationMin: 180,
    ageRating: "16+",
    genre: "драма",
    description: "История создателя атомной бомбы и моральной цены научного прорыва.",
    posterPath: `${TMDB}/8Gxv8gSfcU0XGDykEGv7zR1n2ua.jpg`,
    sessions: sessionsFor("m2", "oppen"),
  },
  {
    id: "m3",
    title: "Барби",
    durationMin: 114,
    ageRating: "12+",
    genre: "комедия",
    description: "Барби отправляется в реальный мир и открывает для себя новые грани идентичности.",
    posterPath: `${TMDB}/iuFNMD6IUcvHHEE7LcUOeuKX1Ja.jpg`,
    sessions: sessionsFor("m3", "barbie"),
  },
  {
    id: "m4",
    title: "Убийцы цветочной луны",
    durationMin: 206,
    ageRating: "16+",
    genre: "криминал",
    description: "Расследование серии убийств в племени осейджи в 1920-х годах.",
    posterPath: `${TMDB}/dB6KrDsbotSMK2rqTS8f1JTxe5y.jpg`,
    sessions: sessionsFor("m4", "killers"),
  },
  {
    id: "m5",
    title: "Бедные-несчастные",
    durationMin: 141,
    ageRating: "18+",
    genre: "фэнтези",
    description: "Молодая женщина, воскрешённая учёным, отправляется в путешествие по миру.",
    posterPath: `${TMDB}/kCGjSTFUSIka8iuOaKhv6rTcfnx.jpg`,
    sessions: sessionsFor("m5", "poor"),
  },
  {
    id: "m6",
    title: "Субстанция",
    durationMin: 141,
    ageRating: "18+",
    genre: "ужасы",
    description: "Стареющая звезда соглашается на сомнительную процедуру омоложения.",
    posterPath: `${TMDB}/lqoMzCcZYEFK729dHZwNKAOhOry.jpg`,
    sessions: sessionsFor("m6", "substance"),
  },
  {
    id: "m7",
    title: "Головоломка 2",
    durationMin: 96,
    ageRating: "6+",
    genre: "анимация",
    description: "Райли становится подростком — в голове появляются новые эмоции.",
    posterPath: `${TMDB}/vpnVM9l0q8fzE0eOs1PrxyycuXl.jpg`,
    sessions: sessionsFor("m7", "inside2"),
  },
  {
    id: "m8",
    title: "Дэдпул и Росомаха",
    durationMin: 128,
    ageRating: "18+",
    genre: "боевик",
    description: "Дэдпул и Росомаха объединяются в безумном приключении по мультивселенной.",
    posterPath: `${TMDB}/8cdWjvZQUExUIFz2jgxX1xlQfmI.jpg`,
    sessions: sessionsFor("m8", "deadpool"),
  },
  {
    id: "m9",
    title: "Гладиатор 2",
    durationMin: 148,
    ageRating: "16+",
    genre: "история",
    description: "Наследник Максимуса возвращается на арену Колизея.",
    posterPath: `${TMDB}/2cxhvwyEwRlysAmRH4iodkNCyDCq.jpg`,
    sessions: sessionsFor("m9", "glad2"),
  },
  {
    id: "m10",
    title: "Злая: Сказка о ведьме Запада",
    durationMin: 160,
    ageRating: "12+",
    genre: "мюзикл",
    description: "История ведьмы Запада до прибытия Дороти в Страну Оз.",
    posterPath: `${TMDB}/c5Tqxeo1UpBvnAc3csUmUAinOFy.jpg`,
    sessions: sessionsFor("m10", "wicked"),
  },
  {
    id: "m11",
    title: "Конклав",
    durationMin: 120,
    ageRating: "16+",
    genre: "триллер",
    description: "Кардиналы собираются в Ватикане, чтобы избрать нового папу.",
    posterPath: `${TMDB}/m5x8D0bZ3eKqIVWZIvt63qCsVDV.jpg`,
    sessions: sessionsFor("m11", "conclave"),
  },
  {
    id: "m12",
    title: "Анора",
    durationMin: 139,
    ageRating: "18+",
    genre: "драма",
    description: "Секс-работница из Бруклина выходит замуж за сына олигарха.",
    posterPath: `${TMDB}/7QnFHf4lKKd7QjJsO0bFj3Ie5yH.jpg`,
    sessions: sessionsFor("m12", "anora"),
  },
];

export function getMovieById(id: string): Movie | undefined {
  return MOVIES.find((m) => m.id === id);
}

export function getSessionById(sessionId: string): (Session & { movie: Movie }) | undefined {
  for (const movie of MOVIES) {
    const session = movie.sessions.find((s) => s.id === sessionId);
    if (session) return { ...session, movie };
  }
  return undefined;
}
