//obj con las funcionalidades
var crud = {};

/**
 * Urls
 */
var baseUrl = "/crud";
var addUserUrl = baseUrl + "/usuario/add";
var listUsersUrl = baseUrl + "/usuario/list";
var userDetails = baseUrl + "/usuario/details";

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
        $("#modalCrud").modal("show");
    };



    crud.listUsers = function () {

        //$("#tableUsers tbody").remove();
        $("#tableUsers tbody").empty();

        $.get(listUsersUrl, {}, function (data) {
            var table = $("#tableUsers");

            $.each(JSON.parse(data), function (rowIndex, r) {
                var row = $("<tr/>");

                row.append($("<td/>").text(r["identificacion"]));
                row.append($("<td/>").text(r["nombre"]));
                var btn = '<input type="button" data-user-id=' + r["id"] + ' class="btn btn-default" value="Detalles"/>';
                row.append($(btn));

                table.append(row);

            });

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
        });
    };

    $("#btnAddUser").click(function (event) {
        event.preventDefault();
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
    });

    crud.listUsers();

});