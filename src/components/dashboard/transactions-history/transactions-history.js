import React, { useState, useMemo, useEffect } from "react";
import Pagination from "./Paginations";
import { ColorRing } from "react-loader-spinner";
import Web3 from "web3";

import "./transactions-history.scss";

const TransactionsHistory = ({ data , handleUnlock }) => {
  let PageSize = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = data.length;

  useEffect(() => {
    if (totalCount > 0) setIsLoading(false);
  }, [currentPage]);

  const currentTableData = useMemo(() => {
    let firstPageIndex = (currentPage - 1) * PageSize;
    let lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  function getDateFromSeconds(seconds) {
    let date = new Date(seconds * 1000);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  function subtractMonthsFromDate(dateString, numMonths) {
    // Convert the date string into a Date object
    const dateParts = dateString.split("/");
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[0]);
    const date = new Date(year, month, day);
  
    // Subtract the number of months from the date
    date.setMonth(date.getMonth() - numMonths);
  
    // Convert the date back into a string in the same format as the input
    const newYear = date.getFullYear();
    const newMonth = date.getMonth() + 1;
    const newDay = date.getDate();
    const newDateString = `${newDay}/${newMonth}/${newYear}`;
    return newDateString;
  }

  function getCurrentDate() {
    let date = new Date();
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }
  let currentDate = getCurrentDate();

  function compareDates(date1, date2) {
    // let timestamp1 = new Date(date1).getTime();
    // let timestamp2 = new Date(date2).getTime();

    const [day, month, year] = date1.split("/");
    const formattedDate1 = `${year}/${month}/${day}`;
    const dateFormatted1 = new Date(formattedDate1);

    const [day2, month2, year2] = date2.split("/");
    const formattedDate2 = `${year2}/${month2}/${day2}`;
    const dateFormatted2 = new Date(formattedDate2);

    let timestamp1 = formattedDate1; //.getTime();
    let timestamp2 = formattedDate2; //.getTime();
    
    //console.log("date1: " + date1 + ", dateFormatted1: "+ dateFormatted1 + ", timestamp1: "+ timestamp1 + ", timestamp2: "+ timestamp2 + ", 1 later than 2: "+ (timestamp1 <= timestamp2));

    // if (timestamp1 === timestamp2) {
    //   return 0;
    // } else if (timestamp1 <= timestamp2) {
    //   return -1;
    // } else {
    //   return 1;
    // }

    if (timestamp1 <= timestamp2) {
      return -1;
    } else {
      return 1;
    }
  }

  return (
    <div
      className="transactions-history-purshase  "
      id="transactions-history-purshase"
    >
      <div className="transactions-history-web   py-2">
        <div className="title-container d-flex align-items-center justify-content-center">
          <h5>TRANSACTION OVERVIEW</h5>
        </div>
        {data.length !== 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <strong>Duration</strong>
                  </th>
                  <th>
                    <strong>Token Amount</strong>
                  </th>
                  <th>
                    <strong>Start Date</strong>
                  </th>
                  <th>
                    <strong>Release Date</strong>
                  </th>
                  <th>
                    <strong>Annual Return</strong>
                  </th>
                  <th>
                    <strong>Status</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <>
                    <ColorRing
                      visible={true}
                      height="50"
                      width="50"
                      ariaLabel="blocks-loading"
                      wrapperClass="blocks-wrapper"
                      color="white"
                    />
                  </>
                ) : (
                  <>
                    {currentTableData.length > 0 &&
                      currentTableData.map((item, index) => {
                        return (
                          <tr className="continent-row" key={index}>
                            <td>
                              {item[5] === "500" ? "6 months" : "12 months"}
                            </td>
                            <td className="amount">
                              <span>
                                {Web3.utils.fromWei(`${item[2]}`, "ether")}
                              </span>
                            </td>
                            <td>
                              
                              {subtractMonthsFromDate(getDateFromSeconds(item[3]),
                                item[5] === "500" ? 6 : 12
                              )}
                            </td>
                            <td>{getDateFromSeconds(item[3])}</td>
                            <td>{item[5] / 100}%</td>
                            <td>
                              <button
                                className={`${
                                  compareDates(
                                    getDateFromSeconds(item[3]),
                                    currentDate
                                  ) === -1
                                    ? "button-unlocked"
                                    : "button-locked"
                                }`}
                                onClick={() => handleUnlock(item[0])}
                                // onClick={ compareDates(
                                //     getDateFromSeconds(item[3]),
                                //     currentDate
                                //   ) === -1
                                //     ? handleUnlock(item[0])
                                //     :  null}
                                disabled={
                                  compareDates(
                                    getDateFromSeconds(item[3]),
                                    currentDate
                                  ) === -1
                                    ? false
                                    : true
                                }
                              >
                                {compareDates(
                                  getDateFromSeconds(item[3]),
                                  currentDate
                                ) === -1
                                  ? "release"
                                  : "pooled"}                                  
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </tbody>
            </table>
            {!isLoading && (
              <div className="pagination justify-content-center">
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            )}
          </div>
        ) : (
          <h6 className="text-center no-transactions-found">
            No Transactions Found
          </h6>
        )}
      </div>
    </div>
  );
};

export default TransactionsHistory;
