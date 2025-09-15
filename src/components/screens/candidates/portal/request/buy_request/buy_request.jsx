import CustomButton from "@/components/ui/custom_button/custom_button";
import MainFrame from "@/components/ui/main_frame/main_frame";
import React, { useState } from "react";
import styles from "./buy_request.module.scss";
import PaymentPortal from "./payment/payment";
import { useFetchPackages } from "@/api_hooks/package_hooks/package.hooks";
import LoadingScreen from "@/components/ui/loading_screen/loading_screen";

const Package = ({ pkg, setShowPaymentFor, setCurrentTabIndex }) => {
  return (
    <div
      className={`${styles.packageCard} ${pkg.popular ? styles.popular : ""}`}
    >
      {pkg.popular && <div className={styles.popularBadge}>Most Popular</div>}

      <div className={styles.packageHeader}>
        <h2>{pkg.name}</h2>
        <div className={styles.price}>
          <span className={styles.amount}>₹{pkg.price}</span>
          <span className={styles.jobs}>{pkg.jobs}</span>
        </div>
      </div>

      <div className={styles.features}>
        <ul>
          {pkg.features.map((feature, featureIndex) => (
            <li key={featureIndex}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
          // href={session && "/candidate"}
          onClick={() => {
            setShowPaymentFor(pkg);
          }}
        >
          Get Started
        </CustomButton>
      </div>

      {/* <div
        className={`${styles.Package} ${
          isRecommended ? styles.recommended : ""
        } ${disabled && styles?.disabled}`}
      >
        <div className={styles.reco}>{isRecommended && "Recommended"}</div>
        <div className={styles.wrap}>
          <h1>{name}</h1>
          <p className={styles.price}>
            <span className={styles.ico}>&#8377;</span>
            <span className={styles.amount}>{price}</span>
            <span className={styles.mo}>/mo</span>
          </p>
          <p className={styles.text}>{text}</p>
          <div className={styles.btn}>
            <CustomButton
              variant={isFree ? 2 : 1}
              onClick={() => {
                if (isHome) {
                  router.push("/candidate?t=2");
                } else {
                  setShowPaymentFor(data);
                }
              }}
              disabled={disabled}
            >
              {isHome ? "Get Started" : "Buy Now"}
            </CustomButton>
          </div>

          <div className={styles.list}>
           
          </div>
        </div>
      </div> */}
    </div>
  );
};

const BuyRequests = ({
  setShowHistory,
  currentUser,
  setCurrentUser,
  setCurrentTabIndex,
  isHome,
}) => {
  // const packages = [
  //   {
  //     id: "mgsmrkmgksmlrm",
  //     title: "SILVER",
  //     isFree: true,
  //     price: "0",
  //     count: 2,
  //     text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, ianegk",
  //     features: [
  //       {
  //         text: "2 Job Alerts",
  //         check: true,
  //       },
  //       {
  //         text: "Dashboard Access",
  //         check: true,
  //       },
  //       {
  //         text: "View recruiter Phone No.",
  //         check: true,
  //       },
  //       {
  //         text: "View recruiter Email",
  //         check: true,
  //       },
  //       {
  //         text: "Detailed job description",
  //         check: true,
  //       },
  //     ],
  //   },

  //   {
  //     id: "1aiev",
  //     title: "PLATINUM",
  //     price: "299",
  //     count: 30,
  //     isFree: false,

  //     text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, ianegk",
  //     features: [
  //       {
  //         text: "30 Assured Job Alerts",
  //         check: true,
  //       },
  //       {
  //         text: "Dashboard Access",
  //         check: true,
  //       },
  //       {
  //         text: "View recruiter Phone No.",
  //         check: true,
  //       },
  //       {
  //         text: "View recruiter Email",
  //         check: true,
  //       },
  //       {
  //         text: "Detailed job description",
  //         check: true,
  //       },
  //     ],
  //     isRecommended: true,
  //   },

  //   {
  //     id: "akefnk",
  //     title: "GOLD",
  //     price: "99",
  //     count: 10,
  //     isFree: false,

  //     text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, ianegk",
  //     features: [
  //       {
  //         text: "10 Assured Job Alerts",
  //         check: true,
  //       },
  //       {
  //         text: "Dashboard Access",
  //         check: true,
  //       },
  //       {
  //         text: "View recruiter Phone No.",
  //         check: true,
  //       },
  //       {
  //         text: "View recruiter Email",
  //         check: true,
  //       },
  //       {
  //         text: "Detailed job description",
  //         check: true,
  //       },
  //     ],
  //   },
  // ];

  const [showPaymentFor, setShowPaymentFor] = useState(null);

  const { data, isLoading } = useFetchPackages();

  const packages = [
    {
      name: "Gold",
      // price: "₹199",
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
    {
      name: "Silver",
      // price: "₹99",
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
  ];

  return (
    <MainFrame
      head={
        isHome && `Hello, ${currentUser.first_name} ${currentUser.last_name}`
      }
    >
      {isLoading && <LoadingScreen />}
      {showPaymentFor ? (
        <div>
          <PaymentPortal
            packageData={showPaymentFor}
            currentUser={currentUser}
            setShowPaymentFor={setShowPaymentFor}
            setCurrentUser={setCurrentUser}
            setCurrentTabIndex={setCurrentTabIndex}
          />
        </div>
      ) : (
        <div className={styles.BuyRequests}>
          {data && (
            <div className={styles.packagesContainer}>
              <Package
                pkg={{
                  ...data[1],
                  ...packages[1],
                }}
                setShowPaymentFor={setShowPaymentFor}
              />

              <Package
                pkg={{
                  ...data[0],
                  ...packages[0],
                }}
                setShowPaymentFor={setShowPaymentFor}
              />

              {/* {packages.map((pkg, idx) => {
              return (
                <Package
                  key={pkg.name}
                  pkg={pkg}
                  isHome={isHome}
                  setShowPaymentFor={setShowPaymentFor}
                  setCurrentTabIndex={setCurrentTabIndex}
                />
              );
            })} */}
            </div>
          )}

          {/* {data && (
            <Row>
              {data.map((pack) => (
                <Package
                  key={pack.id}
                  data={pack}
                  setShowPaymentFor={setShowPaymentFor}
                  currentUser={currentUser}
                  isHome={isHome}
                />
              ))}
            </Row>
          )} */}

          <br />
          {!isHome && (
            <div className={styles.btns}>
              <CustomButton
                onClick={() => {
                  setShowHistory(true);
                }}
                variant={3}
              >
                View Request History
              </CustomButton>
            </div>
          )}
          <br />
          <br />
        </div>
      )}
    </MainFrame>
  );
};

export default BuyRequests;
