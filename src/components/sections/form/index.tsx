import React, { useState } from 'react';
import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';

const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        //e.preventDefault();
        setFormData({ name: '', price: '', quantity: '' }); // Limpa o formulário

        try {
            const response = await fetch('http://localhost:3000/doc', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Dados enviados com sucesso!");
            } else {
                alert("Falha ao enviar dados");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box bg="#7c3aed">
            <Flex 
            justifyContent='space-between' alignItems={{base: 'center', md: 'end', lg: 'end'}}
            flexDirection={{base: 'column', md: 'row', lg: 'row'}}
            w={{base: '90%', md: '90%', lg: '100%'}}
            maxW='900px' minH='400px' mx='auto'>
                <Box mb='20px' color='gray.200' w='60%'
                display='flex' justifyContent='center' 
                alignItems='center' >
                    <Image w='80%'
                    src='https://cdn.pixabay.com/photo/2022/10/01/11/41/delivery-7491357_1280.png' alt='bike' />
                </Box>
                <Box color='gray.200'>
                    <Text fontSize='lg' fontWeight='bold' mb='10px'>
                        Adicione seu produto
                    </Text>
                    <Box
                        as="form" onSubmit={handleSubmit} p="4" 
                        shadow="md" rounded="md"
                        display='flex' flexDirection='column' 
                        gap={4} mb='20px'
                        >
                        <div>
                            <label>Nome do produto:</label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Nome do Produto"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Preço:</label>
                            <Input
                                type="text"
                                name="price"
                                placeholder="Preço"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>Quantidade em Estoque:</label>
                            <Input
                                type="text"
                                name="quantity"
                                placeholder="Quantidade"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" colorScheme="blue">Adicionar Produto</Button>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default ProductForm;





