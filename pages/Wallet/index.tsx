import Moralis from "moralis";
import {
    ChakraProvider,
    Container,
    Box,
    Flex,
    Button,
    Text,
    Image,
    Center,
    SimpleGrid,
    Card, CardHeader, CardBody, CardFooter,
    Heading,
    Skeleton,
    Input,
    Textarea,
    HStack,
    Stack,
    Tooltip
  } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { formatUnits, parseEther, formatEther, getUint } from "ethers";
import type { transactionArr, TokenTransfer, TokenBalances } from "../api/types";
import { useAccount } from "wagmi";

const GetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [tokenTransfers, setTokenTransfers] = useState([]);
    const [listDAIPrice, setListDAIPrice] = useState([]);
    const { address, isConnecting, isDisconnected } = useAccount();
    
    const moralisStart = async() => {
        await Moralis.start({
          apiKey: "pIGE0zf6RiSeHeOmEgvyHdJOq2NaCVHPCxplZBqdcJ2HU4OP5ypcvCobrPtQST9W"
        });
    }
  
    const queryTransaction = async() =>{
        try {
            if(address){
                console.log("address:",address);
                const response = await Moralis.EvmApi.transaction.getWalletTransactionsVerbose({
                    "chain": "0x89",
                    "address": address.toString()
                });
                console.log(response.raw);
                const result = JSON.stringify(response.raw.result);
                setTransactions(JSON.parse(result));
                
                const res = await Moralis.EvmApi.token.getWalletTokenTransfers({
                    "chain": "0x89",
                    "address": address.toString()
                });
                console.log(res.raw);
                const tt_result = JSON.stringify(res.raw.result);
                setTokenTransfers(JSON.parse(tt_result));
            }else{
                console.log("Address is Undefined, plesae connect wallet first.")
            }
            

        } catch (e) {
            console.error(e);
        }
    }

    
    useEffect(() => {
        if(!Moralis.Core.isStarted){
            moralisStart();
        }
    }, []);

    return (
    <ChakraProvider>
    <Box w={'100%'} h={'100%'}>
        <></>
        <Button mt={'10px'} mb={'10px'} colorScheme='teal' size='md' onClick={queryTransaction}>Get Transactions!</Button>
        <Container maxW={'1300px'} w={'100%'}>
            <Flex
                px={'10px'}
                h={'120px'}
                borderRadius={'20px'}
                
                
            >
                <SimpleGrid columns={2} spacing={10}>
                {transactions.length === 0? '':(
                <Box>
                     <Text fontSize='md' fontWeight={'bold'} >Transaction List:</Text>
              <Card
                maxH={'80vh'}
                overflow={'scroll'}
              >
                <CardBody>
                      <Box>
                        {transactions && transactions?.map((transaction: transactionArr, index: number) => {
                            const gas_amount = formatUnits((BigInt(transaction.receipt_gas_used)*BigInt(transaction.gas_price)),18);

                          return(
                            <HStack key={index} spacing='8'>
                            <Card my={'4px'}>
                              <CardBody >
                                <Flex 
                                    // alignItems={'center'} 
                                    mb={'4px'}
                                    flexDirection={'column'}
                                    
                                >
                                  <Text fontSize='xs' > 
                                    Transaction No(Reverse Chronological) : {index}
                                  </Text>
                                  <Text fontSize='xs' >
                                    Label(Function Name) : {transaction.decoded_call?.label}
                                  </Text>
                                  <Text fontSize='xs' fontWeight={'bold'} mr={'4px'}>
                                    Transaction Hash : {transaction.hash}
                                  </Text>
                                  {/* <Tooltip
                                    label = {`錢包地址:${coffee[0]}`}
                                    bg={'gray.200'}
                                    color={'black'}
                                  >
                                    <InfoOutlineIcon />
                                  </Tooltip> */}
                                  
                                  <Text fontSize='xs' fontWeight={'bold'} ml={'4px'}>
                                  Transaction Time : {transaction.block_timestamp}
                                  </Text>
                                  
                                  <Text fontSize='xs'>
                                    From Address : {transaction.from_address}
                                  </Text>
                                  
                                  <Text fontSize='xs'>
                                    To Address : {transaction.to_address}
                                  </Text>
                                  <Text fontSize='xs'>
                                    {transaction.to_address_label}
                                  </Text>
                                  
                                  <Text fontSize='xs' fontWeight={'bold'} >
                                    Gas Amount(Matic) : {gas_amount}
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
            </Box>)}
            
            {tokenTransfers.length === 0 ? '':(
            <Box>
                <Text fontSize='md' fontWeight={'bold'} >Token Transfer List:</Text>
                <Card
                maxH={'80vh'}
                overflow={'scroll'}
                >
                    <CardBody>
                    <Box>
                        {tokenTransfers && tokenTransfers?.map((tt: TokenTransfer , index: number) => {
                            return(
                                <HStack key={index} spacing='8'>
                                <Card my={'4px'}>
                                    <Flex 
                                        // alignItems={'center'} 
                                        mb={'4px'}
                                        flexDirection={'column'}
                                    >
                                        <Text fontSize='xs' fontWeight={'bold'} >
                                            Transaction hash : {tt.transaction_hash}
                                        </Text>
                                        <Text fontSize='xs' >
                                            Token name : {tt.token_name}
                                        </Text>
                                        <Text fontSize='xs' >
                                            Token symbol : {tt.token_symbol}
                                        </Text>
                                        <Text fontSize='xs' >
                                            From address : {tt.from_address}
                                        </Text>
                                        <Text fontSize='xs' >
                                            To address : {tt.to_address}
                                        </Text>
                                        <Text fontSize='xs' fontWeight={'bold'} >
                                            Value decimal : {tt.value_decimal}
                                        </Text>
                                    </Flex>
                                </Card>
                                </HStack>
                              )
                        })}
                      </Box>
                    </CardBody>
                </Card>
            </Box>)}
          </SimpleGrid>
            </Flex>
        </Container>
    </Box>
    </ChakraProvider>
    );
};

export default GetTransactions;