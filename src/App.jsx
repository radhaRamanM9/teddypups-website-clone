import { useState, useEffect, useRef } from "react";
import "./App.css";

const WHATSAPP_NUMBER = "919999999999";
const PHONE_DISPLAY = "+91 99999 99999";
const PHONE_LINK = "tel:+919999999999";
const EMAIL = "hello@example.com";
const LOCATION = "Bhubaneswar, Odisha";

const BRAND_NAME = "Puppy Love";
const BRAND_TAGLINE = "Making little paws and big hearts happy.";
const CITY = LOCATION.split(",")[0].trim();

const waLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="500" viewBox="0 0 600 500">
      <rect width="600" height="500" fill="#f1e4d6"/>
      <text x="300" y="285" font-size="110" text-anchor="middle">🐶</text>
    </svg>`
  );

const handleImageError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = PLACEHOLDER;
};

const routes = [
  { path: "home", label: "Home" },
  { path: "puppies", label: "Puppies" },
  { path: "families", label: "Happy families" },
  { path: "how-it-works", label: "How it works" },
  { path: "faq", label: "FAQ" },
  { path: "contact", label: "Visit & contact" },
];

const getRoute = () => {
  const raw = window.location.hash.replace(/^#\/?/, "").split("?")[0];
  return routes.some((r) => r.path === raw) ? raw : "home";
};

const puppies = [
  {
    id: 1,
    name: "Little Buddy",
    breed: "Golden Retriever",
    sex: "Boy",
    origin: "Local",
    video: true,
    age: "8 Weeks",
    image: "/Images/popp1.webp",
    description: "Playful, friendly and full of love.",
  },
  {
    id: 2,
    name: "Little Coco",
    breed: "Labrador",
    sex: "Girl",
    origin: "Local",
    video: false,
    age: "10 Weeks",
    image: "/Images/pop2.webp",
    description: "Sweet, adorable and very affectionate.",
  },
  {
    id: 3,
    name: "Little Max",
    breed: "Beagle",
    sex: "Boy",
    origin: "Imported",
    video: true,
    age: "9 Weeks",
    image: "/Images/pop3.webp",
    description: "Energetic and always ready to play.",
  },
  {
    id: 4,
    name: "Little Luna",
    breed: "Poodle",
    sex: "Girl",
    origin: "Imported",
    video: false,
    age: "9 Weeks",
    image: "/Images/pop7.webp",
    description: "Smart, gentle and loves cuddles.",
  },
  {
    id: 5,
    name: "Little Rocky",
    breed: "French Bulldog",
    sex: "Boy",
    origin: "Local",
    video: true,
    age: "11 Weeks",
    image: "/Images/pop8.webp",
    description: "Funny, loyal and a true charmer.",
  },
  {
    id: 6,
    name: "Little Daisy",
    breed: "Beagle",
    sex: "Girl",
    origin: "Local",
    video: false,
    age: "8 Weeks",
    image: "/Images/pop9.webp",
    description: "Curious, cheerful and loves exploring.",
  },
];

const breedList = [...new Set(puppies.map((p) => p.breed))];
const originFilters = ["All", "Local", "Imported"];

const goneHome = [
  { name: "Biscuit", image: "/Images/pop4.webp" },
  { name: "Mochi", image: "/Images/pop5.webp" },
  { name: "Pepper", image: "/Images/pop10.webp" },
  { name: "Nala", image: "/Images/pop11.webp" },
  { name: "Cooper", image: "/Images/pop12.webp" },
  { name: "Ziggy", image: "/Images/pop6.webp" },
];

const stats = [
  { value: "200+", label: "Happy Families" },
  { value: String(breedList.length), label: "Lovely Breeds" },
  { value: String(puppies.length), label: "Pups Available" },
  { value: "24/7", label: "Friendly Support" },
];

const journeySteps = [
  {
    title: "Choose your breed",
    text: "Pick the breed you love or tell us what you are looking for. We will guide you based on availability and your lifestyle.",
  },
  {
    title: "Chat with our team",
    text: "Message us on WhatsApp for photos, videos and health details of the puppy you like.",
  },
  {
    title: "Welcome your puppy home",
    text: "Collect your puppy or arrange a safe delivery, and we will stay in touch after you reach home.",
  },
];

const passport = [
  {
    icon: "🩺",
    title: "Vet-checked & healthy",
    text: "Health records and veterinary details are shared for every puppy.",
  },
  {
    icon: "✈️",
    title: "Safe journey home",
    text: "Careful handling and clear updates, from the breeder to your door.",
  },
  {
    icon: "💬",
    title: "Support 24/7",
    text: "Always here to help, from choosing your puppy to life after adoption.",
  },
  {
    icon: "🌍",
    title: "Trusted by families",
    text: "Happy puppies settling into loving homes, one family at a time.",
  },
];

const families = [
  {
    image: "/Images/fam1.webp",
    title: "A New Family Member",
    quote: "Our little puppy has brought so much happiness!",
  },
  {
    image: "/Images/fam2.webp",
    title: "Forever Friends",
    quote: "We cannot imagine our home without our furry friend.",
  },
  {
    image: "/Images/fam3.webp",
    title: "Weekend Walks",
    quote: "The best part of our day is the evening walk together.",
  },
  {
    image: "/Images/fam4.webp",
    title: "Home Sweet Home",
    quote: "He settled in so quickly and now rules the sofa.",
  },
  {
    image: "/Images/fam5.webp",
    title: "Little Bundle of Joy",
    quote: "The whole family fell in love at first sight.",
  },
  {
    image: "/Images/fam6.webp",
    title: "Best Decision Ever",
    quote: "Thank you for making the adoption so easy and joyful.",
  },
  {
    image: "/Images/fam7.webp",
    title: "Cuddles All Day",
    quote: "She follows us everywhere and sleeps right beside us.",
  },
  {
    image: "/Images/fam8.webp",
    title: "Our Newest Teammate",
    quote: "The kids wake up smiling now that he is home.",
  },
  {
    image: "/Images/fam9.webp",
    title: "Pure Happiness",
    quote: "Every day with our pup feels like a celebration.",
  },
  {
    image: "/Images/fam10.webp",
    title: "Part of the Family",
    quote: "From the first day, it felt like she had always been ours.",
  },
];

const testimonials = [
  {
    name: "Ananya",
    place: "Bhubaneswar",
    puppy: "Little Coco",
    quote:
      "From the first message to bringing Coco home, everything was clear and friendly. She is healthy, playful and already part of the family.",
  },
  {
    name: "Rohit & family",
    place: "Cuttack",
    puppy: "Little Buddy",
    quote:
      "They shared photos and videos whenever we asked and never rushed us. Buddy settled in within a day.",
  },
  {
    name: "Priya",
    place: "Puri",
    puppy: "Little Luna",
    quote:
      "I was nervous about adopting for the first time. The team answered every question and checked in after we got home.",
  },
  {
    name: "Sameer",
    place: "Bhubaneswar",
    puppy: "Little Max",
    quote:
      "Honest, kind and always available on WhatsApp. Max is the happiest member of our house.",
  },
];

const brandNote = {
  title: "A note from us",
  paragraphs: [
    "Every puppy here is looked after like one of our own, and every family is someone we want to stay in touch with.",
    "We share real photos, answer every question and never rush a decision. Our promise is simple: a healthy, happy puppy and support long after you take them home.",
  ],
  signature: "the team",
};

const howNav = [
  { id: "how-ways", label: "Two ways home" },
  { id: "how-promise", label: "Our premium puppy promise" },
  { id: "how-delivery", label: "Delivery & collection" },
  { id: "how-why", label: "Why choose us" },
];

const howSteps = [
  {
    icon: "🔍",
    title: "Explore our puppies",
    text: "Browse the available puppies. Every listing has real photos, breed details, age and health information.",
  },
  {
    icon: "💛",
    title: "Choose your puppy",
    text: "Found one you love? Open their door for more details, or message us with any questions you have.",
  },
  {
    icon: "🧸",
    title: "Meet before you choose",
    text: "Spend time bonding with your puppy before making your decision.",
  },
  {
    icon: "🚚",
    title: "Pick-up or delivery",
    text: "Collect your puppy from us or have them delivered to your home, safely and comfortably.",
  },
];

const promiseItems = [
  {
    icon: "🌿",
    title: "Hand-selected breeders",
    text: "We work only with breeders who uphold high ethical and health standards.",
  },
  {
    icon: "📸",
    title: "Full transparency",
    text: "Photos, videos and health details are shared before your puppy comes home.",
  },
  {
    icon: "🚚",
    title: "Safe, stress-free delivery",
    text: "We handle every detail, so your puppy arrives happy, healthy and ready to love you.",
  },
];

const deliveryItems = [
  {
    title: "Take your puppy home the same day",
    text: "Local puppies are ready to meet right away. Visit, fall in love and go home together.",
  },
  {
    title: "Delivery to your door",
    text: "Prefer to stay home? We can deliver your puppy to your address, safely and comfortably.",
  },
  {
    title: "Safe cargo for imports",
    text: "We take care of the paperwork and plan the journey so your puppy travels stress-free.",
  },
  {
    title: "Delivery across the country",
    text: "Live further away? Trusted partners help bring your puppy safely to your home.",
  },
];

const whyItems = [
  {
    icon: "✈️",
    title: "Careful transport",
    text: "Trusted partners help your new friend travel comfortably and arrive safely, no matter the distance.",
  },
  {
    icon: "💬",
    title: "Support 24/7",
    text: "Our team is a message away on WhatsApp, from choosing your puppy to life after adoption.",
  },
  {
    icon: "🩺",
    title: "Health checked",
    text: "Every puppy is vet-checked, vaccinated and dewormed, and we share the health records with you.",
  },
];

const faqs = [
  {
    question: "How can I adopt a puppy?",
    answer:
      "Browse our available puppies, choose your favourite and contact our team to learn about the next steps.",
  },
  {
    question: "Can I meet a puppy before I decide?",
    answer:
      "Yes. Message us and we will arrange a visit so you can spend time with your puppy before choosing.",
  },
  {
    question: "Are your puppies vaccinated and health-checked?",
    answer:
      "Ask our team for the health records and veterinary information for each puppy, and we will share them before you decide.",
  },
  {
    question: "What is the difference between local and imported puppies?",
    answer:
      "Local puppies are with us and can be visited in person. Imported puppies are arranged from a trusted breeder, and we keep you updated at every step.",
  },
  {
    question: "Can I take my puppy home the same day?",
    answer:
      "For local puppies that are ready to go, often yes. Tell us which puppy you like and we will confirm what is needed.",
  },
  {
    question: "Do you deliver to my city?",
    answer:
      "Message us your city and we will tell you what delivery options are available.",
  },
  {
    question: "Can you bring a breed that is not listed?",
    answer:
      "Yes, ask us. We can arrange many breeds on request and will share photos, videos and health details first.",
  },
  {
    question: "What should I prepare before bringing a puppy home?",
    answer:
      "A soft bed, food and water bowls, a collar and leash, toys and a safe space to rest are a great start.",
  },
  {
    question: "How do I reserve a puppy?",
    answer:
      "Message us on WhatsApp or send the letter on the Visit & contact page with the puppy you like, and our team will explain the next steps.",
  },
];

const pinColors = ["#c0532b", "#3b6ea5", "#d9a02b", "#c75a7a", "#4f8a4a"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  puppy: "",
  message: "",
};

function App() {
  const [route, setRoute] = useState(getRoute);
  const [menuOpen, setMenuOpen] = useState(false);
  const [breedFilter, setBreedFilter] = useState("All");
  const [originFilter, setOriginFilter] = useState("All");
  const [faqQuery, setFaqQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [wayTab, setWayTab] = useState("local");
  const [howSection, setHowSection] = useState("how-ways");
  const [sexFilter, setSexFilter] = useState("All");
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [openDoors, setOpenDoors] = useState(puppies.map((p) => p.id));
  const doorsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const visiblePuppies = puppies.filter(
    (p) =>
      (breedFilter === "All" || p.breed === breedFilter) &&
      (originFilter === "All" || p.origin === originFilter) &&
      (sexFilter === "All" || p.sex === sexFilter)
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer;

    const onHashChange = () => {
      setMenuOpen(false);
      setLoading(true);
      clearTimeout(timer);

      timer = setTimeout(() => {
        setRoute(getRoute());
        window.scrollTo({ top: 0, behavior: "instant" });
        setLoading(false);
      }, 550);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const current = routes.find((r) => r.path === route);
    document.title = `${BRAND_NAME} · ${current ? current.label : "Home"}`;
  }, [route]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = doorsRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;

      const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el.scrollLeft >= max - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;

      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [route, loading, visiblePuppies.length]);

  useEffect(() => {
    if (route !== "how-it-works" || loading) return undefined;

    const sections = howNav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setHowSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [route, loading]);

  const toggleDoor = (id) =>
    setOpenDoors((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const scrollDoors = (direction) => {
    if (doorsRef.current) {
      doorsRef.current.scrollBy({ left: direction * 340, behavior: "smooth" });
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please tell us your name.";
    if (!form.phone.trim() && !form.email.trim())
      newErrors.contact = "Please add a phone number or an email so we can reply.";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      newErrors.email = "That email address does not look right.";
    if (form.phone.trim() && !/^[0-9+\-\s()]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = "That phone number does not look right.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log("Adoption enquiry:", form);
    setSubmitted(true);
    setForm(initialForm);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const choosePuppy = (name) => {
    setForm((prev) => ({ ...prev, puppy: name }));
    setSubmitted(false);
  };

  const showOrigin = (origin) => {
    setOriginFilter(origin);
    setBreedFilter("All");
    setSexFilter("All");
  };

  const resetFilters = () => {
    setBreedFilter("All");
    setOriginFilter("All");
    setSexFilter("All");
  };

  const renderPageHero = (theme, tag, title, text) => (
    <section className={`page-hero ${theme}`}>
      <span className="page-tag">{tag}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );

  const renderSketchTop = () => {
    const anyFilter =
      originFilter !== "All" || breedFilter !== "All" || sexFilter !== "All";

    return (
      <section className="sketch-paper">
        <span className="paw-dot pd1" aria-hidden="true">🐾</span>
        <span className="paw-dot pd2" aria-hidden="true">🐾</span>
        <span className="paw-dot pd3" aria-hidden="true">🐾</span>
        <span className="paw-dot pd4" aria-hidden="true">🐾</span>
        <span className="paw-dot pd5" aria-hidden="true">🐾</span>

        <div className="sketch-hero">
          <div className="sketch-hero-text">
            <span className="sketch-tag">from our sketchbook</span>
            <h1>Available puppies</h1>
            <svg
              className="squiggle"
              viewBox="0 0 640 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M4 14 C 70 2, 130 24, 200 12 S 330 2, 400 14 S 540 24, 636 8"
                fill="none"
                stroke="#c0622a"
                strokeWidth="7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <p>
              Every puppy here is real and looking for a home right now. Open a
              door to meet them, then ask us about your favourite on WhatsApp.
            </p>
          </div>

          <figure className="self-portrait">
            <div className="portrait-ring">
              <span aria-hidden="true">🐩</span>
            </div>
            <figcaption>self-portrait</figcaption>
          </figure>
        </div>

        <div className="sketch-filters">
          <span className="tape" aria-hidden="true" />

          <div className="sf-row">
            <span className="sf-label">where</span>
            <div className="sf-chips" role="group" aria-label="Filter by origin">
              {originFilters.map((origin) => (
                <button
                  type="button"
                  key={origin}
                  className={`sf-chip ${originFilter === origin ? "active" : ""}`}
                  aria-pressed={originFilter === origin}
                  onClick={() => setOriginFilter(origin)}
                >
                  {origin === "All" ? "Everywhere" : origin}
                </button>
              ))}
            </div>
          </div>

          <div className="sf-row">
            <span className="sf-label">breed</span>
            <div className="sf-chips" role="group" aria-label="Filter by breed">
              {breedList.map((breed) => (
                <button
                  type="button"
                  key={breed}
                  className={`sf-chip ${breedFilter === breed ? "active" : ""}`}
                  aria-pressed={breedFilter === breed}
                  onClick={() =>
                    setBreedFilter(breedFilter === breed ? "All" : breed)
                  }
                >
                  {breed}
                </button>
              ))}
            </div>
          </div>

          <div className="sf-row">
            <span className="sf-label">boy or girl</span>
            <div className="sf-chips" role="group" aria-label="Filter by sex">
              {[
                { value: "Boy", label: "Boys" },
                { value: "Girl", label: "Girls" },
              ].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={`sf-chip ${sexFilter === option.value ? "active" : ""}`}
                  aria-pressed={sexFilter === option.value}
                  onClick={() =>
                    setSexFilter(sexFilter === option.value ? "All" : option.value)
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="sf-foot">
            <p>
              Showing {visiblePuppies.length} of {puppies.length} puppies
            </p>
            {anyFilter && (
              <button type="button" className="sf-clear" onClick={resetFilters}>
                clear filters ✕
              </button>
            )}
          </div>
        </div>
      </section>
    );
  };

  const renderGoneHome = () => (
    <section className="gone-section">
      <span className="paw-dot pd2" aria-hidden="true">🐾</span>
      <span className="paw-dot pd4" aria-hidden="true">🐾</span>

      <div className="gone-inner">
        <div className="gone-text">
          <h2>
            Already
            <br />
            gone home
          </h2>
          <p>These puppies have found their families.</p>
          <a href="#/families" className="see-all-button">
            See the puppies who&apos;ve gone home
          </a>
        </div>

        <div className="gone-track-wrap">
          <div className="gone-track">
            {[...goneHome, ...goneHome].map((pup, index) => (
              <figure
                className="gone-item"
                key={`${pup.name}-${index}`}
                aria-hidden={index >= goneHome.length}
              >
                <div className="gone-photo">
                  <img
                    src={pup.image}
                    alt={index < goneHome.length ? pup.name : ""}
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>
                <span className="gone-sticker">gone home ♥</span>
                <figcaption>{pup.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderDoors = ({ head, filters }) => (
    <section className="puppy-section" id="puppies">
      {head && (
        <div className="puppy-head">
          <div>
            <h2>Meet the pups</h2>
            <p>
              Real puppies, real photos, looking for their families right now.
            </p>
          </div>

          <a
            href="#/puppies"
            className="see-all-button"
            onClick={resetFilters}
          >
            See all available puppies
          </a>
        </div>
      )}

      {filters && (
        <div className="filters">
          <div className="filter-bar" aria-label="Filter by origin">
            {originFilters.map((origin) => (
              <button
                type="button"
                key={origin}
                className={`filter-button ${
                  originFilter === origin ? "active" : ""
                }`}
                onClick={() => setOriginFilter(origin)}
              >
                {origin === "All" ? "All Puppies" : origin}
              </button>
            ))}
          </div>

          <div className="filter-bar" aria-label="Filter by breed">
            {["All", ...breedList].map((breed) => (
              <button
                type="button"
                key={breed}
                className={`filter-button small ${
                  breedFilter === breed ? "active" : ""
                }`}
                onClick={() => setBreedFilter(breed)}
              >
                {breed === "All" ? "All Breeds" : breed}
              </button>
            ))}
          </div>

          <p className="results-count">
            Showing {visiblePuppies.length} of {puppies.length} puppies · scroll
            with your mouse wheel or use the arrows
          </p>
        </div>
      )}

      {visiblePuppies.length === 0 ? (
        <div className="empty-state">
          <p>No puppies match these filters right now.</p>
          <button
            type="button"
            className="contact-button"
            onClick={resetFilters}
          >
            Show All Puppies
          </button>
        </div>
      ) : (
        <div className="doors-wrap">
          <button
            type="button"
            className="scroll-arrow left"
            aria-label="Scroll left"
            onClick={() => scrollDoors(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="scroll-arrow right"
            aria-label="Scroll right"
            onClick={() => scrollDoors(1)}
          >
            ›
          </button>

          <div
            className="doors-scroller"
            ref={doorsRef}
          >
            <div className="doors-row">
              {visiblePuppies.map((puppy, index) => {
                const isOpen = openDoors.includes(puppy.id);

                return (
                  <div className="door-item" key={puppy.id}>
                    <div className="door-head">
                      <h3>{puppy.name}</h3>
                      <span className="door-breed">{puppy.breed}</span>
                      <span className="door-meta">
                        {puppy.sex.toLowerCase()}, {puppy.age.toLowerCase()} ·{" "}
                        {puppy.origin.toLowerCase()}
                      </span>
                    </div>

                    <div className="door-frame">
                      <button
                        type="button"
                        className={`door ${isOpen ? "open" : ""}`}
                        aria-pressed={isOpen}
                        aria-label={`${isOpen ? "Close" : "Open"} the door for ${puppy.name}`}
                        onClick={() => toggleDoor(puppy.id)}
                      >
                        <img
                          src={puppy.image}
                          alt={puppy.name}
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <span className={`door-leaf leaf-${index % 3}`} />
                      </button>

                      <span className="sticker sticker-available">
                        Available
                      </span>
                      {puppy.video && (
                        <span className="sticker sticker-video">▶ video</span>
                      )}
                    </div>

                    <div className="door-actions">
                      <a
                        href="#/contact"
                        className="door-link"
                        onClick={() => choosePuppy(puppy.name)}
                      >
                        Know more
                      </a>
                      <a
                        href={waLink(
                          `Hi! I am interested in ${puppy.name} (${puppy.breed}). Is he/she still available?`
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="door-whatsapp"
                        aria-label={`Ask about ${puppy.name} on WhatsApp`}
                      >
                        💬
                      </a>
                    </div>
                  </div>
                );
              })}

              <div className="door-item door-end">
                <div className="door-head" />
                <div className="door-frame">
                  <a href="#/contact" className="door-end-arch">
                    <strong>More pups on the way!</strong>
                    <span>Ask us what is coming soon →</span>
                  </a>
                </div>
                <div className="door-actions" />
              </div>
            </div>
          </div>

          <div className="mascot" aria-hidden="true">
            🐕
          </div>
        </div>
      )}
    </section>
  );

  const renderWays = () => (
    <section className="ways-section" id="ways">
      <h2 className="big-title">
        Two ways to
        <br />
        meet your puppy
      </h2>

      <div className="signpost">
        <div className="sign-wrap sign-wrap-left">
          <a
            href="#/puppies"
            className="sign sign-left"
            onClick={() => showOrigin("Local")}
          >
            Local puppies
          </a>
        </div>

        <div className="post" aria-hidden="true" />

        <div className="sign-wrap sign-wrap-right">
          <a
            href="#/puppies"
            className="sign sign-right"
            onClick={() => showOrigin("Imported")}
          >
            Imported for you
          </a>
        </div>

        <div className="scene scene-left">
          <svg
            className="skyline"
            viewBox="0 0 320 140"
            aria-hidden="true"
            fill="none"
            stroke="#c9a679"
            strokeWidth="5"
            strokeLinejoin="round"
          >
            <rect x="20" y="78" width="28" height="56" />
            <rect x="62" y="44" width="18" height="90" />
            <rect x="98" y="88" width="42" height="46" />
            <rect x="156" y="24" width="24" height="110" />
            <rect x="196" y="70" width="36" height="64" />
            <rect x="246" y="92" width="34" height="42" />
            <line x1="0" y1="136" x2="320" y2="136" />
          </svg>

          <figure className="shop-photo">
            <div className="awning" />
            <img
              src="/Images/pop2.webp"
              alt="A puppy in our showroom"
              loading="lazy"
              onError={handleImageError}
            />
            <figcaption>In our showroom</figcaption>
          </figure>

          <span className="scene-dog" aria-hidden="true">
            🐩
          </span>

          <a
            href="#/puppies"
            className="scene-button"
            onClick={() => showOrigin("Local")}
          >
            Meet local puppies →
          </a>
        </div>

        <div className="scene scene-right">
          <svg className="flight" viewBox="0 0 400 270" aria-hidden="true">
            <path
              d="M60 225 Q 170 20 340 130"
              fill="none"
              stroke="#9b4a1e"
              strokeWidth="4"
              strokeDasharray="3 11"
              strokeLinecap="round"
            />
            <circle cx="60" cy="225" r="8" fill="#9b4a1e" />
            <circle cx="340" cy="130" r="8" fill="#9b4a1e" />
            <text x="60" y="255" textAnchor="middle" className="flight-text">
              Breeder
            </text>
            <text x="340" y="160" textAnchor="middle" className="flight-text">
              Your home
            </text>
            <text
              x="190"
              y="105"
              fontSize="78"
              textAnchor="middle"
              transform="rotate(-10 190 95)"
            >
              ✈️
            </text>
          </svg>

          <a
            href="#/puppies"
            className="scene-button"
            onClick={() => showOrigin("Imported")}
          >
            See imported puppies →
          </a>
        </div>
      </div>
    </section>
  );

  const renderJourney = () => (
    <section className="journey-section" id="journey">
      <div className="journey-grid">
        <div className="journey-text">
          <h2 className="big-title left">
            Your puppy
            <br />
            journey
          </h2>
          <p className="journey-intro">
            A friendly, step-by-step experience. We make adoption simple,
            secure and purely joyful.
          </p>

          <ol className="journey-steps">
            {journeySteps.map((step, index) => (
              <li key={step.title}>
                <span className="step-num">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="journey-phone-wrap">
          <div className="journey-dog" aria-hidden="true">
            <span className="speech">coming?</span>
            <span className="journey-dog-emoji">🐩</span>
          </div>

          <div className="phone">
            <div className="phone-head">
              <span className="phone-avatar">🐶</span>
              <div>
                <strong>{BRAND_NAME}</strong>
                <span>online</span>
              </div>
            </div>

            <div className="phone-chat">
              <div className="bubble bubble-sent">
                Hi {BRAND_NAME}! I would love to know more about your puppies.
              </div>

              <div className="bubble bubble-received">
                Select your preferred breed or tell us what you are looking
                for. We will guide you based on availability and your
                lifestyle.
                <div className="bubble-chips">
                  {breedList.map((breed) => (
                    <a
                      key={breed}
                      href={waLink(`Hi! I am looking for a ${breed} puppy.`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {breed}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="phone-foot">
              <a
                href={waLink("Hi! I would like to say hello.")}
                target="_blank"
                rel="noreferrer"
                className="phone-input"
              >
                Say hello on WhatsApp
              </a>
              <a
                href={waLink("Hi! I would like to say hello.")}
                target="_blank"
                rel="noreferrer"
                className="phone-send"
                aria-label="Send on WhatsApp"
              >
                ➤
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderPassport = () => (
    <section className="passport-section" id="passport">
      <div className="book">
        <div className="book-page book-left">
          <span className="passport-tag">puppy passport</span>
          <h2 className="big-title left small">
            Why families
            <br />
            trust {BRAND_NAME}
          </h2>
          <span className="book-dog" aria-hidden="true">
            🐩
          </span>
        </div>

        <div className="book-page book-right">
          <div className="stamps">
            {passport.map((item, index) => (
              <div className="stamp-item" key={item.title}>
                <div className={`stamp stamp-${index + 1}`}>
                  <span className="stamp-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <strong>{item.title}</strong>
                </div>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const renderFamilies = (limit) => (
    <section className="families-section" id="families">
      <div className="polaroids">
        {families.slice(0, limit).map((family, index) => (
          <figure
            className={`polaroid tilt-${index % 3}`}
            key={family.title}
          >
            <img
              src={family.image}
              alt={family.title}
              loading="lazy"
              onError={handleImageError}
            />
            <figcaption>
              <strong>{family.title}</strong>
              <span>{`"${family.quote}"`}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );

  const renderFaq = () => {
    const query = faqQuery.trim().toLowerCase();
    const visible = faqs
      .map((item, index) => ({ ...item, index }))
      .filter(
        (item) =>
          !query ||
          item.question.toLowerCase().includes(query) ||
          item.answer.toLowerCase().includes(query)
      );

    return (
      <section className="faq-page" id="faq">
        <div className="faq-intro">
          <span className="faq-tag">got questions?</span>
          <h1>Frequently asked questions</h1>
          <p>
            Can&apos;t find what you&apos;re looking for? Message us on
            WhatsApp, our team is happy to help.
          </p>
        </div>

        <div className="faq-layout">
          <aside className="faq-side">
            <label className="faq-search-label" htmlFor="faq-search">
              sniff out a question
            </label>
            <div className="faq-search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="10" cy="10" r="6.5" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
              <input
                id="faq-search"
                type="search"
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                placeholder="delivery, import, vaccinated…"
              />
            </div>
            <p className="faq-count" aria-live="polite">
              {visible.length} {visible.length === 1 ? "note" : "notes"} on the
              board
            </p>

            <div className="faq-mascot" aria-hidden="true">
              <span className="faq-bubble">?</span>
              <svg viewBox="0 0 200 200">
                <ellipse cx="100" cy="186" rx="62" ry="8" fill="rgba(0,0,0,.18)" />
                <circle cx="52" cy="150" r="17" fill="#e9a94a" />
                <ellipse cx="108" cy="150" rx="50" ry="36" fill="#f0b95c" />
                <circle cx="70" cy="160" r="22" fill="#f4c36a" />
                <rect x="112" y="140" width="22" height="42" rx="11" fill="#f4c36a" />
                <rect x="140" y="146" width="20" height="36" rx="10" fill="#f0b95c" />
                <circle cx="146" cy="126" r="12" fill="#f4c36a" />
                <ellipse cx="76" cy="92" rx="15" ry="26" fill="#e9a94a" />
                <ellipse cx="136" cy="92" rx="15" ry="26" fill="#e9a94a" />
                <circle cx="106" cy="86" r="36" fill="#f4c36a" />
                <circle cx="88" cy="56" r="15" fill="#f4c36a" />
                <circle cx="106" cy="48" r="17" fill="#f7cd7e" />
                <circle cx="124" cy="56" r="15" fill="#f4c36a" />
                <ellipse cx="106" cy="102" rx="17" ry="13" fill="#fbe2b4" />
                <ellipse cx="106" cy="95" rx="6" ry="4" fill="#3a2418" />
                <path d="M106 99 v6 M99 106 q7 5 14 0" stroke="#3a2418" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="93" cy="84" r="4" fill="#2a1a10" />
                <circle cx="119" cy="84" r="4" fill="#2a1a10" />
                <circle cx="82" cy="98" r="6" fill="#f29a8a" opacity=".6" />
                <circle cx="130" cy="98" r="6" fill="#f29a8a" opacity=".6" />
                <path d="M80 119 Q106 134 132 119" stroke="#9b3a1e" strokeWidth="6" fill="none" strokeLinecap="round" />
                <circle cx="106" cy="128" r="4" fill="#f7c64a" />
              </svg>
            </div>

            <a
              className="faq-ask"
              href={waLink("Hi! I have a question about adopting a puppy.")}
              target="_blank"
              rel="noreferrer"
            >
              Ask your own question
            </a>
          </aside>

          <div className="cork">
            <div className="cork-inner">
              {visible.length === 0 && (
                <p className="faq-empty">
                  No notes match &ldquo;{faqQuery}&rdquo;. Try another word, or
                  ask us on WhatsApp.
                </p>
              )}

              {visible.map((item) => {
                const isOpen = openFaq === item.index;
                return (
                  <article
                    className={`faq-note ${isOpen ? "open" : ""}`}
                    key={item.index}
                  >
                    <span
                      className="faq-pin"
                      style={{ background: pinColors[item.index % pinColors.length] }}
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className="faq-note-q"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.index}`}
                      onClick={() => setOpenFaq(isOpen ? null : item.index)}
                    >
                      <span>{item.question}</span>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="5,9 12,16 19,9" />
                      </svg>
                    </button>
                    <div className="faq-answer" id={`faq-answer-${item.index}`}>
                      <p>{item.answer}</p>
                    </div>
                    <span className="faq-fold" aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  };

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    LOCATION
  )}`;

  const renderContact = () => (
    <section className="contact-section" id="contact">
      <div className="contact-layout">
        <div className="contact-side">
          <a
            href={waLink("Hi! I would like to enquire about a puppy.")}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-solid contact-wa"
          >
            💬 WhatsApp {PHONE_DISPLAY}
          </a>

          <div className="contact-line">
            <span>call us</span>
            <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
          </div>
          <div className="contact-line">
            <span>email</span>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>

          <article className="visit-card">
            <div className="visit-awning" aria-hidden="true" />
            <div className="visit-body">
              <div className="visit-copy">
                <h2>Visit us in {CITY}</h2>
                <p>
                  Step into our showroom in {CITY} and enjoy choosing your
                  puppy face-to-face. Message us first so we can have your
                  favourite ready.
                </p>
                <p className="visit-address">📍 {LOCATION}</p>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="visit-directions"
                >
                  Get directions →
                </a>
              </div>
              <img
                className="visit-photo"
                src={puppies[1].image}
                alt={`A puppy waiting for visitors at ${BRAND_NAME}`}
                onError={handleImageError}
              />
            </div>
          </article>
        </div>

        {submitted ? (
          <div className="letter letter-done">
            <span className="letter-stamp" aria-hidden="true">
              🐾
            </span>
            <h3>Letter posted! 🐾</h3>
            <p>
              Thank you. We have received your letter and will write back very
              soon.
            </p>
            <button
              type="button"
              className="contact-button"
              onClick={() => setSubmitted(false)}
            >
              Write another letter
            </button>
          </div>
        ) : (
          <form className="letter" onSubmit={handleSubmit} noValidate>
            <span className="letter-stamp" aria-hidden="true">
              🐾
            </span>

            <h3 className="letter-dear">Dear {BRAND_NAME},</h3>

            <p className="letter-line">
              my name is{" "}
              <input
                className="blank blank-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                aria-label="Your name"
                autoComplete="name"
              />
              , and you can reach me on{" "}
              <input
                className="blank blank-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                aria-label="Your phone number"
                autoComplete="tel"
              />{" "}
              or by email at{" "}
              <input
                className="blank blank-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="optional"
                aria-label="Your email address"
                autoComplete="email"
              />
              .
            </p>

            <p className="letter-line">
              I live in{" "}
              <input
                className="blank blank-city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder={`e.g. ${CITY}`}
                aria-label="Where you live"
              />
              , and I&apos;m curious about{" "}
              <select
                className="blank blank-select"
                name="puppy"
                value={form.puppy}
                onChange={handleChange}
                aria-label="Puppy you are curious about"
              >
                <option value="">any puppy (not sure yet)</option>
                {puppies.map((puppy) => (
                  <option key={puppy.id} value={puppy.name}>
                    {puppy.name} ({puppy.breed})
                  </option>
                ))}
              </select>
              .
            </p>

            {(errors.name || errors.contact || errors.email || errors.phone) && (
              <div className="letter-error" role="alert">
                {errors.name || errors.contact || errors.phone || errors.email}
              </div>
            )}

            <textarea
              className="letter-text"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              placeholder="Anything else you'd like to tell us..."
              aria-label="Your message"
            />

            <div className="letter-foot">
              <span>with love, a future puppy parent</span>
              <button type="submit" className="letter-send">
                Post my letter
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );

  const renderComments = (limit) => (
    <section className="comments-section">
      <div className="section-heading">
        <span className="section-tag">KIND WORDS</span>
        <h2>What families say</h2>
        <p>A few messages from people who took their puppy home.</p>
      </div>

      <div className="comments-grid">
        {testimonials.slice(0, limit).map((item, index) => (
          <figure className={`comment-card cc-${index % 3}`} key={item.name}>
            <span className="comment-mark" aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <span className="comment-avatar" aria-hidden="true">
                {item.name.charAt(0)}
              </span>
              <span>
                <strong>{item.name}</strong>
                <small>
                  {item.place} · adopted {item.puppy}
                </small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );

  const renderBrandNote = () => (
    <section className="brand-note-section">
      <article className="brand-note">
        <span className="note-tape" aria-hidden="true" />
        <h3>{brandNote.title}</h3>
        {brandNote.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <div className="note-sign">
          <span>
            with love, {brandNote.signature} at {BRAND_NAME}
          </span>
          <span aria-hidden="true">🐾</span>
        </div>
      </article>
    </section>
  );

  const goToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderHowPage = () => {
    const isLocal = wayTab === "local";

    return (
      <div className="how-page">
        <nav className="how-subnav" aria-label="On this page">
          {howNav.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`how-chip ${howSection === item.id ? "active" : ""}`}
              onClick={() => goToSection(item.id)}
            >
              <b>{index + 1}</b> {item.label}
            </button>
          ))}
        </nav>

        <section className="how-block" id="how-ways">
          <div className="how-ways-head">
            <div>
              <span className="how-tag">choose your way</span>
              <h2 className="how-title">Two ways home</h2>
            </div>

            <div className="way-toggle-wrap">
              <div
                className="way-toggle"
                role="tablist"
                aria-label="How to meet your puppy"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={isLocal}
                  className={`way-opt ${isLocal ? "active" : ""}`}
                  onClick={() => setWayTab("local")}
                >
                  <strong>Local</strong>
                  <small>meet in person</small>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isLocal}
                  className={`way-opt ${!isLocal ? "active" : ""}`}
                  onClick={() => setWayTab("imported")}
                >
                  <strong>Imported</strong>
                  <small>order upon request</small>
                </button>
              </div>
              <span className="way-dog" aria-hidden="true">
                🐩
              </span>
            </div>
          </div>

          <div className="way-panel">
            <div className="way-copy">
              <h3>
                {isLocal
                  ? "Meet your puppy in person"
                  : "Can't find your breed? We'll bring them to you"}
              </h3>
              <p>
                {isLocal
                  ? `Step into our showroom in ${CITY} and enjoy choosing your puppy face to face. Our puppies are healthy, well socialised and raised with care, so you can take your favourite home once everything is ready.`
                  : "Looking for a special breed? Tell us what you want and we will arrange a puppy from a trusted breeder, sharing photos, videos and health details at every step before they travel."}
              </p>
              <div className="way-buttons">
                <a
                  href="#/puppies"
                  className="contact-button"
                  onClick={() => showOrigin(isLocal ? "Local" : "Imported")}
                >
                  {isLocal ? "See local puppies →" : "See imported puppies →"}
                </a>
                <a
                  href={waLink(
                    isLocal
                      ? "Hi! I would like to visit and meet a puppy."
                      : "Hi! I would like to order a puppy upon request."
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-button contact-outline"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            <div className="city-card" aria-hidden="true">
              <span className="city-label">
                {isLocal ? CITY : "Breeder to your home"}
              </span>
              <span className="city-sun" />
              <svg
                className="city-skyline"
                viewBox="0 0 520 200"
                preserveAspectRatio="xMidYMax meet"
                fill="none"
                stroke="#7a5535"
                strokeWidth="5"
                strokeLinejoin="round"
              >
                <rect x="30" y="120" width="44" height="76" />
                <rect x="90" y="80" width="30" height="116" />
                <rect x="136" y="140" width="56" height="56" />
                <rect x="220" y="30" width="26" height="166" />
                <rect x="262" y="110" width="52" height="86" />
                <rect x="330" y="130" width="46" height="66" />
                <rect x="392" y="90" width="40" height="106" />
                <rect x="446" y="140" width="46" height="56" />
                <line x1="0" y1="197" x2="520" y2="197" />
              </svg>

              {isLocal ? (
                <span className="city-dog">🐕</span>
              ) : (
                <svg className="city-flight" viewBox="0 0 520 300">
                  <path
                    d="M50 230 Q 250 -30 470 110"
                    fill="none"
                    stroke="#9b4a1e"
                    strokeWidth="4"
                    strokeDasharray="3 11"
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="230" r="8" fill="#9b4a1e" />
                  <circle cx="470" cy="110" r="8" fill="#9b4a1e" />
                  <text x="255" y="92" fontSize="80" textAnchor="middle">
                    ✈️
                  </text>
                </svg>
              )}
            </div>
          </div>
        </section>

        <section className="how-block how-steps-block">
          <div className="how-steps">
            {howSteps.map((step, index) => (
              <article className="how-step-card" key={step.title}>
                <span className={`how-step-icon hsi-${index}`} aria-hidden="true">
                  {step.icon}
                </span>
                <span className="how-step-num">Step {index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="how-block" id="how-promise">
          <div className="promise-card">
            <span className="passport-tag">puppy passport</span>
            <h2 className="how-title">
              Our premium
              <br />
              puppy promise
            </h2>

            <div className="promise-stamps">
              {promiseItems.map((item, index) => (
                <div className="stamp-item" key={item.title}>
                  <div className={`stamp stamp-${index + 1}`}>
                    <span className="stamp-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <strong>{item.title}</strong>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="how-block" id="how-delivery">
          <div className="delivery-grid">
            <div className="delivery-copy">
              <h2 className="how-title">
                Delivery &amp;
                <br />
                collection
              </h2>
              <p className="how-lead">
                From a same-day visit to a long journey, every puppy travels
                comfortably and arrives safely.
              </p>

              <div className="delivery-items">
                {deliveryItems.map((item) => (
                  <div key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <svg
              className="delivery-art"
              viewBox="0 0 520 340"
              aria-hidden="true"
              fill="none"
            >
              <g stroke="#c9a679" strokeWidth="6" strokeLinejoin="round">
                <rect x="40" y="220" width="46" height="100" />
                <rect x="100" y="170" width="38" height="150" />
                <rect x="150" y="240" width="60" height="80" />
                <rect x="240" y="110" width="30" height="210" />
                <rect x="290" y="200" width="56" height="120" />
                <rect x="360" y="230" width="50" height="90" />
                <rect x="420" y="190" width="44" height="130" />
                <line x1="10" y1="322" x2="510" y2="322" />
              </g>
              <path
                d="M60 250 Q 250 -40 470 120"
                stroke="#9b4a1e"
                strokeWidth="4"
                strokeDasharray="3 11"
                strokeLinecap="round"
              />
              <circle cx="60" cy="250" r="8" fill="#9b4a1e" />
              <circle cx="470" cy="120" r="8" fill="#9b4a1e" />
              <text x="60" y="282" textAnchor="middle" className="flight-text">
                Breeder
              </text>
              <text x="470" y="152" textAnchor="middle" className="flight-text">
                Your home
              </text>
              <text x="255" y="96" fontSize="84" textAnchor="middle">
                ✈️
              </text>
            </svg>
          </div>
        </section>

        <section className="how-block" id="how-why">
          <div className="why-grid">
            <div>
              <h2 className="how-title">
                Why
                <br />
                choose us
              </h2>
              <p className="how-lead">
                We are here to help you find a new family member. From the
                moment you visit our site to the happy day your puppy comes
                home, we are with you every step of the way.
              </p>
            </div>

            <div className="why-list">
              {whyItems.map((item) => (
                <div className="why-row" key={item.title}>
                  <span className="why-row-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="how-block how-close-block">
          <div className="how-close">
            <div>
              <h2>Healthy, happy, well-loved puppies</h2>
              <p>
                When you choose {BRAND_NAME}, you get a puppy raised with care.
                We also offer guidance to new owners, with advice on training,
                nutrition and everyday care, so the move home is smooth for you
                and your new friend.
              </p>
              <div className="way-buttons">
                <a
                  href={waLink("Hi! I would like to enquire about a puppy.")}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-solid"
                >
                  Ask us on WhatsApp
                </a>
                <a href="#/puppies" className="outline-pill">
                  See available puppies
                </a>
              </div>
            </div>
            <span className="how-close-dog" aria-hidden="true">
              🐩
            </span>
          </div>
        </section>
      </div>
    );
  };

  const renderCta = () => (
    <section className="cta-section">
      <span className="cta-dog" aria-hidden="true">
        🐩
      </span>
      <div>
        <h2>Ready to meet your new best friend?</h2>
        <p>Say hello on WhatsApp or come and visit us.</p>
      </div>
      <div className="cta-buttons">
        <a
          href={waLink("Hi! I would like to enquire about a puppy.")}
          target="_blank"
          rel="noreferrer"
          className="contact-button"
        >
          💬 Enquire on WhatsApp
        </a>
        <a href="#/contact" className="contact-button contact-outline">
          Visit &amp; contact
        </a>
      </div>
    </section>
  );

  const pages = {
    home: (
      <>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="hero-tag">Find Your New Best Friend</span>

            <h1>
              A Little Puppy,
              <br />
              A Lot of Love
            </h1>

            <p>
              Discover adorable puppies and find your perfect furry companion.
              Your new best friend is waiting!
            </p>

            <div className="hero-actions">
              <a href="#/puppies" className="hero-button">
                View Available Puppies →
              </a>
              <a
                href={waLink("Hi! I would like to enquire about a puppy.")}
                target="_blank"
                rel="noreferrer"
                className="hero-button hero-button-outline"
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="breed-strip">
          {breedList.map((breed) => (
            <span key={breed}>{breed}</span>
          ))}
        </section>

        <section className="stats-section">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        {renderDoors({ head: true, filters: false })}
        {renderWays()}
        {renderJourney()}
        {renderPassport()}

        <section className="home-families">
          <div className="section-heading">
            <span className="section-tag">HAPPY MOMENTS</span>
            <h2>Our Happy Families</h2>
            <p>
              Nothing makes us happier than seeing our puppies find their
              forever homes.
            </p>
          </div>
          {renderFamilies(3)}
          <div className="center-button">
            <a href="#/families" className="contact-button">
              See every happy family →
            </a>
          </div>
        </section>

        {renderComments(3)}
        {renderCta()}
      </>
    ),

    puppies: (
      <>
        {renderSketchTop()}
        {renderDoors({ head: false, filters: false })}
        {renderGoneHome()}
      </>
    ),

    families: (
      <>
        {renderPageHero(
          "theme-families",
          "HAPPY MOMENTS",
          "Our happy families",
          "Nothing makes us happier than seeing our puppies find their forever homes."
        )}
        {renderFamilies(families.length)}
        {renderComments(testimonials.length)}
        {renderBrandNote()}
        {renderCta()}
      </>
    ),

    "how-it-works": <>{renderHowPage()}</>,

    faq: (
      <>
        {renderFaq()}
        {renderCta()}
      </>
    ),

    contact: (
      <>
        {renderPageHero(
          "theme-contact",
          "VISIT & CONTACT",
          "Say hello to us",
          "Write us a little letter and our team will write back, or reach us directly."
        )}
        {renderContact()}
      </>
    ),
  };

  return (
    <div className="App">
      <div
        className={`page-loader ${loading ? "show" : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className="loader-box">
          <div className="walk-scene" aria-hidden="true">
            <div className="walk-fence" />

            <svg className="walk-dog" viewBox="0 0 200 140">
              <g className="leg leg-b leg-far">
                <rect x="46" y="80" width="13" height="42" rx="6.5" />
                <ellipse cx="52.5" cy="122" rx="9" ry="5" />
              </g>
              <g className="leg leg-a leg-far">
                <rect x="124" y="80" width="13" height="42" rx="6.5" />
                <ellipse cx="130.5" cy="122" rx="9" ry="5" />
              </g>

              <g className="walk-bob">
                <path
                  className="walk-tail"
                  d="M42 66 C28 62 24 48 28 36"
                  fill="none"
                  stroke="#2a1a10"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  className="walk-tail"
                  d="M42 66 C28 62 24 48 28 36"
                  fill="none"
                  stroke="#d9893b"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                <ellipse
                  cx="90"
                  cy="74"
                  rx="54"
                  ry="29"
                  fill="#e8a24c"
                  stroke="#2a1a10"
                  strokeWidth="3.5"
                />
                <ellipse cx="96" cy="86" rx="30" ry="12" fill="#f6d39b" />

                <circle
                  cx="144"
                  cy="52"
                  r="25"
                  fill="#f0b25c"
                  stroke="#2a1a10"
                  strokeWidth="3.5"
                />
                <ellipse
                  cx="164"
                  cy="61"
                  rx="15"
                  ry="11"
                  fill="#f8dcae"
                  stroke="#2a1a10"
                  strokeWidth="3.5"
                />
                <ellipse cx="174" cy="56" rx="5.5" ry="4.2" fill="#2a1a10" />
                <circle cx="150" cy="45" r="4" fill="#2a1a10" />
                <circle cx="151.4" cy="43.6" r="1.4" fill="#fff" />
                <path
                  d="M160 70 Q166 75 172 69"
                  fill="none"
                  stroke="#2a1a10"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <ellipse
                  className="walk-tongue"
                  cx="167"
                  cy="75"
                  rx="4.5"
                  ry="6"
                  fill="#f06a7b"
                  stroke="#2a1a10"
                  strokeWidth="2"
                />
                <ellipse
                  className="walk-ear"
                  cx="128"
                  cy="46"
                  rx="10"
                  ry="19"
                  fill="#b9682a"
                  stroke="#2a1a10"
                  strokeWidth="3.5"
                />

                <path
                  d="M126 70 Q136 80 148 74"
                  fill="none"
                  stroke="#2a1a10"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                <path
                  d="M126 70 Q136 80 148 74"
                  fill="none"
                  stroke="#d9442e"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle
                  cx="137"
                  cy="82"
                  r="5"
                  fill="#f7c64a"
                  stroke="#2a1a10"
                  strokeWidth="2.5"
                />
              </g>

              <g className="leg leg-a leg-near">
                <rect x="66" y="80" width="13" height="42" rx="6.5" />
                <ellipse cx="72.5" cy="122" rx="9" ry="5" />
              </g>
              <g className="leg leg-b leg-near">
                <rect x="108" y="80" width="13" height="42" rx="6.5" />
                <ellipse cx="114.5" cy="122" rx="9" ry="5" />
              </g>
            </svg>

            <div className="walk-ground" />
          </div>

          <strong>{BRAND_NAME}</strong>
          <small>Taking a little walk…</small>
        </div>
      </div>

      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById("main");
          if (main) main.focus();
        }}
      >
        Skip to content
      </a>

      <header className="site-header">
        <nav className="navbar">
          <a href="#/home" className="brand" onClick={closeMenu}>
            {BRAND_NAME} 🐶
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {routes.map((r) => (
              <a
                key={r.path}
                href={`#/${r.path}`}
                className={route === r.path ? "active" : ""}
                onClick={closeMenu}
              >
                {r.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a
              href={waLink("Hi! I would like to know more about your puppies.")}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-button"
            >
              <span aria-hidden="true">💬</span> WhatsApp
            </a>

            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
      </header>

      <main id="main" tabIndex="-1">
        {pages[route]}
      </main>

      <footer className="site-footer">
        <div className="footer-wave" aria-hidden="true" />
        <span className="fstar fs1" aria-hidden="true">✦</span>
        <span className="fstar fs2" aria-hidden="true">✦</span>
        <span className="fstar fs3" aria-hidden="true">✦</span>
        <span className="fstar fs4" aria-hidden="true">✦</span>
        <span className="moon" aria-hidden="true" />

        <div className="footer-inner">
          <div className="footer-hero">
            <h2>Home, at last.</h2>
            <p>{BRAND_TAGLINE}</p>
            <a
              href={waLink("Hi! I would like to say hello.")}
              target="_blank"
              rel="noreferrer"
              className="see-all-button footer-cta"
            >
              Say hello on WhatsApp
            </a>
          </div>

          <div className="footer-col">
            <h3>Explore</h3>
            <ul>
              {routes.map((r) => (
                <li key={r.path}>
                  <a href={`#/${r.path}`}>{r.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3>Say hello</h3>
            <ul>
              <li>
                <a
                  href={waLink("Hi! I would like to say hello.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <span>{LOCATION}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 {BRAND_NAME}. All rights reserved.</p>
          <div className="footer-social">
            <a href="#/home" aria-label="Instagram">Instagram</a>
            <a href="#/home" aria-label="Facebook">Facebook</a>
            <a href="#/home" aria-label="YouTube">YouTube</a>
          </div>
        </div>
      </footer>

      <div className="chat-widget">
        {chatOpen && (
          <div className="chat-popup" role="dialog" aria-label="Chat with us">
            <div className="chat-header">
              <div>
                <strong>{BRAND_NAME}</strong>
                <span>● Online</span>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setChatOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="chat-body">
              <div className="chat-bubble">
                Hi there! 🐾 Which breed are you looking for? Pick one and we
                will chat on WhatsApp.
              </div>

              <div className="chat-options">
                {breedList.map((breed) => (
                  <a
                    key={breed}
                    href={waLink(`Hi! I am looking for a ${breed} puppy.`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {breed}
                  </a>
                ))}
              </div>

              <a
                href={waLink("Hi! I would like to say hello.")}
                target="_blank"
                rel="noreferrer"
                className="chat-start"
              >
                Say hello on WhatsApp
              </a>
            </div>
          </div>
        )}

        <button
          type="button"
          className="chat-toggle"
          aria-label="Open chat"
          aria-expanded={chatOpen}
          onClick={() => setChatOpen((open) => !open)}
        >
          {chatOpen ? "✕" : "💬"}
        </button>
      </div>

      {showTop && (
        <button
          type="button"
          className="back-to-top"
          aria-label="Back to top"
          onClick={scrollTop}
        >
          ↑
        </button>
      )}

      <div className="mobile-bar">
        <a
          href={waLink("Hi! I would like to enquire about a puppy.")}
          target="_blank"
          rel="noreferrer"
        >
          💬 WhatsApp us
        </a>
        <a href={PHONE_LINK}>📞 Call</a>
      </div>
    </div>
  );
}

export default App;
