import * as yup from "yup";

export const createPersonSchema = yup.object().shape({
    fullName: yup.string().required("Nome completo é obrigatório"),
    user: yup.object().shape({
        email: yup
            .string()
            .email("E-mail inválido")
            .min(6, "E-mail deve ter no mínimo 6 caracteres")
            .max(50, "E-mail pode ter no máximo 50 caracteres")
            .required("E-mail é obrigatório"),
        phone: yup
            .string()
            .min(8, "Telefone deve ter no mínimo 8 caracteres")
            .max(15, "Telefone pode ter no máximo 15 caracteres")
            .matches(/^\+?[0-9\s\-]+$/, "Telefone deve conter apenas números, espaços, ou traços")
            .required("Telefone é obrigatório"),
        taxId: yup
            .string()
            .min(11, "CPF deve ter no mínimo 11 caracteres")
            .max(11, "CPF pode ter no máximo 11 caracteres")
            .required("CPF é obrigatório"),
        password: yup
            .string()
            .min(6, "A senha deve ter no mínimo 6 caracteres")
            .max(255, "A senha pode ter no máximo 25 caracteres")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número")
            .required("Senha é obrigatória"),
        address: yup.object().shape({
            address: yup
                .string()
                .min(25, "O endereço deve ter no mínimo 25 caracteres.")
                .max(255, "O endereço pode ter no máximo 255 caracteres.")
                .required("O endereço é obrigatório."),
            neighborhood: yup
                .string()
                .min(5, "O bairro deve ter no mínimo 5 caracteres.")
                .max(100, "O bairro pode ter no máximo 100 caracteres.")
                .required("O bairro é obrigatório."),
            city: yup
                .string()
                .min(5, "A cidade deve ter no mínimo 5 caracteres.")
                .max(100, "A cidade pode ter no máximo 100 caracteres.")
                .required("A cidade é obrigatória."),
            state: yup
                .string()
                .required("O estado é obrigatório.")
                .max(2, "O estado deve ser representado por 2 caracteres.")
                .matches(/^[A-Z]{2}$/, "O estado deve ser representado por 2 letras maiúsculas."),
            zipcode: yup
                .string()
                .matches(/^\d{5}-\d{3}$/, "O CEP deve estar no formato 12345-678.")
                .required("O CEP é obrigatório.")
        }),
    }),
});

export const fullPersonSchema = yup.object().shape({
    fullName: yup
        .string()
        .min(5, "Nome completo deve ter no mínimo 5 caracteres")
        .max(255, "Nome completo pode ter no máximo 255 caracteres")
        .required("Nome completo é obrigatório"),
    birthDate: yup
        .date()
        .max(new Date(), "Data de nascimento não pode ser maior que a data atual")
        .required("Data de nascimento é obrigatória"),
    genderType: yup.string().required("Gênero é obrigatório"),
    bloodType: yup.string().required("Tipo sanguíneo é obrigatório"),
    user: yup.object().shape({
        email: yup
            .string()
            .email("E-mail inválido")
            .min(10, "E-mail deve ter no mínimo 6 caracteres")
            .max(255, "E-mail pode ter no máximo 50 caracteres")
            .required("E-mail é obrigatório"),
        phone: yup
            .string()
            .min(8, "Telefone deve ter no mínimo 15 caracteres")
            .max(15, "Telefone pode ter no máximo 15 caracteres")
            .required("Telefone é obrigatório"),
        taxId: yup
            .string()
            .min(11, "CPF deve ter no mínimo 11 caracteres")
            .max(11, "CPF pode ter no máximo 11 caracteres")
            .required("CPF é obrigatório"),
        password: yup
            .string()
            .min(6, "A senha deve ter no mínimo 6 caracteres")
            .max(255, "A senha pode ter no máximo 25 caracteres")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número")
            .required("Senha é obrigatória"),
    }),
    allergies: yup.array().of(
        yup.object().shape({
            description: yup
                .string()
                .min(25, "Descrição da alergia deve ter no mínimo 25 caracteres")
                .max(255, "Descrição da alergia pode ter no máximo 255 caracteres")
                .required("Descrição da alergia é obrigatória"),
            severity: yup.string().required("Gravidade é obrigatória"),
        })
    ).optional().nullable(),
    medicalHistories: yup.array().of(
        yup.object().shape({
            condition: yup
                .string()
                .min(25, "Condição médica deve ter no mínimo 25 caracteres")
                .max(255, "Condição médica pode ter no máximo 255 caracteres")
                .required("Condição médica é obrigatória"),
            details: yup
                .string()
                .min(25, "Detalhes da condição médica deve ter no mínimo 25 caracteres")
                .max(255, "Detalhes da condição médica pode ter no máximo 255 caracteres")
                .required("Detalhes são obrigatórios"),
        })
    ).optional().nullable(),
    profilePicture: yup.mixed().required("Imagem de perfil é obrigatória"),
});