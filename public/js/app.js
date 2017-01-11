//obj con las funcionalidades
var crud = {};

/**
 * Urls
 */
var baseUrl = "/crud";
var addUserUrl = baseUrl + "/usuario/add";
var listUsersUrl = baseUrl + "/usuario/list";
var userDetails = baseUrl + "/usuario/details";
var delUser = baseUrl + "/usuario/delete";
var updateUserUrl = baseUrl + "/usuario/update";

$(function () {
    console.log("Arnold Jair Jimenez Vargas <arnoldjair at hotmail dot com>");
});

$.fn.serializeObject = function ()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(document).ready(function () {

    $("#fechaNacimiento").datepicker();

    crud.showAddUser = function () {
        $("#formAddUser")[0].reset();
        $("#modalCrud").modal("show");
    };



    crud.listUsers = function () {

        $.get(listUsersUrl, {}, function (data) {
            $("#tableUsers tbody").empty();
            var table = $("#tableUsers");

            $.each(JSON.parse(data), function (rowIndex, r) {
                var row = $("<tr/>");

                row.append($("<td/>").text(r["identificacion"]));
                row.append($("<td/>").text(r["nombre"]));
                var td = $("<td/>");
                var btn = '<button type="button" data-user-id=' + r["id"] + ' class="btn btn-default btn-sm">Detalles</button>';
                td.append(btn);
                btn = '<button type="button" data-user-update-id=' + r["id"] + ' class="btn btn-success btn-sm">Editar</button>';
                td.append(btn);
                btn = '<button type="button" data-user-del-id=' + r["id"] + ' class="btn btn-danger btn-sm">Eliminar</button>';
                td.append(btn);
                row.append(td)
                table.append(row);

            });

            //Detalles

            var tmp = $("[data-user-id]");

            tmp.click(function (event) {
                event.preventDefault();
                var id = $(this).data("user-id");

                //Recuperar el usuario actual
                var jqxhr = $.post(userDetails + "&id=" + id, {}, function (data) {
                    var currUser = JSON.parse(data);
                    var currInput = $("input[name='identificacion']");
                    currInput.val(currUser.identificacion);
                    currInput = $("input[name='nombre']");
                    currInput.val(currUser.nombre);
                    currInput = $("input[name='fechaNacimiento']");
                    currInput.val(currUser.fecha_nacimiento);
                    currInput = $("input[name='genero']");
                    currInput.val(currUser.genero);
                    currInput = $("input[name='estadoCivil']");
                    currInput.val(currUser.estado_civil);
                    currInput = $("input[name='direccion']");
                    currInput.val(currUser.direccion);
                    currInput = $("input[name='telefono']");
                    currInput.val(currUser.telefono);
                    $("#modalDetails").modal("show");
                });
            });

            //Eliminar

            tmp = $("[data-user-del-id]");

            tmp.click(function (event) {
                event.preventDefault();

                var id = $(this).data("user-del-id");
                $("#btn-delete-user").click(function (event) {
                    var jqxhr = $.ajax({
                        url: delUser + '&id=' + id,
                        type: 'DELETE',
                        success: function (data) {
                            $("#modalDelete .modal-body").html("").append("<h1 class='text-success'>" + data.mensaje + "</h1>");
                            $("#btn-delete-user").hide();
                            $("#btn-cancel-delete").html("Aceptar").click(function (event) {
                                crud.listUsers();
                                $("#modalDelete").modal("hide");
                            });
                        }
                    });
                });
                $("#modalDelete .modal-body").append("<h1 class='text-danger'>¿Desea elminar el usuario?</h1>");
                $("#modalDelete").modal("show");
            });

            //Editar

            tmp = $("[data-user-update-id]");

            tmp.click(function (event) {
                event.preventDefault();
                var id = $(this).data("user-update-id");

                sessionStorage.setItem("currUserID", id);
                //Recuperar el usuario actual
                var jqxhr = $.post(userDetails + "&id=" + id, {}, function (data) {
                    var currUser = JSON.parse(data);
                    var currInput = $("input[name='identificacion']");
                    currInput.val(currUser.identificacion);
                    currInput = $("input[name='nombre']");
                    currInput.val(currUser.nombre);
                    currInput = $("input[name='fechaNacimiento']");
                    currInput.val(currUser.fecha_nacimiento);
                    currInput = $("input[name='genero']");
                    currInput.val(currUser.genero);
                    currInput = $("input[name='estadoCivil']");
                    currInput.val(currUser.estado_civil);
                    currInput = $("input[name='direccion']");
                    currInput.val(currUser.direccion);
                    currInput = $("input[name='telefono']");
                    currInput.val(currUser.telefono);
                    $("#modalUpdate").modal("show");
                });
            });

        });
    };

    crud.validate = function (form) {
        var inputs = $(form).find(":input[required]:visible");
        var ret = true;
        $.each(inputs, function (index, obj) {
            console.log();
            if (!$(obj)[0].validity.valid) {
                $(obj)
                        .popover({
                            content: "Campo requerido",
                            trigger: "manual"
                        })
                        .on('shown.bs.popover', function () {
                            var $pop = $(this);
                            setTimeout(function () {
                                $pop.popover('hide');
                            }, 2000);
                        })
                        .popover("show");
                ret = false;
            }
        });
        return ret;
    };

    $("#btnAddUser").click(function (event) {
        event.preventDefault();

        var form = $("#formAddUser");

        if (crud.validate(form)) {
            var obj = $("#formAddUser").serializeObject();
            obj.fechaNacimiento = new Date(obj.fechaNacimiento);
            var jqxhr = $.post(addUserUrl, JSON.stringify(obj), function (data) {
                $("#modalCrud").modal("hide");
                crud.listUsers();
            });

            jqxhr.fail(function (data) {
                console.log(data);
                $("#msgAddUser strong").html(data.responseJSON.mensaje);
                $("#msgAddUser").addClass("alert alert-danger").show();
                $(".close").click(function (event) {
                    $("#msgAddUser").hide();
                });
            });
        }


    });

    $("#btnUpdateUser").click(function (event) {
        event.preventDefault();

        var form = $("#formUpdateUser");

        if (crud.validate(form)) {
            var obj = $("#formUpdateUser").serializeObject();
            obj.fechaNacimiento = new Date(obj.fechaNacimiento);
            currUserId = sessionStorage.getItem("currUserID");
            var jqxhr = $.post(updateUserUrl + "&id=" + currUserId, JSON.stringify(obj), function (data) {
                $("#modalUpdate").modal("hide");
                sessionStorage.clear();
                crud.listUsers();
            });

            jqxhr.fail(function (data) {
                console.log(data);
                $("#msgAddUser strong").html(data.responseJSON.mensaje);
                $("#msgAddUser").addClass("alert alert-danger").show();
                $(".close").click(function (event) {
                    $("#msgAddUser").hide();
                });
            });
        }


    });



    crud.listUsers();

});