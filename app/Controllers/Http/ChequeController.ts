import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomErrorException from 'App/Exceptions/CustomErrorException'
import Cheque from 'App/Models/Cheque'
import CreateChequeValidator from 'App/Validators/CreateChequeValidator'

export default class ChequeController {

    /**
     * Método para cadastrar cheque.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ChequeController
     */
    public async cadastrar({ request, response, auth }: HttpContextContract): Promise<any> {
        try {

            // Valida os campos informados.
            const {
                bancoId, numero, agencia, digitoAgencia,
                conta, digitoConta, nome, data, status, valor
            } = await request.validate(CreateChequeValidator)

            // Insere o registro no banco de dados.
            const cheque = await Cheque.create({
                bancoId, numero, agencia, digitoAgencia,
                conta, digitoConta, nome, data, status, valor,
                createdBy: auth.user?.nome
            })

            return response.status(201).send({
                status: true,
                message: 'Registro cadastrado com sucesso!',
                data: cheque
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para atualizar cheque.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ChequeController
     */
    public async atualizar({ request, response, params, auth }: HttpContextContract): Promise<any> {
        try {

            // Busca o cheque pelo id informado.
            let cheque = await Cheque.findOrFail(params.id)

            // Valida os campos informados.
            const {
                bancoId, numero, agencia, digitoAgencia,
                conta, digitoConta, nome, data, status, valor
            } = await request.validate(CreateChequeValidator)

            // Atualiza o objeto com os dados novos.
            cheque = {
                ...cheque,
                bancoId, numero, agencia, digitoAgencia,
                conta, digitoConta, nome, data, status, valor,
                updatedBy: auth.user?.nome ?? null
            }

            // Persiste no banco o objeto atualizado.
            await cheque.save()

            return response.status(200).send({
                status: true,
                message: 'Registro atualizado com sucesso',
                data: cheque
            })
        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para ativar/inativar cheque.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ChequeController
     */
    public async ativar({ response, params, auth }: HttpContextContract): Promise<any> {
        try {
            // Busca o cheque pelo id informado.
            const cheque = await Cheque.findOrFail(params.id)

            // Atualiza o objeto com os dados novos.
            cheque.ativo = !cheque.ativo
            cheque.updatedBy = auth.user?.nome ?? null

            // Persiste no banco o objeto atualizado.
            await cheque.save()

            return response.status(200).send({
                status: true,
                message: `Registro ${cheque.ativo ? 'ativado' : 'inativado'} com sucesso`,
                data: cheque
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar todos os cheques.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ChequeController
     */
    public async buscarTodos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os cheques existentes.
            const cheques = await Cheque.query()

            // Verifica se não foi retornado nenhum registro.
            if (cheques.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: cheques
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar os cheques ativos.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ChequeController
     */
    public async buscarAtivos({ response }: HttpContextContract): Promise<any> {
        try {
            // Busca todos os cheques ativos.
            const cheques = await Cheque.query().where('ativo', true)

            // Verifica se não foi retornado nenhum registro.
            if (cheques.length <= 0) {
                throw new CustomErrorException("Nenhum registro encontrado", 404);
            }

            return response.status(200).send({
                status: true,
                message: `Registros retornados com sucesso`,
                data: cheques
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }

    /**
     * Método para buscar o cheque por id.
     *
     * @param {HttpContextContract} ctx - O contexto da solicitação HTTP.
     * @return {*} 
     * @memberof ChequeController
     */
    public async buscarPorId({ response, params }: HttpContextContract): Promise<any> {
        try {
            // Busca o cheque pelo id informado.
            const cheque = await Cheque.findOrFail(params.id)

            return response.status(200).send({
                status: true,
                message: `Registro retornado com sucesso`,
                data: cheque
            })

        } catch (error) {
            return response.status(500).send({
                status: false,
                message: error
            })
        }
    }
}
