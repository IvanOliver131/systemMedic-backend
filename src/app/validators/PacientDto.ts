import * as yup from 'yup';

class PacientDto {
    createValidation() {
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            age: yup.number().required('Idade é obrigatório'),
            bairro: yup.string().required('Bairro é obrigatório'),
            cpf: yup.string().required('CPF é obrigatório'),
            cartaoSUS_RG: yup.string().required('Cartão do SUS é obrigatório')
        });

        return schema;
    }
}

export { PacientDto }