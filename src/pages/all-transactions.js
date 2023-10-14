import React from 'react'
import * as styles from "../styles/all-transactions.module.css";


const transactions = [
    {
        id: 1,
        url: "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284",
        message: "",
        timestamp: "12/21/2021, 4:33:21 PM",
        addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
        amount: "0.01",
        addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
    },
    {
        id: 2,
        url: "https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif",
        message: "",
        timestamp: "12/21/2021, 4:33:21 PM",
        addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
        amount: "0.01",
        addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
    },
    {
        id: 3,
        url: "https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif",
        message: "",
        timestamp: "12/21/2021, 4:33:21 PM",
        addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
        amount: "0.01",
        addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
    },
    {
        id: 4,
        url: "https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif",
        message: "",
        timestamp: "12/21/2021, 4:33:21 PM",
        addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
        amount: "0.01",
        addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
    },
    {
        id: 5,
        url: "https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif",
        message: "",
        timestamp: "12/21/2021, 4:33:21 PM",
        addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
        amount: "0.01",
        addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
    },
    {
        id: 6,
        url: "https://www.omnisend.com/blog/wp-content/uploads/2016/09/funny-gifs-9.gif",
        message: "",
        timestamp: "12/21/2021, 4:33:21 PM",
        addressFrom: "0xCF8e569A97C423952DdFf902375C7C76549A6A90",
        amount: "0.01",
        addressTo: "0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE",
    },
];

const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`



const TransactionCard = ({ addressTo, addressFrom, timestamp, amount }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <a href="#">
                    <p>From: 0x348...Abd6</p>
                </a>
                <a href="#">
                    <p>To: 0x5c3...15df</p>
                </a>
                <p className="">Amount: 0.00005 ETH</p>

            </div>
            <div className={styles.timestamp}>
                <p>1/3/2023</p>
            </div>
        </div>

    )
}

const AllTransactions = () => {
    return (
        <div className={styles.container}>
            <h2>
                All Transactions
            </h2>
            <div className={styles.cards}>
                {transactions.reverse().map((transaction, index) => {
                    return (
                        <TransactionCard key={index} {...transaction} />
                    )
                })}
                {/* <TransactionCard /> */}
            </div>
        </div>
    )
}

export default AllTransactions