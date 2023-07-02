import Moralis from "moralis";
import {
    ChakraProvider,
    Text,
    Flex,
    SimpleGrid,
    Box,
    Card,
    CardBody,
    HStack,
  } from '@chakra-ui/react'
  import { useEffect, useState } from "react";
  import type { TokenBalances } from "../api/types";
  import { formatUnits, parseEther, formatEther, getUint } from "ethers";
  import { useAccount } from "wagmi";

export default function GetTokenTransfer(){
    const [tokenBalances, setTokenBalances] = useState([]);
    const { address, isConnecting, isDisconnected } = useAccount();
    const [addressUndefined, setAddressUndefined] = useState('');
    
    
    const moralisStart = async() => {
        await Moralis.start({
          apiKey: "pIGE0zf6RiSeHeOmEgvyHdJOq2NaCVHPCxplZBqdcJ2HU4OP5ypcvCobrPtQST9W"
        });
    }

    const queryTokenBalance = async() =>{
        try {
            if(address){
                console.log("address:",address);
                const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
                    "chain": "0x89",
                    "address": address.toString(),
                });
                // console.log(tokenBalance.toJSON());
                console.log(tokenBalances.raw);
                setTokenBalances(JSON.parse(JSON.stringify(tokenBalances)));
            }else{
                setAddressUndefined("Address is Undefined, plesae connect wallet first.");
            }
        
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if(!Moralis.Core.isStarted){
            moralisStart();
        }
        queryTokenBalance();
    }, []);

    return(
        <ChakraProvider>
        <Flex       
        >
            <Box>
                <Text fontSize='xl' fontWeight={'bold'}> Token Balance</Text>
            <Card
                h={'350px'}
                overflow={'scroll'}
            >
                <CardBody>
                        <Box>
                        {tokenBalances && tokenBalances?.map((token: TokenBalances, index: number) => {
                            const balance_amount = formatUnits((BigInt(token.balance)),18);

                          return(
                            <HStack key={index} spacing='8'>
                            <Card my={'4px'}>
                              <CardBody >
                                <Text>{addressUndefined}</Text>
                                <Flex 
                                    // alignItems={'center'} 
                                    mb={'4px'}
                                    flexDirection={'column'}
                                    
                                >
                                    <Text fontSize='xs' fontWeight={'bold'} mr={'4px'}>
                                        Token name : {token.name} 
                                    </Text>
                                    <Text fontSize='md' fontWeight={'bold'} mr={'4px'}>
                                        Token symbol : {token.symbol}
                                    </Text>
                                    <Text fontSize='md' fontWeight={'bold'} mr={'4px'}>
                                        Token balance : {balance_amount}
                                    </Text>
                                    <Text fontSize='xs' fontWeight={'bold'} mr={'4px'}>
                                        Token address : {token.token_address}
                                    </Text>
                                    <Text fontSize='xs' fontWeight={'bold'} mr={'4px'}>
                                        Token logo : {token.logo} 
                                    </Text>
                                </Flex>
                            </CardBody>
                            </Card>
                            </HStack>
                          )
                        })}
                        </Box>
                </CardBody>
            </Card>
            </Box>
        </Flex>
        </ChakraProvider>
    )
}