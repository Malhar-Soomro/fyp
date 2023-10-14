import React, { useContext, useEffect } from 'react'
import * as styles from "../styles/all-transactions.module.css";
import { TransactionContext } from '../context/TransactionContext';


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
    console.log(addressFrom, addressTo, timestamp)
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <a href="#">
                    <p>From: {shortenAddress(addressFrom)}</p>
                </a>
                <a href="#">
                    <p>To: {shortenAddress(addressTo)}</p>
                </a>
                <p className="">Amount: {amount} ETH</p>

            </div>
            <div className={styles.timestamp}>
                <p>{timestamp}</p>
            </div>
        </div>

    )
}

const AllTransactions = () => {
    const { allTransactions, currentAccount, connectWallet, getAllTransactions } = useContext(TransactionContext);
    console.log(allTransactions)

    // useEffect(() => {
    //     getAllTransactions()
    // }, [])

    if (currentAccount) {
        return (
            <div className={styles.container}>
                <h2>
                    All Transactions
                </h2>
                <div className={styles.cards}>
                    {allTransactions.reverse().map((transaction, index) => {
                        return (
                            <TransactionCard key={index} {...transaction} />
                        )
                    })}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.connectWallet}>
                <h2>Connect with your metamask wallet</h2>
                <div className={styles.btnContainer}>
                    <button
                        className={styles.walletBtn}
                        onClick={connectWallet}
                    // type="submit"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        )
    }
}

export default AllTransactions