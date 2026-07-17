"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import BookingMask from "@/components/BookingMask";
import ReviewSlider from "@/components/ReviewSlider";

// Gallery images dataset (from your public/images/Gallery folder)
const GALLERY_IMAGES = [
  { src: "/images/Gallery/fontview.jpeg", caption: "Romana Guest House Front Exterior View" },
  { src: "/images/Gallery/back view.jpeg", caption: "Tranquil Rear Garden & Private Balconies" },
  { src: "/images/Gallery/entrance road.jpeg", caption: "Entrance Walkway and Guest Gates" },
  { src: "/images/Gallery/entrance road 2.jpeg", caption: "Tree-lined Path to the Villa" },
  { src: "/images/Gallery/entrance road 3.jpeg", caption: "Lush Green Guesthouse Welcome Path" },
  { src: "/images/Gallery/bedroom 6.jpeg", caption: "Deluxe Garden Suite Bedroom Design" },
  { src: "/images/Gallery/bedroom  5.jpeg", caption: "Superior Double Bedroom Interior" },
  { src: "/images/Gallery/bedroom  1.jpeg", caption: "Cozy Double Bedroom with Modern Touches" },
  { src: "/images/Gallery/bedroom  2.jpeg", caption: "Bright Guest Room Layout and Linens" },
  { src: "/images/Gallery/bedroom  3.jpeg", caption: "Classic Twin Bedroom Configurations" },
  { src: "/images/Gallery/bedroom  4.jpeg", caption: "Warm Mediterranean Room Accents" },
  { src: "/images/Gallery/bathroom.jpeg", caption: "Modern Finished En-suite Bathroom" },
  { src: "/images/Gallery/bathroom 2.jpeg", caption: "Clean Guest Shower and Fitted Vanity" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  // Lightbox and Gallery Grid states
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [showAllGallery, setShowAllGallery] = useState(false);

  // Monitor scroll to trigger sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") setActiveImageIndex(null);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 5000);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    });
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex + 1) % GALLERY_IMAGES.length;
    });
  };

  const visibleGallery = showAllGallery ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, 6);

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation Header */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""} glass`}>
        <div className={`${styles.navContainer} container`}>
          <div className={styles.logo}>
            <a href="#home" className={styles.logoLink}>
              <img src="/images/Gallery/logo.png" alt="Romana Guest House Logo" className={styles.logoImg} />
            </a>
          </div>

          <nav className={`${styles.desktopNav} ${mobileMenuOpen ? styles.mobileNavActive : ""}`}>
            <a href="#about" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#rooms" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Rooms
            </a>
            <a href="#amenities" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Amenities
            </a>
            <a href="#gallery" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Gallery
            </a>
            <a href="#reviews" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Reviews
            </a>
            <a href="#location" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Location
            </a>
            <a href="#contact" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>
            <a href="https://direct-book.com/properties/romanaguesthouse" target="_blank" rel="noopener noreferrer" className={`${styles.navBookBtn} ${styles.mobileOnlyBtn}`} onClick={() => setMobileMenuOpen(false)}>
              Book Now
            </a>
          </nav>

          <div className={styles.navActions}>
            <a href="https://direct-book.com/properties/romanaguesthouse" target="_blank" rel="noopener noreferrer" className={styles.navBookBtn}>
              Book Now
            </a>
            <button
              className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.toggleActive : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section id="home" className={styles.heroSection}>
        <div className={styles.heroBg} style={{ backgroundImage: "url('/images/Gallery/fontview.jpeg')" }}></div>
        <div className={styles.heroOverlay}></div>
        
        <div className={`${styles.heroContent} container`}>
          <span className={styles.heroLabel}>Welcome to Romana Guest House</span>
          <h1 className={styles.heroTitle}>Your Peaceful Garden Oasis in Rome</h1>
          <p className={styles.heroSubtitle}>
            Nestled in a green residential district. Minutes from Fiumicino Airport, Ostia beach sands, and ancient history.
          </p>

          <div className={styles.heroBookingWrapper}>
            <BookingMask />
          </div>
        </div>
      </section>

      {/* Introduction / About Section */}
      <section id="about" className={`${styles.aboutSection} section-padding`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className={styles.sectionLabel}>The Experience</span>
              <h2 className={styles.sectionTitle}>Where City Heritage Meets Coastal Serenity</h2>
              <p className={styles.aboutText}>
                Romana Guest House is a premium boutique villa situated in the quiet, tree-lined residential neighborhood of <strong>Infernetto, Rome</strong>. 
                Our property is designed for travelers seeking the perfect balance: peace away from Rome's chaotic core, but close enough to explore the sights with ease.
              </p>
              <p className={styles.aboutText}>
                Enjoy private double bedrooms with direct access to our lush Mediterranean garden. Start your morning with a fresh espresso on the sunlit terrace, rent our custom bicycles to ride to the beaches of Ostia, or explore the incredible preserved ruins of <strong>Ostia Antica Archaeological Park</strong>, located just 10 minutes away.
              </p>
              <div className={styles.badgeRow}>
                <div className={styles.badgeItem}>
                  <span className={styles.badgeNum}>4.9</span>
                  <span className={styles.badgeLabel}>Google Star Rating</span>
                </div>
                <div className={styles.badgeItem}>
                  <span className={styles.badgeNum}>15</span>
                  <span className={styles.badgeLabel}>Mins to Fiumicino FCO</span>
                </div>
                <div className={styles.badgeItem}>
                  <span className={styles.badgeNum}>10</span>
                  <span className={styles.badgeLabel}>Mins to Ostia Beach</span>
                </div>
              </div>
            </div>

            <div className={styles.aboutImageWrapper}>
              <div className={styles.aboutImageBg}></div>
              <img
                src="/images/Gallery/back view.jpeg"
                alt="Romana Guest House Sunny Courtyard Terrace"
                className={styles.aboutImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Showcase Section */}
      <section id="rooms" className={`${styles.roomsSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Our Accommodations</span>
            <h2 className={styles.sectionTitle}>Charming & Luxurious Rooms</h2>
            <p className={styles.sectionSubtitle}>
              Each guest room is carefully designed with Mediterranean style, private en-suite bathrooms, and premium amenities.
            </p>
          </div>

          <div className={styles.roomsGrid}>
            {/* Room 1 */}
            <div className={styles.roomCard}>
              <div className={styles.roomImageWrapper}>
                <img
                  src="/images/Gallery/bedroom 6.jpeg"
                  alt="Triple Room with Private Bathroom"
                  className={styles.roomImage}
                />
                <span className={styles.roomPrice}>From €120/night</span>
              </div>
              <div className={styles.roomInfo}>
                <h3 className={styles.roomTitle}>Triple Room with Private Bathroom</h3>
                <div className={styles.roomSpecs}>
                  <span>30 m²</span>
                  <span className={styles.specDot}>•</span>
                  <span>Terrace & Garden View</span>
                  <span className={styles.specDot}>•</span>
                  <span>Max 3 Guests</span>
                </div>
                <p className={styles.roomDesc}>
                  Featuring a private terrace with lovely garden views, this spacious triple room offers air conditioning, a wardrobe, and an en-suite bathroom with a bidet and shower. Configured with 1 extra-large double bed and 1 cozy sofa bed.
                </p>
                <div className={styles.roomAmenityTags}>
                  <span>1 XL Double Bed</span>
                  <span>1 Sofa Bed</span>
                  <span>Garden Terrace</span>
                  <span>A/C</span>
                  <span>Bidet & Shower</span>
                  <span>Smart TV</span>
                  <span>Wi-Fi</span>
                </div>
                <a href="https://direct-book.com/properties/romanaguesthouse" target="_blank" rel="noopener noreferrer" className={styles.roomBookBtn}>
                  Book Now
                </a>
              </div>
            </div>

            {/* Room 2 */}
            <div className={styles.roomCard}>
              <div className={styles.roomImageWrapper}>
                <img
                  src="/images/Gallery/bedroom  5.jpeg"
                  alt="Double Room with Private Bathroom"
                  className={styles.roomImage}
                />
                <span className={styles.roomPrice}>From €85/night</span>
              </div>
              <div className={styles.roomInfo}>
                <h3 className={styles.roomTitle}>Double Room with Private Bathroom</h3>
                <div className={styles.roomSpecs}>
                  <span>22 m²</span>
                  <span className={styles.specDot}>•</span>
                  <span>Quiet Courtyard View</span>
                  <span className={styles.specDot}>•</span>
                  <span>Max 2 Guests</span>
                </div>
                <p className={styles.roomDesc}>
                  A cozy and elegant room featuring a plush double bed, air conditioning, heating, a wardrobe, and a flat-screen TV. Includes a private en-suite bathroom with a bidet, shower, hairdryer, and complimentary toiletries.
                </p>
                <div className={styles.roomAmenityTags}>
                  <span>1 Double Bed</span>
                  <span>A/C & Heating</span>
                  <span>Private Bath</span>
                  <span>Bidet & Shower</span>
                  <span>Hairdryer</span>
                  <span>Smart TV</span>
                  <span>Wi-Fi</span>
                </div>
                <a href="https://direct-book.com/properties/romanaguesthouse" target="_blank" rel="noopener noreferrer" className={styles.roomBookBtn}>
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className={`${styles.amenitiesSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Bespoke Services</span>
            <h2 className={styles.sectionTitle}>Modern Comforts & Guest Conveniences</h2>
            <p className={styles.sectionSubtitle}>
              We aim to make your Roman holiday as relaxing and effortless as possible.
            </p>
          </div>

          <div className={styles.amenitiesGrid}>
            {/* Amenity 1 */}
            <div className={`${styles.amenityCard} glass`}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z" />
                </svg>
              </div>
              <h3 className={styles.amenityTitle}>Lush Garden & Terrace</h3>
              <p className={styles.amenityDesc}>
                A peaceful green perimeter surrounding the villa, featuring climbing vines, pergolas, and tables to enjoy early morning breakfast.
              </p>
            </div>

            {/* Amenity 2 */}
            <div className={`${styles.amenityCard} glass`}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01zM3.4 9.1c1.86-1.43 5.03-2.6 8.6-2.6s6.74 1.17 8.6 2.6L12 20.08 3.4 9.1z" />
                </svg>
              </div>
              <h3 className={styles.amenityTitle}>High-Speed Wi-Fi</h3>
              <p className={styles.amenityDesc}>
                Complimentary enterprise-grade fiber broadband network covers the entire house and garden—ideal for remote work or streaming.
              </p>
            </div>

            {/* Amenity 3 */}
            <div className={`${styles.amenityCard} glass`}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 12h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3zM11.23 6H4.25c-.53 0-.96.43-.96.96v10.08c0 .53.43.96.96.96h6.98c.53 0 .96-.43.96-.96V6.96c0-.53-.43-.96-.96-.96zM10.27 16H5.21v-8h5.06v8z" />
                </svg>
              </div>
              <h3 className={styles.amenityTitle}>Air Conditioning</h3>
              <p className={styles.amenityDesc}>
                Independently controlled heating and cooling systems in each guest room, ensuring climate comfort during warm Roman summers.
              </p>
            </div>

            {/* Amenity 4 */}
            <div className={`${styles.amenityCard} glass`}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm14.5-8.5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm-3.5-7.72c-.88-.58-1.93-.93-3.07-.93H9.41L11.5 8.1l2.42 2.42c.39.39 1.02.39 1.41 0l2.42-2.42L15.3 5.68l-3.3 3.3-1.68-1.68 3.56-3.56c.39-.39.39-1.02 0-1.41l-.7-.7c-.39-.39-1.02-.39-1.41 0L6.7 6.7c-.52.52-.7 1.25-.51 1.93L7.7 13.5h3.8c1.14 0 2.19.35 3.07.93l1.43-1.43-1.43-1.43z" />
                </svg>
              </div>
              <h3 className={styles.amenityTitle}>Bicycle Rental</h3>
              <p className={styles.amenityDesc}>
                We provide custom city cruiser bicycles, allowing you to ride easily down tree-lined streets directly to Ostia's beach sand.
              </p>
            </div>

            {/* Amenity 5 */}
            <div className={`${styles.amenityCard} glass`}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.96-.68h9.54c.44 0 .82.28.96.68L19 11H5z" />
                </svg>
              </div>
              <h3 className={styles.amenityTitle}>Airport Shuttle (Paid)</h3>
              <p className={styles.amenityDesc}>
                Avoid taxi stress with our private, air-conditioned guesthouse shuttle service direct to/from Fiumicino Airport (FCO).
              </p>
            </div>

            {/* Amenity 6 */}
            <div className={`${styles.amenityCard} glass`}>
              <div className={styles.amenityIconWrapper}>
                <svg className={styles.amenityIcon} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M2 21h18v-2H2v2zM20 8h2v8h-2V8zm-6-6H6c-1.1 0-2 .9-2 2v13h12V4c0-1.1-.9-2-2-2zm-2 13H6V4h6v11z" />
                </svg>
              </div>
              <h3 className={styles.amenityTitle}>Shared Guest Lounge</h3>
              <p className={styles.amenityDesc}>
                A charming communal library and sitting lounge with a free Nespresso bar, travel brochures, board games, and quiet work spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Gallery Section */}
      <section id="gallery" className={`${styles.gallerySection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Visual Tour</span>
            <h2 className={styles.sectionTitle}>Romana Photo Gallery</h2>
            <p className={styles.sectionSubtitle}>
              Explore our rooms, facilities, lush garden, and quiet residential entrance walkways.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {visibleGallery.map((img, idx) => (
              <div 
                className={styles.galleryItem} 
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
              >
                <img src={img.src} alt={img.caption} className={styles.galleryImg} />
                <div className={styles.galleryOverlay}>
                  <span className={styles.zoomIcon}>🔍</span>
                  <p className={styles.overlayCaption}>{img.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.galleryActionRow}>
            <button 
              className={styles.showMoreBtn} 
              onClick={() => setShowAllGallery(!showAllGallery)}
            >
              {showAllGallery ? "Show Less" : `View All Photos (${GALLERY_IMAGES.length})`}
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className={styles.lightboxOverlay} onClick={() => setActiveImageIndex(null)}>
          <button className={styles.lightboxClose} onClick={() => setActiveImageIndex(null)}>&times;</button>
          
          <button 
            className={`${styles.lightboxArrow} ${styles.arrowLeft}`} 
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
          >
            &#8249;
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={GALLERY_IMAGES[activeImageIndex].src} 
              alt={GALLERY_IMAGES[activeImageIndex].caption} 
              className={styles.lightboxMainImg} 
            />
            <div className={styles.lightboxCaptionBar}>
              <span>{activeImageIndex + 1} / {GALLERY_IMAGES.length}</span>
              <p>{GALLERY_IMAGES[activeImageIndex].caption}</p>
            </div>
          </div>
          
          <button 
            className={`${styles.lightboxArrow} ${styles.arrowRight}`} 
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
          >
            &#8250;
          </button>
        </div>
      )}

      {/* Google Reviews Section */}
      <section id="reviews" className={`${styles.reviewsSection} section-padding`}>
        <div className="container">
          <ReviewSlider />
        </div>
      </section>

      {/* Location & Attractions Section */}
      <section id="location" className={`${styles.locationSection} section-padding`}>
        <div className="container">
          <div className={styles.locationGrid}>
            <div className={styles.locationContent}>
              <span className={styles.sectionLabel}>Local Geography</span>
              <h2 className={styles.sectionTitle}>Where We Are Located</h2>
              <p className={styles.locationText}>
                Romana Guest House is located at <strong>Via Alfredo Gargiulo 86, 00124 Rome, Italy</strong>. Our location in Infernetto is key for travelers wishing to bypass high city center prices while enjoying beach days, ancient ruins, and quick airport transit.
              </p>

              <div className={styles.transitList}>
                <div className={styles.transitItem}>
                  <div className={styles.transitIcon}>✈</div>
                  <div className={styles.transitDetails}>
                    <h4>Fiumicino Airport (FCO)</h4>
                    <p>15 minutes drive (16 km) via SP8</p>
                  </div>
                </div>

                <div className={styles.transitItem}>
                  <div className={styles.transitIcon}>🌊</div>
                  <div className={styles.transitDetails}>
                    <h4>Ostia Beach & Dunes</h4>
                    <p>10 minutes drive (9 km) or direct bike trail</p>
                  </div>
                </div>

                <div className={styles.transitItem}>
                  <div className={styles.transitIcon}>🏛</div>
                  <div className={styles.transitDetails}>
                    <h4>Ostia Antica Archeological Park</h4>
                    <p>10 minutes drive (8 km) - Rome's premier preserved ruins</p>
                  </div>
                </div>

                <div className={styles.transitItem}>
                  <div className={styles.transitIcon}>🚇</div>
                  <div className={styles.transitDetails}>
                    <h4>Rome Historic Center</h4>
                    <p>25 minutes drive / 35 minutes via Metro (EUR Fermi / Acilia)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mapContainer}>
              {/* Custom High-Aesthetic Styled Map Mockup using SVGs */}
              <div className={styles.mapMockup}>
                <svg className={styles.mapSvg} viewBox="0 0 400 400">
                  {/* Grid Lines */}
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(44, 74, 62, 0.05)" strokeWidth="2" />
                  <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(44, 74, 62, 0.05)" strokeWidth="2" />
                  <line x1="0" y1="300" x2="400" y2="300" stroke="rgba(44, 74, 62, 0.05)" strokeWidth="2" />
                  <line x1="100" y1="0" x2="100" y2="400" stroke="rgba(44, 74, 62, 0.05)" strokeWidth="2" />
                  <line x1="200" y1="0" x2="200" y2="400" stroke="rgba(44, 74, 62, 0.05)" strokeWidth="2" />
                  <line x1="300" y1="0" x2="300" y2="400" stroke="rgba(44, 74, 62, 0.05)" strokeWidth="2" />
                  
                  {/* Coastal Line (Tiber / Sea representation) */}
                  <path d="M 0 350 Q 150 320 200 250 T 400 150" fill="none" stroke="rgba(197, 160, 89, 0.15)" strokeWidth="20" strokeLinecap="round" />
                  <path d="M 0 350 Q 150 320 200 250 T 400 150" fill="none" stroke="#FDFBF7" strokeWidth="8" />

                  {/* Main Roads */}
                  <path d="M 50 0 L 50 400" fill="none" stroke="rgba(44, 74, 62, 0.1)" strokeWidth="8" />
                  <path d="M 0 150 L 400 150" fill="none" stroke="rgba(44, 74, 62, 0.1)" strokeWidth="8" />
                  <path d="M 0 280 L 400 280" fill="none" stroke="rgba(44, 74, 62, 0.1)" strokeWidth="6" />
                  <path d="M 320 0 L 320 400" fill="none" stroke="rgba(44, 74, 62, 0.1)" strokeWidth="6" />

                  {/* Landmarks */}
                  <circle cx="90" cy="80" r="10" fill="rgba(44, 74, 62, 0.08)" />
                  <text x="90" y="65" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--text-muted)">Fiumicino Airport</text>
                  
                  <circle cx="180" cy="180" r="12" fill="rgba(197, 160, 89, 0.1)" />
                  <text x="180" y="160" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--text-muted)">Ostia Antica Ruins</text>

                  <circle cx="50" cy="320" r="10" fill="rgba(42, 133, 244, 0.08)" />
                  <text x="50" y="305" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--text-muted)">Ostia Beach</text>

                  <circle cx="340" cy="70" r="12" fill="rgba(44, 74, 62, 0.08)" />
                  <text x="340" y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--text-muted)">Central Rome</text>

                  {/* Romana Guest House Pin */}
                  <g className={styles.mapPin}>
                    <circle cx="230" cy="260" r="8" fill="var(--accent)" />
                    <circle cx="230" cy="260" r="16" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3">
                      <animate attributeName="transform" type="scale" values="1; 1.5; 1" keyTimes="0; 0.5; 1" dur="3s" repeatCount="indefinite" />
                    </circle>
                    <path d="M 230 260 L 230 240" stroke="var(--accent)" strokeWidth="2" />
                    <rect x="160" y="200" width="140" height="35" rx="6" fill="var(--primary)" />
                    <text x="230" y="222" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">ROMANA GUEST HOUSE</text>
                  </g>
                </svg>
                <div className={styles.mapAddressCard}>
                  <p><strong>Via Alfredo Gargiulo 86</strong></p>
                  <p>00124 Infernetto, Rome, Italy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`${styles.contactSection} section-padding`}>
        <div className="container">
          <div className={styles.contactGrid}>
            <div className={styles.contactInfoCard}>
              <span className={styles.sectionLabel}>Reservation Inquiry</span>
              <h2 className={styles.sectionTitle}>Get In Touch With Us</h2>
              <p className={styles.contactDescription}>
                Do you have custom check-in requests, transport inquiries, or booking questions? Drop us a line and we will get back to you immediately.
              </p>

              <div className={styles.contactDetailsList}>
                <div className={styles.contactDetailItem}>
                  <span className={styles.detailIcon}>📍</span>
                  <div className={styles.detailText}>
                    <strong>Address</strong>
                    <p>Via Alfredo Gargiulo 86, 00124 Rome, Italy</p>
                  </div>
                </div>

                <div className={styles.contactDetailItem}>
                  <span className={styles.detailIcon}>📞</span>
                  <div className={styles.detailText}>
                    <strong>Phone</strong>
                    <p><a href="tel:+390681157001">+39 068 1157001</a></p>
                  </div>
                </div>

                <div className={styles.contactDetailItem}>
                  <span className={styles.detailIcon}>✉</span>
                  <div className={styles.detailText}>
                    <strong>Email Address</strong>
                    <p><a href="mailto:info@romanaguesthouse.com">info@romanaguesthouse.com</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.contactFormContainer} glass`}>
              {contactSubmitted ? (
                <div className={styles.contactSuccess}>
                  <div className={styles.successCheckbox}>✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Grazie! We have received your message and our team will get in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Full Name</label>
                    <input type="text" className={styles.formInput} placeholder="Your Name" required />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Email Address</label>
                    <input type="email" className={styles.formInput} placeholder="name@example.com" required />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Subject</label>
                    <input type="text" className={styles.formInput} placeholder="e.g. Airport Shuttle Reservation" required />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Your Message</label>
                    <textarea className={styles.formTextarea} rows={5} placeholder="Write your inquiries here..." required></textarea>
                  </div>

                  <button type="submit" className={styles.contactSubmitBtn}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`${styles.footerContainer} container`}>
          <div className={styles.footerBrand}>
            <img src="/images/Gallery/logo.png" alt="Romana Guest House Logo" className={styles.footerLogoImg} />
            <p className={styles.footerBrandDesc}>
              A peaceful garden sanctuary in Rome. Connecting historical sightseeing with Mediterranean beach serenity.
            </p>
          </div>

          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerHeading}>Navigation</h4>
            <a href="#about" className={styles.footerLink}>About Us</a>
            <a href="#rooms" className={styles.footerLink}>Rooms</a>
            <a href="#amenities" className={styles.footerLink}>Amenities</a>
            <a href="#gallery" className={styles.footerLink}>Gallery</a>
            <a href="#reviews" className={styles.footerLink}>Reviews</a>
            <a href="#location" className={styles.footerLink}>Location</a>
          </div>

          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerHeading}>Surrounding Areas</h4>
            <span className={styles.footerStaticLink}>Ostia Antica ruins</span>
            <span className={styles.footerStaticLink}>Fiumicino (FCO) Airport</span>
            <span className={styles.footerStaticLink}>Ostia Beach Sand</span>
            <span className={styles.footerStaticLink}>Acilia / EUR Metro Route</span>
          </div>

          <div className={styles.footerLinksGroup}>
            <h4 className={styles.footerHeading}>Contact</h4>
            <p className={styles.footerInfoText}>Via Alfredo Gargiulo 86</p>
            <p className={styles.footerInfoText}>00124 Infernetto, Rome, Italy</p>
            <p className={styles.footerInfoText}>Phone: +39 068 1157001</p>
            <p className={styles.footerInfoText}>info@romanaguesthouse.com</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={`${styles.footerBottomContainer} container`}>
            <p>© {new Date().getFullYear()} Romana Guest House. All Rights Reserved.</p>
            <div className={styles.footerSocials}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                FB
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                IG
              </a>
              <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="TripAdvisor">
                TA
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
