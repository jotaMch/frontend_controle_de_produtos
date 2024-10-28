import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const Header: React.FC = () => {
    return (
        <Box bg="#7c3aed" p="4" color="white">
            <Flex justify="space-between" align="center"
            w={{base: '90%', md: '90%', lg: '100%'}}
            maxW='900px' mx='auto'>
                <Text fontSize="2xl" fontWeight="bold">Controle de Produtos</Text>
                <nav>
                    {/* <Text as="span" mx="4">Home</Text>
                    <Text as="span" mx="4">Sobre</Text> */}
                </nav>
            </Flex>
        </Box>
    );
};

export default Header;
