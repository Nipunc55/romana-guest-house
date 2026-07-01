"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ReviewSlider.module.css";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
  author_initials: string;
}

export default function ReviewSlider() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(4.8);
  const [totalReviews, setTotalReviews] = useState(124);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch reviews from our API
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
          setRating(data.rating || 4.8);
          setTotalReviews(data.user_ratings_total || 120);
        }
      } catch (err) {
        console.error("Failed to load reviews:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const nextSlide = () => {
    if (currentIndex < reviews.length - visibleCount) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to start
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Loop to end
      setCurrentIndex(reviews.length - visibleCount);
    }
  };

  // Helper to render stars
  const renderStars = (num: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`${styles.starIcon} ${i < num ? styles.starFilled : styles.starEmpty}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className={styles.sliderSection}>
      <div className={styles.headerRow}>
        <div className={styles.scorecard}>
          <div className={styles.googleBadge}>
            <svg className={styles.googleLogo} viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.66-.45-1.12-1.06-1.37-1.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className={styles.googleText}>Google Reviews</span>
          </div>

          <div className={styles.ratingInfo}>
            <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
            <div className={styles.scoreStars}>
              <div className={styles.starsWrapper}>{renderStars(Math.round(rating))}</div>
              <span className={styles.totalText}>Based on {totalReviews} reviews</span>
            </div>
          </div>
        </div>

        <div className={styles.navigationControls}>
          <button className={styles.navBtn} onClick={prevSlide} aria-label="Previous reviews">
            ‹
          </button>
          <button className={styles.navBtn} onClick={nextSlide} aria-label="Next reviews">
            ›
          </button>
        </div>
      </div>

      <div className={styles.sliderViewport}>
        <div
          className={styles.sliderTrack}
          ref={trackRef}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {reviews.map((review) => (
            <div
              className={styles.slideCard}
              key={review.id}
              style={{
                width: `calc(${100 / visibleCount}% - ${
                  visibleCount > 1 ? "1.5rem" : "0px"
                })`,
              }}
            >
              <div className={styles.cardHeader}>
                {review.profile_photo_url ? (
                  <img
                    className={styles.avatar}
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={styles.avatarFallback}>{review.author_initials}</div>
                )}
                <div className={styles.authorMeta}>
                  <h4 className={styles.authorName}>{review.author_name}</h4>
                  <span className={styles.reviewDate}>{review.relative_time_description}</span>
                </div>
                <div className={styles.verifiedCheck} title="Verified Google Review">
                  <svg viewBox="0 0 24 24" className={styles.checkIcon}>
                    <path
                      fill="currentColor"
                      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    />
                  </svg>
                </div>
              </div>

              <div className={styles.reviewStars}>{renderStars(review.rating)}</div>

              <p className={styles.reviewText}>"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slider dots for indicators */}
      {reviews.length > visibleCount && (
        <div className={styles.sliderDots}>
          {Array.from({ length: reviews.length - visibleCount + 1 }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${currentIndex === i ? styles.dotActive : ""}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide group ${i + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
