import type { Movie, Session } from "@/types";

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

/** Актуальная афиша: хиты проката 2024–2025 (постеры — local JPG). */
export const MOVIES: Movie[] = [
  {
    id: "m1",
    title: "Дюна: Часть вторая",
    durationMin: 166,
    ageRating: "12+",
    genre: "фантастика",
    description:
      "Пол Атрейдес объединяется с фременами Аракиса, чтобы противостоять империи Харконненов и судьбе, которую ему навязывают пророчества. Чем ближе победа, тем сильнее разрыв между любовью к Чани и страхом перед будущим, которое он видит в видениях. Эпическое продолжение по роману Фрэнка Герберта от Дени Вильнёва — песок, политика и миф, от которого нельзя отмахнуться.",
    posterPath: "/posters/m1.jpg",
    trailerYoutubeId: "Way9Dexny3w",
    sessions: sessionsFor("m1", "dune2"),
  },
  {
    id: "m2",
    title: "Оппенгеймер",
    durationMin: 180,
    ageRating: "16+",
    genre: "драма",
    description:
      "История Роберта Оппенгеймера — физика, возглавившего Манхэттенский проект и создавшего оружие, изменившее войну и мир. Фильм переплетает научный азарт, политические слушания 1950-х и моральный груз человека, которого называют «отцом атомной бомбы». Биографическая драма Кристофера Нолана о власти, вине и цене прогресса.",
    posterPath: "/posters/m2.jpg",
    trailerYoutubeId: "bK6ldnjE3Y0",
    sessions: sessionsFor("m2", "oppen"),
  },
  {
    id: "m3",
    title: "Барби",
    durationMin: 114,
    ageRating: "12+",
    genre: "комедия",
    description:
      "Идеальная Барби внезапно сталкивается с экзистенциальным кризисом и отправляется из розового Barbieland в настоящий мир вместе с верным Кеном. Там она узнаёт, что быть «идеальной» — не то же самое, что быть собой, а мечты о счастье сложнее, чем в рекламном слогане. Яркая комедия Греты Гервиг о женственности, капитализме и дружбе с самоиронией.",
    posterPath: "/posters/m3.jpg",
    trailerYoutubeId: "pBk4NYhWNMM",
    sessions: sessionsFor("m3", "barbie"),
  },
  {
    id: "m4",
    title: "Убийцы цветочной луны",
    durationMin: 206,
    ageRating: "16+",
    genre: "криминал",
    description:
      "В 1920-х на землях племени осейджи, разбогатевшего на нефти, начинается цепь загадочных убийств. В центре — Молли и её муж Эрнест, втянутые в сеть жадности, расизма и предательства, пока ФБР пытается докопаться до правды. Мартин Скорсезе по книге Дэвида Гранна — тяжёлая хроника «царства террора», где деньги и власть стоят дороже жизни.",
    posterPath: "/posters/m4.jpg",
    trailerYoutubeId: "EP34Yoxs3FQ",
    sessions: sessionsFor("m4", "killers"),
  },
  {
    id: "m5",
    title: "Бедные-несчастные",
    durationMin: 141,
    ageRating: "18+",
    genre: "фэнтези",
    description:
      "Белла Бакстер — женщина, которую блестящий и эксцентричный учёный воскресил и обучает жизни заново, словно ребёнка. Она рвётся за пределы лаборатории, влюбляется, путешествует и отвергает правила «приличного» общества викторианской эпохи. Сюрреалистическая фантазия Йоргоса Лантимоса о свободе, теле и праве быть несовершенной.",
    posterPath: "/posters/m5.jpg",
    trailerYoutubeId: "RlbR5N6veqw",
    sessions: sessionsFor("m5", "poor"),
  },
  {
    id: "m6",
    title: "Субстанция",
    durationMin: 141,
    ageRating: "18+",
    genre: "ужасы",
    description:
      "Элизабет, звезда утреннего фитнес-шоу, уволена из-за возраста и находит «Субстанцию» — укол, создающий молодую, «идеальную» версию себя по имени Сью. Правило простое: неделя за одной, неделя за другой, но контроль быстро ускользает. Жёсткий боди-хоррор о одержимости молодостью, славой и ненависти к собственному отражению.",
    posterPath: "/posters/m6.jpg",
    trailerYoutubeId: "LNlrGhBpYjc",
    sessions: sessionsFor("m6", "substance"),
  },
  {
    id: "m7",
    title: "Головоломка 2",
    durationMin: 96,
    ageRating: "6+",
    genre: "анимация",
    description:
      "Райли переходит в старшую школу, и в её голове появляются новые эмоции — Тревога, Зависть, Стыд и другие, которые перестраивают привычную команду Радости и грусти. Подростковые дружбы, хоккей и самооценка превращаются в поле битвы между старыми привычками и взрослением. Сиквел Pixar — тёплый и смешной разговор о том, что чувствовать всё сразу нормально.",
    posterPath: "/posters/m7.jpg",
    trailerYoutubeId: "LEjhY15eCx0",
    sessions: sessionsFor("m7", "inside2"),
  },
  {
    id: "m8",
    title: "Дэдпул и Росомаха",
    durationMin: 128,
    ageRating: "18+",
    genre: "боевик",
    description:
      "Уэйд Уилсон вырывает из другой реальности уставшего Логана, чтобы спасти свою временную линию от краха. Вместе им предстоит пройти через сатиру, насилие и ностальгию по эпохе Людей Икс, пока бюрократ вселенной Marvel не вмешается окончательно. Третий «Дэдпул» — громкий кроссовер с Росомахой, где четвёртая стена ломается чаще, чем кости злодеев.",
    posterPath: "/posters/m8.jpg",
    trailerYoutubeId: "73_1biulkYk",
    sessions: sessionsFor("m8", "deadpool"),
  },
  {
    id: "m9",
    title: "Гладиатор 2",
    durationMin: 148,
    ageRating: "16+",
    genre: "история",
    description:
      "Луций, племянник императора Коммода, давно потерял связь с прошлым Рима и вынужден снова вступить на арену, когда тирания захлёстывает империю. На его пути — гладиаторские бои, политические интриги и тень легендарного Максимуса. Ридли Скотт возвращает зрителя в Колизей: месть, честь и вопрос, кому на самом деле принадлежит «мечта о Риме».",
    posterPath: "/posters/m9.jpg",
    trailerYoutubeId: "4rgYUipGJNo",
    sessions: sessionsFor("m9", "glad2"),
  },
  {
    id: "m10",
    title: "Злая",
    durationMin: 160,
    ageRating: "12+",
    genre: "мюзикл",
    description:
      "До прибытия Дороти в Оз две студентки Шизского университета — зеленокожая Эльфаба и светская Глинда — становятся соседками и неожиданными подругами. Одна обладает запретной магией, другая мечтает о популярности, а Волшебник играет на их судьбах ради собственной власти. Экранизация мюзикла о том, как из «злой ведьмы» рождается миф, который мир готов ненавидеть.",
    posterPath: "/posters/m10.jpg",
    trailerYoutubeId: "6COmYeLsz4c",
    sessions: sessionsFor("m10", "wicked"),
  },
  {
    id: "m11",
    title: "Конклав",
    durationMin: 120,
    ageRating: "16+",
    genre: "триллер",
    description:
      "После внезапной смерти Папы кардинал Лоуренс должен провести конclave — тайное голосование, от которого зависит будущее католической церкви. За запертыми дверями Ватикана амбиции, тайны и идеологические расколы всплывают один за другим. Напряжённый политический триллер о вере, компромиссе и цене «абсолютной» уверенности.",
    posterPath: "/posters/m11.jpg",
    trailerYoutubeId: "JX9jasdi3ic",
    sessions: sessionsFor("m11", "conclave"),
  },
  {
    id: "m12",
    title: "Анора",
    durationMin: 139,
    ageRating: "18+",
    genre: "драма",
    description:
      "Ани, молодая работница из Бруклина, за одну ночь выходит замуж за Ваню — сына богатой русской семьи, живущей между Нью-Йорком и Москвой. Романтическая сказка быстро ломается, когда родители жениха посылают людей аннулировать брак любой ценой. Драма Шона Бейкера — хаотичная, смешная и нежная история о классе, любви и упрямстве тех, кого общество привыкло не замечать.",
    posterPath: "/posters/m12.jpg",
    trailerYoutubeId: "p1HxTmV5i7c",
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
