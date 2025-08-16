import React from "react";
import styles from "../terms-and-conditions/terms-and-conditions.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";

const PrivacyPolicyScreen = () => {
  return (
    <div className={styles.legalPage}>
      <CustomContainer>
        <header>
          <h1>Privacy Policy</h1>
          <p>
            At JobThalam, we value your trust and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, share, and safeguard your data when you use our
            website, mobile application, or related services (collectively, the
            “Services”).
          </p>
        </header>

        <main>
          <section>
            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong>
                <ul>
                  <li>Name, email address, phone number</li>
                  <li>Date of birth, gender</li>
                  <li>
                    Educational qualifications, employment history, skills,
                    resume/CV
                  </li>
                  <li>Job preferences and location</li>
                </ul>
              </li>
              <li>
                <strong>Non-Personal Information:</strong>
                <ul>
                  <li>IP address, browser type, device information</li>
                  <li>
                    Pages you visit, time spent on our site, referring URLs
                  </li>
                </ul>
              </li>
              <li>
                <strong>From Third Parties:</strong>
                <ul>
                  <li>
                    Information from job posting platforms, recruiters, or
                    public sources
                  </li>
                  <li>
                    Social media profile data (if you choose to link accounts)
                  </li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Create and manage your account</li>
              <li>Match you with suitable job opportunities</li>
              <li>
                Allow employers/recruiters to view your profile and contact you
              </li>
              <li>Send you job alerts, updates, and promotional offers</li>
              <li>Improve our website and services</li>
              <li>Ensure compliance with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>3. Sharing of Information</h2>
            <p>We may share your data:</p>
            <ul>
              <li>
                With employers, recruiters, and staffing agencies for job
                opportunities
              </li>
              <li>
                With service providers who assist in operating our platform
              </li>
              <li>
                When required by law, legal processes, or to protect rights and
                safety
              </li>
              <li>
                In case of a merger, acquisition, or sale of company assets
              </li>
            </ul>
            <p>
              <em>Note:</em> We never sell your personal data to third parties
              for marketing purposes without your consent.
            </p>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect your information from unauthorized access,
              misuse, or disclosure. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2>5. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent for processing your data</li>
              <li>Request a copy of the information we hold about you</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p>
              You can exercise these rights by contacting us at{" "}
              <a href="mailto:support@jobthalam.com">support@jobthalam.com</a>.
            </p>
          </section>

          <section>
            <h2>6. Cookies and Tracking</h2>
            <p>
              We use cookies, web beacons, and similar technologies to enhance
              your experience and analyze site traffic. You may disable cookies
              in your browser settings, but some features may not function
              properly.
            </p>
          </section>

          <section>
            <h2>7. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites. We are not
              responsible for their privacy practices. We encourage you to
              review their privacy policies before sharing any information.
            </p>
          </section>

          <section>
            <h2>8. Children’s Privacy</h2>
            <p>
              Our services are intended for individuals aged 18 and above. We do
              not knowingly collect data from children under 18.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with the updated effective date.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact:
              <a href="mailto:support@jobthalam.com">support@jobthalam.com</a>
            </p>
          </section>
        </main>

        <footer>
          <small>All rights reserved © 2025 Arvicomm Technologies.</small>
        </footer>
        <br />
        <br />
      </CustomContainer>
    </div>
  );
};

export default PrivacyPolicyScreen;
