import * as yup from 'yup';

class MedicineDto {
    createValidation() {
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            // estoque: yup.number().required('Estoque é obrigatório'),
            type: yup.boolean().required('Tipo é obrigatório'),
            fornecedor: yup.string().required('Fornecedor é obrigatório'),
            valor: yup.number().required('Valor é obrigatório')
        });

        return schema;
    }
}

export { MedicineDto }