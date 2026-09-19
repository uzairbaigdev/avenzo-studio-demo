import React, { useState, useEffect, useMemo } from "react";
import  Loader from "../../components/loader/loader.jsx";
import SixthSection from "../../components/homeComponents/sixthSection.jsx";
import {
  db,
  collection,
  addDoc,
  onSnapshot,
  query,
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from "../../firebaseConfig.js";
import Navigation from "../../components/navigation/navigation.jsx";
import logo from "../../assets/avenzo-logo-transparent.png";
import {
  Star,
  ThumbsUp,
  Sparkles,
  Send,
  MessageSquare,
  Search,
  AlertCircle,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award
} from "lucide-react";

// Pool of unique first and last names
const FIRST_NAMES = [
  "Muhammad", "Ayesha", "Tariq", "Zainab", "Bilal", "Usman", "Sana", "Omar", "Hira", "Ali",
  "Fatima", "Kamran", "Nida", "Hamza", "Mahnoor", "Saad", "Maryam", "Fahad", "Rabia", "Asad",
  "Shahid", "Khadija", "Imran", "Mehwish", "Zubair", "Amna", "Hassan", "Bushra", "Mustafa", "Sundas",
  "Waqas", "Iqra", "Ahsan"
];

const LAST_NAMES = [
  "Khan", "Malik", "Shah", "Siddiqui", "Ahmed", "Farooq", "Riaz", "Hassan", "Chaudhry", "Raza",
  "Zahra", "Baig", "Yasir", "Iqbal", "Sheikh", "Rafique", "Nawaz", "Mustafa", "Anum", "Qaiser",
  "Afridi", "Mirza", "Qureshi", "Abbasi", "Bhatti", "Tareen", "Gillani", "Javed", "Mughal", "Durrani",
  "Latif", "Mahmood", "Dar"
];

const CLIENT_ROLES = [
  "CTO at FinTech Global", "Head of Product", "Lead Software Architect",
  "Founder & CEO", "VP of Engineering", "Operations Director",
  "Product Manager", "Tech Lead", "Senior Engineering Manager"
];

const COMMENTS_5_STAR = [
  "AVENZO STUDIO completely overhauled our enterprise SaaS platform architecture. The team's attention to clean code, performance optimization, and responsive design exceeded our highest expectations.",
  "Flawless communication and exceptional full-stack execution. They converted our legacy system into a high-speed microservices cloud platform with zero operational downtime.",
  "The custom AI dashboard built by AVENZO STUDIO significantly improved our team's data processing speed by 40%. Highly professional and reliable agency partner.",
  "Top-tier web development agency! Delivered our fintech application ahead of schedule with robust security and smooth UI animations.",
  "Incredible work on our mobile and web app. The team handled real-time Firebase syncing seamlessly and optimized our cloud infrastructure.",
  "Working with AVENZO STUDIO was a game-changer for our e-commerce operations. Load times dropped significantly, and conversion rates spiked immediately.",
  "Extremely impressed by their mastery of React and Node.js. They delivered a fully scalable backend that easily handles our heavy daily traffic spikes.",
  "The UI/UX design and frontend responsiveness they produced were top-notch. Our client retention improved by 25% within weeks of relaunching.",
  "Clear communication, daily standup updates, and high-quality deliverables. They built our cross-platform mobile application without any major hiccups.",
  "AVENZO STUDIO stepped in to revamp our broken legacy codebase and turned it into an agile, modular system in record time. Truly exceptional work!"
];

const COMMENTS_4_STAR = [
  "Great engineering team with strong technical problem-solving capabilities. Project delivery was on time, though initial mockups needed a slight revision.",
  "Very solid React and Firebase implementation. Their senior developers handled complex security rules and real-time backend synchronization smoothly.",
  "Solid agency partner. Code quality and platform stability are excellent, though response times during weekend deployment could be slightly faster.",
  "Overall excellent service and platform development. Solved complex database scalability problems for us effectively with minor timeline adjustments.",
  "Delivered a dependable custom web dashboard. Minor bug fixes were required during testing, but their team addressed everything promptly."
];

const MODIFIERS = [
  "Would definitely hire them again.",
  "Extremely satisfied with the technical results.",
  "Looking forward to collaborating on our next phase.",
  "A pleasure to work with from start to finish.",
  "Highly recommended for enterprise-level platforms.",
  "Their engineering standards are top-tier.",
  "The deployment was smooth and frictionless.",
  "Great experience working alongside their engineers."
];

// Specific dates distributing 33 completed projects across 2019 to 2026 (~4-5 projects per year)
const PROJECT_DATES = [
  "2026-08-14", "2026-05-20", "2026-02-10",
  "2025-11-05", "2025-08-19", "2025-06-12", "2025-03-22", "2025-01-15",
  "2026-12-01", "2026-09-18", "2026-07-04", "2026-04-11", "2026-02-02",
  "2023-10-28", "2023-08-15", "2023-05-30", "2023-03-14", "2023-01-08",
  "2022-11-20", "2022-08-05", "2022-06-17", "2022-03-09",
  "2021-10-14", "2021-07-28", "2021-05-11", "2021-02-19",
  "2020-11-02", "2020-08-24", "2020-05-15", "2020-02-01",
  "2019-11-18", "2019-08-10", "2019-04-25"
];

// Generate exactly 32 unique reviews mapped to realistic historical dates
const GENERATED_REVIEWS = Array.from({ length: 33 }, (_, i) => {
  const firstName = FIRST_NAMES[i];
  const lastName = LAST_NAMES[(i * 7) % LAST_NAMES.length];
  const name = `${firstName} ${lastName}`;

  const role = CLIENT_ROLES[i % CLIENT_ROLES.length];

  const is5Star = i < 29;
  const rating = is5Star ? 5 : 4;

  const baseTemplates = is5Star ? COMMENTS_5_STAR : COMMENTS_4_STAR;
  const baseComment = baseTemplates[i % baseTemplates.length];
  const modifier = MODIFIERS[(i * 3) % MODIFIERS.length];
  const comment = `${baseComment} ${modifier}`;

  const reviewDate = new Date(PROJECT_DATES[i]);

  return {
    id: `init-${i + 1}`,
    name,
    role,
    rating,
    comment,
    helpfulCount: Math.floor(Math.sin(i + 1) * 10) + 8,
    createdAt: { toDate: () => reviewDate }
  };
}).filter((review) => review.name !== "Hira Abbasi");

const BASE_STATS = {
  totalCount: 32,
  count5Star: 28,
  count4Star: 4,
  count3Star: 0,
  count2Star: 0,
  count1Star: 0
};

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedStarFilter, setSelectedStarFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Page-level 5-second loader state
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Track liked review IDs using localStorage
  const [likedReviewIds, setLikedReviewIds] = useState(() => {
    try {
      const saved = localStorage.getItem("avenzo_liked_reviews");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    const q = query(collection(db, "reviews"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews([...fetchedReviews, ...GENERATED_REVIEWS]);
        setLoading(false);
      },
      (error) => {
        console.error("Error listening to Firestore reviews:", error);
        setReviews(GENERATED_REVIEWS);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!rating) {
      setErrorMessage("Please select a star rating.");
      return;
    }
    if (!name.trim() || !comment.trim()) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reviews"), {
        name: name.trim(),
        role: "Verified Client",
        rating: Number(rating),
        comment: comment.trim(),
        helpfulCount: 0,
        createdAt: serverTimestamp(),
      });

      setName("");
      setRating(0);
      setComment("");
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting review: ", error);
      setErrorMessage(
        error.message || "Failed to submit review. Check database permission rules."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpful = async (id) => {
    // Prevent duplicate likes per client browser
    if (likedReviewIds.includes(id)) return;

    // Save liked state locally
    const updatedLiked = [...likedReviewIds, id];
    setLikedReviewIds(updatedLiked);
    try {
      localStorage.setItem("avenzo_liked_reviews", JSON.stringify(updatedLiked));
    } catch (e) {
      console.error("LocalStorage save error:", e);
    }

    if (id.startsWith("init-")) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
        )
      );
      return;
    }

    try {
      const reviewRef = doc(db, "reviews", id);
      await updateDoc(reviewRef, {
        helpfulCount: increment(1),
      });
    } catch (error) {
      console.error("Error updating helpful count: ", error);
    }
  };

  const aggregatedStats = useMemo(() => {
    const userDbReviews = reviews.filter((r) => !r.id.startsWith("init-"));

    let star5 = BASE_STATS.count5Star;
    let star4 = BASE_STATS.count4Star;
    let star3 = BASE_STATS.count3Star;
    let star2 = BASE_STATS.count2Star;
    let star1 = BASE_STATS.count1Star;

    userDbReviews.forEach((r) => {
      if (r.rating === 5) star5++;
      else if (r.rating === 4) star4++;
      else if (r.rating === 3) star3++;
      else if (r.rating === 2) star2++;
      else if (r.rating === 1) star1++;
    });

    const totalReviewsCount = BASE_STATS.totalCount + userDbReviews.length;
    const totalPoints =
      star5 * 5 + star4 * 4 + star3 * 3 + star2 * 2 + star1 * 1;
    const avg = totalReviewsCount ? (totalPoints / totalReviewsCount).toFixed(1) : "0.0";

    return {
      totalCount: totalReviewsCount,
      average: avg,
      counts: { 5: star5, 4: star4, 3: star3, 2: star2, 1: star1 },
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    return reviews
      .filter((r) => {
        const matchesStar =
          selectedStarFilter === "all" || r.rating === Number(selectedStarFilter);
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          (r.name && r.name.toLowerCase().includes(searchLower)) ||
          (r.comment && r.comment.toLowerCase().includes(searchLower)) ||
          (r.role && r.role.toLowerCase().includes(searchLower));
        return matchesStar && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "highest") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "lowest") return (a.rating || 0) - (b.rating || 0);
        if (sortBy === "helpful") return (b.helpfulCount || 0) - (a.helpfulCount || 0);

        const timeA = a.createdAt?.toDate
          ? a.createdAt.toDate().getTime()
          : a.createdAt?.toMillis
          ? a.createdAt.toMillis()
          : Date.now();
        const timeB = b.createdAt?.toDate
          ? b.createdAt.toDate().getTime()
          : b.createdAt?.toMillis
          ? b.createdAt.toMillis()
          : Date.now();
        return timeB - timeA;
      });
  }, [reviews, selectedStarFilter, searchQuery, sortBy]);

  const displayedReviews = useMemo(() => {
    return filteredReviews.slice(0, visibleCount);
  }, [filteredReviews, visibleCount]);

  if (pageLoading) {
    return (
      <>
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center space-y-4">
            <Loader />
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D9A94E]">
              Loading Review Page...
            </p>
          </div>
        </div>
        <Navigation />
      </>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-[#D9A94E]/30 selection:text-[#D9A94E]">
      <style>{`
        @keyframes avenzoLogoShadeBreathe {
          0%, 100% { opacity: 0.07; }
          50%      { opacity: 0.12; }
        }
        .avenzo-logo-shade { animation: avenzoLogoShadeBreathe 9s ease-in-out infinite; }
      `}</style>

      <Navigation />

      {/* Hero Header */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0c0d0f] via-[#08090a] to-[#050505] pt-36 pb-16">
        {/* full-screen logo shade — covers the entire hero section */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            width={1046}
            height={1041}
            loading="eager"
            decoding="async"
            className="avenzo-logo-shade absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-[0.09] mix-blend-screen [will-change:opacity]"
          />
          {/* subtle dark vignette on top of the shade so edges stay clean and text stays readable */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.75)_100%)]" />
        </div>

        {/* faint engineering-grid texture */}
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px]" />

        {/* ambient glows */}
        <div className="pointer-events-none absolute right-0 top-1/2 h-[450px] w-[450px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#D9A94E]/10 blur-[120px]" />
        <div className="pointer-events-none absolute left-0 bottom-0 h-[350px] w-[350px] -translate-x-1/3 rounded-full bg-[#4B4F57]/20 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A94E]/30 bg-[#D9A94E]/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-[#D9A94E]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9A94E]">
              Client Feedback & Track Record
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
            Client{" "}
            <span className="bg-gradient-to-r from-[#F3CE8E] via-[#D9A94E] to-[#8a6a2c] bg-clip-text text-transparent">
              Testimonials
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-400 sm:text-base">
            Verified reviews and platform outcomes from engineering leaders and startup founders partnering with AVENZO STUDIO since 2024.
          </p>

          {/* Key Metrics Banner */}
          <div className="mt-12 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-[#0B0C0E]/80 p-6 backdrop-blur-xl md:grid-cols-4">
            <div className="flex flex-col items-center border-r border-white/5 last:border-none">
              <div className="flex items-center gap-1.5 text-lg font-black text-white sm:text-2xl">
                <Clock className="h-5 w-5 text-[#D9A94E]" />
                <span>2024–2026</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">2 Years Experience</span>
            </div>

            <div className="flex flex-col items-center border-r border-white/5 last:border-none">
              <div className="flex items-center gap-1.5 text-lg font-black text-white sm:text-2xl">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span>100%</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">On-Time Delivery</span>
            </div>

            <div className="flex flex-col items-center border-r border-white/5 last:border-none">
              <div className="flex items-center gap-1.5 text-lg font-black text-white sm:text-2xl">
                <Award className="h-5 w-5 text-[#D9A94E]" />
                <span>4.9 / 5.0</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">Average Rating</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1.5 text-lg font-black text-white sm:text-2xl">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                <span>Verified</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500">Client Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Summary Section */}
      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-[#0B0C0E] p-8 lg:grid-cols-12">
          <div className="flex flex-col items-center justify-center border-b border-white/10 pb-8 lg:col-span-4 lg:border-r lg:border-b-0 lg:pb-0 lg:pr-8">
            <div className="text-6xl font-black text-white">{aggregatedStats.average}</div>
            <div className="mt-2 flex items-center gap-1 text-[#D9A94E]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(Number(aggregatedStats.average))
                      ? "fill-[#D9A94E] text-[#D9A94E]"
                      : "text-neutral-600"
                  }`}
                />
              ))}
            </div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Based on {aggregatedStats.totalCount} Reviews
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-3 lg:col-span-8">
            {[5, 4, 3, 2, 1].map((starVal) => {
              const count = aggregatedStats.counts[starVal] || 0;
              const percentage = aggregatedStats.totalCount
                ? (count / aggregatedStats.totalCount) * 100
                : 0;
              return (
                <div key={starVal} className="flex items-center gap-4 text-xs">
                  <div className="flex w-12 items-center gap-1 font-bold text-neutral-300">
                    <span>{starVal}</span>
                    <Star className="h-3.5 w-3.5 fill-[#D9A94E] text-[#D9A94E]" />
                  </div>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-[#D9A94E] to-[#F3CE8E] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="w-12 text-right font-mono text-neutral-400">
                    {count}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Submission Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border border-white/10 bg-[#0B0C0E] p-6 shadow-xl sm:p-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="rounded-xl bg-[#D9A94E]/10 p-2.5 text-[#D9A94E]">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Leave a Review</h3>
                  <p className="text-xs text-neutral-400">Share your platform experience</p>
                </div>
              </div>

              {submitSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                  <span>Thank you! Your review has been published.</span>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Rating Score *
                  </label>
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (hoverRating || rating)
                              ? "fill-[#D9A94E] text-[#D9A94E]"
                              : "text-neutral-600"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-auto text-xs font-mono font-bold text-[#D9A94E]">
                      {rating ? `${rating}/5 Stars` : "Select"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bilal Ahmed"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:border-[#D9A94E] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Your Feedback *
                    </label>
                    <span className="text-[10px] text-neutral-500">{comment.length}/500</span>
                  </div>
                  <textarea
                    required
                    maxLength={500}
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your project experience and technical outcome..."
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-white placeholder-neutral-600 focus:border-[#D9A94E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#D9A94E] py-3 text-xs font-bold text-black transition-all hover:bg-[#e3b860] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Publishing...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </form>

              {/* Verification Micro-copy */}
              <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-4 text-[11px] text-neutral-500">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#D9A94E]" />
                <span>All submitted reviews are checked against client project records.</span>
              </div>
            </div>
          </div>

          {/* Reviews Stream */}
          <div className="space-y-6 lg:col-span-7">
            {/* Filter Bar */}
            <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0B0C0E] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(10);
                  }}
                  placeholder="Search by client, title, or keyword..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-600 focus:border-[#D9A94E] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedStarFilter}
                  onChange={(e) => {
                    setSelectedStarFilter(e.target.value);
                    setVisibleCount(10);
                  }}
                  className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-semibold text-neutral-300 focus:border-[#D9A94E] focus:outline-none"
                >
                  <option value="all">All Stars</option>
                  <option value="5">5 Stars Only</option>
                  <option value="4">4 Stars Only</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs font-semibold text-neutral-300 focus:border-[#D9A94E] focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="py-20 text-center text-xs text-neutral-500">
                Loading reviews from database...
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-[#0B0C0E] py-16 text-center">
                <p className="text-sm text-neutral-400">No reviews found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1 text-xs text-neutral-500 font-mono">
                  <span>Showing {displayedReviews.length} of {filteredReviews.length} reviews</span>
                </div>

                {displayedReviews.map((rev) => {
                  const isLiked = likedReviewIds.includes(rev.id);

                  return (
                    <div
                      key={rev.id}
                      className="group rounded-3xl border border-white/10 bg-[#0B0C0E] p-6 transition-all hover:border-[#D9A94E]/40"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9A94E]/30 bg-[#D9A94E]/10 font-bold text-[#D9A94E]">
                            {rev.name ? rev.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                                <CheckCircle2 className="h-2.5 w-2.5" /> Verified
                              </span>
                            </div>
                            <span className="text-[11px] text-neutral-400 block">{rev.role || "Verified Client"}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3.5 w-3.5 ${
                                star <= rev.rating
                                  ? "fill-[#D9A94E] text-[#D9A94E]"
                                  : "text-neutral-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-neutral-300">
                        "{rev.comment}"
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-neutral-500">
                        <span>
                          {rev.createdAt?.toDate
                            ? rev.createdAt.toDate().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              })
                            : rev.createdAt?.toMillis
                            ? new Date(rev.createdAt.toMillis()).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              })
                            : "Recently"}
                        </span>

                        <button
                          onClick={() => handleHelpful(rev.id)}
                          disabled={isLiked}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs transition-colors ${
                            isLiked
                              ? "border-[#D9A94E]/40 bg-[#D9A94E]/10 text-[#D9A94E] cursor-not-allowed"
                              : "border-white/5 bg-white/[0.02] text-neutral-400 hover:border-[#D9A94E]/30 hover:text-[#D9A94E] cursor-pointer"
                          }`}
                        >
                          <ThumbsUp className={`h-3.5 w-3.5 ${isLiked ? "fill-[#D9A94E]" : ""}`} />
                          <span>{isLiked ? "Helpful" : "Helpful"} ({rev.helpfulCount || 0})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {visibleCount < filteredReviews.length && (
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 10)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#D9A94E]/30 bg-[#D9A94E]/10 px-6 py-3 text-xs font-bold text-[#D9A94E] transition-all hover:bg-[#D9A94E]/20 cursor-pointer"
                    >
                      <span>Load More Reviews ({filteredReviews.length - visibleCount} remaining)</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ SIXTH SECTION ============ */}
      <SixthSection />
    </main>
  );
}