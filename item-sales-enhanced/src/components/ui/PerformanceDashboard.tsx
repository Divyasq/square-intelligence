import React from "react";
import { DashboardData } from '../types/dashboard';
import { Icon1 } from "./icons/Icon1";
import { Icon2 } from "./icons/Icon2";
import { Icon3 } from "./icons/Icon3";
import { Icon4 } from "./icons/Icon4";
import { Icon5 } from "./icons/Icon5";
import { ActionCenter } from "./ActionCenter";

interface PerformanceDashboardProps {
  data?: DashboardData | null;
}

export function PerformanceDashboard({ data }: PerformanceDashboardProps) {
  // Default fallback data
  const selectedDate = data?.selectedDate || 'Jul 18';
  const keyMetrics = data?.keyMetrics || [];
  const customerStats = data?.customerStats;
  const paymentTypes = data?.paymentTypes || [];

  // Helper function to get metric by id
  const getMetric = (id: string) => keyMetrics.find(metric => metric.id === id);
  return (
    <>
      <style>{`
        .performance-dashboard div {
          box-sizing: border-box;
        }
        .performance-dashboard h2 {
          box-sizing: border-box;
          font-family: "Square Sans Display VF", "Square Sans Display", Helvetica, Arial, sans-serif;
          font-size: 19px;
          font-weight: 700;
          line-height: 26px;
          letter-spacing: normal;
          text-transform: none;
        }
        .performance-dashboard span {
          box-sizing: border-box;
        }
        .performance-dashboard p {
          font-weight: 400;
          font-size: 14px;
          font-family: "Square Sans Text VF", "Square Sans Text", Helvetica, Arial, sans-serif;
          line-height: 22px;
          letter-spacing: normal;
          text-transform: none;
          box-sizing: border-box;
          margin-top: 0px;
          color: rgba(0, 0, 0, 0.55);
        }
        .performance-dashboard a {
          box-sizing: border-box;
          cursor: pointer;
          color: rgb(0, 90, 217);
          text-decoration: none;
        }
        .performance-dashboard h3 {
          font-weight: 700;
          font-size: 19px;
          font-family: "Square Sans Display VF", "Square Sans Display", Helvetica, Arial, sans-serif;
          line-height: 26px;
          letter-spacing: normal;
          text-transform: none;
          box-sizing: border-box;
          border: 0px none rgba(0, 0, 0, 0.9);
          padding: 0px;
          margin: 0px 0px 2px 0px;
        }
      `}</style>
      <div
        className="performance-dashboard"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          marginTop: "24px",
          borderRadius: "16px",
          padding: "16px 16px 8px 16px",
          width: "100%",
          color: "rgb(26, 26, 26)",
          fontSize: "14px",
          lineHeight: "22px",
          fontFamily:
            '"Square Sans Text VF", "Square Sans Text", Helvetica, Arial, sans-serif',
        }}
      >
        <div
          style={{
            visibility: "visible",
            boxSizing: "border-box",
            minHeight: "40px",
          }}
        >
          <h2
            style={{
              border: "0px none rgb(26, 26, 26)",
              padding: "0px 0px 0px 8px",
              margin: "7px 0px 7px 0px",
            }}
          >
            Performance
          </h2>
        </div>

        <div
          style={{
            position: "relative",
            top: "0px",
            minHeight: "0px",
            padding: "8px 0px 12px 8px",
          }}
        >
          <div
            style={{
              overflowX: "scroll",
              display: "flex",
              rowGap: "8px",
              columnGap: "8px",
              height: "42px",
              scrollbarWidth: "none",
            }}
          >
            <div style={{}}>
              <div
                style={{
                  visibility: "visible",
                  boxSizing: "border-box",
                  minWidth: "80px",
                  minHeight: "42px",
                  backgroundColor: "white",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <label
                  style={{ 
                    boxSizing: "border-box", 
                    cursor: "pointer",
                    fontSize: "12px",
                    color: "rgba(0, 0, 0, 0.55)"
                  }}
                >
                  Date
                </label>
                <span style={{ fontSize: "14px", fontWeight: "500" }}>
                  {selectedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "0px none rgb(26, 26, 26)",
            margin: "8px 0px 8px 0px",
          }}
        >
          <div
            style={{
              paddingBottom: "0px",
              marginBottom: "0px",
              borderBottom: "0px none rgb(26, 26, 26)",
            }}
          >
            <div
              style={{
                color: "rgba(0, 0, 0, 0.9)",
                fontWeight: "400",
                fontFamily:
                  '"Square Sans Text VF", "Square Sans Text", Helvetica, Arial, sans-serif',
                fontSynthesisWeight: "none",
                fontSynthesisStyle: "none",
                fontSynthesisSmallCaps: "none",
                WebkitFontSmoothing: "antialiased",
                backgroundColor: "rgb(255, 255, 255)",
                boxShadow: "none",
                position: "static",
                borderRadius: "12px",
                padding: "24px",
                margin: "0px",
              }}
            >
              <div style={{ padding: "0px 8px 16px 0px" }}>
                <h2
                  style={{
                    border: "0px none rgba(0, 0, 0, 0.9)",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  Key Metrics
                </h2>
                <p style={{ marginBottom: "0px" }}>vs. Prior Friday</p>
              </div>

              <div
                style={{
                  display: "grid",
                  columnGap: "32px",
                  rowGap: "16px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
              >
                {keyMetrics.map((metric, index) => {
                  const icons = [Icon1, Icon2, Icon3, Icon4, Icon5];
                  const IconComponent = icons[index] || Icon1;
                  
                  // Helper function to get change color
                  const getChangeColor = (changeType: string | undefined, change: string | undefined) => {
                    if (!change || change === 'N/A') return 'rgba(0, 0, 0, 0.3)';
                    if (changeType === 'positive') return 'rgb(0, 156, 74)';
                    if (changeType === 'negative') return 'rgb(199, 55, 55)';
                    return 'rgba(0, 0, 0, 0.55)';
                  };

                  const getChangeBgColor = (changeType: string | undefined, change: string | undefined) => {
                    if (!change || change === 'N/A') return 'rgba(0, 0, 0, 0.05)';
                    if (changeType === 'positive') return 'rgba(0, 156, 74, 0.1)';
                    if (changeType === 'negative') return 'rgba(199, 55, 55, 0.1)';
                    return 'rgba(0, 0, 0, 0.05)';
                  };

                  return (
                    <a
                      key={metric.id}
                      href={metric.href || "#"}
                      style={{
                        marginLeft: "-8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "6px",
                        padding: "12px 8px 12px 8px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                        }}
                      >
                        <div style={{ display: "flex", height: "22px" }}>
                          <p style={{ marginBottom: "0px" }}>{metric.label}</p>
                        </div>
                        <div
                          style={{
                            color: "rgba(0, 0, 0, 0.9)",
                            fontSize: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {metric.value}
                        </div>
                      </div>
                      <div style={{ minHeight: "28px" }}>
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "22px",
                            letterSpacing: "normal",
                            textTransform: "none",
                            backgroundColor: getChangeBgColor(metric.changeType, metric.change),
                            color: getChangeColor(metric.changeType, metric.change),
                            border: "1px solid rgba(0, 0, 0, 0)",
                            borderRadius: "6px",
                            padding: "2px 8px 2px 8px",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <IconComponent style={{}} />
                          {metric.change || 'N/A'}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Center */}
        <div style={{ margin: "24px 0px" }}>
          <ActionCenter 
            alerts={data?.actionCenterAlerts || []}
            onAlertAction={(alertId, action) => {
              console.log('Alert action:', alertId, action);
              // Handle alert actions here
            }}
            onDismiss={(alertId) => {
              console.log('Dismiss alert:', alertId);
              // Handle alert dismissal here
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            columnGap: "24px",
            rowGap: "24px",
            marginTop: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: "12px",
              padding: "24px",
              height: "356px",
            }}
          >
            <h3 style={{}}>Customers</h3>
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 8px", borderRadius: "6px" }}>
                <span style={{ fontWeight: "500", fontSize: "14px" }}>Total customers</span>
                <span>{customerStats?.totalCustomers || 0}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 8px", borderRadius: "6px" }}>
                <span style={{ fontWeight: "500", fontSize: "14px" }}>Returning customers</span>
                <span>{customerStats?.returningCustomers || 0}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 8px", borderRadius: "6px" }}>
                <span style={{ fontWeight: "500", fontSize: "14px" }}>Avg. visits per customer</span>
                <span>{customerStats?.avgVisitsPerCustomer || 0}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 8px", borderRadius: "6px" }}>
                <span style={{ fontWeight: "500", fontSize: "14px" }}>Avg. spent per visit</span>
                <span>{customerStats?.avgSpentPerVisit || '$0.00'}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 8px", borderRadius: "6px" }}>
                <span style={{ fontWeight: "500", fontSize: "14px" }}>Feedback</span>
                <span>{customerStats ? `${customerStats.positiveFeedback} positive, ${customerStats.negativeFeedback} negative` : '0 positive, 0 negative'}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: "12px",
              padding: "24px",
              height: "356px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <h3 style={{}}>Payment Types</h3>
              <p style={{ marginBottom: "16px" }}>by Payment amount</p>
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {paymentTypes.slice(0, 3).map((payment, index) => (
                  <div 
                    key={payment.id} 
                    style={{ 
                      height: "48px", 
                      flex: payment.percentage > 0 ? payment.percentage : 1, 
                      backgroundColor: payment.color, 
                      borderRadius: "4px" 
                    }}
                  ></div>
                ))}
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {paymentTypes.slice(0, 3).map((payment) => (
                  <div key={payment.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "14px", height: "14px", backgroundColor: payment.color, borderRadius: "20%" }}></div>
                      <span style={{ fontWeight: "500", fontSize: "14px" }}>{payment.name}</span>
                    </div>
                    <span>{payment.amount}</span>
                    <span style={{ color: "rgba(0, 0, 0, 0.55)", fontSize: "14px" }}>{payment.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: "12px",
              padding: "24px",
              height: "356px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <h3 style={{}}>Items</h3>
              <p style={{ marginBottom: "16px" }}>by Gross sales</p>
            </div>
            
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ display: "flex", gap: "4px", height: "80px", alignItems: "flex-end", marginBottom: "8px" }}>
                {Array.from({ length: 11 }).map((_, i) => {
                  // Create a small random height for visualization when we have data
                  const hasData = data?.hasItemsSales;
                  const height = hasData ? Math.max(4, Math.random() * 60) : 4;
                  const backgroundColor = hasData ? "rgb(0, 106, 255)" : "rgba(0, 0, 0, 0.05)";
                  
                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${height}px`,
                        backgroundColor,
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "rgba(0, 0, 0, 0.55)" }}>
                <span>Lowest</span>
                <span>Highest</span>
              </div>
            </div>
            
            <div style={{ marginTop: "16px" }}>
              <p style={{ marginBottom: "0px" }}>
                {data?.hasItemsSales ? "Top items are performing well" : "No sales in this time period"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
