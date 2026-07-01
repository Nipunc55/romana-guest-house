"use client";

import React, { useState, useEffect } from "react";
import styles from "./BookingMask.module.css";

export default function BookingMask() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  // Set default dates (today for check-in, 3 days later for check-out)
  useEffect(() => {
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);

    const formatDate = (date: Date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    setCheckIn(formatDate(today));
    setCheckOut(formatDate(threeDaysLater));
  }, []);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const bookingUrl = `https://direct-book.com/properties/romanaguesthouse?checkIn=${checkIn}&checkOut=${checkOut}&adults=${guests}&guests=${guests}`;
    window.open(bookingUrl, "_blank");
  };

  return (
    <form className={`${styles.maskContainer} glass`} onSubmit={handleCheckAvailability}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Check-in</label>
        <input
          type="date"
          className={styles.dateInput}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Check-out</label>
        <input
          type="date"
          className={styles.dateInput}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
          min={checkIn || new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className={styles.divider}></div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Guests</label>
        <select
          className={styles.selectInput}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        >
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </div>

      <button type="submit" className={styles.submitBtn}>
        Check Availability
      </button>
    </form>
  );
}

