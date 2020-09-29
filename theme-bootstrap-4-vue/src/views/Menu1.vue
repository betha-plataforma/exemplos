<template>
<div>
    <h4>Tabela</h4>

    <div class="row">
        <div class="col">
            <!-- <button class="btn btn-add btn-success" (click)="open(content)">Registro</button> -->
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
</div>
</template>
