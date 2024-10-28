import styled from 'styled-components';


export const CardContainer = styled.div`
    width: 32%;
    height: 300px;
    background: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.09);
    padding: 2.25rem; 
    display: flex;
    flex-direction: column;
    gap: 0.75rem; 
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 80px -26px #7c3aed;

    @media (max-width: 768px) {
        width: 49%;
    }

    @media (max-width: 480px) {
        width: 100%;
    }
`;


export const Circle = styled.div`
    width: 120px; 
    height: 120px; 
    background: #7c3aed; 
    border-radius: 50%;
    position: absolute;
    right: -0.5rem; 
    top: -1.75rem; 
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const CircleText = styled.p`
    color: white;
    font-size: 1rem; 
`;


export const Title = styled.h1`
    font-weight: bold;
    font-size: 1.25rem; 
`;

export const Description = styled.p`
    font-size: 0.875rem; 
    color: #6b7280; 
    line-height: 1.5; 
`;
