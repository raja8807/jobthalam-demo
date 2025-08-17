import React from "react";
import styles from "./pricing.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import CustomButton from "@/components/ui/custom_button/custom_button";

import NewsLetterSection from "../home/sections/news_letter/news_letter";

const PricingScreen = ({ session, setShowLogin }) => {
  const packages = [
    {
      name: "Silver",
      price: "₹99",
      jobs: "5 Jobs",
      features: [
        "Access to 5 job postings",
        "Basic job search filters",
        "Whatsapp notifications",
        "Standard support",
        "1 time validity",
      ],
      popular: false,
      color: "#C0C0C0",
    },
    {
      name: "Gold",
      price: "₹199",
      jobs: "Unlimited Jobs",
      features: [
        "Access to 50+ job postings",
        "Advanced job search filters",
        "Priority Whatsapp notifications",
        "Priority support",
        "7-days validity",
        // "Featured job listings",
        // "Resume builder access"
      ],
      popular: true,
      color: "#FFD700",
    },
  ];

  return (
    <>
      <div className={styles.pricingSection}>
        <CustomContainer>
          <div className={styles.header}>
            <h1>Choose Your Plan</h1>
            <p>Select the perfect package for your job search needs</p>
          </div>

          <div className={styles.packagesContainer}>
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`${styles.packageCard} ${
                  pkg.popular ? styles.popular : ""
                }`}
              >
                {pkg.popular && (
                  <div className={styles.popularBadge}>Most Popular</div>
                )}

                <div className={styles.packageHeader}>
                  <h2>{pkg.name}</h2>
                  <div className={styles.price}>
                    <span className={styles.amount}>{pkg.price}</span>
                    <span className={styles.jobs}>{pkg.jobs}</span>
                  </div>
                </div>

                <div className={styles.features}>
                  <ul>
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.action}>
                  <CustomButton
                    variant={pkg.popular ? 1 : 2}
                    wFull
                    href={session && "/candidate"}
                    onClick={() => {
                      if (!session) {
                        setShowLogin(true);
                      }
                    }}
                  >
                    Get Started
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.faq}>
            <h3>Frequently Asked Questions</h3>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h4>What happens after I purchase a package?</h4>
                <p>
                  You&apos;ll receive immediate access to post jobs according to
                  your package. Your account will be upgraded and you can start
                  getting jobs right away.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>Can I upgrade my package later?</h4>
                <p>
                  Yes, you can upgrade from Silver to Gold at any time. The
                  remaining value from your current package will be applied to
                  the upgrade.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>Do packages expire?</h4>
                <p>
                  Yes, Silver packages expire after 1 time and Gold packages
                  expire after 7 days from the date of purchase.
                </p>
              </div>
              <div className={styles.faqItem}>
                <h4>What payment methods do you accept?</h4>
                <p>
                  We accept all major credit cards, debit cards, UPI, and net
                  banking for secure payments.
                </p>
              </div>
            </div>
          </div>
        </CustomContainer>
      </div>

      <NewsLetterSection />
    </>
  );
};

export default PricingScreen;
