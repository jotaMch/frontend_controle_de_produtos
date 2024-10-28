import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Input, SimpleGrid, Flex, Text } from '@chakra-ui/react';
import { CardContainer } from '../../../../assets/style';
import { FaBoxOpen } from 'react-icons/fa';

const ProductManager: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newValue, setNewValue] = useState<Partial<{ name: string; price: string; quantity: string }>>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await Axios.get('http://localhost:3000/items');
                setProducts(response.data);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewValue({ ...newValue, [name]: value });
    };

    const confirmUpdate = async (id: string) => {
        try {
            const updatedValues = {
                ...newValue,
                price: newValue.price ? parseFloat(newValue.price) : undefined // Converte para número ao salvar
            };
            await Axios.put(`http://localhost:3000/items/${id}`, updatedValues);
            setProducts(products.map(product => (product._id === id ? { ...product, ...updatedValues } : product)));
            setNewValue({});
            setEditingId(null);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    const deleteItem = async (id: string) => {
        try {
            await Axios.delete(`http://localhost:3000/items/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    const formatPriceToBRL = (price: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    return (
        <Flex w='100%' flexDirection='column'>
            <Text
                w={{ base: '90%', md: '90%', lg: '100%' }} 
                color='gray.700'
                maxW='900px' 
                mx='auto' 
                fontSize='xl' 
                fontWeight='bold'
                mt='40px'
            >
                Lista de produtos
            </Text>
            <SimpleGrid  
                w={{ base: '90%', md: '90%', lg: '100%'}} 
                maxW='900px' display='flex' flexWrap='wrap'
                mx='auto' 
                my='20px'
                gap='2%'
                rowGap='12px'
            >
                {products.length === 0 ? (
                    <Flex alignItems='center' justify='center' gap='4px'>
                        <Text>
                            Não existe produtos no banco de dados
                        </Text>
                        <FaBoxOpen />
                    </Flex>) : null}
                {products.map(product => (
                    <CardContainer key={product._id}> 

                        <div>
                            <label><strong>Nome:</strong> {editingId === product._id ? (
                                <Input
                                    onChange={handleValueChange}
                                    type="text"
                                    name="name"
                                    defaultValue={product.name}
                                    placeholder="Novo nome"
                                />
                            ) : product.name}</label>
                        </div>

                        <div>
                            <label><strong>Quantidade:</strong> {editingId === product._id ? (
                                <Input
                                    onChange={handleValueChange}
                                    type="text"
                                    name="quantity"
                                    defaultValue={product.quantity}
                                    placeholder="Nova quantidade"
                                />
                            ) : product.quantity}</label>
                        </div>

                        <div>
                            <label><strong>Preço:</strong> {editingId === product._id ? (
                                <Input
                                    onChange={handleValueChange}
                                    type="text"
                                    name="price"
                                    defaultValue={product.price.toString()}
                                    placeholder="Novo preço"
                                />
                            ) : formatPriceToBRL(parseFloat(product.price))}</label>
                        </div>
                
                        <Flex flexDirection='column' gap='6px' mt='auto'>
                            {editingId === product._id ? (
                                <>
                                    <Button colorScheme="green" onClick={() => confirmUpdate(product._id)}>Confirmar</Button>
                                    <Button colorScheme="red" onClick={() => setEditingId(null)}>Cancelar</Button>
                                </>
                            ) : (
                                <>
                                    <Button colorScheme="blue" onClick={() => { setEditingId(product._id); setNewValue({}); }}>
                                        Editar
                                    </Button>
                                    <Button colorScheme="red" onClick={() => deleteItem(product._id)}>Excluir</Button>
                                </>
                            )}
                        </Flex>
                    </CardContainer>
                ))}
            </SimpleGrid>
        </Flex>
    );
};

export default ProductManager;
