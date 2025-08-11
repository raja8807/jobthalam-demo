import CustomContainer from "@/components/ui/custom_container/custom_container";
import React from "react";
import styles from "../terms-and-conditions/terms-and-conditions.module.scss";

const RefundPolicyScreen = () => {
  return (
    <div className={styles.legalPage}>
      <CustomContainer>
        <header>
          <h1>Refund Policy</h1>
          <p>
            At JobThalam, we strive to provide valuable and reliable job alert
            services to our users. Please read our refund policy carefully
            before making any purchase.
          </p>
        </header>

        <main>
          <section>
            <h2>1. No Refund for Services Already Delivered</h2>
            <p>
              Once the subscription fee has been paid and job alerts have been
              activated, the service is considered delivered. Refunds will not
              be provided for:
            </p>
            <ul>
              <li>Completed or partially completed subscription periods</li>
              <li>
                Situations where you have received job alerts as per your
                subscription plan
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Cancellation Before Service Activation</h2>
            <p>
              If you have made the payment but the service has not yet been
              activated, you may request a full refund within 24 hours of
              payment by contacting our support team.
            </p>
          </section>

          <section>
            <h2>3. Duplicate Transactions</h2>
            <p>
              In case of duplicate payments due to technical errors or banking
              issues, we will verify the transaction and process a full refund
              for the extra payment made.
            </p>
          </section>

          <section>
            <h2>4. Technical Issues</h2>
            <p>
              If you face technical issues preventing you from accessing the
              service, please contact our support team immediately. We will
              attempt to resolve the issue first. If the issue remains
              unresolved and you have not received the service, you may be
              eligible for a refund.
            </p>
          </section>

          <section>
            <h2>5. How to Request a Refund</h2>
            <p>To initiate a refund request:</p>
            <ul>
              <li>
                Email us at{" "}
                <a href="mailto:support@jobthalam.com">support@jobthalam.com</a>{" "}
                with your payment receipt and subscription details
              </li>
              <li>Mention the reason for the refund request</li>
              <li>
                Our team will review your request and respond within 7 working
                days
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Payment Reversal Timeline</h2>
            <p>
              Approved refunds will be credited back to your original payment
              method within 7–10 working days, depending on your bank or payment
              gateway.
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

export default RefundPolicyScreen;
