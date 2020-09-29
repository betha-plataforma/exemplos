<template>
<div>
    <h4>Tabela</h4>

    <div class="row">
        <div class="col">
            <b-button-group>
                <b-dropdown right split text="Registro" variant="success" v-b-modal.modal-cadastro>
                    <b-dropdown-item>Item 1</b-dropdown-item>
                    <b-dropdown-item>Item 2</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Item 3</b-dropdown-item>
                </b-dropdown>
            </b-button-group>
        </div>
    </div>
    <div class="row mb-0">
        <div class="col">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th width="30">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="checkTableAll" />
                                <label class="form-check-label" for="checkTableAll"></label>
                            </div>
                        </th>
                        <th>
                            <a href="">Coluna 1</a>
                        </th>
                        <th>
                            <a href="">Coluna 2</a>
                        </th>
                        <th>
                            <a href="">Coluna 3</a>
                        </th>
                        <th>
                            <a href="">Coluna 4</a>
                        </th>
                        <th width="30"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="checkTable1" />
                                <label class="form-check-label" for="checkTable1"></label>
                            </div>
                        </td>
                        <td>
                            <div class="cell-wrapper">
                                <div class="img-wrapper">
                                    <img alt="" src="https://picsum.photos/id/237/200" />
                                </div>
                            </div>
                            <div class="cell-wrapper">
                                <a href="">Informação principal</a>
                                <br />
                                <small class="text-muted">Informação complementar</small>
                            </div>
                        </td>
                        <td>Lorem ipsum</td>
                        <td>
                            <div class="cell-wrapper">
                                <a href="">Informação principal</a>
                                <br />
                                <small class="text-muted">Informação complementar</small>
                            </div>
                        </td>
                        <td>Dolor sit amet</td>
                        <td>
                            <a href="">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="checkTable2" />
                                <label class="form-check-label" for="checkTable2"></label>
                            </div>
                        </td>
                        <td>
                            <div class="cell-wrapper">
                                <div class="img-wrapper">
                                    <img alt="" src="https://picsum.photos/id/1074/200" />
                                </div>
                            </div>
                            <div class="cell-wrapper">
                                <a href="">Informação principal</a>
                                <br />
                                <small class="text-muted">Informação complementar</small>
                            </div>
                        </td>
                        <td>Lorem ipsum</td>
                        <td>
                            <div class="cell-wrapper">
                                <a href="">Informação principal</a>
                                <br />
                                <small class="text-muted">Informação complementar</small>
                            </div>
                        </td>
                        <td>Dolor sit amet</td>
                        <td>
                            <a href="">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="checkTable3" />
                                <label class="form-check-label" for="checkTable3"></label>
                            </div>
                        </td>
                        <td>
                            <div class="cell-wrapper">
                                <div class="img-wrapper">
                                    <img alt="" src="https://picsum.photos/id/1062/200" />
                                </div>
                            </div>
                            <div class="cell-wrapper">
                                <a href="">Informação principal</a>
                                <br />
                                <small class="text-muted">Informação complementar</small>
                            </div>
                        </td>
                        <td>Lorem ipsum</td>
                        <td>
                            <div class="cell-wrapper">
                                <a href="">Informação principal</a>
                                <br />
                                <small class="text-muted">Informação complementar</small>
                            </div>
                        </td>
                        <td>Dolor sit amet</td>
                        <td>
                            <a href="">
                                <i class="mdi mdi-dots-vertical"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <nav class="float-right">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#"><i class="mdi mdi-chevron-left mr-1"></i>Anterior</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Próxima<i class="mdi mdi-chevron-right ml-1"></i></a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>

    <b-modal id="modal-cadastro" title="Adicionando registro" hide-footer size="lg" v-model="showModal">
        <b-tabs content-class="mt-3">
            <b-tab title="Dados pessoais" active>
                <b-alert show dismissible>Exemplo de alerta com <a href="#" class="alert-link">link</a>.</b-alert>
                <form>
                    <div class="row">
                        <div class="col">
                            <label for="nomeInput" class="required">Nome</label>
                            <input type="text" class="form-control" id="nomeInput" placeholder="Informe o nome">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <label for="cpfInput" class="required">CPF</label>
                            <input type="text" class="form-control" id="cpfInput">
                        </div>
                        <div class="col-8">
                            <label for="enderecoInput">Endereço</label>
                            <input type="text" class="form-control" id="enderecoInput">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <label for="valorInput" class="required">Valor</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">R$</span>
                                </div>
                                <input type="text" class="form-control" id="valorInput">
                            </div>
                        </div>
                        <div class="col-3">
                            <label for="tamanhoInput" class="required">Tamanho</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="tamanhoInput">
                                <div class="input-group-append">
                                    <span class="input-group-text">m²</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <label for="anexoInput">Arquivo</label>
                            <div class="input-group">
                                <input id="anexoInput" type="text" class="form-control" placeholder="Escolha um arquivo de seu dispositivo" aria-label="Escolha um arquivo de seu dispositivo" aria-describedby="btnAnexo">
                                <div class="input-group-append">
                                    <button class="btn btn-secondary btn-sm" type="button" id="btnAnexo"><i class="mdi mdi-paperclip"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label>Escolha uma ou mais opções</label>
                            <div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
                                    <label class="form-check-label" for="inlineCheckbox1">1</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
                                    <label class="form-check-label" for="inlineCheckbox2">2</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
                                    <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <label>Escolha uma das opções</label>
                            <div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                                    <label class="form-check-label" for="inlineRadio1">1</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                                    <label class="form-check-label" for="inlineRadio2">2</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
                                    <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="descricaoInput">Descrição</label>
                            <textarea class="form-control" name="descricaoInput" id="descricaoInput" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="row mb-0">
                        <div class="col">
                            <div class="custom-control custom-switch float-right">
                                <input type="checkbox" class="custom-control-input" id="customSwitch1">
                                <label class="custom-control-label" for="customSwitch1">Receber atualizações</label>
                            </div>
                        </div>
                    </div>
                </form>
            </b-tab>
            <b-tab title="Dados funcionais">

            </b-tab>
            <b-tab title="Aba desabilitada" disabled>

            </b-tab>
        </b-tabs>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="showModal=false">Salvar</button>
            <button type="button" class="btn btn-secondary" @click="showModal=false">Salvar e adicionar novo</button>
            <button type="button" class="btn btn-secondary" @click="showModal=false">Cancelar</button>
        </div>
    </b-modal>
</div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false
        }
    }
}
</script>
