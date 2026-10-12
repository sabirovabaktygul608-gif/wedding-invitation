
import { useEffect, useState, useRef, type FormEvent } from "react";
import "./App.css";

type Language = "ru" | "ky";

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [language, setLanguage] = useState<Language>("ky");
  const [opened, setOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Музыка: браузер может потребовать нажатие пользователя
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const playMusic = async () => {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    };

    void playMusic();

    const startAfterInteraction = () => {
      if (audio.paused) void playMusic();
    };

    document.addEventListener("click", startAfterInteraction, {
      once: true,
    });
    document.addEventListener("keydown", startAfterInteraction, {
      once: true,
    });

    return () => {
      document.removeEventListener("click", startAfterInteraction);
      document.removeEventListener("keydown", startAfterInteraction);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    } else {
      audio.pause();
      setMusicPlaying(false);
    }
  };

  const text = {
    ru: {
      coverLabel: "ПРИГЛАШЕНИЕ НА СВАДЬБУ",
      openEnvelope: "ОТКРЫТЬ КОНВЕРТ",
      opening: "КОНВЕРТ ОТКРЫВАЕТСЯ...",
      scroll: "Для вас особенное приглашение",
      go: "Перейти к приглашению",
      dear: "Наши уважаемые, дорогие гости!",
      invite: "Приглашаем вас на свадьбу наших детей",
      celebrate:
        "Разделить их счастье, поздравить молодых и стать почётными гостями нашего торжества!",
      hosts: "Хозяева торжества",
      countdown: "До торжества осталось",
      today: "Сегодня наш праздник",
      passed: "Этот прекрасный день уже состоялся",
      program: "Программа вечера",
      welcome: "Встреча гостей",
      start: "Начало торжества",
      dinner: "Праздничный ужин",
      dance: "Первый танец",
      end: "Завершение вечера",
      venue: "Место торжества",
      restaurant: "Ресторан «Буркан Ата»",
      address: "Адрес",
      map: "Открыть карту",
      dressCode: "Дресс-код",
      dressText:
        "Мы будем рады видеть вас в оттенках бордо, розового золота и тёплого шоколада.",
      attendance: "Подтвердите присутствие",
      attendanceText:
        "Чтобы мы подготовили этот вечер с любовью, пожалуйста, подтвердите своё присутствие.",
      name: "Имя и фамилия",
      namePlaceholder: "Как вас записать?",
      presence: "Сможете ли вы присутствовать?",
      yes: "С радостью приду",
      no: "К сожалению, не смогу",
      send: "Отправить ответ",
      thanks: "Спасибо за ваш ответ!",
      waiting: "Ждём вас!",
      back: "Вернуться к началу",
      date: "8 ноября 2026 года",
      days: "ДНЕЙ",
      hours: "ЧАСОВ",
      minutes: "МИНУТ",
      seconds: "СЕКУНД",
      schedule: "План нашего вечера",
      burgundy: "Бордо",
      roseGold: "Розовое золото",
      chocolate: "Шоколад",
      calendarKicker: "НАШ СЧАСТЛИВЫЙ ДЕНЬ",
      calendarTitle: "Ноябрь 2026",
      calendarSubtitle: "8 ноября · Наша свадьба",
      calendarNote: "Этот день навсегда останется в наших сердцах!",
      weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    },
    ky: {
      coverLabel: "ҮЙЛӨНҮҮ ТОЮНА ЧАКЫРУУ",
      openEnvelope: "КОНВЕРТТИ АЧУУ",
      opening: "КОНВЕРТ АЧЫЛУУДА...",
      scroll: "Сиздер үчүн өзгөчө чакыруу",
      go: "Чакыруу барагына өтүү",
      dear: "Урматтуу, кымбаттуу коноктор!",
      invite: "Сиздерди балдарыбыздын үйлөнүү тоюна чакырабыз",
      celebrate:
        "Алардын бактысына ортоктош болуп, жаштарды куттуктап, тоюбуздун кадырлуу коногу болуңуздар!",
      hosts: "Той ээлери",
      countdown: "Тойго чейин калган убакыт",
      today: "Бүгүн биздин майрамыбыз",
      passed: "Бул сонун күн белгиленип өттү",
      program: "Кеченин программасы",
      welcome: "Конокторду тосуп алуу",
      start: "Тойдун башталышы",
      dinner: "Майрамдык дасторкон",
      dance: "Алгачкы бий",
      end: "Кеченин аякташы",
      venue: "Той өтүүчү жер",
      restaurant: "«Буркан Ата» рестораны",
      address: "Дареги",
      map: "Картаны ачуу",
      dressCode: "Кийим стили",
      dressText:
        "Сиздерди бордо, кызгылт алтын жана жылуу шоколад түстөрүндөгү кийимдер менен күтөбүз.",
      attendance: "Келериңизди ырастаңыз",
      attendanceText:
        "Бул кечени сүйүү менен даярдоо үчүн катышарыңызды алдын ала билдирип коюңуз.",
      name: "Аты-жөнүңүз",
      namePlaceholder: "Атыңызды жазыңыз",
      presence: "Тойго келе аласызбы?",
      yes: "Кубаныч менен келем",
      no: "Тилекке каршы, келе албайм",
      send: "Жоопту жөнөтүү",
      thanks: "Жообуңуз үчүн рахмат!",
      waiting: "Сиздерди күтөбүз!",
      back: "Башына кайтуу",
      date: "2026-жылдын 8-ноябры",
      days: "КҮН",
      hours: "СААТ",
      minutes: "МҮНӨТ",
      seconds: "СЕКУНД",
      schedule: "Кеченин планы",
      burgundy: "Бордо",
      roseGold: "Кызгылт алтын",
      chocolate: "Шоколад",
      calendarKicker: "БАКТЫЛУУ КҮНҮБҮЗ",
      calendarTitle: "Ноябрь 2026",
      calendarSubtitle: "8-ноябрь · Үйлөнүү тоюбуз",
      calendarNote: "Бул күн биздин жүрөгүбүздө өзгөчө орунда!",
      weekdays: ["Дш", "Шш", "Шр", "Бш", "Жм", "Иш", "Жк"],
    },
  }[language];

  const weddingDate = new Date("2026-11-08T17:00:00+06:00");
  const remaining = weddingDate.getTime() - now;

  const days = Math.max(0, Math.floor(remaining / 86400000));
  const hours = Math.max(0, Math.floor((remaining / 3600000) % 24));
  const minutes = Math.max(0, Math.floor((remaining / 60000) % 60));
  const seconds = Math.max(0, Math.floor((remaining / 1000) % 60));

  const calendarYear = 2026;
  const calendarMonth = 10;
  const firstWeekday =
    (new Date(calendarYear, calendarMonth, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(
    calendarYear,
    calendarMonth + 1,
    0
  ).getDate();

  const openEnvelope = () => {
    if (opened) return;

    setOpened(true);

    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio
        .play()
        .then(() => setMusicPlaying(true))
        .catch(() => setMusicPlaying(false));
    }

    window.setTimeout(() => {
      setShowInvitation(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3200);
  };

  const goToInvitation = () => {
    document
      .getElementById("countdown")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!guestName.trim()) return;
    setSubmitted(true);
  };

  return (
    <main className="wedding">
      <audio ref={audioRef} src="/wedding.mp3" loop preload="auto" />

      <button
        type="button"
        className={`music-button ${musicPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label={musicPlaying ? "Выключить музыку" : "Включить музыку"}
      >
        {musicPlaying ? "Ⅱ" : "♫"}
      </button>

      <div className="language-switch">
        <button
          className={language === "ru" ? "active" : ""}
          onClick={() => setLanguage("ru")}
        >
          РУ
        </button>
        <span> / </span>
        <button
          className={language === "ky" ? "active" : ""}
          onClick={() => setLanguage("ky")}
        >
          КЫ
        </button>
      </div>

      {!showInvitation ? (
        <section className="envelope-screen">
          <p className="envelope-caption">{text.coverLabel}</p>

          <div
            className={`envelope ${opened ? "envelope-open" : ""}`}
            onClick={openEnvelope}
            role="button"
            tabIndex={0}
            aria-label={text.openEnvelope}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openEnvelope();
              }
            }}
          >
            <div className="envelope-back" />

            <div className="invitation-card">
              <span className="card-top">08.11.26</span>
              <span className="card-title">{text.coverLabel}</span>
              <span className="card-ornament">✦</span>
              <span className="card-names">
                Эрбол <i>&</i> Бактыгул
              </span>
              <span className="card-date">
                {language === "ky"
                  ? "8-НОЯБРЬ · 2026"
                  : "8 НОЯБРЯ · 2026"}
              </span>
            </div>

            <div className="envelope-pocket" />
            <div className="envelope-flap">
              <div className="flap-inner" />
            </div>
            <div className="wax-seal">
              <span>❦</span>
            </div>
          </div>

          <button
            className="envelope-open-button"
            onClick={openEnvelope}
            disabled={opened}
          >
            {opened ? text.opening : text.openEnvelope}
            <span> ✦</span>
          </button>

          <p className="envelope-hint">{text.scroll}</p>
        </section>
      ) : (
        <>
          <section className="hero" id="invitation">
            <p className="hero-label">{text.date}</p>

            {/* Имена над фотографией */}
            <div className="hero-ornament">❦</div>

            <h1 className="hero-names">
                     Эрбол <i>&</i> Бактыгул
            </h1>

            <div className="gold-divider">
              <span>✦</span>
            </div>

            <div className="hero-photo-frame">
              <img
                className="hero-photo"
                src="https://i.pinimg.com/1200x/f0/20/4d/f0204ddf78e2c07bb74c198b3dc27681.jpg"
                alt="Эрбол жана Бактыгул үйлөнүү тоюна арналган сүрөт"
              />
            </div>

            <p className="hero-message">
              {text.dear}
              <br />
              {text.invite}
              <br />
              <br />
              <strong>Эрбол жана Бактыгул</strong>
              <br />
              <br />
              {text.celebrate}
            </p>

            <div className="host-block">
              <p>{text.hosts}</p>
              <h2>Эркин — Рана</h2>
            </div>

            <button className="back-button" onClick={goToInvitation}>
              {text.go} ↓
            </button>
          </section>

          <section className="calendar-section">
            <p className="section-kicker">{text.calendarKicker}</p>
            <h2>{text.calendarTitle}</h2>
            <p className="calendar-subtitle">{text.calendarSubtitle}</p>

            <div className="calendar">
              {text.weekdays.map((day) => (
                <div className="calendar-weekday" key={day}>
                  {day}
                </div>
              ))}

              {Array.from({ length: firstWeekday }, (_, index) => (
                <div className="calendar-empty" key={`empty-${index}`} />
              ))}

              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;

                return (
                  <div
                    className={`calendar-day ${
                      day === 8 ? "wedding-day" : ""
                    }`}
                    key={day}
                  >
                    {day}
                    {day === 8 && <span>♥</span>}
                  </div>
                );
              })}
            </div>

            <p className="calendar-note">{text.calendarNote}</p>
          </section>

          <section className="countdown-section" id="countdown">
            <p className="section-kicker">{text.countdown}</p>

            {remaining > 0 ? (
              <div className="countdown-grid">
                <div>
                  <strong>{days}</strong>
                  <span>{text.days}</span>
                </div>
                <div>
                  <strong>{hours}</strong>
                  <span>{text.hours}</span>
                </div>
                <div>
                  <strong>{minutes}</strong>
                  <span>{text.minutes}</span>
                </div>
                <div>
                  <strong>{seconds}</strong>
                  <span>{text.seconds}</span>
                </div>
              </div>
            ) : (
              <h2>{text.passed}</h2>
            )}
          </section>

          <section className="details-section">
            <p className="section-kicker">{text.program}</p>
            <h2>{text.schedule}</h2>

            <div className="timeline">
              {[
                ["17:00", text.welcome],
                ["18:00", text.start],
                ["19:00", text.dinner],
                ["20:30", text.dance],
                ["22:00", text.end],
              ].map(([time, title]) => (
                <div className="timeline-item" key={time}>
                  <strong>{time}</strong>
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="venue-section">
            <p className="section-kicker">{text.venue}</p>

            <div className="venue-art" aria-label={text.venue}>
              <span>♧</span>
              <span>🏛</span>
              <span>♧</span>
            </div>

            <h2>{text.restaurant}</h2>
            <p>{text.address}</p>
            <p>Баткен, Исамидин Жусупов кочосу,18</p>

            <a
              className="map-button"
              href=""
              target="_blank"
              rel="noreferrer"
            >
              {text.map} ↗
            </a>
          </section>

          <section className="dress-section">
            <p className="section-kicker">{text.dressCode}</p>
            <h2>
              {language === "ru"
                ? "Будем рады видеть вас"
                : "Сиздерди күтөбүз"}
            </h2>
            <p>{text.dressText}</p>

            <div className="color-palette">
              <div>
                <span className="color-swatch burgundy" />
                <small>{text.burgundy}</small>
              </div>
              <div>
                <span className="color-swatch rose-gold" />
                <small>{text.roseGold}</small>
              </div>
              <div>
                <span className="color-swatch chocolate" />
                <small>{text.chocolate}</small>
              </div>
            </div>
          </section>

          <section className="rsvp-section">
            <p className="section-kicker">{text.attendance}</p>
            <h2>{text.attendance}</h2>
            <p>{text.attendanceText}</p>

            {submitted ? (
              <div className="success-message">
                <span>♡</span>
                <h3>{text.thanks}</h3>
                <p>{text.waiting}</p>
              </div>
            ) : (
              <form className="rsvp-form" onSubmit={submitRsvp}>
                <label htmlFor="guestName">{text.name}</label>
                <input
                  id="guestName"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder={text.namePlaceholder}
                  required
                />

                <p className="rsvp-question">{text.presence}</p>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={attendance === "yes"}
                    onChange={() => setAttendance("yes")}
                  />
                  <span>{text.yes}</span>
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="attendance"
                    value="no"
                    checked={attendance === "no"}
                    onChange={() => setAttendance("no")}
                  />
                  <span>{text.no}</span>
                </label>

                <button className="map-button" type="submit">
                  {text.send}
                </button>
              </form>
            )}
          </section>

          <footer className="site-footer">
            <div>❦</div>
            <h2>Эрбол & Бактыгул</h2>
            <p>{text.waiting}</p>

            <button
              className="back-button"
              onClick={() => {
                setShowInvitation(false);
                setOpened(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {text.back}
            </button>
          </footer>
        </>
      )}
    </main>
  );
}

export default App;
