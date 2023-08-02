import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
};


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0])
        }
        catch (error) {
            console.log(error);

            throw new Error("No ethereum object.")
        }
    }

    const checkIfWalletIsConnected = async () => {

        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0])
                getAllTransactions();
            }
            else {
                console.log("no accounts found");
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }


    const sendAmount = async (walletAddress, amount) => {
        try {
            if (!ethereum) return alert("Please install metamask");

            // get the data from the form
            const transactionContract = getEthereumContract();
            // dec to hex(Gwei)
            const parsedAmount = ethers.utils.parseEther(amount);


            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: walletAddress,
                    // hex 0x5208
                    // dec 21000 Gwei
                    // 0.000021 Ether
                    gas: "0x5208",
                    value: parsedAmount._hex, // 0.000001
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(walletAddress, parsedAmount, "msg", "keyword");

            // setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            // setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`)

            const transactionCount = await transactionContract.getTransactionCount();


            // setTransactionCount(transactionCount.toNumber());

            // window.reload();

        } catch (error) {
            console.log(error);
        }
    }

    const getAllTransactions = async () => {
        if (!ethereum) return alert("Please install metamask");

        const transactionContract = getEthereumContract();

        const availableTransactions = await transactionContract.getAllTransactions();
        const structuredTransactions = availableTransactions.map((transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / (10 ** 18),
        }));

        // setTransactions(structuredTransactions);
        console.log(structuredTransactions)

        return structuredTransactions;
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, sendAmount }}>
            {children}
        </TransactionContext.Provider>
    )
}

