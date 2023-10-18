import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Financeiro from 'App/Models/Financeiro'
import CreateFinanceiroValidator from 'App/Validators/CreateFinanceiroValidator'

export default class FinanceiroController {

    /**
     * Método para cadastrar financeiro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FinanceiroController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                usuarioId, chequeId, contaPagarId, unidadeId,
                contaId, formaPagamentoId, fornecedorId, planoContaId,
                tipoCaixaId, numeroDocumento, descricao, tipo,
                valor, dataPagamento, origem
            } = await request.validate(CreateFinanceiroValidator)

            // Insere o registro no banco de dados.
            const financeiro = await Financeiro.create({
                usuarioId, chequeId, contaPagarId, unidadeId,
                contaId, formaPagamentoId, fornecedorId, planoContaId,
                tipoCaixaId, numeroDocumento, descricao, tipo,
                valor, dataPagamento, origem,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: financeiro
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar financeiro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FinanceiroController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o financeiro pelo id informado.
            let financeiro = await Financeiro.findOrFail(params.id)

            // Valida os campos informados.
            const {
                usuarioId, chequeId, contaPagarId, unidadeId,
                contaId, formaPagamentoId, fornecedorId, planoContaId,
                tipoCaixaId, numeroDocumento, descricao, tipo,
                valor, dataPagamento, origem
            } = await request.validate(CreateFinanceiroValidator)

            // Atualiza o objeto com os dados novos.
            financeiro = {
                ...financeiro,
                usuarioId, chequeId, contaPagarId, unidadeId,
                contaId, formaPagamentoId, fornecedorId, planoContaId,
                tipoCaixaId, numeroDocumento, descricao, tipo,
                valor, dataPagamento, origem,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await financeiro.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: financeiro
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar financeiro.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FinanceiroController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o financeiro pelo id informado.
            const financeiro = await Financeiro.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            financeiro.ativo = !financeiro.ativo
            financeiro.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await financeiro.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${financeiro.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: financeiro
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os financeiros.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FinanceiroController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os financeiros existentes.
            const financeiros = await Financeiro.query()

            // Verifica se não foi retornado nenhum registro.
            if (financeiros.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: financeiros
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os financeiros ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FinanceiroController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os financeiros ativos.
            const financeiros = await Financeiro.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (financeiros.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: financeiros
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o financeiro por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof FinanceiroController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o financeiro pelo id informado.
            const financeiro = await Financeiro.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: financeiro
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
