import CustomContainer from "@/components/ui/custom_container/custom_container";
import React from "react";
import styles from "./terms-and-conditions.module.scss";

const TermsAndCondionsScreen = () => {
  return (
    <div className={styles.legalPage}>
      <CustomContainer>
        <header>
          <h1>Terms and Conditions</h1>
          <p class="lead">
            Welcome to JobThalam. By accessing or using our services, you agree
            to comply with the following Terms &amp; Conditions. Please read
            them carefully before proceeding. Changes will be posted on our
            website with the updated date.
          </p>
        </header>

        <main>
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By registering, accessing, or using our website, mobile
              application, or any related services, you agree to be bound by
              these Terms &amp; Conditions and our Privacy Policy. If you do not
              agree, you may not use our services.
            </p>
          </section>

          <section>
            <h2>2. Services Provided</h2>
            <p>
              Our platform connects job seekers with employers by offering job
              listings, application tools, and related career resources. We do
              not guarantee job placement, employment duration, or specific
              salary offers.
            </p>
          </section>

          <section>
            <h2>3. User Responsibilities</h2>
            <ol>
              <li>
                You agree to provide accurate, current, and complete information
                during registration.
              </li>
              <li>
                You are solely responsible for the content you post, including
                resumes, job postings, and messages.
              </li>
              <li>
                You agree not to use the platform for any unlawful, fraudulent,
                or misleading activities.
              </li>
            </ol>
          </section>

          <section>
            <h2>4. Employer Responsibilities</h2>
            <ol>
              <li>
                Employers must provide truthful and accurate job descriptions.
              </li>
              <li>
                No discriminatory, offensive, or misleading postings are
                allowed.
              </li>
              <li>
                Payment for premium or featured listings must be made as per the
                selected plan.
              </li>
            </ol>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>
              All content, design, trademarks, and software on our platform are
              owned by JobThalam. You may not reproduce, distribute, or use our
              materials without prior written permission.
            </p>
          </section>

          <section>
            <h2>6. Payment &amp; Refund Policy</h2>
            <p>
              All payments made for premium services, job alerts, or advertising
              are non-refundable unless stated otherwise. Service charges and
              taxes will be applicable as per government regulations.
            </p>
          </section>

          <section>
            <h2>7. Limitation of Liability</h2>
            <p>We are not responsible for:</p>
            <ol>
              <li>
                The actions, omissions, or conduct of any employer or job
                seeker.
              </li>
              <li>The accuracy of job listings or resumes.</li>
              <li>
                Any loss, damage, or inconvenience arising from the use of our
                services.
              </li>
            </ol>
          </section>

          <section>
            <h2>8. Termination of Access</h2>
            <p>
              We reserve the right to suspend or terminate your account without
              prior notice if you violate these Terms &amp; Conditions or engage
              in fraudulent activity.
            </p>
          </section>

          <section>
            <h2>9. Changes to Terms</h2>
            <p>
              We may update these Terms &amp; Conditions at any time. Continued
              use of the platform after updates will constitute acceptance of
              the revised terms.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>
              For any questions or concerns, contact us at:{" "}
              <a href="mailto:support@jobthalam.com">support@jobthalam.com</a>
            </p>
          </section>
        </main>

        <footer>
          <small>© JobThalam. All rights reserved.</small>
        </footer>
        <br />
      </CustomContainer>
    </div>
  );
};

export default TermsAndCondionsScreen;
